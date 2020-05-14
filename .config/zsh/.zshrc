#                  __
#                 /\ \
#    ____     ____\ \ \___   _ __   ___
#   /\_ ,`\  /',__\\ \  _ `\/\`'__\/'___\
# __\/_/  /_/\__, `\\ \ \ \ \ \ \//\ \__/
#/\_\ /\____\/\____/ \ \_\ \_\ \_\\ \____\
#\/_/ \/____/\/___/   \/_/\/_/\/_/ \/____/
#
#
## Powerlevel10k
	[ -f $ZDOTDIR/plugins/powerlevel10k/powerlevel10k.zsh-theme ] && source $ZDOTDIR/plugins/powerlevel10k/powerlevel10k.zsh-theme
	[[ -r "${XDG_CACHE_HOME:-$HOME/.cache}/p10k-instant-prompt-${(%):-%n}.zsh" ]] && source "${XDG_CACHE_HOME:-$HOME/.cache}/p10k-instant-prompt-${(%):-%n}.zsh"
	[ -f $ZDOTDIR/.p10k.zsh ] && source $ZDOTDIR/.p10k.zsh

## Basic Settings
	setopt AUTO_CD          						# `dirname` is equivalent to `cd dirname`
	stty stop undef								# Disable ctrl-s to freeze terminal.
	unsetopt RM_STAR_SILENT 						# Always ask before rm folder/*
	[ -f "$HOME/.config/aliasrc" ] && source "$HOME/.config/aliasrc"	# Custom aliases

## Plugins
	[ -f $ZDOTDIR/plugins/fzf/fzf.zsh ] && source $ZDOTDIR/plugins/fzf/fzf.zsh
	[ -f $ZDOTDIR/plugins/history/history.zsh ] && source $ZDOTDIR/plugins/history/history.zsh
	[ -f $ZDOTDIR/plugins/lf/lf.zsh ] && source $ZDOTDIR/plugins/lf/lf.zsh 2>/dev/null
	eval $(thefuck --alias)

## Autocompletion
	fpath=($ZDOTDIR/completions $fpath)
	autoload -U compinit
	zmodload zsh/complist
	compinit

## Vi-mode
	[ -f $ZDOTDIR/plugins/vi-mode/vi-mode.zsh ] && source $ZDOTDIR/plugins/vi-mode/vi-mode.zsh

## Bind keys
	bindkey -s '^o' 'lfcd\n'
	bindkey -s '^g' 'ytop\n'
	bindkey -s '^v' 'nvim\n'
	bindkey -s '^u' 'u\n'
	bindkey -s '^h' 'htop\n'
	bindkey -s '^f' 'fast\n'
	bindkey -s '^[n' 'neomutt\n'
	bindkey -s "^[s" 'ncspot\n'
	bindkey -s '^a' 'bc -l\n'
	bindkey -s '^s' 'udg\n'

## Colors & Appearance
	autoload -U colors && colors
	[ -f $XDG_CONFIG_HOME/dircolors/dircolor.solarized-dark ] && eval `dircolors $XDG_CONFIG_HOME/dircolors/dircolor.solarized-dark`
	# [ -f $XDG_CONFIG_HOME/dircolors/dircolor.gruvbox ] && eval `dircolors $XDG_CONFIG_HOME/dircolors/dircolor.gruvbox`

	# completion style with LS_COLORS or otherwise
	if [ -z "$LS_COLORS" ]; then
	  zstyle ':completion:*' list-colors 'di=34:ln=35:so=32:pi=33:ex=31:bd=34;46:cd=34;43:su=30;41:sg=30;46:tw=30;42:ow=30;43:'
	else
	  zstyle ':completion:*' list-colors ${(s.:.)LS_COLORS}
	fi
	zstyle ':completion:*:*:*:*:*' menu select

	man() {									# Colored man pages
		LESS_TERMCAP_mb=$'\e[01;31m' \
		LESS_TERMCAP_md=$'\e[01;31m' \
		LESS_TERMCAP_me=$'\e[0m' \
		LESS_TERMCAP_se=$'\e[0m' \
		LESS_TERMCAP_so=$'\e[01;44;33m' \
		LESS_TERMCAP_ue=$'\e[0m' \
		LESS_TERMCAP_us=$'\e[01;32m' \
		command man "$@"
	    }
    	# FSH
	source $ZDOTDIR/plugins/fsh/fast-syntax-highlighting.plugin.zsh 2>/dev/null
