# Setup fzf
# ---------
if [[ ! "$PATH" == */home/francesco/programs_drivers/fzf/bin* ]]; then
  export PATH="${PATH:+${PATH}:}/home/francesco/programs_drivers/fzf/bin"
fi

# Auto-completion
# ---------------
[[ $- == *i* ]] && source "/home/francesco/programs_drivers/fzf/shell/completion.zsh" 2> /dev/null

# Key bindings
# ------------
source "/home/francesco/programs_drivers/fzf/shell/key-bindings.zsh"
