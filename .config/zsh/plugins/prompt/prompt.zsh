## An alternative, lightweight prompt
	local curdir="%~"
	local hostname="%M"
	local username="%n"
	local bold="%B"
	local unbold="%b"
	local standout="%S"
	local unstandout="%s"
	local underline="%U"
	local ununderline="%u"
	local colorfg="%F"
	local uncolorfg="%f"
	local colorbg="%K"
	local uncolorbg="%k"
	local mytime="%*"
	local mydate="%D"
	local line_tty="%y"
	local rootorwhat="%(!.#.»)"
	local return_status="%?"

	PS1=$'%B%(!.%F{red}.%F{yellow})%n%F{green}@%F{blue}%m %F{magenta}%~\n%F{cyan}$%b%F{reset} '
	# PS1="%B%F{blue}$mytime %F{green}[$username]%f %b$curdir $rootorwhat "
	PS2='%B%F{yellow}•%b%F{reset} '
	setopt transientrprompt	# self-explanatory
	RPROMPT='${vim_mode}'
	if [[ -n $SSH_CONNECTION ]]; then
		RPROMPT+=' %B%F{red}[$hostname]%f%b'
	fi
