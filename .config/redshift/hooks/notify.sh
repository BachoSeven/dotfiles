#!/bin/sh

case $1 in
	period-changed)
		exec notify-send "Redshift" "Goodbye $2, it is now $3.";;
esac
