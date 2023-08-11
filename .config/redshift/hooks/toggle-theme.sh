#!/bin/bash

case $1 in
	period-changed)
		if [ $3 == "daytime" ]; then
			switch-theme light
		elif [ $3 == "night" ]; then
			switch-theme dark
		fi
esac
