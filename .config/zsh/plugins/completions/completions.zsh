# Initialise
	zmodload zsh/complist
# Speed up completion loading at startup [ https://gist.github.com/ctechols/ca1035271ad134841284 ]
	autoload -Uz compinit
	() {
	  if [[ $# -gt 0 ]]; then
		compinit -d "$XDG_CACHE_HOME/zsh/zcompdump"
	  else
		compinit -C -d "$XDG_CACHE_HOME/zsh/zcompdump"
	  fi
	} ${HOME}/zsh/zcompdump(N.mh+24)
# Include .files
	_comp_options+=(globdots)
# Basic autocomplete with: menu-listing, hyphen- and case-insensitivity, accepts abbreviations after . or _ or - (ie. f.b -> foo.bar), substring complete (ie. bar -> foobar), and colored with LS_COLORS.
	zstyle ':completion:*:*:*:*:*' menu select
	zstyle ':completion:*' matcher-list 'm:{[:lower:][:upper:]}={[:upper:][:lower:]}' 'r:|[._-]=* r:|=*' 'l:|=* r:|=*'
	zstyle ':completion:*' list-colors ${(s.:.)LS_COLORS}
	zstyle ':completion:*' rehash true
# Use caching to improve completion for commands related to packages or kernel modules
	zstyle ':completion::complete:*' use-cache on
	zstyle ':completion::complete:*' cache-path "$HOME/.cache/zsh"
# Fuzzy match mistyped completions.
	zstyle ':completion:*' _expand completer _complete _match _approximate
	zstyle ':completion:*' extra-verbose yes
	zstyle ':completion:*:descriptions' format '%B%d%b'
	zstyle ':completion:*:messages' format '%d'
	zstyle ':completion:*:warnings' format 'No matches for: %d'
	zstyle ':completion:*:corrections' format '%B%d (errors: %e)%b'
	zstyle ':completion:*' group-name '' # completion in distinct groups
# allow one error for every four characters typed in approximate completer
	zstyle ':completion:*:match:*' original only
	zstyle -e ':completion:*:approximate:*' max-errors 'reply=( $(( ($#PREFIX+$#SUFFIX)/4 )) numeric )'
# split options into groups
	zstyle ':completion:*' tag-order \
	    'options:-long:long\ options
	     options:-short:short\ options
	     options:-single-letter:single\ letter\ options'
	zstyle ':completion:*:options-long' ignored-patterns '[-+](|-|[^-]*)'
	zstyle ':completion:*:options-short' ignored-patterns '--*' '[-+]?'
	zstyle ':completion:*:options-single-letter' ignored-patterns '???*'
# insert all expansions for expand completer
	zstyle ':completion:*:expand:*' tag-order all-expansions
# Kill
	zstyle ':completion:*:*:*:*:processes' command 'ps -uf'
	zstyle ':completion:*:*:*:*:processes*' force-list always
	zstyle ':completion:*:processes-names'     command "ps -eo cmd= | sed 's:\([^ ]*\).*:\1:;s:\(/[^ ]*/\)::;/^\[/d'"
	zstyle ':completion:*:*:kill:*:processes' list-colors '=(#b) #([0-9]#) ([0-9a-z-]#)*=01;34=0=01'
	zstyle ':completion:*:*:kill:*' menu yes select
	zstyle ':completion:*:*:kill:*' force-list always
	zstyle ':completion:*:*:kill:*' insert-ids single
# offer completions for directories from all these groups
	zstyle ':completion:*::*:(cd|pushd):*' tag-order local-directories directory-stack path-directories
# never offer the parent directory (e.g.: cd ../<TAB>)
	zstyle ':completion:*:cd:*' ignore-parents parent pwd
# don't complete things which aren't available (very annoying)
	zstyle ':completion:*:*:-command-:*:*' tag-order 'functions:-non-comp *' functions
	zstyle ':completion:*:functions-non-comp' ignored-patterns '_*'
# complete sudo commands
	zstyle ':completion::complete:*' gain-privileges 1

# function to visualize dir stack
	di () {
	  if [[ -n $1 ]]; then
	    dirs "$@"
	  else
	    dirs -v | head -10
	  fi
	}
	compdef _dirs di
