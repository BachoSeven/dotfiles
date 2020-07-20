#!/bin/sh

files=$(dragon-drag-and-drop -t -x)

for file in $files
do
  path=${file#file://}
  name=$(basename "$path")
  mv "$path" "$(pwd)/$name"
done
