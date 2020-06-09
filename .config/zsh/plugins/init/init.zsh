## Basic Settings
	setopt AUTO_CD          							# `dirname` is equivalent to `cd dirname`
	setopt extended_glob								# Enable globbing
	stty stop undef									# Disable ctrl-s to freeze terminal.
	unsetopt RM_STAR_SILENT 							# Always ask before rm folder/*

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
