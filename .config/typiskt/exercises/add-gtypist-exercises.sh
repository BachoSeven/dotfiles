#!/bin/bash

trap 'rm "$tmp"' EXIT

_source="$(readlink -f "${BASH_SOURCE[0]}")"
d="${_source%/*}"

url='https://github.com/inaimathi/gtypist-single-space/raw/master/gtypist.typ'
tmp=$(mktemp)

mkdir -p "${tmp%/*}"
wget -qO "$tmp" "$url" || exit

awk -v d=$d '
  match($0,/\s*\*:_(.+)/,ma)   {f=d "/" ma[1]}
  match($0,/^\s*[SD]:(.+)/,ma) {get=1; print ma[1] >> f }
  /^$/ {get=0}
  get == 1 && match($0,/\s*:(.+)/,ma) {print ma[1] >> f }

' "$tmp"

declare -i c

for f in "$d"/* ; do
  [[ ${f##*/} =~ ([^C])_R_L([0-9]+) ]] && {
    name=${BASH_REMATCH[1]}
    num=${BASH_REMATCH[2]}
    mkdir -p "$d/$name"
    tf=$d/$name/$num
    awk -v f=$tf '{for (i=1;i<=NF;i++) {print $i >> f}}' "$f"
    rm "$f"
  }

  [[ ${f##*/} =~ C_R_.+ ]] && {
    name=C
    num=$((c++))
    mkdir -p "$d/$name"
    tf=$d/$name/$num
    awk -v f=$tf '{for (i=1;i<=NF;i++) {print $i >> f}}' "$f"
    rm "$f"
  }
done
