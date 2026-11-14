# toolbox

Notes for the scripts and shell functions that are not obvious.

## shell

- `bwunlock`: unlock Bitwarden, export `BW_SESSION` and cache it in the keyring. New shells read it from `.zprofile`.
- `agy`: run the Antigravity CLI with `HOME` set to `~/.local/share/agy-home`.
- `zu`: pick a Zulip org with `fzf` and open `zulip-term`.
- `tl`: `tldr` wrapper, no argument gives a fuzzy list.
- `d`: dotbare. Untracked files are hidden unless you pass `-uall`: `d status -uall`.

## display

- `br set 60`, `br inc 10`, `br dec 20`: backlight in percent, same scale as `dim`.
- `switch-theme dark|light`: Xresources, GTK, wezterm, zathura, glow, zulip, opencode (`cli.json`, reloaded live) and vimium (CDP when chromium runs, leveldb otherwise).
- `mon`: external monitor layout, used by scripts and by hand.

## files

- `lf`: `gM` goes to `~/math/uni`, `gG` to `/dati/games`, `t` sorts by mtime.
- `find-big-junk [-d DIR] [-s 50M] [-w]`: big regenerable dirs not covered by `~/.config/ignorelist`; `-w` appends them.

## browser

- `getpaper <link|doi|arxiv-id|description>`: fetch a paper into `~/math`; `--list` shows the tree, `aa-login` stores the Anna's Archive session.
- `vimium-inject-css dark|light`: push the theme into vimium over CDP while chromium runs.
- `vimium-ldb-edit dark|light`: same, editing leveldb while chromium is closed.

## vpn

- `unipi-vpn`: UniPi VPN, password from `UNIPI_VPN_PASSWORD`, `pass show unipi/vpn` or a prompt.
- `startct` / `startctui`: sonicwall with a private `$HOME` under `~/.local/share/sonicwall`.

## music

- `nc2`: ncmpcpp on port 6600 plus `kunst` cover art.
- `music`: MPD status in the bar; click opens ncmpcpp.
- `nowplaying`: current track in the bar; play/pause and next/previous.
- `spot-cli`: Spotify/MPRIS transport controls.
- Win+Alt+m: Jellyfin music scratchpad.
