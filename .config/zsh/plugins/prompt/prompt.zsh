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
    PS1=$'%B%F{blue} %F{blue}$schars[333]$schars[262]$schars[261]$schars[260]%(!.%F{red}.%F{yellow})%n%F{green}@%F{12}%m%F{blue}$schars[333]$schars[262]$schars[261]$schars[260] %F{magenta}%~\n%(?.%F{cyan}.%F{red}) %b%f'
  fi
	PS2='%B%F{magenta}•%b%f '
	setopt transientrprompt	# self-explanatory
	RPS1='%(?..%B%F{red}[%F{gray}%?%F{red}]%b )'
	if [ -n "$SSH_CLIENT" ] || [ -n "$SSH_TTY" ]; then
		RPS1+='%B%F{9}[%F{green}%M%F{9}]%f%b ' # Show hostname
	fi
	RPS1+='${vim_mode}'
	RPS2=$RPS1




## Basic git info using zsh's built-in vcs_info
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




## Elkowar's prompt
	# local __bright_cyan="#8ec07c"
	# local __bright_white="#ebdbb2"
	# local __bright_green="#b8bb26"

	# # Shortens path in sections of 3 characters
	# dir() {
		# local CUTOFF=3
		# local IFS=/
		# local my_path=($(print -P '%~'))
		# local p
		# for p in $my_path; do
			# printf %s "${s}${p[0,$CUTOFF]}"
			# local s=/
		# done
		# printf '%s\n' "${p:$CUTOFF}"
	# }


	# git_status() {
		# local BRANCH=$(git branch 2> /dev/null | sed -e '/^[^*]/d' -e 's/*\s*\(.*\)/\1/')

		# if [ ! -z $BRANCH ]; then
			# echo -n "(%F{$__bright_cyan}$BRANCH%F{$__bright_white}"
			# [ ! -z "$(git status --short)" ] && echo -n "*"
			# echo -n ")%f"
		# fi
	# }

	# function _my_prompt() {
		# local exit_code="$?"
		# echo -n "%F{$__bright_white}╭───"
		# echo -n "%F{$__bright_cyan}$USER"
		# echo -n "%F{$__bright_white} in"
		# echo -n "%F{$__bright_green} $(dir)"
		# echo -n "%F{$__bright_white} $(git_status)"
		# if [ ! "$exit_code" = 0 ]; then
			# echo -n "%F{red} REEEEEEEEEEE $exit_code"
		# fi
		# echo
		# # %3{stuff%} tell's zsh that the characters are printed as 3 chars wide
		# echo -n "%F{$__bright_white}%3{╰─λ%} "
	# }


	# setopt prompt_subst
	# autoload -U colors && colors
	# PS1='$(_my_prompt)'

## Other random git (r)prompt
	# # git prompt
	# setopt prompt_subst
	# autoload -Uz vcs_info
	# zstyle ':vcs_info:*' enable git
	# zstyle ':vcs_info:*' check-for-changes true
	# zstyle ':vcs_info:*' unstagedstr '*'
	# zstyle ':vcs_info:*' stagedstr '+'
	# zstyle ':vcs_info:git*' formats '%B%F{15}%F{9}%u%F{15}%b%F{10}%c%f%a'
	# precmd() { vcs_info }

	# RPROMPT='${vcs_info_msg_0_}'
