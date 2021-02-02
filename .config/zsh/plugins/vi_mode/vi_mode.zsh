# Reduce timeout
	export KEYTIMEOUT=7
# Two vi mode indicators: changing cursor shape + RPROMPT indicator
## Cursor types:
# 1 -> Blinking block
# 2 -> Steady block ("█")
# 3 -> Blinking underline
# 4 -> Steady underline ("_")
# 5 -> Blinking beam
# 6 -> Steady beam ("|")
# 7 -> Blinking st cursor
# 8 -> Steady st cursor (snowman)
  cmdCursor='[1 q'
  insCursor='[5 q'
  repCursor='[3 q'
  visCursor='[2 q'
  vlnCursor='[2 q'
## Available colors: black, red, green, yellow, blue, magenta, cyan, and white.
## Available attributes:  bold,  faint,  standout, underline, blink, reverse, and conceal.
	vimIns="%{$fg_bold[blue]%}[INS]%{$reset_color%}"
	vimCmd="%{$fg_bold[green]%}[CMD]%{$reset_color%}"
	vimRep="%{$fg_bold[yellow]%}[REP]%{$reset_color%}"
	vimVis="%{$fg_bold[magenta]%}[VIS]%{$reset_color%}"
	vimVln="%{$fg_bold[cyan]%}[VLN]%{$reset_color%}"
	zle-keymap-select() { # This catches switching between insert, normal and replace modes
		local km=$KEYMAP
		[[ $km = main || $km = '' ]] && km=viins

		if [[ $km = vicmd ]]; then
			printf "\e%s" "$cmdCursor"
			vim_mode=${vimCmd}
		elif [[ $km = viins ]]; then
			if [[ $ZLE_STATE = *overwrite* ]]; then
				printf "\e%s" "$repCursor"
				vim_mode=${vimRep}
			else
				printf "\e%s" "$insCursor"
				vim_mode=${vimIns}
			fi
		fi

	  zle reset-prompt
	}; zle -N zle-keymap-select
	zle-line-init() { # initialise `vi insert` as keymap
		printf "\e%s" "$insCursor"
	}; zle -N zle-line-init
	vim_mode=${vimIns} # Initialise mode for RPS1
	zle-line-pre-redraw() {	# This takes care of visual and visual line modes
		[[ $KEYMAP != vicmd ]] && return
		local active=${REGION_ACTIVE:-0}
		local old="${vim_mode}"

		case $active in
			0)
				printf "\e%s" "$cmdCursor"
				vim_mode=${vimCmd} ;;
			1)
				printf "\e%s" "$visCursor"
				vim_mode=${vimVis} ;;
			2)
				printf "\e%s" "$vlnCursor"
				vim_mode=${vimVln} ;;
		esac
		if [[ $vim_mode != $old ]]; then
			zle reset-prompt
		fi
	}; zle -N zle-line-pre-redraw
	zle-line-finish() { # This fixes mode not updating on Return
		vim_mode=${vimIns}
	}; zle -N zle-line-finish
	# Fix a bug when you C-c in CMD mode and you'd be prompted with CMD mode indicator, while in fact you would be in INS mode
	# Fixed by catching SIGINT (C-c), set vim_mode to INS and then repropagate the SIGINT, so if anything else depends on it, we will not break it
	TRAPINT() {
		vim_mode=${vimIns}
		printf "\e%s" "$insCursor" # This is also needed, otherwise pressing Esc results in the deletion of one previous line.
		return $(( 128 + $1 ))
	}

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

# Edit line in insert mode with Ctrl+x+e:
	autoload edit-command-line; zle -N edit-command-line
	bindkey "^x^e" edit-command-line
# ... and in normal mode with a *magic* space
	bindkey -M vicmd ' ' edit-command-line

# Move by physical lines, just like gj/gk in vim :)
# Credits to http://leahneukirchen.org/dotfiles/.zshrc
	_physical_up_line()   { zle backward-char -n $COLUMNS }
	_physical_down_line() { zle forward-char  -n $COLUMNS }
	zle -N physical-up-line _physical_up_line
	zle -N physical-down-line _physical_down_line
	for m in visual viopp vicmd; do
		bindkey -M $m "gk" physical-up-line
		bindkey -M $m "gj" physical-down-line
	done
  # `kj` enters normal mode
  bindkey -M viins 'kj' vi-cmd-mode
# Completion menu movements
	bindkey -M menuselect 'h' vi-backward-char
	bindkey -M menuselect 'k' vi-up-line-or-history
	bindkey -M menuselect 'l' vi-forward-char
	bindkey -M menuselect 'j' vi-down-line-or-history
# Allow ctrl-p, ctrl-n for navigate history
	bindkey '^P' up-history
	bindkey '^N' down-history

# Classic movements
	bindkey -M viins "^a" beginning-of-line
	bindkey -M viins "^e" end-of-line
	bindkey -M viins '^u' kill-whole-line
	bindkey -M viins '^b' backward-char
	bindkey -M viins '^f' forward-char

# Better, incremental searching using vi mode(!)
	bindkey -M vicmd '?' history-incremental-search-backward
	bindkey -M vicmd '/' history-incremental-search-forward
	bindkey -M viins '^k' history-incremental-search-backward
	bindkey -M viins '^j' history-incremental-search-forward

# Fix broken keys
## ^w, backspace and ^h working even after returning from command mode (annoying)
	bindkey '^?' backward-delete-char
	bindkey '^h' backward-delete-char
  bindkey '^w' backward-kill-word
## Delete/Insert (replace mode)
	bindkey '^[[P' delete-char
	for m in visual viopp vicmd; do
	    bindkey -M $m '^[[4h' vi-replace
	done
## Pgup(also `gg`)/Pgdown
	bindkey '^[[5~' beginning-of-buffer-or-history
	bindkey '^[[6~' end-of-buffer-or-history
## Home/End
	bindkey '^[[H' beginning-of-line
	bindkey '^[[4~' end-of-line
