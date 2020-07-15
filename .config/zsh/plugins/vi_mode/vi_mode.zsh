# Reduce timeout
	export KEYTIMEOUT=1

	vim_ins_mode="%{$fg[cyan]%}[INS]%{$reset_color%}"
	vim_cmd_mode="%{$fg[green]%}[CMD]%{$reset_color%}"
	# This is the old way, now it is integrated with the cursor shape change
	# function zle-keymap-select {
	  # vim_mode="${${KEYMAP/vicmd/${vim_cmd_mode}}/(main|viins)/${vim_ins_mode}}"
	# }

	function zle-keymap-select {	# Change cursor shape for different vi modes + decent rprompt indicator
	  if [[ ${KEYMAP} == vicmd ]] ||
	     [[ $1 = 'block' ]]; then
	    echo -ne '\e[1 q'
	    vim_mode=${vim_cmd_mode}
	  elif [[ ${KEYMAP} == main ]] ||
	       [[ ${KEYMAP} == viins ]]; then
	    echo -ne '\e[5 q'
	    vim_mode=${vim_ins_mode}
	  fi
	  zle reset-prompt
	}
	zle -N zle-keymap-select
	# init `vi insert` as keymap
	zle-line-init() {
	    zle -K viins
	    echo -ne "\e[5 q"
	}
	zle -N zle-line-init

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
