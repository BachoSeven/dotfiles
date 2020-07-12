## Basic Settings
	setopt auto_cd          							# `dirname` is equivalent to `cd dirname`
	setopt extended_glob								# Enable globbing
	unsetopt flow_control								# Disable ctrl-s/ctrl-q to freeze/unfreeze terminal.
	unsetopt rm_star_silent 							# Always ask before rm folder/*
	setopt prompt_subst 								# Command substitution, parameter and arithmetic expansion in prompt.

# Remember recent directories
	autoload -Uz add-zsh-hook
	DIRSTACKFILE="${XDG_CACHE_HOME:-$HOME/.cache}/zsh/dirs"
	if [[ -f "$DIRSTACKFILE" ]] && (( ${#dirstack} == 0 )); then
		dirstack=("${(@f)"$(< "$DIRSTACKFILE")"}")
		[[ -d "${dirstack[1]}" ]] && cd -- "${dirstack[1]}"
	fi
	chpwd_dirstack() {
		print -l -- "$PWD" "${(u)dirstack[@]}" > "$DIRSTACKFILE"
	}
	add-zsh-hook -Uz chpwd chpwd_dirstack
	DIRSTACKSIZE='20'
	setopt auto_pushd
	setopt pushd_silent
	setopt pushd_to_home
	setopt pushd_ignore_dups
	setopt pushdminus

# This causes pasted URLs to be automatically escaped, without needing to disable globbing.
	autoload -Uz bracketed-paste-magic
	zle -N bracketed-paste bracketed-paste-magic
	autoload -Uz url-quote-magic
	zle -N self-insert url-quote-magic

# function to visualize dir stack
	function di () {
	  if [[ -n $1 ]]; then
	    dirs "$@"
	  else
	    dirs -v | head -10
	  fi
	}
	compdef _dirs di

## Colors & Appearance
	autoload -U colors && colors

## Autocompletion
	autoload -Uz compinit
	zmodload zsh/complist
	# Speed up completion loading at startup [ https://gist.github.com/ctechols/ca1035271ad134841284 ]
	() {
	  if [[ $# -gt 0 ]]; then
		compinit -d $XDG_CACHE_HOME/zsh/zcompdump
	  else
		compinit -C -d $XDG_CACHE_HOME/zsh/zcompdump
	  fi
	} ${ZDOTDIR:-$HOME}/.zcompdump(N.mh+24)

# Add .files to autocomplete
	_comp_options+=(globdots)							# Include hidden files.
# Basic autocomplete: menu-listing, case-insensitive and colored with LS_COLORS
	zstyle ':completion:*:*:*:*:*' menu select
	zstyle ':completion:*' matcher-list 'm:{a-z}={A-Z}'
	zstyle ':completion:*' list-colors ${(s.:.)LS_COLORS}
	zstyle ':completion:*' rehash true
