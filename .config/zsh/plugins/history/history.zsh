## History file configuration
	HISTFILE="$ZDOTDIR/.zsh_history"
# Save last 4096 commands
	SAVEHIST=4096
# Hold last 6144 commands in memory
	HISTSIZE=6144
## History command configuration
	setopt sharehistory
	setopt hist_expire_dups_first # delete duplicates first when HISTFILE size exceeds HISTSIZE
	setopt hist_find_no_dups      # If duplicate lines have been saved, still show them only once.
	setopt hist_ignore_dups       # ignore duplicated commands history list
	setopt hist_ignore_space      # ignore commands that start with space
	setopt hist_reduce_blanks     # remove extra blanks from each command line being added to history

## CTRL-X CTRL-R
	fzf-history-widget-accept() {
	  fzf-history-widget
	  zle accept-line
	}
	zle     -N     fzf-history-widget-accept
	bindkey '^X^R' fzf-history-widget-accept
