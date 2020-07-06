# The single, most glorious option
	bindkey -v

	export KEYTIMEOUT=1

# function zle-keymap-select {	# Change cursor shape for different vi modes.
	  # if [[ ${KEYMAP} == vicmd ]] ||
	     # [[ $1 = 'block' ]]; then
	    # echo -ne '\e[1 q'

	  # elif [[ ${KEYMAP} == main ]] ||
	       # [[ ${KEYMAP} == viins ]] ||
	       # [[ ${KEYMAP} = '' ]] ||
	       # [[ $1 = 'beam' ]]; then
	    # echo -ne '\e[5 q'
	  # fi
	# }
	# zle -N zle-keymap-select
	# # init `vi insert` as keymap
	# zle-line-init() {
	    # zle -K viins
	    # echo -ne "\e[5 q"
	# }
	# zle -N zle-line-init
	# echo -ne '\e[5 q' # Use beam shape cursor on startup.
	# preexec() { echo -ne '\e[5 q' ;} # Use beam shape cursor for each new prompt.

# Version control information && prompt
	# autoload -Uz vcs_info
	# precmd() { vcs_info }
	# zstyle ':vcs_info:git:*' formats '(%b)'
	# PROMPT='%B%{$fg[red]%}[%{$fg[yellow]%}%n%{$fg[green]%}@%{$fg[cyan]%}%~%{$fg[blue]%}${vcs_info_msg_0_}%{$fg[red]%}]%{$reset_color%}$ %b'

# Disable marking untracked files under VCS as dirty.
	DISABLE_UNTRACKED_FILES_DIRTY="true"

# ci", ci', ci`, di", etc
	autoload -U select-quoted
	zle -N select-quoted
	for m in visual viopp; do
	  for c in {a,i}{\',\",\`}; do
	    bindkey -M $m $c select-quoted
	  done
	done

# ci{, ci(, ci<, di{, etc
	autoload -U select-bracketed
	zle -N select-bracketed
	for m in visual viopp; do
	  for c in {a,i}${(s..)^:-'()[]{}<>bB'}; do
	    bindkey -M $m $c select-bracketed
	  done
	done

# Edit line in vim with ctrl-e:
	autoload edit-command-line; zle -N edit-command-line
	bindkey '^e' edit-command-line

# allow ctrl-p, ctrl-n for navigate history
	bindkey '^P' up-history
	bindkey '^N' down-history
