## Useful variables for prompt
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

# Necessary for fadebar (from zsh's bigfade prompt)
	autoload -Uz prompt_special_chars
	prompt_special_chars
  if [ "$TERM" = "linux" ]; then # TTY prompt
    PS1="%B$colorbg{blue}$mytime$uncolorbg %F{green}[$username]%f %b%F{magenta}$curdir%f $rootorwhat "
  else
    PS1=$'%B%F{blue} %F{blue}$schars[333]$schars[262]$schars[261]$schars[260]%(!.%F{red}.%K{black}%F{yellow})%n%F{green}@%F{blue}%m$schars[260]$schars[261]$schars[262]$schars[333]%k %F{magenta}%~\n%(?.%F{cyan}.%F{red}) %f'
  fi
	PS2='%B%F{magenta}•%b%f '
	setopt transientrprompt	# self-explanatory
	if [[ -n $SSH_CONNECTION ]]; then
		RPS1=' %B%F{red}[%M]%f%b' # Show hostname
	fi
	RPS1+='${vim_mode}'
	RPS2=$RPS1
