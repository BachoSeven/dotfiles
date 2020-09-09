" options relating to plugin automation were taken from the below
" https://github.com/kelp/nvim/blob/master/home/.config/nvim/init.vim

" Plug Install {{{
"
" Plugins are installed with vim-plug
"

" Utility to run PlugInstall and guard against loading color schemes
" before we're ready.
if !exists('*SetupPlug')
  fu SetupPlug()
    let g:not_finish_vimplug = "yes"
    PlugInstall --sync
    unle g:not_finish_vimplug
    se verbose=15
    so ~/.config/nvim/init.vim | q
    se verbose=0
  endfu
endi

" check whether vim-plug is installed and install it if necessary
"let plugpath = expand('<sfile>:p:h'). '/autoload/plug.vim'
let plugpath = expand('~/.local/share/nvim/site/autoload/plug.vim')
if !filereadable(plugpath)
    if executable('curl')
        echo "Installing vim-plug..."
        echo ""
        let plugurl = 'https://raw.githubusercontent.com/junegunn/vim-plug/master/plug.vim'
        call system('curl -fLo ' . shellescape(plugpath) . ' --create-dirs ' . plugurl)
        if v:shell_error
            echom "Error downloading vim-plug. Please install it manually.\n"
            exit
        endi
    else
        echom "vim-plug not installed. Please install it manually or install curl.\n"
        exit
    endi
endi

" Install missing plugins on startup
augroup initvim-vimplug
  autocmd!
  autocmd VimEnter *
    \  if len(filter(values(g:plugs), '!isdirectory(v:val.dir)'))
    \|   call SetupPlug()
    \| endi
augroup END

" Shortcut to upgrade all plugins, including Plug
command! PU PlugUpdate | PlugUpgrade

" }}}
"
" {{{ Plugins
cal plug#begin('~/.local/share/nvim/plugged')

"" Utilities
	Plug 'ptzz/lf.vim'
	Plug 'rbgrouleff/bclose.vim'
	Plug 'junegunn/fzf'
	Plug 'junegunn/fzf.vim'
	Plug 'scrooloose/nerdcommenter'
		let g:NERDSpaceDelims = 1
		let g:NERDCompactSexyComs = 1
		let g:NERDCustomDelimiters = { 'lf': { 'left': '#' } }	" Fix lfrc comments
	Plug 'mbbill/undotree'
	Plug 'junegunn/goyo.vim'
	Plug 'junegunn/limelight.vim'
	Plug 'jamessan/vim-gnupg'
	" Neovim in the browser :)
	Plug 'glacambre/firenvim', { 'do': { _ -> firenvim#install(0) } }

"" Markdown
" Live Preview
	Plug 'iamcco/markdown-preview.nvim', { 'do': { -> mkdp#util#install() }, 'for': ['markdown', 'vim-plug'] }
" Markdown Table of Contents
	Plug 'mzlogin/vim-markdown-toc', { 'for': ['markdown', 'vim-plug'] }

" " Vimtex
	" Plug 'lervag/vimtex'
  " Plug 'KeitaNakamura/tex-conceal.vim'
		" se conceallevel=1
		" let g:tex_conceal='abdmg'
		" hi Conceal ctermbg=none
  " Plug 'sirver/ultisnips'
		" let g:UltiSnipsExpandTrigger = '<tab>'
		" let g:UltiSnipsJumpForwardTrigger = '<tab>'
		" let g:UltiSnipsJumpBackwardTrigger = '<s-tab>'
		" let g:UltiSnipsSnippetDirectories = ['UltiSnips',$HOME.'/.config/nvim/UltiSnips']
		" let g:UltiSnipsSnippetsDir = $HOME."/.config/nvim/UltiSnips"

" Various filetypes support
	Plug 'Konfekt/vim-office'
	Plug 'alx741/vinfo'
	Plug 'chrisbra/csv.vim', { 'for': ['csv', 'vim-plug'] }

" Autocompletion
	Plug 'Shougo/deoplete.nvim', { 'do': ':UpdateRemotePlugins' }
	Plug 'Shougo/neco-vim'
	Plug 'Shougo/neco-syntax'

"" Appearance
" Color highlighting
	Plug 'ap/vim-css-color'

" Colorschemes
	Plug 'dylanaraps/wal.vim'
	Plug 'gruvbox-community/gruvbox'
	" Plug 'overcache/NeoSolarized' 	" NeoSolarized

" Airline
	Plug 'vim-airline/vim-airline'
	Plug 'vim-airline/vim-airline-themes'

" Syntax highlighting
	Plug 'VebbNix/lf-vim'
	Plug 'cespare/vim-toml'
	Plug 'bfrg/vim-cpp-modern'

" Icons
	Plug 'ryanoasis/vim-devicons'

cal plug#end()

" }}}
"
" {{{ Post-Plugin Settings

" Firenvim
	if exists('g:started_by_firenvim')
		au BufEnter github.com_*.txt se filetype=markdown
		nn <C-z> :call firenvim#hide_frame()<CR>
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
	endi

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
	nn <leader>u :UndotreeToggle<cr>
	let g:undotree_SetFocusWhenToggle = 1

" Airline
	let g:airline_powerline_fonts = 1
	se noshowmode " Don't display mode in command line (airline already shows it)

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
		hi LineNr ctermbg=NONE guibg=NONE
		hi Normal guibg=NONE ctermbg=NONE
		Limelight!
	endf
	au! User GoyoLeave nested cal <SID>goyo_leave()

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

" }}}
