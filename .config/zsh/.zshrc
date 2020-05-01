export ZSH="$XDG_CONFIG_HOME/oh-my-zsh"
DISABLE_UNTRACKED_FILES_DIRTY="true"
plugins=(git colored-man-pages vi-mode)
source $ZSH/oh-my-zsh.sh

autoload -Uz bracketed-paste-magic
zle -N bracketed-paste bracketed-paste-magic
# This speeds up pasting (especially with autosuggest):  https://github.com/zsh-users/zsh-autosuggestions/issues/238
pasteinit() {
  OLD_SELF_INSERT=${${(s.:.)widgets[self-insert]}[2,3]}
  zle -N self-insert url-quote-magic # I wonder if you'd need `.url-quote-magic`?
}

pastefinish() {
  zle -N self-insert $OLD_SELF_INSERT
}
zstyle :bracketed-paste-magic paste-init pasteinit
zstyle :bracketed-paste-magic paste-finish pastefinish

if [[ -s '/etc/zsh_command_not_found' ]]; then
  source '/etc/zsh_command_not_found'
fi

[ -f $ZDOTDIR/fzf/fzf.zsh ] && source $ZDOTDIR/fzf/fzf.zsh
[ -f "$HOME/.config/aliasrc" ] && source "$HOME/.config/aliasrc"

# Directly Execute with CTRL-X CTRL-R
	fzf-history-widget-accept() {
	  fzf-history-widget
	  zle accept-line
	}
	zle     -N     fzf-history-widget-accept
	bindkey '^X^R' fzf-history-widget-accept

# Autocompletion
	d='dirs -v | head -10'
	1='cd -'
	2='cd -2'
	3='cd -3'
	4='cd -4'
	5='cd -5'
	6='cd -6'
	7='cd -7'
	8='cd -8'
	9='cd -9'

	fpath=($ZDOTDIR/completions $fpath)
	zstyle ':completion:*' list-colors "${(@s.:.)LSCOLORS}"
	# eval `dircolors $XDG_CONFIG_HOME/dircolors/dircolor.solarized-dark`
	eval `dircolors $XDG_CONFIG_HOME/dircolors/dircolor.gruvbox`

	autoload -Uz compinit
	if [[ -n ${ZDOTDIR:-${HOME}}/$ZSH_COMPDUMP(#qN.mh+24) ]]; then
		compinit -d $ZSH_COMPDUMP;
	else
		compinit -C;
	fi;

	#if [ -f $GOPATH/src/github.com/zquestz/s/autocomplete/s-completion.bash ]; then
	    #source $GOPATH/src/github.com/zquestz/s/autocomplete/s-completion.bash
	#fi

eval $(thefuck --alias)

# Always ask before rm folder/*
unsetopt RM_STAR_SILENT

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
source $XDG_CONFIG_HOME/powerlevel10k/powerlevel10k.zsh-theme
source ~/.config/zsh/.p10k.zsh
source $XDG_CONFIG_HOME/zsh/fsh/fast-syntax-highlighting.plugin.zsh 2>/dev/null
