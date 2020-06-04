## Path settings
	typeset -U PATH path
	export GOPATH="$HOME/.local/go"
	export CARGO_HOME="$HOME/.local/share/cargo"
	path=("$HOME/.local/share/npm/bin" "$HOME/programs_drivers/random_stuff/fzf/bin" "/usr/local/texlive/2019/bin/x86_64-linux" "$GOPATH/bin" "$CARGO_HOME/bin" "/home/francesco/.local/share/gem/bin" "$XDG_CONFIG_HOME/dotbare" "$path[@]")
# Adds `~/.local/bin` and all subdirs to $PATH
	export PATH="$PATH:$(du "$HOME/.local/bin" | cut -f2 | paste -sd ':')"

# Necessaary to only call compinit from local zshrc
	skip_global_compinit=1
