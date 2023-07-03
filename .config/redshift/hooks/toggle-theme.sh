#!/bin/bash

case $1 in
	period-changed)
		if [ $3 == "daytime" ]; then
			thtog light
		elif [ $3 == "night" ]; then
			thtog dark
		fi
esac
