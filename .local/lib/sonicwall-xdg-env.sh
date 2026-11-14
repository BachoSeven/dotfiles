# shellcheck shell=bash
# Keep everything Connect Tunnel / Java create out of the top level of $HOME.
# The app hardcodes "$user.home/.sonicwall" and Java's font cache uses
# "$user.home/.java", so we give it a private fake home under XDG_DATA_HOME.
: "${XDG_DATA_HOME:=$HOME/.local/share}"
: "${XDG_CONFIG_HOME:=$HOME/.config}"
: "${XDG_CACHE_HOME:=$HOME/.cache}"
: "${XDG_STATE_HOME:=$HOME/.local/state}"

export XDG_DATA_HOME XDG_CONFIG_HOME XDG_CACHE_HOME XDG_STATE_HOME
: "${SONICWALL_REAL_HOME:=$HOME}"
export SONICWALL_REAL_HOME
export SONICWALL_APP_HOME="$XDG_DATA_HOME/sonicwall/home"
export SONICWALL_CACHE_HOME="$XDG_CACHE_HOME/sonicwall"

mkdir -p "$SONICWALL_APP_HOME" "$SONICWALL_CACHE_HOME/java"

# Java's font cache is pure cache, so point it at XDG_CACHE_HOME.
if [[ ! -e "$SONICWALL_APP_HOME/.java" ]]; then
    ln -s "$SONICWALL_CACHE_HOME/java" "$SONICWALL_APP_HOME/.java"
fi

# /etc/resolv.conf is immutable on this machine.  Without this marker the
# native client aborts tunnel setup with
#   DoResolvConf - open-w error<Operation not permitted>
#   TunnelIffConfig Failed ... eCode<6>
# and then displays "Disconnecting...".  With the marker it skips rewriting
# DNS and the tunnel comes up.  Set SONICWALL_ALLOW_DNS=1 to let it manage DNS
# again (you must also remove the immutable flag first).
if [[ "${SONICWALL_ALLOW_DNS:-0}" != "1" ]]; then
    mkdir -p "$SONICWALL_APP_HOME/.sonicwall/AventailConnect"
    : > "$SONICWALL_APP_HOME/.sonicwall/AventailConnect/avc.nodns"
else
    rm -f "$SONICWALL_APP_HOME/.sonicwall/AventailConnect/avc.nodns"
fi

# Keep X11 auth working for the optional GUI wrapper after HOME changes.
if [[ -z "${XAUTHORITY:-}" && -f "$HOME/.Xauthority" ]]; then
    export XAUTHORITY="$HOME/.Xauthority"
fi

# The Java app uses System.getProperty("user.home") for ~/.sonicwall.
export HOME="$SONICWALL_APP_HOME"
# _JAVA_OPTIONS is read by the java wrapper in startct.sh/startctui.sh.
export _JAVA_OPTIONS="${_JAVA_OPTIONS:-} -Duser.home=$SONICWALL_APP_HOME"
