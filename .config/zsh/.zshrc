#		  ______   ______   __  __   ______   ______
#		 /\___  \ /\  ___\ /\ \_\ \ /\  == \ /\  ___\
#		 \/_/  /__\ \___  \\ \  __ \\ \  __< \ \ \____
#	      _    /\_____\\/\_____\\ \_\ \_\\ \_\ \_\\ \_____\
#	     (_)   \/_____/ \/_____/ \/_/\/_/ \/_/ /_/ \/_____/

# Fix non-interactive
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
			elif [ -r "${ZDOTDIR:-$HOME/.zsh}/plugins/$plugin.plugin.zsh" ]; then
				source "${ZDOTDIR:-$HOME/.zsh}/plugins/$plugin.plugin.zsh" 2>/dev/null
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
			git -C "$plugin" pull 2>/dev/null || echo "Unable to upgrade."
		done
	}
	plugins=(
		init
		copyq
		custom_completions
		dotbare
		history
		less
		lf
		utils
		vi-mode
		fzf
		powerlevel10k
		p10k_theme
		fsh/fast-syntax-highlighting
	)
	zsh_load_plugins $plugins
	nyan # uwu
