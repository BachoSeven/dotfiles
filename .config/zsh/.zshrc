export ZSH="/home/francesco/.oh-my-zsh"
zmodload zsh/zpty
ZSH_THEME="powerlevel10k/powerlevel10k"

 #Uncomment the following line to automatically update without prompting.
DISABLE_UPDATE_PROMPT="true"

# Uncomment the following line to change how often to auto-update (in days).
export UPDATE_ZSH_DAYS=5

# DISABLE_AUTO_TITLE="true"
ENABLE_CORRECTION="true"

DISABLE_UNTRACKED_FILES_DIRTY="true"

# Standard plugins can be found in ~/.oh-my-zsh/plugins/*
# Custom plugins may be added to ~/.oh-my-zsh/custom/plugins/
# Example format: plugins=(rails git textmate ruby lighthouse)
plugins=(git colored-man-pages zsh-syntax-highlighting vi-mode zsh-autosuggestions)

export LANG=en_US.UTF-8

#export FZF_DEFAULT_COMMAND='rg --hidden --no-ignore -l ""'
export FZF_CTRL_T_COMMAND='rg --files --no-ignore --hidden --follow --glob "!.git/*" --glob "!node_modules/*" --glob "!vendor/*" 2> /dev/null'

eval $(thefuck --alias)

source $ZSH/oh-my-zsh.sh
source ~/.oh-my-zsh/plugins/vi-mode/vi-mode.plugin.zsh

#spotify in vim
#function vimspo {
	#nvim -c 'execute "normal \\sp"'
#}

# Use lf to switch directories and bind it to ctrl-o
lfcd () {
    tmp="$(mktemp)"
    lf -last-dir-path="$tmp" "$@"
    if [ -f "$tmp" ]; then
        dir="$(cat "$tmp")"
        rm -f "$tmp"
        if [ -d "$dir" ]; then
            if [ "$dir" != "$(pwd)" ]; then
                cd "$dir"
            fi
        fi
    fi
}

#exports
export GOPATH=~/.local/go
export PATH=/snap/bin:/usr/local/texlive/2019/bin/x86_64-linux:$GOPATH/bin:~/.local/bin:$CARGO_HOME/bin:$PATH
export LD_PRELOAD=/usr/lib/x86_64-linux-gnu/libgtk3-nocsd.so.0
export BROWSER=brave-browser-beta

autoload -Uz bracketed-paste-magic
zle -N bracketed-paste bracketed-paste-magic
# This speeds up pasting w/ autosuggest (WORKS!!!)
# https://github.com/zsh-users/zsh-autosuggestions/issues/238
pasteinit() {
  OLD_SELF_INSERT=${${(s.:.)widgets[self-insert]}[2,3]}
  zle -N self-insert url-quote-magic # I wonder if you'd need `.url-quote-magic`?
}

pastefinish() {
  zle -N self-insert $OLD_SELF_INSERT
}
zstyle :bracketed-paste-magic paste-init pasteinit
zstyle :bracketed-paste-magic paste-finish pastefinish


#eval `dircolors ~/.dir_colors`

#autocomplete lfcd
fpath=(/home/francesco/.config/ $fpath)
zstyle ':completion:*' list-colors "${(@s.:.)LS_COLORS}"

autoload -Uz compinit
if [[ -n ${ZDOTDIR:-${HOME}}/$ZSH_COMPDUMP(#qN.mh+24) ]]; then
	compinit -d $ZSH_COMPDUMP;
else
	compinit -C;
fi;

if [[ -s '/etc/zsh_command_not_found' ]]; then
  source '/etc/zsh_command_not_found'
fi

if [ -f $GOPATH/src/github.com/zquestz/s/autocomplete/s-completion.bash ]; then
    source $GOPATH/src/github.com/zquestz/s/autocomplete/s-completion.bash
fi


[[ -f ~/.p10k.zsh ]] && source ~/.p10k.zsh

[ -f ~/.fzf.zsh ] && source ~/.fzf.zsh

[ -f "$HOME/.config/aliasrc" ] && source "$HOME/.config/aliasrc"

#bindkeys
bindkey -s '^o' 'lfcd\n'
#bindkey -s '^y' 'vimspo\n'
bindkey -s '^g' 'gotop\n'
bindkey -s '^v' 'nvim\n'
bindkey -s '^q' 'udg\n'
bindkey -s '^u' 'u\n'
bindkey -s '^h' 'htop\n'
bindkey -s '^f' 'fast\n'
bindkey -s '^n' 'neomutt\n'
bindkey -s "^[s" 'ncspot\n'

#
bindkey -M menuselect 'h' vi-backward-char
bindkey -M menuselect 'k' vi-up-line-or-history
bindkey -M menuselect 'l' vi-forward-char
bindkey -M menuselect 'j' vi-down-line-or-history


source ~/.oh-my-zsh/custom/plugins/zsh-autosuggestions/zsh-autosuggestions.zsh
source ~/.config/lf/lficons
source ~/.oh-my-zsh/plugins/zsh-syntax-highlighting/zsh-syntax-highlighting.zsh 2>/dev/null
source $(dirname $(gem which colorls))/tab_complete.sh

# To customize prompt, run `p10k configure` or edit ~/.config/zsh/.p10k.zsh.
[[ -f ~/.config/zsh/.p10k.zsh ]] && source ~/.config/zsh/.p10k.zsh
