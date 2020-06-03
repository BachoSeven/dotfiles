#!/bin/sh

# Fix Gnome Apps Slow  Start due to failing services
dbus-update-activation-environment --verbose --systemd DBUS_SESSION_BUS_ADDRESS DISPLAY

# xscreensaver -no-splash & # replaced by slock atm
xset s 600
xss slock &
xrdb -merge -I$HOME ~/.Xresources

mpd & 				# start MPD as user when you log in
copyq &
xcompmgr &			# xcompmgr for transparency
[ -f "$HOME/.xprofile" ] && . "$HOME/.xprofile"

ssh-agent dwm
