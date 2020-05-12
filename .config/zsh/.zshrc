#                  __
#                 /\ \
#    ____     ____\ \ \___   _ __   ___
#   /\_ ,`\  /',__\\ \  _ `\/\`'__\/'___\
# __\/_/  /_/\__, `\\ \ \ \ \ \ \//\ \__/
#/\_\ /\____\/\____/ \ \_\ \_\ \_\\ \____\
#\/_/ \/____/\/___/   \/_/\/_/\/_/ \/____/
#
#
# Powerlevel10k
	[ -f $ZDOTDIR/plugins/powerlevel10k/powerlevel10k.zsh-theme ] && source $ZDOTDIR/plugins/powerlevel10k/powerlevel10k.zsh-theme
	[[ -r "${XDG_CACHE_HOME:-$HOME/.cache}/p10k-instant-prompt-${(%):-%n}.zsh" ]] && source "${XDG_CACHE_HOME:-$HOME/.cache}/p10k-instant-prompt-${(%):-%n}.zsh"
	[ -f $ZDOTDIR/.p10k.zsh ] && source $ZDOTDIR/.p10k.zsh

# Basic Settings
	setopt AUTO_CD          	# `dirname` is equivalent to `cd dirname`
	stty stop undef			# Disable ctrl-s to freeze terminal.
	unsetopt RM_STAR_SILENT 	# Always ask before rm folder/*
	[ -f "$HOME/.config/aliasrc" ] && source "$HOME/.config/aliasrc"

# Plugins
	[ -f $ZDOTDIR/plugins/fzf/fzf.zsh ] && source $ZDOTDIR/plugins/fzf/fzf.zsh
	[ -f $ZDOTDIR/plugins/history/history.zsh ] && source $ZDOTDIR/plugins/history/history.zsh
	[ -f $ZDOTDIR/plugins/lf/lf.zsh ] && source $ZDOTDIR/plugins/lf/lf.zsh 2>/dev/null
	eval $(thefuck --alias)

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
	[ -f $ZDOTDIR/plugins/vi-mode/vi-mode.zsh ] && source $ZDOTDIR/plugins/vi-mode/vi-mode.zsh

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

source $ZDOTDIR/plugins/fsh/fast-syntax-highlighting.plugin.zsh 2>/dev/null
