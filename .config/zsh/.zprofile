## Basic settings
	export TERMINAL="st"
	export READER="zathura"
	export OPENER='xdg-open'
	export PAGER='less'
	export EDITOR="nvim"
	export VISUAL="nvim"
	export BROWSER="chromium"
	export LOCATION="Pisa" # weather script
	export SUDO_ASKPASS="$HOME/.local/bin/scripts/dmenupass"

# XDG Base Directory locations
	export XDG_CONFIG_HOME="$HOME/.config"
	export XDG_DATA_HOME="$HOME/.local/share"
	export XDG_CACHE_HOME="$HOME/.cache"
	export ZDOTDIR="$XDG_CONFIG_HOME/zsh"
	export INPUTRC="$XDG_CONFIG_HOME"/readline/inputrc
	export WGETRC="${XDG_CONFIG_HOME:-$HOME/.config}/wget/wgetrc"
	export GTK2_RC_FILES=$XDG_CONFIG_HOME/gtk-2.0/settings.ini
	export ZDOTDIR="${XDG_CONFIG_HOME:-$HOME/.config}/zsh"
	export NOTMUCH_CONFIG="${XDG_CONFIG_HOME:-$HOME/.config}/notmuch-config"
	export LESSHISTFILE=-
	export XAUTHORITY="$XDG_RUNTIME_DIR"/Xauthority
	export HISTFILE="$XDG_DATA_HOME/zsh/.zsh_history"
	export PASSWORD_STORE_DIR="${XDG_DATA_HOME:-$HOME/.local/share}/password-store"
	export ICEAUTHORITY="$XDG_CACHE_HOME"/ICEauthority
	export RUSTUP_HOME="$XDG_DATA_HOME/rustup"
	export NPM_CONFIG_USERCONFIG="$XDG_CONFIG_HOME/npm/npmrc"
	export GEM_HOME="$XDG_DATA_HOME/gem"
	export GEM_SPEC_CACHE="$XDG_CACHE_HOME/gem"
	export RIPGREP_CONFIG_PATH="$XDG_CONFIG_HOME/rg/ripgreprc"
	export MATHEMATICA_USERBASE="$XDG_CONFIG_HOME/mathematica"
	export _JAVA_OPTIONS=-Djava.util.prefs.userRoot="$XDG_CONFIG_HOME"/java
	export WEECHAT_HOME="$XDG_CONFIG_HOME"/weechat

## Various programs settings:
	export _JAVA_AWT_WM_NONREPARENTING=1	# Fix for Java applications in dwm
	# Experimental: add memoy-reducing Chromium startup parameters to Brave
	export BRAVE_FLAGS="--process-per-site  --enable-low-end-device-mode"
	# shellcheck opts to avoid having .shellcheckrc in ~ (https://github.com/koalaman/shellcheck/wiki)
	export SHELLCHECK_OPTS='--exclude=SC1003,SC1087,SC1090,SC1091,SC2001,SC2015,SC2034,SC2038,SC2059,SC2068,SC2086,SC2115,SC2128,SC2139,SC2145,SC2153,SC2155'

# Dotbare
	export DOTBARE_DIR="$XDG_CONFIG_HOME/dots"
	export DOTBARE_TREE="$HOME"
	export DOTBARE_BACKUP="${XDG_DATA_HOME:-$HOME/.local/share}/dotbare"
	export DOTBARE_KEY="
	  --bind=alt-a:toggle-all
	  --bind=alt-i:jump
	  --bind=alt-0:top
	  --bind=alt-s:toggle-sort
	  --bind=alt-t:toggle-preview
	"

# Yt
	export SUBS_FILE=$XDG_CONFIG_HOME/subs
	export SUBS_MENU_PROG="dmenu -bw 5 -nb #282828 -nf #83a598 -c -f -i -l 10 -p YT"

# Mpd
	export MPD_HOST="127.0.0.1"
	export MPD_PORT="6602"

# A few AMAZING fzf options
	export FZF_DEFAULT_COMMAND='fd --type f --hidden --follow --exclude .git'
	export FZF_DEFAULT_OPTS="--cycle --layout=reverse --height 50% --border --color fg:#ebdbb2,bg:#282828,hl:#fabd2f,fg+:#ebdbb2,bg+:#3c3836,hl+:#fabd2f --color info:#83a598,prompt:#bdae93,spinner:#fabd2f,pointer:#83a598,marker:#fe8019,header:#665c54"
	export FZF_CTRL_T_OPTS="--select-1 --exit-0 --preview '(highlight -O ansi -l {} 2> /dev/null || cat {} || tree -C {}) 2> /dev/null | head -200'"
	export FZF_CTRL_T_COMMAND='rg --files --no-ignore --hidden --follow --glob "!.git/*" --glob "!node_modules/*" --glob "!vendor/*" 2> /dev/null'
	export FZF_ALT_C_OPTS="--exact --select-1 --exit-0 --preview 'tree -C {} | head -200'" # this is almost a file manager
	export FZF_ALT_C_COMMAND="fd --type directory --hidden --follow --exclude .git"
	export FZF_CTRL_R_OPTS="--preview 'echo {}' --preview-window down:3:hidden:wrap --bind 'F1:toggle-preview'"

# pfetch
	# OFF: memory de uptime
	export PF_INFO="ascii title os wm host pkgs shell editor"
	# name, data, title
	export PF_COL1=4
	export PF_COL2=7
	export PF_COL3=6

## Appearance
	export XCURSOR_PATH="~/.config/icons" # Needed for custom cursor
	export GCC_COLORS='error=01;31:warning=01;35:note=01;36:caret=01;32:locus=01:quote=01'
	[ -f $XDG_CONFIG_HOME/dircolors/dircolor.dark ] && eval `dircolors -b $XDG_CONFIG_HOME/dircolors/dircolor.dark`
	# export LF_ICONS="di=:fi=:tw=:ow=:ln=:or=:ex=:*.c=:*.cc=:*.clj=:*.coffee=:*.cpp=:*.css=:*.d=:*.dart=:*.erl=:*.exs=:*.fs=:*.go=:*.h=:*.hh=:*.hpp=:*.hs=:*.html=:*.java=:*.jl=:*.js=:*.json=:*.lua=:*.md=:*.php=:*.pl=:*.pro=:*.py=:*.rb=:*.rs=:*.scala=:*.ts=:*.vim=:*.cmd=:*.ps1=:*.sh=:*.bash=:*.zsh=:*.fish=:*.tar=:*.tgz=:*.arc=:*.arj=:*.taz=:*.lha=:*.lz4=:*.lzh=:*.lzma=:*.tlz=:*.txz=:*.tzo=:*.t7z=:*.zip=:*.z=:*.dz=:*.gz=:*.lrz=:*.lz=:*.lzo=:*.xz=:*.zst=:*.tzst=:*.bz2=:*.bz=:*.tbz=:*.tbz2=:*.tz=:*.deb=:*.rpm=:*.jar=:*.war=:*.ear=:*.sar=:*.rar=:*.alz=:*.ace=:*.zoo=:*.cpio=:*.7z=:*.rz=:*.cab=:*.wim=:*.swm=:*.dwm=:*.esd=:*.jpg=:*.jpeg=:*.mjpg=:*.mjpeg=:*.gif=:*.bmp=:*.pbm=:*.pgm=:*.ppm=:*.tga=:*.xbm=:*.xpm=:*.tif=:*.tiff=:*.png=:*.svg=:*.svgz=:*.mng=:*.pcx=:*.mov=:*.mpg=:*.mpeg=:*.m2v=:*.mkv=:*.webm=:*.ogm=:*.mp4=:*.m4v=:*.mp4v=:*.vob=:*.qt=:*.nuv=:*.wmv=:*.asf=:*.rm=:*.rmvb=:*.flc=:*.avi=:*.fli=:*.flv=:*.gl=:*.dl=:*.xcf=:*.xwd=:*.yuv=:*.cgm=:*.emf=:*.ogv=:*.ogx=:*.aac=:*.au=:*.flac=:*.m4a=:*.mid=:*.midi=:*.mka=:*.mp3=:*.mpc=:*.ogg=:*.ra=:*.wav=:*.oga=:*.opus=:*.spx=:*.xspf=:*.pdf=:*.nix="
	export GREP_COLOR='7;49;33'
# anti aliasing in the two toolkits
	export GDK_USE_XFT=1
	export QT_XFT=true
# LESS (and man) colors
	export LESS_TERMCAP_mb="$(printf '%b' '[1;31m')"     # begin blinking
	export LESS_TERMCAP_md="$(printf '%b' '[1;36m')"     # begin bold
	export LESS_TERMCAP_us="$(printf '%b' '[1;32m')"     # begin underline
	export LESS_TERMCAP_so="$(printf '%b' '[01;33;41m')" # begin standout-mode - info box
	export LESS_TERMCAP_me="$(printf '%b' '[0m')"        # end mode
	export LESS_TERMCAP_ue="$(printf '%b' '[0m')"        # end underline
	export LESS_TERMCAP_se="$(printf '%b' '[0m')"        # end standout-mode
	export LESSOPEN='| LESSQUIET=1 lesspipe.sh %s'
	export LESSCOLORIZER='pygmentize'
	export LESS='-iRX'
	export MANROFFOPT="-c"
	export MANPAGER="sh -c 'col -bx | bat -l man -p '"

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
*.mkv=🎥:\
*.mp4=🎥:\
*.webm=🎥:\
*.mpeg=🎥:\
*.avi=🎥:\
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

# Wolfram Alpha
	export WA_APPID="***REDACTED-WA-APPID***"
	export WA_VIEWER="display"
	export WA_FG="#ebdbb2"

# Bat
	export BAT_THEME="gruvbox"
# Stardict/sdcv dictionaries
	export SDCV_PAGER="less -FX"
# Barva
	export BARVA_BG="#000000"
	export BARVA_TARGET="#f7999f"
	export BARVA_FPS=60
# Kunst
	export KUNST_SIZE="240x240"
	export KUNST_POSITION="+1656+816"
	export KUNST_MUSIC_DIR="~/slsk/music"

# Start graphical server on tty1 if not already running.
	[ "$(tty)" = "/dev/tty1" ] && ! pidof Xorg >/dev/null 2>&1 && exec startx "$XDG_CONFIG_HOME/X11/xinitrc" -- "$XDG_CONFIG_HOME/X11/xserverrc" vt1 &> /dev/null
	sudo -n loadkeys $HOME/.config/ttymaps.kmap 2>/dev/null
