# Setup fzf
# ---------
if [[ ! "$PATH" == */home/francesco/programs_drivers/random_stuff/fzf/bin* ]]; then
  export PATH="${PATH:+${PATH}:}/home/francesco/programs_drivers/random_stuff/fzf/bin"
fi

# Auto-completion
# ---------------
[[ $- == *i* ]] && source "/home/francesco/programs_drivers/random_stuff/fzf/shell/completion.zsh" 2> /dev/null

# Key bindings
# ------------
source "/home/francesco/programs_drivers/random_stuff/fzf/shell/key-bindings.zsh"
