source "/usr/share/fzf/key-bindings.zsh"

fzf-locate-widget() {
 local selected
 if selected=$(locate $(pwd) | fzf +s -q "$LBUFFER"); then
 LBUFFER=$selected
 fi
 zle redisplay
}
zle -N fzf-locate-widget
bindkey '\ei' fzf-locate-widget
