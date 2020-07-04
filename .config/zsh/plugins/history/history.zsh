## History file configuration
HISTSIZE=100000
SAVEHIST=10000
HISTFILE="${ZDOTDIR:-$HOME/.zsh}/.zsh_history"

## History command configuration
setopt hist_expire_dups_first # delete duplicates first when HISTFILE size exceeds HISTSIZE
setopt hist_ignore_dups       # ignore duplicated commands history list
setopt hist_ignore_space      # ignore commands that start with space

## CTRL-X CTRL-R
	fzf-history-widget-accept() {
	  fzf-history-widget
	  zle accept-line
	}
	zle     -N     fzf-history-widget-accept
	bindkey '^X^R' fzf-history-widget-accept
