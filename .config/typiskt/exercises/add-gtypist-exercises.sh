#!/bin/bash

trap 'rm "$tmp"' EXIT

_source="$(readlink -f "${BASH_SOURCE[0]}")"
d="${_source%/*}"

url='https://github.com/inaimathi/gtypist-single-space/raw/master/gtypist.typ'
tmp=$d/gtypist.typ

curl -sLO "$url" > "$tmp" || exit

# in gtypist.typ , lines starting with S: or D: is
# the start of an exercies, each exercise ends with
# a blankline (get=0)
# *:NAME - NAME will be used as filename (C_R_C3_4)
# each exercise will get extracted to its own file
awk -v d=$d '
  match($0,/\s*\*:_(.+)/,ma)   {f=d "/" ma[1]}
  match($0,/^\s*[SD]:(.+)/,ma) {get=1; print ma[1] >> f }
  /^$/ {get=0}
  get == 1 && match($0,/\s*:(.+)/,ma) {print ma[1] >> f }

' "$tmp"

# for each exercise file, create subdirectory with
# if needed named after the exercise, move and rename
# the exercise file and print the content, one word/line
for f in "$d"/* ; do
  [[ ${f##*/} =~ ([^C])_R_L([0-9]+) ]] && {
    name=${BASH_REMATCH[1]}
    num=${BASH_REMATCH[2]}
    mkdir -p "$d/$name"
    tf=$d/$name/$num
    awk '{for (i=1;i<=NF;i++) {print $i}}' "$f" > "$tf"
    rm "$f"
  }

  # C lessons are named different..
  # C_R_C3_4 -> C/0304
  [[ ${f##*/} =~ C_R_C(.+)_(.+) ]] && {
    less=$(printf '%02d' "${BASH_REMATCH[1]}")
    part=$(printf '%02d' "${BASH_REMATCH[2]}")
    name=C
    mkdir -p "$d/$name"
    tf=$d/$name/${less}$part
    awk '{for (i=1;i<=NF;i++) {print $i}}' "$f" > "$tf"
    rm "$f"
  }
done

# fix names of C exercise files
for f in "$d/C"/* ; do mv "$f" "${f%/*}/$((i++))" ; done
