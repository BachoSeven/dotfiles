## Basic settings
	export TERMINAL="st"
	export WM="dwm"
	export READER="zathura"
	export OPENER="xdg-open"
	export PAGER="less"
	export EDITOR="nvim"
	export VISUAL="nvim"
	export DIFFTOOL="nvim -d"
	export BROWSER="chromium"
	export LOCATION="Buti" # weather script
	export AURHELPER="paru"
	export SUDO_ASKPASS="$HOME/.local/bin/scripts/dmenupass"

# XDG Base Directory locations
	export XDG_CONFIG_HOME="$HOME/.config"
	export XDG_DATA_HOME="$HOME/.local/share"
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
	export GPG_TTY=$(tty)
	export PYTHONHISTORY="${XDG_CACHE_HOME:-$HOME/.cache}/python/history" # This will work once https://github.com/python/cpython/pull/13208 gets merged...
	export OSHU_HOME="$HOME/stuff/games/osu"

## Various programs settings:
	export BC_LINE_LENGTH=80
	export SYSTEMD_LESS=FRXMKij4 # omitting 'S' to disable "chopping" long lines
	export NO_AT_BRIDGE=1 # dbus accessibility bridge (https://bbs.archlinux.org/viewtopic.php?id=237697)
	export _JAVA_AWT_WM_NONREPARENTING=1	# Fix for Java applications in dwm
	# shellcheck opts to avoid having .shellcheckrc in ~ (https://github.com/koalaman/shellcheck/wiki)
	export SHELLCHECK_OPTS='--exclude=SC1003,SC1071,SC1087,SC1090,SC1091,SC2001,SC2015,SC2034,SC2038,SC2059,SC2068,SC2086,SC2115,SC2128,SC2139,SC2145,SC2153,SC2155'
	# Temporary fix for [this](https://chromium.googlesource.com/chromium/src.git/+/671511b00e2d6c374a3079c1c379d2d0dfad32fe) chromium error, found [here](https://bugs.debian.org/cgi-bin/bugreport.cgi?bug=918433#10)
	export MESA_GLSL_CACHE_DISABLE=true

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
	export FZF_DEFAULT_OPTS="--cycle --layout=reverse --height 50% --border --color fg:#ebdbb2,hl:#d79921,fg+:#83a598,bg+:#3c3836,hl+:#fabd2f,info:#d3869b,prompt:#add8e6,spinner:#8ec07c,pointer:#83a598,marker:#98971a,header:#a89984"
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
	export XCURSOR_PATH="~/.local/share/icons" # Needed for custom cursor
	export GCC_COLORS='error=01;31:warning=01;35:note=01;36:caret=01;32:locus=01:quote=01'
	[ -f ${XDG_CONFIG_HOME:-$HOME/.config}/dircolors/dircolors.dark ] && eval `dircolors -b ${XDG_CONFIG_HOME:-$HOME/.config}/dircolors/dircolors.dark`
	export GREP_COLOR='1;92;40'
# anti aliasing in the two toolkits
	export GDK_USE_XFT=1
	export QT_XFT=true
# Consistent theming for Qt5
	export QT_QPA_PLATFORMTHEME=qt5ct
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
	export LESS='-iRX --mouse --wheel-lines 2 --jump-target=.5 --status-column --LONG-PROMPT --quit-on-intr --no-histdups'
	export MANPAGER="sh -c 'col -bx | bat -l man -p '"
# Lf icons
	# export LF_ICONS="tw=:st=:ow=:dt=:di=:fi=:ln=:or=:ex=:*.c=:*.cc=:*.clj=:*.coffee=:*.cpp=:*.css=:*.d=:*.dart=:*.erl=:*.exs=:*.fs=:*.go=:*.h=:*.hh=:*.hpp=:*.hs=:*.html=:*.java=:*.jl=:*.js=:*.json=:*.lua=:*.md=:*.php=:*.pl=:*.pro=:*.py=:*.rb=:*.rs=:*.scala=:*.ts=:*.vim=:*.cmd=:*.ps1=:*.sh=:*.bash=:*.zsh=:*.fish=:*.tar=:*.tgz=:*.arc=:*.arj=:*.taz=:*.lha=:*.lz4=:*.lzh=:*.lzma=:*.tlz=:*.txz=:*.tzo=:*.t7z=:*.zip=:*.z=:*.dz=:*.gz=:*.lrz=:*.lz=:*.lzo=:*.xz=:*.zst=:*.tzst=:*.bz2=:*.bz=:*.tbz=:*.tbz2=:*.tz=:*.deb=:*.rpm=:*.jar=:*.war=:*.ear=:*.sar=:*.rar=:*.alz=:*.ace=:*.zoo=:*.cpio=:*.7z=:*.rz=:*.cab=:*.wim=:*.swm=:*.dwm=:*.esd=:*.jpg=:*.jpeg=:*.mjpg=:*.mjpeg=:*.gif=:*.bmp=:*.pbm=:*.pgm=:*.ppm=:*.tga=:*.xbm=:*.xpm=:*.tif=:*.tiff=:*.png=:*.svg=:*.svgz=:*.mng=:*.pcx=:*.mov=:*.mpg=:*.mpeg=:*.m2v=:*.mkv=:*.webm=:*.ogm=:*.mp4=:*.m4v=:*.mp4v=:*.vob=:*.qt=:*.nuv=:*.wmv=:*.asf=:*.rm=:*.rmvb=:*.flc=:*.avi=:*.fli=:*.flv=:*.gl=:*.dl=:*.xcf=:*.xwd=:*.yuv=:*.cgm=:*.emf=:*.ogv=:*.ogx=:*.aac=:*.au=:*.flac=:*.m4a=:*.mid=:*.midi=:*.mka=:*.mp3=:*.mpc=:*.ogg=:*.ra=:*.wav=:*.oga=:*.opus=:*.spx=:*.xspf=:*.pdf=:*.nix="
	export LF_ICONS="di=📁:\
fi=📃:\
tw=🤝:\
ow=📂:\
ln=⛓:\
or=❌:\
ex=🎯:\
*.txt=✍:\
*.mom=✍:\
*.me=✍:\
*.ms=✍:\
*.png=🖼:\
*.ico=🖼:\
*.jpg=📸:\
*.jpeg=📸:\
*.gif=🖼:\
*.svg=🗺:\
*.xcf=🖌:\
*.html=🌎:\
*.xml=📰:\
*.gpg=🔒:\
*.css=🎨:\
*.pdf=📚:\
*.djvu=📚:\
*.epub=📚:\
*.csv=📓:\
*.xlsx=📓:\
*.tex=📜:\
*.md=📘:\
*.r=📊:\
*.R=📊:\
*.rmd=📊:\
*.Rmd=📊:\
*.mp3=🎵:\
*.opus=🎵:\
*.ogg=🎵:\
*.m4a=🎵:\
*.flac=🎼:\
*.wav=🎼:\
*.mkv=🎥:\
*.mp4=🎥:\
*.webm=🎥:\
*.mpeg=🎥:\
*.avi=🎥:\
*.mov=🎥:\
*.mpg=🎥:\
*.wmv=🎥:\
*.m4b=🎥:\
*.flv=🎥:\
*.zip=📦:\
*.rar=📦:\
*.7z=📦:\
*.tar.gz=📦:\
*.z64=🎮:\
*.v64=🎮:\
*.n64=🎮:\
*.1=ℹ:\
*.nfo=ℹ:\
*.info=ℹ:\
*.log=📙:\
*.iso=📀:\
*.img=📀:\
*.bib=🎓:\
*.ged=👪:\
*.part=💔:\
*.torrent=🔽:\
*.nix=::\
"

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
	export KUNST_SIZE="240x240"
	export KUNST_POSITION="-25+15" # This should be in sync with dwm gaps.
	export KUNST_MUSIC_DIR="$HOME/slsk/music"
	export KUNST_COVER_NAMES='folder|cover|front|thumbnail'
	export KUNST_COVER_EXT='jpg|png|jpeg'

# Remap Caps Lock
	if [ -z "$(ls /dev/input/by-id | grep Anne)" ]; then
		sudo -n loadkeys $HOME/.config/ttymaps.kmap 2>/dev/null
	fi

# Start graphical server on tty1 if not already running.
	if [ "${XDG_VTNR}" -eq 1 ] && [ -z "${DISPLAY}" ]; then
		exec sx &>/dev/null 2>&1
	fi
