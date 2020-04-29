typeset -U PATH path
export GOPATH="$HOME/.local/go"
export CARGO_HOME=".local/share/cargo"
path=("$HOME/.local/bin" "$HOME/programs_drivers/fzf/bin" "/snap/bin/" "/usr/local/texlive/2019/bin/x86_64-linux" "$GOPATH/bin" "$CARGO_HOME/bin" "$path[@]")
export PATH
