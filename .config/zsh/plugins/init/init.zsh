## Basic Settings
	setopt complete_in_word        				# Complete from both ends of a word.
	setopt always_to_end           				# Move cursor to the end of a completed word.
	setopt auto_cd          				# `dirname` is equivalent to `cd dirname`
	setopt extended_glob					# Enable globbing
	unsetopt flow_control					# Disable ctrl-s/ctrl-q to freeze/unfreeze terminal.
	setopt short_loops             				# 'for i in *; echo $i;' instead of 'for i in *; do echo $i; done'
	unsetopt rm_star_silent 				# Always ask before rm folder/*
	setopt prompt_subst 					# Command substitution, parameter and arithmetic expansion in prompt.
	setopt INTERACTIVE_COMMENTS				# Allow comments even in interactive shell

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
	zstyle ':urlglobber' url-other-schema ftp git gopher http https magnet
	zstyle ':url-quote-magic:*' url-metas '*?[]^(|)~#='  # dropped { }
	zle -N self-insert url-quote-magic

# Allow to recover from C-c or failed history expansion (does not go in history)
# 26may2012  +chris+
# TODO: check whether this is working or not
	_recover_line_or_else() {
	  if [[ -z $BUFFER && $CONTEXT = start && $zsh_eval_context = shfunc
		&& -n $ZLE_LINE_ABORTED
		&& $ZLE_LINE_ABORTED != $history[$((HISTCMD-1))] ]]; then
	    LBUFFER+=$ZLE_LINE_ABORTED
	    unset ZLE_LINE_ABORTED
	  else
	    zle .$WIDGET
	  fi
	}
	zle -N up-line-or-history _recover_line_or_else
	_zle_line_finish() { ZLE_LINE_ABORTED=$BUFFER }
	zle -N zle-line-finish _zle_line_finish

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

## Misc
# Zsh's Builtin Ncurses Tetris game :)
	autoload -Uz tetriscurses

## Autocompletion
	zmodload zsh/complist
# Speed up completion loading at startup [ https://gist.github.com/ctechols/ca1035271ad134841284 ]
	autoload -Uz compinit
	() {
	  if [[ $# -gt 0 ]]; then
		compinit -d $XDG_CACHE_HOME/zsh/zcompdump
	  else
		compinit -C -d $XDG_CACHE_HOME/zsh/zcompdump
	  fi
	} ${HOME}/zsh/zcompdump(N.mh+24)
# Add .files to autocomplete
	_comp_options+=(globdots)				# Include hidden files.
# Basic autocomplete: menu-listing, hyphen- and case-insensitive, and colored with LS_COLORS
	zstyle ':completion:*:*:*:*:*' menu select
	zstyle ':completion:*' matcher-list 'm:{a-zA-Z}={A-Za-z}' 'r:|[._-]=* r:|=*' 'l:|=* r:|=*'
	zstyle ':completion:*' list-colors ${(s.:.)LS_COLORS}
	zstyle ':completion:*' rehash true
# Use caching to improve completion for commands related to packages or kernel modules
	zstyle ':completion::complete:*' use-cache on
	zstyle ':completion::complete:*' cache-path "$HOME/.cache/zsh"
# Fuzzy match mistyped completions.
	zstyle ':completion:*' _expand completer _complete _match _approximate
	zstyle ':completion:*' extra-verbose yes
	zstyle ':completion:*:descriptions' format '%B%d%b'
	zstyle ':completion:*:messages' format '%d'
	zstyle ':completion:*:warnings' format 'No matches for: %d'
	zstyle ':completion:*:corrections' format '%B%d (errors: %e)%b'
	zstyle ':completion:*' group-name '' # completion in distinct groups
# allow one error for every four characters typed in approximate completer
	zstyle ':completion:*:match:*' original only
	zstyle -e ':completion:*:approximate:*' max-errors 'reply=( $(( ($#PREFIX+$#SUFFIX)/4 )) numeric )'
# split options into groups
	zstyle ':completion:*' tag-order \
	    'options:-long:long\ options
	     options:-short:short\ options
	     options:-single-letter:single\ letter\ options'
	zstyle ':completion:*:options-long' ignored-patterns '[-+](|-|[^-]*)'
	zstyle ':completion:*:options-short' ignored-patterns '--*' '[-+]?'
	zstyle ':completion:*:options-single-letter' ignored-patterns '???*'
# insert all expansions for expand completer
	zstyle ':completion:*:expand:*' tag-order all-expansions
# Kill
	zstyle ':completion:*:*:*:*:processes' command 'ps -uf'
	zstyle ':completion:*:*:*:*:processes*' force-list always
	zstyle ':completion:*:processes-names'     command "ps -eo cmd= | sed 's:\([^ ]*\).*:\1:;s:\(/[^ ]*/\)::;/^\[/d'"
	zstyle ':completion:*:*:kill:*:processes' list-colors '=(#b) #([0-9]#) ([0-9a-z-]#)*=01;34=0=01'
	zstyle ':completion:*:*:kill:*' menu yes select
	zstyle ':completion:*:*:kill:*' force-list always
	zstyle ':completion:*:*:kill:*' insert-ids single
# offer completions for directories from all these groups
	zstyle ':completion:*::*:(cd|pushd):*' tag-order local-directories directory-stack path-directories
# never offer the parent directory (e.g.: cd ../<TAB>)
	zstyle ':completion:*:cd:*' ignore-parents parent pwd
# don't complete things which aren't available (very annoying)
	zstyle ':completion:*:*:-command-:*:*' tag-order 'functions:-non-comp *' functions
	zstyle ':completion:*:functions-non-comp' ignored-patterns '_*'
