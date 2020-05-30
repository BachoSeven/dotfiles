#!/bin/sh

# xscreensaver -no-splash & # replaced by slock atm
xset s 600
xss slock &
xrdb -merge -I$HOME ~/.Xresources
dunst &				# dunst for notifications, which stays here as I do not want it in gnome-shell

mpd & 				# start MPD as user when you log in
# Fix Gnome Apps Slow  Start due to failing services
dbus-update-activation-environment --verbose --systemd DBUS_SESSION_BUS_ADDRESS DISPLAY
copyq &
xcompmgr &			# xcompmgr for transparency
[ -f "$HOME/.xprofile" ] && . "$HOME/.xprofile"

ssh-agent dwm
