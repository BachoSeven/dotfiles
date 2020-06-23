" Lf
	let g:lf_command_override = 'lf -command "set hidden"'
	let g:lf_replace_netrw = 1 " open lf when vim open a directory

" Deoplete
	let g:deoplete#enable_at_startup = 1

" Fuzzy Finder
	let g:fzf_layout = { 'window': '10new' }
	nn <silent> <C-p> :FZF -m<cr>

" Better command history with q:
	command! CmdHist cal fzf#vim#command_history({'right': '40'})
	nn q: :CmdHist<CR>

" Change Colorscheme using fzf
	nn <silent> <Leader>sc :cal fzf#run({
	\   'source':
	\     map(split(globpath(&rtp, "colors/*.vim"), "\n"),
	\         "substitute(fnamemodify(v:val, ':t'), '\\..\\{-}$', '', '')"),
	\   'sink':    'colo',
	\   'options': '+m',
	\   'left':    30
	\ })<CR>

" Change buffers with fzf
	fu! s:buflist()
	  redir => ls
	  silent ls
	  redir END
	  return split(ls, '\n')
	endf

	fu! s:bufopen(e)
	  execute 'buffer' matchstr(a:e, '^[ 0-9]*')
	endf

	nn <silent> <Leader><Enter> :cal fzf#run({
	\   'source':  reverse(<sid>buflist()),
	\   'sink':    function('<sid>bufopen'),
	\   'options': '+m',
	\   'down':    len(<sid>buflist()) + 2
	\ })<CR>

" Vimtex Configuration
	let g:tex_flavor='latex'
	let g:vimtex_quickfix_latexlog = {'fix_paths':0}
	let g:vimtex_quickfix_mode=0
	let g:vimtex_compiler_progname = 'nvr'
	let g:vimtex_view_method='zathura'

" fzf integration for vimtex
	nn <localleader>lt :cal vimtex#fzf#run('cti', {'window': '50vnew'} )<cr>

" vimtex deoplete
	cal deoplete#custom#var('omni', 'input_patterns', {
		\ 'tex': g:vimtex#re#deoplete
		\})
" UndoTree
	let g:undotree_WindowLayout = 3
	nn <F5> :UndotreeToggle<cr>
	let g:undotree_SetFocusWhenToggle = 1

" Airline
	let g:airline_powerline_fonts = 1
	let g:airline#extensions#tabline#enabled = 1

" Goyo
	map <leader>g :Goyo \| se linebreak<CR>
	map <leader>G :Goyo \| se nolinebreak<CR>

	au BufRead,BufNewFile /tmp/neomutt* let g:goyo_width=80
	au BufRead,BufNewFile /tmp/neomutt* :Goyo | se linebreak
	au BufRead,BufNewFile /tmp/neomutt* map ZZ :Goyo\|x!<CR>
	au BufRead,BufNewFile /tmp/neomutt* map ZQ :Goyo\|q!<CR>
