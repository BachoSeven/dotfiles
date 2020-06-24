# XDG paths
	export XDG_CONFIG_HOME="$HOME/.config"
	export XDG_DATA_HOME="$HOME/.local/share"
	export XDG_CACHE_HOME="$HOME/.cache"
	export ZDOTDIR="$XDG_CONFIG_HOME/zsh"

## Path settings
	typeset -U PATH path
	path=("$path[@]")
# Adds `~/.local/bin` and all subdirs to $PATH
	export PATH="$PATH:$(du "$HOME/.local/bin" | cut -f2 | paste -sd ':')"

# Necessary to only call compinit from local zshrc
	skip_global_compinit=1
