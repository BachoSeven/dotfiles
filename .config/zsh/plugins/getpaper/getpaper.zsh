# getpaper — fetch + AI-file papers into ~/math
#   Usage: getpaper [link|doi|arxiv-id|"description"] [--kind book|article|thesis|read]
#                   [--folder 'Topic Name'] [--no-ai] [--list]
#   Setup:  getpaper aa-login   (Anna's Archive secret key, stored locally)

(( $+commands[getpaper] )) || {
	print -u2 "getpaper: ~/.local/bin/scripts/getpaper not found" >&2
	return 1
}

# start the local AI (llama-server) on demand, if not already running
function getpaper-ai() {
	command -v llama-server >/dev/null || { print -u2 "getpaper: llama-server not installed"; return 1 }
	if ! systemctl --user is-active --quiet llama-server; then
		print "starting llama-server…"
		systemctl --user start llama-server
		sleep 2
	fi
	local models
	models=$(curl -sf --max-time 3 http://localhost:11434/v1/models 2>/dev/null \
		| python3 -c "import sys,json; print('models:', ', '.join(m['id'] for m in json.load(sys.stdin).get('data',[])))" 2>/dev/null)
	if [[ -n $models ]]; then
		print "llama-server (port 11434) — $models"
	else
		print "llama-server running but no model loaded yet."
		print "fetch it on a good connection:  ~/.local/bin/llama-fetch-model"
	fi
}

function getpaper() {
	local bin=~/.local/bin/scripts/getpaper
	[[ -x $bin ]] || { print -u2 "getpaper: $bin missing"; return 1 }
	"$bin" "$@"
}

# completions: subcommands + existing topic folders
_getpaper() {
	local -a cmds
	cmds=("aa-login:log in to Anna's Archive (stores session locally)"
	      "--list:show the math/ folder tree"
	      "--no-ai:skip the local LLM"
	      "--kind:article|book|thesis|read"
	      "--folder:'force a target folder'")
	_arguments \
		"1:paper link, DOI, arXiv ID, or description:__getpaper_paper" \
		"--kind=[document kind]:kind:(article book thesis read)" \
		"--folder=[target folder]:folder:__getpaper_folders" \
		"--no-ai[skip the LLM]" \
		"--list[show folder tree]" \
		"*: :compadd -a cmds"
}

__getpaper_folders() {
	local -a folders
	folders=(
		${(@f)"$(find "${GETPAPER_ROOT:-$HOME/math}/stuff" -maxdepth 2 -type d 2>/dev/null \
			| sed -E 's|.*/stuff/||' | grep -v '^$')"}
	)
	_describe -t folders "folder" folders
}

__getpaper_paper() {
	# last words typed: treat as free text
	_describe -t anything "free text" '((desc:"any description of the paper"))'
}

compdef _getpaper getpaper
