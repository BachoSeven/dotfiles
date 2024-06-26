" Startify
	fu! s:center(lines) abort
		let longest_line	 = max(map(copy(a:lines), 'strwidth(v:val)'))
		let centered_lines = map(copy(a:lines),
					\ 'repeat(" ", (&columns / 2) - (longest_line / 2)) . v:val')
		retu centered_lines
	endfu
	" let s:header = [
" \ ' ________    _______  _____  ___  ___      ___  __     ___      ___ ',
" \ '("      "\  /"     "|(\"   \|"  \|"  \    /"  ||" \   |"  \    /"  |',
" \ ' \___/   :)(: ______)|.\\   \    |\   \  //  / ||  |   \   \  //   |',
" \ '   /  ___/  \/    |  |: \.   \\  | \\  \/. ./  |:  |   /\\  \/.    |',
" \ '  //  \__   // ___)_ |.  \    \. |  \.    //   |.  |  |: \.        |',
" \ ' (:   / "\ (:      "||    \    \ |   \\   /    /\  |\ |.  \    /:  |',
" \ '  \_______) \_______) \___|\____\)    \__/    (__\_|_)|___|\__/|___|',
" \]
	let s:header =[
    \'          ▀████▀▄▄              ▄█ ',
    \'            █▀    ▀▀▄▄▄▄▄    ▄▄▀▀█ ',
    \'    ▄        █          ▀▀▀▀▄  ▄▀  ',
    \'   ▄▀ ▀▄      ▀▄              ▀▄▀  ',
    \'  ▄▀    █     █▀   ▄█▀▄      ▄█    ',
    \'  ▀▄     ▀▄  █     ▀██▀     ██▄█   ',
    \'   ▀▄    ▄▀ █   ▄██▄   ▄  ▄  ▀▀ █  ',
    \'    █  ▄▀  █    ▀██▀    ▀▀ ▀▀  ▄▀  ',
    \'   █   █  █      ▄▄           ▄▀   ',
    \]
	let g:startify_custom_header = s:center(s:header)
	let g:startify_skiplist = [
	\ 'COMMIT_EDITMSG',
	\ ]
	let g:startify_use_env = 1
	fu! StartifyEntryFormat() " Use custom icons plugin
		retu 'mpi#get(absolute_path) ." ". entry_path'
	endfu
	let g:startify_commands = [
		\ { 'o': ['Fuzzy Finder', 'FZF']},
		\ ]
	let g:startify_lists = [
		\ { 'type': 'files',		 'header': ['		MRU']						 },
		\ { 'type': 'dir',			 'header': ['		MRU '. getcwd()] },
		\ { 'type': 'commands',  'header': ['		Commands']			 },
		\ ]

" Lf
	let g:lf_replace_netrw = 1 " open lf when a directory is opened with vim
	nn <leader>F :LfNewTab<CR>

" Xplr
	com! XPLR FloatermNew xplr
	nn <leader>X :XPLR<CR>

" csv.vim
" Only consider the first 100 lines to determine the delimiter
	let g:csv_start = 1
	let g:csv_end = 100

" Better Escape
	let g:better_escape_interval = 200
	let g:better_escape_shortcut = 'jj'

" NerdCommenter
	let g:NERDSpaceDelims = 1
	let g:NERDCompactSexyComs = 1
	let g:NERDCustomDelimiters = { 'lf': { 'left': '#' }, 'octave': { 'left': '#' } }

"" FZF
	nn <silent> <C-p> :FZF -m<CR>
" Better command history with q:
	com! CmdHist cal fzf#vim#command_history({'right': '40'})
	nn q: :CmdHist<CR>

" Change Colorscheme using fzf
	nn <silent> <leader>sc :cal fzf#run({
	\		'source':
	\			map(split(globpath(&rtp, "colors/*.vim"), "\n"),
	\					"substitute(fnamemodify(v:val, ':t'), '\\..\\{-}$', '', '')"),
	\		'sink':		 'colo',
	\		'options': '+m',
	\		'left':		 30
	\ })<CR>
	" Change buffers with fzf
	nn <leader><Enter> :Buffers<CR>

" Vimtex Configuration
	se cole=2
	let g:matchup_override_vimtex = 1
	let g:vimtex_matchparen_deferred = 1
	let g:vimtex_syntax_conceal_defaul = 0
	let g:vimtex_syntax_conceal = {
	\ 'accents' : 1,
	\ 'fancy' : 1,
	\ 'greek' : 1,
	\ 'math_bounds' : 1,
	\ 'math_delimiters' : 1,
	\ 'math_fracs' : 1,
	\ 'math_super_sub' : 1,
	\ 'math_symbols' : 1,
	\ 'styles' : 1,
	\ }
	hi Conceal ctermbg=none
	let g:vimtex_quickfix_mode = 2
	let g:vimtex_fold_enabled = 1
	let g:vimtex_view_method = 'zathura'
	let g:vimtex_compiler_method = 'generic'
	let g:vimtex_compiler_generic = {
		\	'command': 'ls *.tex | entr -n -c tectonic /_ --synctex --keep-logs',
		\}
	let g:vimtex_compiler_latexmk = {
		\ 'build_dir' : '',
		\ 'callback' : 1,
		\ 'continuous' : 1,
		\ 'executable' : 'latexmk',
		\ 'options' : [
		\		'-verbose',
		\		'-file-line-error',
		\		'-synctex=1',
		\		'-interaction=nonstopmode',
		\ ],
		\}
	" Compile on initialization
	aug vimtex_events
		au!
		au User VimtexEventInitPost VimtexCompile
		au User VimtexEventQuit call OnQuit()
		au User VimtexEventCompileStarted VimtexView
	aug END
	" Close viewers when VimTeX buffers are closed
	fu! OnQuit()
		if executable('xdotool') && exists('b:vimtex')
				\ && exists('b:vimtex.viewer') && b:vimtex.viewer.xwin_id > 0
			call system('xdotool windowclose '. b:vimtex.viewer.xwin_id)
		endif
	endfu
	" FZF integration for VimTeX
	nn <localleader>lt :cal vimtex#fzf#run('cti', {'window': '50vnew'} )<CR>

" UltiSnips
	let g:UltiSnipsExpandTrigger = '<tab>'
	let g:UltiSnipsJumpForwardTrigger = '<tab>'
	let g:UltiSnipsJumpBackwardTrigger = '<s-tab>'
	let g:UltiSnipsSnippetDirectories = [$HOME.'/.config/nvim/UltiSnips']
	nn <leader>se :UltiSnipsEdit<CR>
	let g:UltiSnipsEditSplit="vertical"

" F#
" Required: to be used with nvim-cmp.
	let g:fsharp#lsp_auto_setup = 0
	let g:fsharp#fsautocomplete_command =
				\ [ 'dotnet',
				\   'fsautocomplete',
				\   '--background-service-enabled'
				\ ]

" UndoTree
	let g:undotree_WindowLayout = 3
	nn <leader>u :UndotreeToggle<CR>
	let g:undotree_SetFocusWhenToggle = 1
	let g:undotree_CursorLine = 0

" Gruvbox Material
	let g:gruvbox_material_transparent_background = 1
	let g:gruvbox_material_enable_italic = 1	" Italic Keywords
	let g:gruvbox_material_background = 'hard'

" Lightline
	let g:lightline = {
		\ 'colorscheme': 'gruvbox_material',
		\ 'active': {
		\		'left': [ [ 'mode', 'paste' ],
		\							[ 'filename' ] ],
		\		'right': [ [ 'percent', 'lineinfo' ],
		\						 [ 'ascii', 'fileformat', 'fileencoding', 'filetype' ] ]
		\ },
		\ 'component_function': {
		\		'filename': 'LlName',
		\		'fileformat': 'LlFormat',
		\		'filetype': 'LlType',
		\		'fileencoding': 'LlEncoding',
		\		'ascii': 'LlAscii'
		\	},
		\	'mode_map': {
		\		'n' : 'N',
		\		'i' : 'I',
		\		'R' : 'R',
		\		'v' : 'V',
		\		'V' : 'VL',
		\		"\<C-v>": 'VB',
		\		'c' : 'C',
		\		's' : 'S',
		\		'S' : 'SL',
		\		"\<C-s>": 'SB',
		\		't': 'T'
		\ },
		\ 'separator': { 'left': '▓▒░', 'right': '░▒▓' },
		\ 'subseparator': { 'left': '▒', 'right': '░' }
		\ }
	se noshowmode " Don't display mode in command line
	" Show total line number in square brackets
	let g:lightline.component = {
			\ 'lineinfo': '%3l[%L]:%-2v'}
	fu! LlRO()
		return &ft !~? 'help' && &readonly ? ' ' : ''
	endfu
	fu! LlName() " Trim bar between filename and modified sign
		let filename = expand('%:t') !=# '' ? expand('%:t') : '<0x0>'
		let modified = &modified ? ' ≠' : ''
		retu filename . ('' != LlRO() ? LlRO() : modified)
	endfu
	fu! LlFormat()
		if &fileformat ==? 'dos'
			let fileformat = ''
		elseif &fileformat ==? 'unix'
			let fileformat = ''
		elseif &fileformat ==? 'mac'
			let fileformat = ''
		endif
		retu winwidth(0) > 70 ? fileformat : ''
	endfu
	fu! LlAscii()
		retu winwidth(0) > 70 ? faccina#face() : ''
	endfu
	fu! LlType()
		let symbol = mpi#get(expand('%:t'))
		retu winwidth(0) > 70 ? (strlen(&filetype) ? ' ' . symbol . ' ' . &filetype : '') : ''
	endfu
	fu! LlEncoding()
		retu winwidth(0) > 70 ? (strlen(&fenc) ? &enc : &enc) : ''
	endfu
	fu! IsTree()
		let l:name = expand('%:t')
		return l:name =~ 'NetrwTreeListing\|undotree\|NERD' ? 1 : 0
	endfu

" Limelight
	" Color name (:help cterm-colors) or ANSI code
	let g:limelight_conceal_ctermfg = '#a89984'
	" Color name (:help gui-colors) or RGB color
	let g:limelight_conceal_guifg = '#928374'

	" Default: 0.5
	let g:limelight_default_coefficient = 0.7

	" Number of preceding/following paragraphs to include (default: 0)
	let g:limelight_paragraph_span = 1

" Goyo
	let g:goyo_width = 100
	map <leader>g :Goyo \| se linebreak<CR>
	map <leader>G :Goyo \| se nolinebreak<CR>

	" Limelight integration
	au! User GoyoEnter Limelight
	fu! s:goyo_leave()
		Limelight!
	endf
	au! User GoyoLeave nested cal <SID>goyo_leave()
" Gutentags
	let g:gutentags_cache_dir = $XDG_CACHE_HOME . '/gutentags'
" Org Mode
	let g:org_agenda_files=['~/tech/emacs/emacs.org']
" Minimap
	let g:minimap_width = 10
" Copilot
  ima <S-Tab> <Plug>(copilot-accept-word)
