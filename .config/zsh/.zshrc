# Powerlevel10k
	source $ZDOTDIR/plugins/powerlevel10k/powerlevel10k.zsh-theme
	if [[ -r "${XDG_CACHE_HOME:-$HOME/.cache}/p10k-instant-prompt-${(%):-%n}.zsh" ]]; then
	  source "${XDG_CACHE_HOME:-$HOME/.cache}/p10k-instant-prompt-${(%):-%n}.zsh"
	fi

	source $ZDOTDIR/.p10k.zsh

# Basic Settings
	setopt autocd		# Automatically cd into typed directory.
	stty stop undef		# Disable ctrl-s to freeze terminal.
	unsetopt RM_STAR_SILENT # Always ask before rm folder/*
	[ -f "$HOME/.config/aliasrc" ] && source "$HOME/.config/aliasrc"

# Plugins
	[ -f $ZDOTDIR/plugins/fzf/fzf.zsh ] && source $ZDOTDIR/plugins/fzf/fzf.zsh
	source $ZDOTDIR/plugins/history/history.zsh
	eval $(thefuck --alias) # ;)

# Directly Execute with CTRL-X CTRL-R
	fzf-history-widget-accept() {
	  fzf-history-widget
	  zle accept-line
	}
	zle     -N     fzf-history-widget-accept
	bindkey '^X^R' fzf-history-widget-accept

# Colors
	autoload -U colors && colors
	eval `dircolors $XDG_CONFIG_HOME/dircolors/dircolor.solarized-dark`
	# eval `dircolors $XDG_CONFIG_HOME/dircolors/dircolor.gruvbox`

	man() {					# Colored man pages
		LESS_TERMCAP_mb=$'\e[01;31m' \
		LESS_TERMCAP_md=$'\e[01;31m' \
		LESS_TERMCAP_me=$'\e[0m' \
		LESS_TERMCAP_se=$'\e[0m' \
		LESS_TERMCAP_so=$'\e[01;44;33m' \
		LESS_TERMCAP_ue=$'\e[0m' \
		LESS_TERMCAP_us=$'\e[01;32m' \
		command man "$@"
	    }

# # Autocompletion

	fpath=($ZDOTDIR/completions $fpath)

	autoload -U compinit
	zmodload zsh/complist
	compinit

	zstyle ':completion:*' list-colors ''
	zstyle ':completion:*:*:*:*:*' menu select

	# #if [ -f $GOPATH/src/github.com/zquestz/s/autocomplete/s-completion.bash ]; then
	    # #source $GOPATH/src/github.com/zquestz/s/autocomplete/s-completion.bash
	# #fi

# # Vi-mode
	source $ZDOTDIR/plugins/vi-mode/vi-mode.zsh

# Bind keys
	bindkey -s '^o' 'lfcd\n'
	bindkey -s '^g' 'ytop\n'
	bindkey -s '^y' 'bashtop\n'
	bindkey -s '^v' 'nvim\n'
	bindkey -s '^u' 'u\n'
	bindkey -s '^h' 'htop\n'
	bindkey -s '^f' 'fast\n'
	bindkey -s '^[n' 'neomutt\n'
	bindkey -s "^[s" 'ncspot\n'
	bindkey -s '^a' 'bc -l\n'
	bindkey -s '^s' 'udg\n'

[ "$TERM" != "st-256color" ] &&	export LF_ICONS="di=📁:\
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
source $ZDOTDIR/plugins/fsh/fast-syntax-highlighting.plugin.zsh 2>/dev/null
