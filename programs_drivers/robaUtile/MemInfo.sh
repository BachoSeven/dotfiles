#! /bin/bash
free -h|awk '/^Mem:/ {print $3 "/" $2}'
ps axch -o cmd:18,%mem,pid --sort -%mem|head

