## Basic Options
	setopt complete_in_word        				# Complete from both ends of a word.
	setopt always_to_end           				# Move cursor to the end of a completed word.
	setopt auto_cd          				# `dirname` is equivalent to `cd dirname`
	setopt extended_glob					# Enable globbing
	unsetopt flow_control					# Disable ctrl-s/ctrl-q to freeze/unfreeze terminal.
	setopt short_loops             				# 'for i in *; echo $i;' instead of 'for i in *; do echo $i; done'
	unsetopt rm_star_silent 				# Always ask before rm folder/*
	setopt prompt_subst 					# Command substitution, parameter and arithmetic expansion in prompt.
	setopt INTERACTIVE_COMMENTS				# Allow comments even in interactive shell
	setopt magicequalsubst					# ~ substitution and tab completion after a = (for --x=filename args)

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
	DIRSTACKSIZE='333'
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

## Colors & Appearance
	autoload -U colors && colors

## Misc
# Zsh's Builtin Ncurses Tetris game :)
	autoload -Uz tetriscurses
