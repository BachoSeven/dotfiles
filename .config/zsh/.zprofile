## Basic settings
	export TERMINAL="st"
	export WM="dwm"
	export READER="zathura"
	export OPENER="xdg-open"
	export PAGER="less"
	export EDITOR='nvim'
	export VISUAL='nvim'
	export DIFFTOOL="$EDITOR -d"
	export BROWSER="chromium"
	export LOCATION="Buti" # weather script
	export AURHELPER="paru"
	export SUDO_ASKPASS="$HOME/.local/bin/scripts/dmenupass"
	export DO_NOT_TRACK=1 # respected by docker and other apps

# XDG Base Directory locations
	export XDG_CONFIG_HOME="$HOME/.config"
	export XDG_DATA_HOME="$HOME/.local/share"
	export XDG_STATE_HOME="$HOME/.local/state"
	export XDG_CACHE_HOME="$HOME/.cache"
	export XDG_DATA_DIRS="$XDG_DATA_HOME:/usr/share:/usr/local/share"
	export ZDOTDIR="${XDG_CONFIG_HOME:-$HOME/.config}/zsh"
	export INPUTRC="${XDG_CONFIG_HOME:-$HOME/.config}/readline/inputrc"
	export WGETRC="${XDG_CONFIG_HOME:-$HOME/.config}/wget/wgetrc"
	export NBRC_PATH="${XDG_CONFIG_HOME:-$HOME/.config}/nb/nbrc"
	export NB_DIR="${XDG_CONFIG_HOME:-$HOME/.config}/nb"
	export NB_HIST="${XDG_DATA_HOME:-$HOME/.local/share}/nb_history"
	export NOTMUCH_CONFIG="${XDG_CONFIG_HOME:-$HOME/.config}/notmuch-config"
	export MBSYNCRC="${XDG_CONFIG_HOME:-$HOME/.config}/mbsync/mbsyncrc"
	export LESSHISTFILE=-
	export XAUTHORITY="$XDG_RUNTIME_DIR"/Xauthority
	export HISTFILE="${XDG_DATA_HOME:-$HOME/.local/share}/zsh/history"
	export W3M_DIR="${XDG_CONFIG_HOME:-$HOME/.config}/w3m"
	export PASSWORD_STORE_DIR="${XDG_DATA_HOME:-$HOME/.local/share}/password-store"
	export ICEAUTHORITY="$XDG_CACHE_HOME"/ICEauthority
	export RUSTUP_HOME="$XDG_DATA_HOME/rustup"
	export CARGO_HOME="$XDG_DATA_HOME"/cargo
	export GOPATH="$XDG_DATA_HOME"/go
	export NPM_CONFIG_USERCONFIG="${XDG_CONFIG_HOME:-$HOME/.config}/npm/npmrc"
	export NODE_REPL_HISTORY="$XDG_DATA_HOME"/node_repl_history
	export GEM_HOME="$XDG_DATA_HOME/gem"
	export GEM_SPEC_CACHE="$XDG_CACHE_HOME/gem"
	export RIPGREP_CONFIG_PATH="${XDG_CONFIG_HOME:-$HOME/.config}/rg/ripgreprc"
	export MATHEMATICA_USERBASE="${XDG_CONFIG_HOME:-$HOME/.config}/mathematica"
	export _JAVA_OPTIONS="-Djava.util.prefs.userRoot=\"${XDG_CONFIG_HOME:-$HOME/.config}\"/java -Dawt.useSystemAAFontSettings=lcd -Dswing.aatext=true -Dswing.defaultlaf=com.sun.java.swing.plaf.gtk.GTKLookAndFeel -Dswing.crossplatformlaf=com.sun.java.swing.plaf.gtk.GTKLookAndFeel"
	export GRADLE_USER_HOME="$XDG_DATA_HOME"/gradle # For building java applications which use gradle
	export WEECHAT_HOME="${XDG_CONFIG_HOME:-$HOME/.config}/weechat"
	export LYNX_CFG="${XDG_CONFIG_HOME:-$HOME/.config}/lynx/lynx.cfg"
	export LYNX_LSS="${XDG_CONFIG_HOME:-$HOME/.config}/lynx/lynx.lss"
	export OCTAVE_HISTFILE="$XDG_CACHE_HOME/octave-hsts"
	export TEXMFHOME=$XDG_DATA_HOME/texmf # Texlive stuff
	export TEXMFVAR=$XDG_CACHE_HOME/texlive/texmf-var
	export TEXMFCONFIG="${XDG_CONFIG_HOME:-$HOME/.config}/texlive/texmf-config"
	export ANDROID_PREFS_ROOT="${XDG_CONFIG_HOME:-$HOME/.config}/android"
	export ANDROID_SDK_HOME="${XDG_CONFIG_HOME:-$HOME/.config}/android" # Deprecated(?)
	export ADB_VENDOR_KEY="${XDG_CONFIG_HOME:-$HOME/.config}/android"   # Deprecated(?)
	export NUGET_PACKAGES="$XDG_CACHE_HOME"/NuGetPackages
	export GNUPGHOME="${XDG_DATA_HOME:-$HOME/.local/share}/gnupg" # Oof.
	export STACK_ROOT="${XDG_DATA_HOME:-$HOME/.local/share}/stack"
	export GPG_TTY=$(tty)
	export PYTHON_HISTORY="${XDG_CACHE_HOME:-$HOME/.cache}/python/history" # This will work once https://github.com/python/cpython/pull/13208 gets merged...
	export XCURSOR_PATH="${XDG_DATA_HOME:-$HOME/.local/share}/icons" # Needed for custom cursor
	export OSHU_HOME="$HOME/stuff/games/osu"
	export SQLITE_HISTORY="${XDG_DATA_HOME:-$HOME/.local/share}/sqlite_history"
	export WINEPREFIX="${XDG_DATA_HOME:-$HOME/.local/share}/wineprefixes/default"
	export JULIA_DEPOT_PATH="${XDG_DATA_HOME:-$HOME/.local/share}/julia:$JULIA_DEPOT_PATH"
	export ELAN_HOME="${XDG_DATA_HOME:-$HOME/.local/share}/elan"

## Various programs settings:
	export BC_LINE_LENGTH=80
	export PARALLEL="--eta"
	export SYSTEMD_LESS=FRXMKij4 # omitting 'S' to disable "chopping" long lines
	export NO_AT_BRIDGE=1 # dbus accessibility bridge (https://bbs.archlinux.org/viewtopic.php?id=237697)
	export _JAVA_AWT_WM_NONREPARENTING=1	# Fix for Java applications in dwm
	# shellcheck opts to avoid having .shellcheckrc in ~ (https://github.com/koalaman/shellcheck/wiki)
	export SHELLCHECK_OPTS='--exclude=SC1003,SC1071,SC1087,SC1090,SC1091,SC2001,SC2015,SC2034,SC2038,SC2059,SC2068,SC2086,SC2115,SC2128,SC2139,SC2145,SC2153,SC2155,SC2164'
	# Temporary fix for [this](https://chromium.googlesource.com/chromium/src.git/+/671511b00e2d6c374a3079c1c379d2d0dfad32fe) chromium error, found [here](https://bugs.debian.org/cgi-bin/bugreport.cgi?bug=918433#10)
	export MESA_SHADER_CACHE_DISABLE=true

# Dotbare
	export DOTBARE_DIR="${XDG_CONFIG_HOME:-$HOME/.config}/dots"
	export DOTBARE_TREE="$HOME"
	export DOTBARE_BACKUP="${XDG_DATA_HOME:-$HOME/.local/share}/dotbare"
	export DOTBARE_KEY="
	  --bind=alt-a:toggle-all
	  --bind=alt-i:jump
	  --bind=alt-0:top
	  --bind=alt-s:toggle-sort
	  --bind=alt-t:toggle-preview
	"
	export XDG_MENU_TERMINAL=st
	export XDG_MENU_ICON_SIZE=32

# Mpv
	export MPV_OPTS="--really-quiet" # This is here because it's really only needed for interactive shell usage, rather than mpv scripts.
# Yt
	export SUBS_FILE="${XDG_CONFIG_HOME:-$HOME/.config}/yt/subs"
	export SUBS_MENU_PROG="dmenu -bw 7 -nb #458588 -nf #ebdbb2 -sb #cc241d -sf #fbf1c7 -nhb #282828 -shb #1d2021 -c -f -r -i -l 10 -p YT"

# Mpc
	export MPD_HOST="127.0.0.1"
	export MPD_PORT="6602"

# A few AMAZING fzf options
	export FZF_DEFAULT_COMMAND='fd --type f --hidden --follow --exclude .git'
	export FZF_DEFAULT_OPTS="--cycle --layout=reverse --height 60% --border --color fg:15,hl:3,fg+:12,bg+:0,hl+:11,info:13,prompt:6,spinner:14,pointer:12,marker:2,header:7"
	export FZF_CTRL_T_OPTS="--select-1 --exit-0 --preview '(highlight -O ansi -l {} 2> /dev/null || cat {} || tree -C {}) 2> /dev/null | head -200'"
	export FZF_CTRL_T_COMMAND='rg --files --no-ignore --hidden --follow --glob "!.git/*" --glob "!node_modules/*" --glob "!vendor/*" 2> /dev/null'
	export FZF_ALT_C_OPTS="--exact --select-1 --exit-0 --preview 'tree -C {} | head -200'" # this is almost a file manager
	export FZF_ALT_C_COMMAND="fd --type directory --hidden --follow --exclude .git"
	export FZF_CTRL_R_OPTS="--preview 'echo {}' --preview-window down:3:hidden:wrap --bind 'F1:toggle-preview'"

# pfetch
	# OFF: memory de uptime
	export PF_INFO="ascii os wm host pkgs shell editor"
	# name, data, title
	export PF_COL1=4
	export PF_COL2=7
	export PF_COL3=6

## Appearance
	export GCC_COLORS='error=01;31:warning=01;35:note=01;36:caret=01;32:locus=01:quote=01'
	[ -f ${XDG_CONFIG_HOME:-$HOME/.config}/dircolors/dircolors.dark ] && eval `dircolors -b ${XDG_CONFIG_HOME:-$HOME/.config}/dircolors/dircolors.dark`
	export GREP_COLOR='1;92;40'
# anti aliasing in the two toolkits
	export GDK_USE_XFT=1
	export QT_XFT=true
	export QT_QPA_PLATFORMTHEME=gtk3
# Vieb
	export VIEB_WINDOW_FRAME=true
# LESS (and man) colors
	export LESS_TERMCAP_mb="$(printf '%b' '[1;31m')"     # begin blinking
	export LESS_TERMCAP_md="$(printf '%b' '[1;36m')"     # begin bold
	export LESS_TERMCAP_us="$(printf '%b' '[1;32m')"     # begin underline
	export LESS_TERMCAP_so="$(printf '%b' '[01;34;40m')" # begin standout-mode - info box
	export LESS_TERMCAP_me="$(printf '%b' '[0m')"        # end mode
	export LESS_TERMCAP_ue="$(printf '%b' '[0m')"        # end underline
	export LESS_TERMCAP_se="$(printf '%b' '[0m')"        # end standout-mode
	export LESSOPEN='| LESSQUIET=1 lesspipe.sh %s'
	export LESSCOLORIZER='pygmentize'
	export LESS='-iRX --use-color -Dd+r$Du+b$ --mouse --wheel-lines 2 --jump-target=.5 --status-column --LONG-PROMPT --quit-on-intr --no-histdups'
	export MANROFFOPT="-c"
	export MANPAGER="sh -c 'col -bx | bat -l man -p '"

if [ "$TERM" = "linux" ]; then
	# gruvbox in TTY ;)
	echo -en "\e]P0282828"
	echo -en "\e]P1CC241D"
	echo -en "\e]P298971A"
	echo -en "\e]P3D79921"
	echo -en "\e]P4458588"
	echo -en "\e]P5B16286"
	echo -en "\e]P6689D6A"
	echo -en "\e]P7A89984"
	echo -en "\e]P8928374"
	echo -en "\e]P9FB4934"
	echo -en "\e]PAB8BB26"
	echo -en "\e]PBFABD2F"
	echo -en "\e]PC83A598"
	echo -en "\e]PDD3869B"
	echo -en "\e]PE8EC07C"
	echo -en "\e]PFEBDBB2"
	clear # fix some weird artifacting
fi

# Wolfram Alpha
	export WA_FG="1d2021"
	export WA_FG="ebdbb2"

# Stardict/sdcv dictionaries
	export SDCV_PAGER="sed 's/\ \ \([1-9]\)/\n\n◆ \1/g' |less -FX"
# Kunst
	export KUNST_SIZE="250x250"
	export KUNST_POSITION="-25+15" # This should be in sync with dwm gaps.
	export KUNST_MUSIC_DIR="$HOME/mus"
	export KUNST_COVER_NAMES='cover|folder|front|thumbnail'
	export KUNST_COVER_EXT='jpg|png|jpeg'

# Remap Caps Lock
	if [ -z "$(ls /dev/input/by-id 2>/dev/null | grep Anne)" ]; then
		sudo -n loadkeys $HOME/.config/ttymaps.kmap 2>/dev/null
	fi

# Start graphical server on tty1 if not already running.
	if [ "${XDG_VTNR}" -eq 1 ] && [ -z "${DISPLAY}" ]; then
		exec sx 2>/dev/null
	fi
