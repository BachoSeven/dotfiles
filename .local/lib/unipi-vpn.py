#!/usr/bin/env python3
"""Console-mode UniPi VPN connector that never puts the password in argv.

The password comes from (in order):
  * UNIPI_VPN_PASSWORD (removed from the child environment immediately)
  * `pass show unipi/vpn`
  * a hidden getpass() prompt

pexpect gives startct a pty, so startct's System.console().readPassword()
turns terminal echo off.  The password is written to the pty only after the
Password: prompt is seen, and it is never logged.
"""

import getpass
import os
import subprocess
import sys
import xml.etree.ElementTree as ET

try:
    import pexpect
except ImportError:
    print("python-pexpect is required (pacman -S python-pexpect)", file=sys.stderr)
    raise SystemExit(1)

SERVER = os.environ.get("UNIPI_VPN_SERVER", "access.unipi.it")
REALM = os.environ.get("UNIPI_VPN_REALM", "Internet attraverso UNIPI")
PROFILE = os.environ.get("UNIPI_VPN_PROFILE", "Unipi")
USER = os.environ.get("UNIPI_VPN_USER", "").strip()
PASS_ENTRY = os.environ.get("UNIPI_VPN_PASS_ENTRY", "unipi/vpn")


def get_profile_username() -> str:
    """Read the username from the selected profile, so it isn't hardcoded."""
    xdg_data = os.environ.get("XDG_DATA_HOME")
    if not xdg_data:
        real_home = os.environ.get("SONICWALL_REAL_HOME") or os.path.expanduser("~")
        xdg_data = os.path.join(real_home, ".local", "share")
    app_home = os.environ.get("SONICWALL_APP_HOME") or os.path.join(
        xdg_data, "sonicwall", "home"
    )
    profiles_xml = os.path.join(
        app_home, ".sonicwall", "AventailConnect", "config", "profiles.xml"
    )

    try:
        root = ET.parse(profiles_xml).getroot()
    except (OSError, ET.ParseError):
        return ""

    profiles = root.findall("profile")
    for profile in profiles:
        if (profile.findtext("name") or "").strip() == PROFILE:
            return (profile.findtext("username") or "").strip()
    # If the profile was renamed, use the first profile that has a username.
    for profile in profiles:
        username = (profile.findtext("username") or "").strip()
        if username:
            return username
    return ""


def resolve_user() -> str:
    if USER:
        return USER
    username = get_profile_username()
    if username:
        return username
    return input("VPN username: ").strip()


def get_password(user: str) -> str:
    pw = os.environ.get("UNIPI_VPN_PASSWORD", "")
    if pw:
        os.environ.pop("UNIPI_VPN_PASSWORD", None)
        return pw

    # HOME points at the app's private fake home, so give `pass` the real one.
    real_home = os.environ.get("SONICWALL_REAL_HOME")
    if not real_home:
        try:
            import pwd

            real_home = pwd.getpwuid(os.getuid()).pw_dir
        except Exception:
            real_home = os.path.expanduser("~")
    pass_env = os.environ.copy()
    pass_env["HOME"] = real_home

    # dwm may not inherit the login-shell XDG variables.  Point pass/gpg at the
    # XDG locations if they exist and weren't already set.
    xdg_data = os.environ.get("XDG_DATA_HOME") or os.path.join(
        real_home, ".local", "share"
    )
    for var, path in (
        ("PASSWORD_STORE_DIR", os.path.join(xdg_data, "password-store")),
        ("GNUPGHOME", os.path.join(xdg_data, "gnupg")),
    ):
        if var not in pass_env and os.path.isdir(path):
            pass_env[var] = path

    try:
        result = subprocess.run(
            ["pass", "show", PASS_ENTRY],
            capture_output=True,
            text=True,
            timeout=30,
            env=pass_env,
        )
        if result.returncode == 0:
            for line in result.stdout.splitlines():
                if line:
                    return line
    except (FileNotFoundError, subprocess.TimeoutExpired):
        pass

    return getpass.getpass(f"VPN password for {user}: ")


def main() -> int:
    user = resolve_user()
    if not user:
        print("No VPN username supplied.", file=sys.stderr)
        return 1

    pw = get_password(user)
    if not pw:
        print("No password supplied.", file=sys.stderr)
        return 1

    cmd = [
        os.environ.get("STARTCT_BIN", "/usr/bin/startct"),
        "--mode", "console",
        "--connect",
        "--name", PROFILE,
        "--server", SERVER,
        "--realm", REALM,
        "--loglevel", "3",
    ]
    if user:
        cmd[-1:-1] = ["--username", user]

    child = pexpect.spawn(
        cmd[0], cmd[1:], encoding="utf-8", timeout=120, env=os.environ
    )
    # Show only the child's output.  Never set logfile: that also logs input,
    # i.e. the password.
    child.logfile_read = sys.stdout

    attempts = 0
    try:
        while True:
            index = child.expect(
                [
                    r"Enter your choice\s*\[1\]:\s*",
                    r"(?i)Username:\s*",
                    r"(?i)Password:\s*",
                    r"CONNECT CMD>\s*",
                    pexpect.EOF,
                    pexpect.TIMEOUT,
                ]
            )

            if index == 0:
                # AUP: the default choice [1] is Accept.
                child.sendline("")
            elif index == 1:
                child.sendline(user)
            elif index == 2:
                attempts += 1
                if attempts > 2:
                    print(
                        "\nAuthentication retry limit reached; not retrying.",
                        file=sys.stderr,
                    )
                    return 1
                child.sendline(pw)
            elif index == 3:
                if sys.stdin.isatty() and sys.stdout.isatty():
                    child.interact()
                else:
                    child.expect(pexpect.EOF, timeout=None)
                return child.exitstatus or 0
            elif index == 4:  # EOF
                return child.exitstatus or 0
            else:  # TIMEOUT
                print("\nTimed out waiting for the VPN prompt.", file=sys.stderr)
                return 1
    except KeyboardInterrupt:
        return 130
    finally:
        child.close(force=True)


if __name__ == "__main__":
    raise SystemExit(main())
