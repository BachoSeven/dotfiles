#		  ______   ______   __  __   ______   ______
#		 /\___  \ /\  ___\ /\ \_\ \ /\  == \ /\  ___\
#		 \/_/  /__\ \___  \\ \  __ \\ \  __< \ \ \____
#	      _    /\_____\\/\_____\\ \_\ \_\\ \_\ \_\\ \_____\
#	     (_)   \/_____/ \/_____/ \/_/\/_/ \/_/ /_/ \/_____/

# Fix non-interactive
	 if [ -z "$PS1" ]; then
		     exit
	 fi

## Powerlevel10k
	[ -f $ZDOTDIR/plugins/powerlevel10k/powerlevel10k.zsh-theme ] && source $ZDOTDIR/plugins/powerlevel10k/powerlevel10k.zsh-theme 2>/dev/null
	[[ -r "${XDG_CACHE_HOME:-$HOME/.cache}/p10k-instant-prompt-${(%):-%n}.zsh" ]] && source "${XDG_CACHE_HOME:-$HOME/.cache}/p10k-instant-prompt-${(%):-%n}.zsh" 2>/dev/null

## Basic Settings
	setopt AUTO_CD          							# `dirname` is equivalent to `cd dirname`
	setopt extended_glob								# Enable globbing
	stty stop undef									# Disable ctrl-s to freeze terminal.
	unsetopt RM_STAR_SILENT 							# Always ask before rm folder/*

## Autocompletion
	fpath=($ZDOTDIR/completions $fpath)
	autoload -U compinit
	zmodload zsh/complist
	compinit
	_comp_options+=(globdots)		# Include hidden files.

## Plugins (who needs a plugin manager?)
	[ -f $ZDOTDIR/plugins/fzf/fzf.zsh ] && source $ZDOTDIR/plugins/fzf/fzf.zsh 2>/dev/null
	[ -f $ZDOTDIR/plugins/history/history.zsh ] && source $ZDOTDIR/plugins/history/history.zsh 2>/dev/null
	[ -f $ZDOTDIR/plugins/lf/lf.zsh ] && source $ZDOTDIR/plugins/lf/lf.zsh 2>/dev/null
	[ -f $ZDOTDIR/plugins/vi-mode/vi-mode.zsh ] && source $ZDOTDIR/plugins/vi-mode/vi-mode.zsh 2>/dev/null # Vi-mode
	[ -f $ZDOTDIR/plugins/less/less.zsh ] && source $ZDOTDIR/plugins/less/less.zsh 2>/dev/null
	[ -f $ZDOTDIR/plugins/utils/utils.zsh ] && source $ZDOTDIR/plugins/utils/utils.zsh 2>/dev/null
	eval $(thefuck --alias f)

## Bind keys
	alias -- -='cd -'								# Cd into last dir
	bindkey -s '^o' 'lfcd\n'
	bindkey -s '^g' 'ytop\n'
	bindkey -s '^v' 'nvim\n'
	bindkey -s '^u' 'u\n'
	bindkey -s '^f' 'speedtest-cli\n'
	bindkey -s '^[n' 'neomutt\n'
	bindkey -s '^a' 'bc -l\n'
	bindkey -s '^s' 'udg\n'

## Colors & Appearance
	autoload -U colors && colors
# Basic autocomplete; case-insensitive and colored (LS_COLORS)
	zstyle ':completion:*:*:*:*:*' menu select
	zstyle ':completion:*' matcher-list 'm:{a-z}={A-Z}'
	zstyle ':completion:*' list-colors ${(s.:.)LS_COLORS}
	[ -f $ZDOTDIR/.p10k.zsh ] && source $ZDOTDIR/.p10k.zsh 2>/dev/null		# this also should be last
	source $ZDOTDIR/plugins/fsh/fast-syntax-highlighting.plugin.zsh 2>/dev/null	# FastSyntaxHighlighting
