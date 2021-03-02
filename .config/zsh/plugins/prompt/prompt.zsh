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
    PS1=$'%B%F{blue} %F{blue}$schars[333]$schars[262]$schars[261]$schars[260]%(!.%F{red}.%F{yellow})%n%F{green}@%F{blue}%m$schars[260]$schars[261]$schars[262]$schars[333] %F{magenta}%~\n%(?.%F{cyan}.%F{red}) %b%f'
  fi
	PS2='%B%F{magenta}•%b%f '
	setopt transientrprompt	# self-explanatory
	RPS1='%(?..%B%F{red}[%F{gray}%?%F{red}]%b )'
	if [ -n "$SSH_CLIENT" ] || [ -n "$SSH_TTY" ]; then
		RPS1+='%B%F{9}[%F{green}%M%F{9}]%f%b ' # Show hostname
	fi
	RPS1+='${vim_mode}'
	RPS2=$RPS1

	# autoload -Uz vcs_info
	# zstyle ':vcs_info:*' enable git svn
	# precmd() {
			# vcs_info
	# }
	# PS1+=' ${vcs_info_msg_0_}'
	# zstyle ':vcs_info:*' actionformats \
			# $'%F{4}\UE0A0%F{3} on %F{5}[%F{2}%b%F{3}|%F{1}%a%F{5}]%f '
	# zstyle ':vcs_info:*' formats       \
			# $'%F{4}\UE0A0%F{3} on %F{5}[%F{4}%b%F{5}]%f '
	# zstyle ':vcs_info:(sv[nk]|bzr):*' branchformat '%b%F{1}:%F{3}%r'
