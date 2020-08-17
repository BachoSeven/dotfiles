" Return to last edit position when opening files
	au BufReadPost * if line("'\"") > 1 && line("'\"") <= line("$") | exe "normal! g'\"" | endif

" Runs a script that cleans out tex build files whenever I close out of a .tex file.
	au VimLeave *.tex !texclear %

" Automatically deletes all trailing whitespace and newlines at end of file on save.
	au BufWritePre * %s/\s\+$//e
	au BufWritepre * %s/\n\+\%$//e

" Recompile and run dwmblocks automatically
	au BufWritePost ~/.local/src/dwmblocks/config.h !cd ~/.local/src/dwmblocks;  sudo make install && { killall -q dwmblocks;setsid dwmblocks & }

" Run xrdb whenever Xdefaults or Xresources are updated.
	au BufWritePost *Xresources,*Xdefaults !xrdb %
	au BufWritePost *.config/subs !subs -g
