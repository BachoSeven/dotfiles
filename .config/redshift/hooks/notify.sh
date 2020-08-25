#!/bin/sh

case $1 in
	period-changed)
		if [ "$3" = "night" ]; then
			exec notify-send "Redshift" "Yaawn, it's almost $3time."
		else
			exec notify-send "Redshift" "Good $3. the sun is shining!"
		fi
esac
