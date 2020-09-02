# Execute code in the background to not affect the current session
(
    setopt LOCAL_OPTIONS EXTENDED_GLOB
    autoload -U zrecompile

  # Compile zcompdump, if modified, to increase startup speed.
  zcompdump="${XDG_CACHE_HOME/zsh:-$HOME/.cache/zsh}/zcompdump"
  if [[ -s "$zcompdump" && (! -s "${zcompdump}.zwc" || "$zcompdump" -nt "${zcompdump}.zwc") ]]; then
    zcompile "$zcompdump"
  fi
	zrecompile -pq $ZDOTDIR/.zprofile
	zrecompile -pq $ZDOTDIR/.zshrc
) &!
