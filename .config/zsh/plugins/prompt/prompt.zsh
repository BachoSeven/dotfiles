# An alternative, lightweight prompt
	setopt transientrprompt	# self-explanatory
	PS1=$'%B%(!.%F{red}.%F{yellow})%n%F{green}@%F{blue}%m %F{magenta}%~\n%F{cyan}$%b%F{reset} '
	PS2='%B%F{yellow}•%b%F{reset} '
