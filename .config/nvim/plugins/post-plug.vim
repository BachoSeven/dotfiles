" Firenvim
	if exists('g:started_by_firenvim')
		au BufEnter github.com_*.txt se filetype=markdown
		nnoremap <C-z> :call firenvim#hide_frame()<CR>
		let g:firenvim_config = {
		    \ 'globalSettings': {
			\ 'alt': 'all',
		    \  },
		    \ 'localSettings': {
			\ '.*': {
			    \ 'cmdline': 'firenvim',
			    \ 'priority': 0,
			    \ 'selector': 'textarea',
			    \ 'takeover': 'always',
			\ },
		    \ }
		\ }
	endif

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
	nn <silent> <leader>sc :cal fzf#run({
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

" " Vimtex Configuration
	" let g:tex_flavor='latex'
	" let g:vimtex_quickfix_latexlog = {'fix_paths':0}
	" let g:vimtex_quickfix_mode=0
	" let g:vimtex_compiler_progname = 'nvr'
	" let g:vimtex_view_method='zathura'

" " fzf integration for vimtex
	" nn <localleader>lt :cal vimtex#fzf#run('cti', {'window': '50vnew'} )<cr>

" " vimtex deoplete
	" cal deoplete#custom#var('omni', 'input_patterns', {
		" \ 'tex': g:vimtex#re#deoplete
		" \})

" UndoTree
	let g:undotree_WindowLayout = 3
	nn <F5> :UndotreeToggle<cr>
	let g:undotree_SetFocusWhenToggle = 1

" Airline
	let g:airline_powerline_fonts = 1
	se noshowmode " Don't display mode in command line (airline already shows it)

" Limelight
	" Color name (:help cterm-colors) or ANSI code
	let g:limelight_conceal_ctermfg = '#a89984'

	" Color name (:help gui-colors) or RGB color
	let g:limelight_conceal_guifg = '#928374'

	" " Default: 0.5
	let g:limelight_default_coefficient = 0.6

	" " Beginning/end of paragraph
	" "   When there's no empty line between the paragraphs
	" "   and each paragraph starts with indentation
	let g:limelight_bop = '^\s'
	let g:limelight_eop = '\ze\n^\s'
" Goyo
	let g:goyo_width = 90
	map <leader>g :Goyo \| se linebreak<CR>
	map <leader>G :Goyo \| se nolinebreak<CR>

	" Limelight integration
	au! User GoyoEnter Limelight
	function! s:goyo_leave()
		hi LineNr ctermbg=NONE guibg=NONE
		hi Normal guibg=NONE ctermbg=NONE
	endfunction
	autocmd! User GoyoLeave Limelight! \| nested call <SID>goyo_leave()

	au BufRead,BufNewFile /tmp/neomutt* let g:goyo_width=80
	au BufRead,BufNewFile /tmp/neomutt* :Goyo | se linebreak
	au BufRead,BufNewFile /tmp/neomutt* map ZZ :Goyo\|x!<CR>
	au BufRead,BufNewFile /tmp/neomutt* map ZQ :Goyo\|q!<CR>

" Devicons
	let g:webdevicons_enable = 1
	let g:WebDevIconsUnicodeDecorateFileNodes = 1
	let g:WebDevIconsUnicodeDecorateFolderNodes = 1
	let g:WebDevIconsUnicodeGlyphDoubleWidth = 1
	let g:webdevicons_enable_airline_statusline = 1
	let g:WebDevIconsUnicodeGlyphDoubleWidth = 1
	let g:WebDevIconsUnicodeDecorateFolderNodesDefaultSymbol = ''
	let g:DevIconsDefaultFolderOpenSymbol = ''
