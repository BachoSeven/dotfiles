#!/bin/sh

# xinitrc runs automatically when you run startx.

xrdb -merge -I$HOME ~/.Xresources
xscreensaver -no-splash &
dunst &				# dunst for notifications, which stays here as I do not want it in gnome-shell

[ -f "$HOME/.xprofile" ] && . "$HOME/.xprofile"

ssh-agent dwm
