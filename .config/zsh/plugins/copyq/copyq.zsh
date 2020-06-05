# file: copyq.zsh

(( $+commands[copyq] )) || return 0

fpath=( $0:A:h $fpath )

# cq - smart alias for copyq
#
# Usage:
#
#  <command> | cq  - copies stdin to clipboard
#  cq <file>       - copies a file's contents to clipboard
#  cq | <command>  - pastes contents and pipes it to another process
#  cq > <file>     - paste contents to a file
#  cq command ...  - pass command and arguments to copyq
#
cq() {
	local mimetype

	if [[ -f "$1" ]]; then
		mimetype=$(file --dereference --brief --mime-type "$1")
		copyq write "$mimetype" - < "$1"
		copyq select 0
	elif [[ -n "$1" ]]; then
		copyq "$@"
	else
		if [[ -t 0 ]]; then
			copyq clipboard
		else
			copyq copy -
		fi
	fi
}
