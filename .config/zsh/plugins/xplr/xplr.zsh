xcd() {
  pth="$(xplr)"
  if [[ "$pth" != "$PWD" ]]; then
    if [[ -d "$pth" ]]; then
      cd "$pth"
    elif [[ -f "$pth" ]]; then
      cd "$(dirname "$pth")"
    fi
  fi
}
