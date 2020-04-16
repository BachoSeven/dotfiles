export ZSH="/home/francesco/.oh-my-zsh"
#zmodload zsh/zpty
ZSH_THEME="powerlevel10k/powerlevel10k"

#Uncomment the following line to automatically update without prompting.
#DISABLE_UPDATE_PROMPT="true"

# Uncomment the following line to change how often to auto-update (in days).
export UPDATE_ZSH_DAYS=5

DISABLE_AUTO_TITLE="true"
# ENABLE_CORRECTION="true"

DISABLE_UNTRACKED_FILES_DIRTY="true"

plugins=(git colored-man-pages zsh-syntax-highlighting vi-mode)
eval $(thefuck --alias)

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


source $ZSH/oh-my-zsh.sh

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

#if [ -f $GOPATH/src/github.com/zquestz/s/autocomplete/s-completion.bash ]; then
    #source $GOPATH/src/github.com/zquestz/s/autocomplete/s-completion.bash
#fi
[ -f "${XDG_CONFIG_HOME:-$HOME/.config}"/fzf/fzf.zsh ] && source "${XDG_CONFIG_HOME:-$HOME/.config}"/fzf/fzf.zsh
[ -f "$HOME/.config/aliasrc" ] && source "$HOME/.config/aliasrc"

	d='dirs -v | head -10'
	1='cd -'
	2='cd -2'
	3='cd -3'
	4='cd -4'
	5='cd -5'
	6='cd -6'
	7='cd -7'
	8='cd -8'
	9='cd -9'

# Directly Execute with CTRL-X CTRL-R
	fzf-history-widget-accept() {
	  fzf-history-widget
	  zle accept-line
	}
	zle     -N     fzf-history-widget-accept
	bindkey '^X^R' fzf-history-widget-accept

#bindkeys
	bindkey -s '^o' 'lfcd\n'
	#bindkey -s '^y' 'vimspo\n'
	bindkey -s '^g' 'gotop\n'
	bindkey -s '^v' 'nvim\n'
	bindkey -s '^q' 'udg\n'
	bindkey -s '^u' 'u\n'
	bindkey -s '^h' 'htop\n'
	bindkey -s '^f' 'fast\n'
	bindkey -s '^[n' 'neomutt\n'
	bindkey -s "^[s" 'ncspot\n'


	bindkey -M menuselect 'h' vi-backward-char
	bindkey -M menuselect 'k' vi-up-line-or-history
	bindkey -M menuselect 'l' vi-forward-char
	bindkey -M menuselect 'j' vi-down-line-or-history

#complete colorls, unneeded
#source $(dirname $(gem which colorls))/tab_complete.sh
[ "$TERM" != "st-256color" ] &&	export LF_ICONS="di=📁:\
fi=📃:\
tw=🤝:\
ow=📂:\
ln=⛓:\
or=❌:\
ex=🎯:\
*.txt=✍:\
*.mom=✍:\
*.me=✍:\
*.ms=✍:\
*.png=🖼:\
*.ico=🖼:\
*.jpg=📸:\
*.jpeg=📸:\
*.gif=🖼:\
*.svg=🗺:\
*.xcf=🖌:\
*.html=🌎:\
*.xml=📰:\
*.gpg=🔒:\
*.css=🎨:\
*.pdf=📚:\
*.djvu=📚:\
*.epub=📚:\
*.csv=📓:\
*.xlsx=📓:\
*.tex=📜:\
*.md=📘:\
*.r=📊:\
*.R=📊:\
*.rmd=📊:\
*.Rmd=📊:\
*.mp3=🎵:\
*.opus=🎵:\
*.ogg=🎵:\
*.m4a=🎵:\
*.flac=🎼:\
*.mkv=🎥:\
*.mp4=🎥:\
*.webm=🎥:\
*.mpeg=🎥:\
*.avi=🎥:\
*.zip=📦:\
*.rar=📦:\
*.7z=📦:\
*.tar.gz=📦:\
*.z64=🎮:\
*.v64=🎮:\
*.n64=🎮:\
*.1=ℹ:\
*.nfo=ℹ:\
*.info=ℹ:\
*.log=📙:\
*.iso=📀:\
*.img=📀:\
*.bib=🎓:\
*.ged=👪:\
*.part=💔:\
*.torrent=🔽:\
"
[[ -f ~/.config/zsh/.p10k.zsh ]] && source ~/.config/zsh/.p10k.zsh
