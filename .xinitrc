#!/bin/sh

# xinitrc runs automatically when you run startx.

xset s 600
xss slock &
xrdb -merge -I$HOME ~/.Xresources
xscreensaver -no-splash &
dunst &				# dunst for notifications, which stays here as I do not want it in gnome-shell

# Fix Gnome Apps Slow  Start due to failing services
dbus-update-activation-environment --verbose --systemd DBUS_SESSION_BUS_ADDRESS DISPLAY
mpd & 				# start MPD as user when you log in
copyq &
xcompmgr &			# xcompmgr for transparency
[ -f "$HOME/.xprofile" ] && . "$HOME/.xprofile"

ssh-agent dwm
