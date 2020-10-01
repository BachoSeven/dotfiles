" 	 _____         _____ _____           _____
" 	 ___(_)_______ ___(_)__  /_  ___   _____(_)_______ ___
" 	 __  / __  __ \__  / _  __/  __ | / /__  / __  __ `__ \
" 	 _  /  _  / / /_  /  / /____ __ |/ / _  /  _  / / / / /
" 	 /_/   /_/ /_/ /_/   \__/_(_)_____/  /_/   /_/ /_/ /_/
"

"		 +----------+
"		 | Settings |
"		 +----------+
	se title
	let mapleader =" " " This is so comfy
	se shell=/usr/bin/zsh
	set clipboard=unnamed,unnamedplus
	se number relativenumber
	se wildmenu
		se wildignore+=.git,.hg,.svn
		se wildignore+=*.aux,*.out,*.toc
		se wildignore+=*.o,*.obj,*.exe,*.dll,*.manifest,*.rbc,*.class
		se wildignore+=*.ai,*.bmp,*.gif,*.ico,*.jpg,*.jpeg,*.png,*.psd,*.webp
		se wildignore+=*.avi,*.divx,*.mp4,*.webm,*.mov,*.m2ts,*.mkv,*.vob,*.mpg,*.mpeg
		se wildignore+=*.mp3,*.oga,*.ogg,*.wav,*.flac
		se wildignore+=*.eot,*.otf,*.ttf,*.woff
		se wildignore+=*.doc,*.pdf,*.cbr,*.cbz
		se wildignore+=*.zip,*.tar.gz,*.tar.bz2,*.rar,*.tar.xz,*.kgb
		se wildignore+=*.swp,.lock,.DS_Store,._*
	se wildmode=longest:full,list,full
	se autoindent
	se incsearch
	se hidden
	se splitbelow splitright
	se lazyredraw
	se fcs=eob:\ " Protecting trailing whitespace " Remove annoying tilde
	se timeout timeoutlen=1500 " Longer leader key timeout
	se autoread " Automatically re-read file if a change was detected outside of vim

"		 +--------------+
"		 | Key Mappings |
"		 +--------------+
" jk is Esc in insert mode
	ino jk <Esc>

" Unlink system clipboard from vim's paste buffer
	nn <leader>U :se clipboard=<CR>

" Fix syntax higlighting on the fly (https://vim.fandom.com/wiki/Fix_syntax_highlighting)
	nn <leader>sy :syntax sync fromstart<CR>

" Edit vimrc/zshrc and load vimrc bindings
	nn <leader>ev :vsp ~/.config/nvim/init.vim<CR>
	nn <leader>ez :vsp ~/.config/zsh/.zshrc<CR>
	nn <leader>sv :so ~/.config/nvim/init.vim<CR>

" vsplit file under cursor; C-w+f for hsplit (https://vi.stackexchange.com/questions/3364/open-filename-under-cursor-like-gf-but-in-a-new-tab-or-split)
	nn <C-W><C-F> <C-W>vgf

" Spell check bindings
	ino <c-L> <c-g>u<Esc>[s1z=`]a<c-g>u
	ino <c-K> <c-g>u<esc>u[s2z=gi<c-g>u
	ino <c-J> <c-g>u<esc>u[s3z=gi<c-g>u

" Save a few keypresses
	nn <C-h> <C-w>h
	nn <C-j> <C-w>j
	nn <C-k> <C-w>k
	nn <C-l> <C-w>l
	map <leader>h <C-w>h:q<CR>
	map <leader>j <C-w>j:q<CR>
	map <leader>k <C-w>k:q<CR>
	map <leader>l <C-w>l:q<CR>
	norema c "_c
	norema x "_x
	norema s "_s
" These are amazing.
	nn <leader>w :w<CR>
	nn <leader>q :q<CR>
" Quick macros
	nn <silent> Q @q
	map <C-t>k :tabr<CR>
	map <C-t>j :tabl<CR>
	map <C-t>h :tabp<CR>
	map <C-t>l :tabn<CR>

" Replace all occurrences aliased to S
	nn S :%s//g<Left><Left>

" Compile document, be it groff/LaTeX/markdown/etc.
	map <leader>C :w! \| !compiler <c-r>%<CR>

" Open corresponding .pdf/.html or preview
	map <leader>P :!opout <c-r>%<CR><CR>

" Allow saving of files as sudo when I forgot to start vim using sudo.
	cm w!! w !sudo tee > /dev/null %

" Insert new lines in Normal Mode
	nn <leader>o mao<Esc>`a
	nn <leader>O maO<Esc>`a

" Shift line downwards
	nn <leader>J maa<CR><ESC>`a

" Turn off search highlight
	nn <leader><space> :nohlsearch<CR>

" C compiling
	nn <leader>co :!gcc -Wall -pedantic % -o %:r<CR>
	nn <leader>cp :vsp<CR>:te<CR>a ./

" Open Terminal
	nn <leader>t :te<CR>a

" Turns off highlighting on the bits of code that are changed,
" so the line that is changed is highlighted but the actual
" text that has changed stands out on the line and is readable.
	if &diff
		hi! link DiffText MatchParen
	endi

" Use xdg-open(mimi) to open files externally
	let g:netrw_browsex_viewer="xdg-open"

" Sessions
	" let sessionpath = expand('~/.config/nvim/vim-sessions')
	" if !filereadable(sessionpath)
		" call system('curl -fLo ' . shellescape(plugpath) . ' --create-dirs ' . plugurl)
	" endi
	let g:session_dir = '~/.config/nvim/vim-sessions'
	let g:session#default_opener = 'edit'
	exec 'nn <Leader>ss :mks! ~/.config/nvim/vim-sessions/'
	exec 'nn <Leader>sl :so ~/.config/nvim/vim-sessions/<C-D>'

"		 +---------+
"		 | Plugins |
"		 +---------+
" Definitions
	so ~/.config/nvim/plug.vim

"		 +----------+
"		 | Autocmds |
"		 +----------+
	so ~/.config/nvim/autocmd.vim

"		 +-----------+
"		 | Filetypes |
"		 +-----------+
	so ~/.config/nvim/ft.vim

"		 +------------+
"		 | Appearance |
"		 +------------+
	hi Comment gui=italic
" ColorScheme
	" notermgui
	se background=dark
	colo wal
	" colgruvbox | hi Visual cterm=NONE ctermfg=NONE ctermbg=237 guibg=#3a3a3a
	" colo NeoSolarized
	" let g:airline_theme='base16_solarized'
" Transparency
	hi LineNr ctermbg=NONE guibg=NONE
	hi Normal ctermbg=NONE guibg=NONE
" Enable blinking together with different cursor shapes and cursor highlighting:
  set guicursor=n-v-c:block,i-ci-ve:ver25,r-cr:hor20,o:hor50
  \,a:blinkwait700-blinkoff400-blinkon250-Cursor/lCursor
	\,sm:block-blinkwait175-blinkoff150-blinkon175
