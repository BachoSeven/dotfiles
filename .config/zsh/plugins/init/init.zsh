## Basic Options
	setopt complete_in_word        				# Complete from both ends of a word.
	setopt always_to_end           				# Move cursor to the end of a completed word.
	setopt auto_cd          				# `dirname` is equivalent to `cd dirname`
	unsetopt flow_control					# Disable ctrl-s/ctrl-q to freeze/unfreeze terminal.
	setopt extended_glob					# Enable globbing
	setopt short_loops             				# 'for i in *; echo $i;' instead of 'for i in *; do echo $i; done'
	unsetopt rm_star_silent 				# Always ask before rm folder/*
	setopt prompt_subst 					# Command substitution, parameter and arithmetic expansion in prompt.
	setopt interactive_comments				# Allow comments even in interactive shell
	setopt magicequalsubst					# ~ substitution and tab completion after a = (for --x=filename args)
  unsetopt prompt_sp

# Do not consider "/" a word character.  One benefit of this is that
# when hitting ctrl-w in insert mode (which deletes the word before the
# cursor) just before a filesystem path, it only removes the last item
# of the path and not the entire thing. Credits: https://github.com/paradigm
	export WORDCHARS=${WORDCHARS//\/}

# Hooks
	autoload -Uz add-zsh-hook
## Remember recent directories
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
	setopt autopushd
	setopt pushd_silent
	setopt pushd_to_home
	setopt pushd_ignore_dups
	setopt pushdminus
# Change title to command name
  function title {
    emulate -L zsh -o promptsubst -o extendedglob
		zmodload -e zsh/terminfo || zmodload -i zsh/terminfo
		if [[ -n ${terminfo[fsl]} && -n ${terminfo[tsl]} ]]; then
			echoti tsl; print -Pn "$1"; echoti fsl
		fi
  }
  function title-precmd {
    emulate -L zsh
    local TIDLE="%41<..<%~%<<"
    title $TIDLE
  }
  function title-preexec {
    emulate -L zsh -o extendedglob
    local CMD=${1[(wr)^(*=*|sudo|ssh|-*)]:gs/%/%%}
    local LINE="${2:gs/%/%%}"
    title '$CMD' '%100>...>$LINE%<<'
  }
  add-zsh-hook precmd  title-precmd
  add-zsh-hook preexec title-preexec

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
