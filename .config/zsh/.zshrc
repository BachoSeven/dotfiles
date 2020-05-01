autoload -U colors && colors
setopt autocd		# Automatically cd into typed directory.
stty stop undef		# Disable ctrl-s to freeze terminal.

eval $(thefuck --alias)

# Always ask before rm folder/*
unsetopt RM_STAR_SILENT

source $ZDOTDIR/plugins/history/history.zsh
source $ZDOTDIR/plugins/powerlevel10k/powerlevel10k.zsh-theme
source $ZDOTDIR/.p10k.zsh
[ -f $ZDOTDIR/plugins/fzf/fzf.zsh ] && source $ZDOTDIR/plugins/fzf/fzf.zsh
[ -f "$HOME/.config/aliasrc" ] && source "$HOME/.config/aliasrc"

# Directly Execute with CTRL-X CTRL-R
	fzf-history-widget-accept() {
	  fzf-history-widget
	  zle accept-line
	}
	zle     -N     fzf-history-widget-accept
	bindkey '^X^R' fzf-history-widget-accept

# # Autocompletion

	fpath=($ZDOTDIR/completions $fpath)
	# eval `dircolors $XDG_CONFIG_HOME/dircolors/dircolor.solarized-dark`
	eval `dircolors $XDG_CONFIG_HOME/dircolors/dircolor.gruvbox`

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
	export KEYTIMEOUT=1

	bindkey -M menuselect 'h' vi-backward-char
	bindkey -M menuselect 'k' vi-up-line-or-history
	bindkey -M menuselect 'l' vi-forward-char
	bindkey -M menuselect 'j' vi-down-line-or-history

# Change cursor shape for different vi modes.
	function zle-keymap-select {
	  if [[ ${KEYMAP} == vicmd ]] ||
	     [[ $1 = 'block' ]]; then
	    echo -ne '\e[1 q'

	  elif [[ ${KEYMAP} == main ]] ||
	       [[ ${KEYMAP} == viins ]] ||
	       [[ ${KEYMAP} = '' ]] ||
	       [[ $1 = 'beam' ]]; then
	    echo -ne '\e[5 q'
	  fi
	}
	zle -N zle-keymap-select

	echo -ne '\e[5 q' # Use beam shape cursor on startup.
	preexec() { echo -ne '\e[5 q' ;} # Use beam shape cursor for each new prompt.

# Edit line in vim with ctrl-e:
	autoload edit-command-line; zle -N edit-command-line
	bindkey '^e' edit-command-line

# Bind keys
	bindkey -s '^o' 'lfcd\n'
	#bindkey -s '^y' 'vimspo\n'
	bindkey -s '^g' 'gotop\n'
	bindkey -s '^v' 'nvim\n'
	bindkey -s '^q' 'udg\n'
	bindkey -s '^u' 'u\n'
	bindkey -s '^h' 'htop\n'
	bindkey -s '^f' 'fast\n'
	bindkey -s '^[n' 'neomutt\n'
	bindkey -s "^[s" 'ncspot\n'
	bindkey -s '^a' 'bc -l\n'

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
