#!/usr/bin/env sh

case $1 in
    period-changed)
        if [ ! "$3" = "none" ]; then
            upper_first="$(tr '[:lower:]' '[:upper:]' <<< ${3:0:1})${3:1}"
            echo $upper_first | sed 's/time//;s/$/ time/' |
                /usr/local/bin/terminal-notifier -title "Redshift" -subtitle "Switching temps" \
                    -appIcon $(dirname "$0")/Redshift-icon.png
        fi
esac
