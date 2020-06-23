" 	 _____         _____ _____           _____
" 	 ___(_)_______ ___(_)__  /_  ___   _____(_)_______ ___
" 	 __  / __  __ \__  / _  __/  __ | / /__  / __  __ `__ \
" 	 _  /  _  / / /_  /  / /____ __ |/ / _  /  _  / / / / /
" 	 /_/   /_/ /_/ /_/   \__/_(_)_____/  /_/   /_/ /_/ /_/
"

"" Basic Settings
	set title
	let mapleader =","
	set shell=/usr/bin/zsh
	set clipboard+=unnamedplus
	set number relativenumber
	set wildmenu
	set wildmode=longest,list,full
	set autoindent
	set incsearch
	set hidden
	set termguicolors
	setlocal spell spelllang=en_us
	set splitbelow splitright
	set lazyredraw
	au BufReadPost * if line("'\"") > 1 && line("'\"") <= line("$") | exe "normal! g'\"" | endif " Return to last edit position when opening files
	set fcs=eob:\ " Protecting trailing whitespace " Remove annoying tilde

"" Some mappings and shortcuts

" jk is Esc in insert mode
	ino jk <Esc>

" vsplit file under cursor; C-w+f for hsplit (https://vi.stackexchange.com/questions/3364/open-filename-under-cursor-like-gf-but-in-a-new-tab-or-split)
	nn <C-W><C-F> <C-W>vgf

" Spell check bindings
	ino <c-L> <c-g>u<Esc>[s1z=`]a<c-g>u
	ino <c-K> <c-g>u<esc>u[s2z=gi<c-g>u
	ino <c-J> <c-g>u<esc>u[s3z=gi<c-g>u

" Save a few keypresses
	map <C-h> <C-w>h
	map <C-l> <C-w>l
	map <leader>h <C-w>h:q<cr>
	map <leader>j <C-w>j:q<cr>
	map <leader>k <C-w>k:q<cr>
	map <leader>l <C-w>l:q<cr>
	nn c "_c
" Quick macros
	nn <silent> Q @q
	map <C-t>k :tabr<cr>
	map <C-t>j :tabl<cr>
	map <C-t>h :tabp<cr>
	map <C-t>l :tabn<cr>

" Replace all occurrences aliased to S
	nn S :%s//g<Left><Left>

" Compile document, be it groff/LaTeX/markdown/etc.
	map <leader>C :w! \| !compiler <c-r>%<CR>

" Open corresponding .pdf/.html or preview
	map <leader>p :!opout <c-r>%<CR><CR>

" Runs a script that cleans out tex build files whenever I close out of a .tex file.
	autocmd VimLeave *.tex !texclear %

" Allow saving of files as sudo when I forgot to start vim using sudo.
	cmap w!! w !sudo tee > /dev/null %

" Insert new lines in Normal Mode
	nn <leader>o mao<Esc>`a
	nn <leader>O maO<Esc>`a

" Turn off search highlight
	nn <leader><space> :nohlsearch<CR>

" Edit vimrc/zshrc and load vimrc bindings
	nn <leader>ev :vsp ~/.config/nvim/init.vim<CR>
	nn <leader>ez :vsp ~/.config/zsh/.zshrc<CR>
	nn <leader>sv :source ~/.config/nvim/init.vim<CR>

" C compiling
	nn <leader>co :!gcc -Wall -pedantic % -o %:r<CR>
	nn <leader>cp :vsp<CR>:te<CR>a ./

" Open Terminal
	nn <leader>t :te<CR>a

" Automatically deletes all trailing whitespace and newlines at end of file on save.
	autocmd BufWritePre * %s/\s\+$//e
	autocmd BufWritepre * %s/\n\+\%$//e

" Recompile and run dwmblocks automatically
	autocmd BufWritePost ~/.local/src/dwmblocks/config.h !cd ~/.local/src/dwmblocks;  sudo make install && { killall -q dwmblocks;setsid dwmblocks & }

" Run xrdb whenever Xdefaults or Xresources are updated.
	autocmd BufWritePost *Xresources,*Xdefaults !xrdb %

" Turns off highlighting on the bits of code that are changed, so the line that is changed is highlighted but the actual text that has changed stands out on the line and is readable.
	if &diff
	    highlight! link DiffText MatchParen
	endif

" Use xdg-open(mimi) to open files externally
	let g:netrw_browsex_viewer="xdg-open"

" Sessions
	" let g:session_dir = '~/.config/nvim/vim-sessions'
	" let g:session#default_opener = 'edit'
	" let g:session#default_session = 'default'
	" exec 'nn <Leader>ss :mks! ' . g:session_dir . '/*.vim<C-D><BS><BS><BS><BS><BS>'
	" exec 'nn <Leader>sr :so ' . g:session_dir. '/*.vim<C-D><BS><BS><BS><BS><BS>'

"" Plugins

call plug#begin('~/.local/share/nvim/plugged')
Plug 'kovetskiy/sxhkd-vim'
Plug 'Shougo/deoplete.nvim'
Plug 'deoplete-plugins/deoplete-zsh'
Plug 'Shougo/neco-vim'
Plug 'Shougo/neco-syntax'

Plug 'lervag/vimtex'
Plug 'KeitaNakamura/tex-conceal.vim'
	set conceallevel=1
	let g:tex_conceal='abdmg'
	hi Conceal ctermbg=none

" Utilities
Plug 'ptzz/lf.vim'
Plug 'rbgrouleff/bclose.vim'
Plug 'mbbill/undotree'
" Various files support
Plug 'Konfekt/vim-office'
Plug 'alx741/vinfo'

" Plug 'sirver/ultisnips'
	" let g:UltiSnipsExpandTrigger = '<tab>'
	" let g:UltiSnipsJumpForwardTrigger = '<tab>'
	" let g:UltiSnipsJumpBackwardTrigger = '<s-tab>'
	" let g:UltiSnipsSnippetDirectories = ['UltiSnips',$HOME.'/.config/nvim/UltiSnips']
	" let g:UltiSnipsSnippetsDir = $HOME."/.config/nvim/UltiSnips"
Plug 'lukelbd/vim-scrollwrapped'
Plug 'wlemuel/vim-tldr'
Plug 'scrooloose/nerdcommenter'
	let g:NERDSpaceDelims = 1
	let g:NERDCompactSexyComs = 1
	let g:NERDCustomDelimiters = { 'lf': { 'left': '#' } }	" Fix lfrc comments
Plug 'junegunn/fzf'
Plug 'junegunn/fzf.vim'
Plug 'junegunn/goyo.vim'

" Appearance
Plug 'chrisbra/Colorizer'
	nn <leader>H :ColorToggle<cr>
Plug 'ap/vim-css-color'

Plug 'dylanaraps/wal.vim'
Plug 'gruvbox-community/gruvbox'
Plug 'iCyMind/NeoSolarized' 	" NeoSolarized
Plug 'vim-airline/vim-airline'
Plug 'vim-airline/vim-airline-themes'

" Syntax highlighting
Plug 'VebbNix/lf-vim'
Plug 'cespare/vim-toml'
Plug 'bfrg/vim-cpp-modern'

" Icons
Plug 'ryanoasis/vim-devicons'

call plug#end()

"" Post-Plugin

" Lf
	let g:lf_command_override = 'lf -command "set hidden"'
	let g:lf_replace_netrw = 1 " open lf when vim open a directory

" Deoplete
	let g:deoplete#enable_at_startup = 1

" Fuzzy Finder
	let g:fzf_layout = { 'window': '10new' }
	nn <silent> <C-p> :FZF -m<cr>

" Better command history with q:
	command! CmdHist call fzf#vim#command_history({'right': '40'})
	nn q: :CmdHist<CR>

" Change Colorscheme using fzf
	nn <silent> <Leader>sc :call fzf#run({
	\   'source':
	\     map(split(globpath(&rtp, "colors/*.vim"), "\n"),
	\         "substitute(fnamemodify(v:val, ':t'), '\\..\\{-}$', '', '')"),
	\   'sink':    'colo',
	\   'options': '+m',
	\   'left':    30
	\ })<CR>

" Change buffers with fzf
	function! s:buflist()
	  redir => ls
	  silent ls
	  redir END
	  return split(ls, '\n')
	endfunction

	function! s:bufopen(e)
	  execute 'buffer' matchstr(a:e, '^[ 0-9]*')
	endfunction

	nn <silent> <Leader><Enter> :call fzf#run({
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
	nn <localleader>lt :call vimtex#fzf#run('cti', {'window': '50vnew'} )<cr>

" vimtex deoplete
	call deoplete#custom#var('omni', 'input_patterns', {
		\ 'tex': g:vimtex#re#deoplete
		\})
" UndoTree
	let g:undotree_WindowLayout = 3
	nn <F5> :UndotreeToggle<cr>
	let g:undotree_SetFocusWhenToggle = 1

"" Appearance
	let g:airline_powerline_fonts = 1
	let g:airline#extensions#tabline#enabled = 1

" ColorSchemes
	set background=dark
	colorscheme gruvbox
	" colwal
	" colorscheme NeoSolarized
	" let g:airline_theme='base16_solarized'
	" hi Normal ctermbg=NONE guibg=NONE
	" hi NonText ctermbg=NONE guibg=NONE
	" hi EndOfBuffer ctermbg=NONE guibg=NONE
	hi LineNr ctermbg=NONE guibg=NONE
" fix gruvbox visual selection
	hi Visual cterm=NONE ctermfg=NONE ctermbg=237 guibg=#3a3a3a

" Goyo mapping and configuration
	map <leader>g :Goyo \| set linebreak<CR>
	map <leader>G :Goyo \| set nolinebreak<CR>
" Enable Goyo by default for mutt writting
	autocmd BufRead,BufNewFile /tmp/neomutt* let g:goyo_width=80
	autocmd BufRead,BufNewFile /tmp/neomutt* :Goyo | set linebreak
	autocmd BufRead,BufNewFile /tmp/neomutt* map ZZ :Goyo\|x!<CR>
	autocmd BufRead,BufNewFile /tmp/neomutt* map ZQ :Goyo\|q!<CR>
