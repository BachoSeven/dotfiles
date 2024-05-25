" Return to last edit position when opening files
	au BufReadPost * if line("'\"") > 1 && line("'\"") <= line("$") | exe "normal! g'\"" | endif

" Runs a script that cleans out tex build files whenever I close out of a .tex file.
	au VimLeave *.tex !texclear %

" Automatically deletes all trailing whitespace and newlines at end of file on save.
	au BufWritePre * %s/\s\+$//e
	au BufWritepre * %s/\n\+\%$//e

" Recompile and run dwmblocks automatically
  au BufWritePost ~/.local/src/dwmblocks/config.h !cd ~/.local/src/dwmblocks/; sudo make install && { killall -q dwmblocks;setsid -f dwmblocks }

" Run xrdb whenever Xdefaults or Xresources are updated.
  au BufRead,BufNewFile Xresources,Xdefaults,xresources,xdefaults set filetype=xdefaults
	au BufWritePost Xresources,Xdefaults,xresources,xdefaults !xrdb %
	au BufWritePost *yt/subs !subs -g

" Updates file when changed externally (if autoread is set)
	au FocusGained * :checktime

" Automatically loads folds when opening a file
augroup load_folds
  autocmd!
	" uncomment this to also save folds on exit
  " autocmd BufWinLeave * mkview
  autocmd BufWinEnter * silent! loadview
augroup END
