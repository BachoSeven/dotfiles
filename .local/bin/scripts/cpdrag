#!/bin/sh
files=$(dragon-drag-and-drop -t -x)

for file in $files
do
  path=${file#file://}
  name=$(basename "$path")
  cp "$path" "$(pwd)/$name"
done
