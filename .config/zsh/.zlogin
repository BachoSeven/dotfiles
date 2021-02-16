# Execute code in the background to not affect the current session
(
	autoload -U zrecompile

	zrecompile -pq $ZDOTDIR/.zprofile
	zrecompile -pq $ZDOTDIR/.zshrc
) &!
