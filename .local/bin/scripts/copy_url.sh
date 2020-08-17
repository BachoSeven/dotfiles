#!/bin/bash

# for w3m config: https://github.com/felipesaa/A-vim-like-firefox-like-configuration-for-w3m/tree/master/scripts_in_path
# You can enable both at the same time

# copy an url to clipboard
printf "%s" "$1" | xsel -b
# copy to tmux
#printf "%s" "$1" | tmux loadb -
