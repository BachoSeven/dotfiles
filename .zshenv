# Ensure that a non-login, non-interactive shell has a defined environment.
	if [[ "$SHLVL" -eq 1 && ! -o LOGIN && -s "${ZDOTDIR:-$HOME/.config/zsh}/.zprofile" ]]; then
		source "${ZDOTDIR:-$HOME/.config/zsh}/.zprofile"
	fi

# XDG paths
	export XDG_CONFIG_HOME="$HOME/.config"
	export XDG_DATA_HOME="$HOME/.local/share"
	export XDG_CACHE_HOME="$HOME/.cache"
	export XDG_DATA_DIRS="$XDG_DATA_HOME:/usr/share:/usr/local/share"
	export ZDOTDIR="$XDG_CONFIG_HOME/zsh"

# Path settings
## Eliminates duplicates in *paths
	typeset -gU path cdpath fpath manpath
	path=("$path[@]")
## Adds `~/.local/bin` and all subdirs to $PATH
	export PATH="$PATH:${$(find ~/.local/bin -type d -printf %p:)%%:}"

## Necessary to only call compinit from local zshrc
	skip_global_compinit=1
