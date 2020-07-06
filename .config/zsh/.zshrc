#		  ______   ______   __  __   ______   ______
#		 /\___  \ /\  ___\ /\ \_\ \ /\  == \ /\  ___\
#		 \/_/  /__\ \___  \\ \  __ \\ \  __< \ \ \____
#	      _    /\_____\\/\_____\\ \_\ \_\\ \_\ \_\\ \_____\
#	     (_)   \/_____/ \/_____/ \/_/\/_/ \/_/ /_/ \/_____/

# Exit if non-interactive
	 if [ -z "$PS1" ]; then
		     exit
	 fi

## Plugins
	function zsh_load_plugins() {
		local plugin
		for plugin ($@); do
			if [ -r "${ZDOTDIR:-$HOME/.zsh}/plugins/$plugin/$plugin.zsh" ]; then
				source "${ZDOTDIR:-$HOME/.zsh}/plugins/$plugin/$plugin.zsh" 2>/dev/null
			elif [ -r "${ZDOTDIR:-$HOME/.zsh}/plugins/$plugin/$plugin.plugin.zsh" ]; then
				source "${ZDOTDIR:-$HOME/.zsh}/plugins/$plugin/$plugin.plugin.zsh" 2>/dev/null
			elif [ -r "${ZDOTDIR:-$HOME/.zsh}/plugins/$plugin/$plugin.zsh-theme" ]; then
				source "${ZDOTDIR:-$HOME/.zsh}/plugins/$plugin/$plugin.zsh-theme" 2>/dev/null
			else
				echo "$funcstack[1]: Unable to load '$plugin'." >&2
			fi
		done
	}
	function zsh_update_plugins() {
		local plugin
		for plugin (${ZDOTDIR:-$HOME/.zsh}/plugins/*(N/)); do
			git -C "$plugin" rev-parse --is-inside-work-tree >/dev/null 2>&1 || continue
			printf '%s: ' "$plugin:t"
			git -C "$plugin" remote -v | grep -q upstream && { git -C "$plugin" fetch upstream || printf '%s: Could not fetch upstream...\n' "$plugin:t" }
			git -C "$plugin" pull 2>/dev/null || echo "Unable to upgrade."
		done
	}
	plugins=(
		copyq
		custom_completions
		init # 0.17 [autocompletion]
		history
		lf
		utils
		vi_mode
		fzf
		p10k_theme # 0.1
		fast-syntax-highlighting # 0.12
	)
	zsh_load_plugins $plugins

# pure theme # 0.1
	# PURE_GIT_UNTRACKED_DIRTY=0
	# autoload promptinit; promptinit && prompt pure
