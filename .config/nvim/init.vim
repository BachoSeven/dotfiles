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
	nn <Space> <Nop>
	let mapleader =" " " This is so comfy
	se shell=/usr/bin/zsh
	se clipboard=unnamed,unnamedplus
	se nu rnu
	se path+=** " fuzzy find
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
	se wildignorecase
	se autoindent
	se incsearch
	se inccommand=split
	se hidden " hide buffers, don't close them
	se splitbelow splitright
	se lazyredraw
	se list " show invisibles
	se listchars=
	se listchars+=tab:·\
	se listchars+=trail:•
	se listchars+=extends:»
	se listchars+=precedes:«
	se listchars+=nbsp:░
	se fcs=vert:▒,eob:\ " " Remove annoying tilde characters and set split style
	se autoread " Automatically re-read file if a change was detected outside of vim
	se updatetime=100 " useful for fast markdown previews; reduce if it slows things down
	se scrolloff=11
	se mouse=nv
	se diffopt+=vertical " vertical diffs
" case insensitive search
	se ignorecase
	se smartcase
	se infercase " For insert mode

"		 +--------------+
"		 | Key Mappings |
"		 +--------------+
"
" Unlink system clipboard from vim's paste buffer
	nn <leader>U :se clipboard=<CR>

" Fix syntax higlighting on the fly (https://vim.fandom.com/wiki/Fix_syntax_highlighting)
	nn <leader>sy :syntax sync fromstart<CR>

" Edit vimrc/zshrc and load vimrc bindings
	nn <leader>ev :vsp ~/.config/nvim/init.vim<CR>
	nn <leader>ez :vsp ~/.config/zsh/.zshrc<CR>
	nn <leader>sv :so ~/.config/nvim/init.vim<CR>

" vsplit file under cursor; c-w+f for hsplit (https://vi.stackexchange.com/questions/3364/open-filename-under-cursor-like-gf-but-in-a-new-tab-or-split)
	nn <c-W><c-F> <c-W>vgf

" Spell check bindings
	ino <c-l> <c-g>u<Esc>[s1z=`]a<c-g>u
	ino <c-K> <c-g>u<esc>u[s2z=gi<c-g>u
	ino <c-J> <c-g>u<esc>u[s3z=gi<c-g>u

" Save a few keypresses
	nn <c-h> <c-w>h
	nn <c-j> <c-w>j
	nn <c-k> <c-w>k
	nn <c-l> <c-w>l
	map <leader>h <c-w>h:q<CR>
	map <leader>j <c-w>j:q<CR>
	map <leader>k <c-w>k:q<CR>
	map <leader>l <c-w>l:q<CR>
" Buffer commands
	nn <leader>[ :bprev<CR>
	nn <leader>] :bnext<CR>
	nn <leader>d :bdelete<CR>
" Don't copy in my system clipboard when I use these
	no c "_c
	no x "_x
	no s "_s
" Move lines with Alt
	nn <A-j> :m .+1<CR>==
	nn <A-k> :m .-2<CR>==
	ino <A-j> <Esc>:m .+1<CR>==gi
	ino <A-k> <Esc>:m .-2<CR>==gi
	vn <A-j> :m '>+1<CR>gv=gv
	vn <A-k> :m '<-2<CR>gv=gv
" These are amazing.
	nn <leader>w :w<CR>
	nn <leader>q :q<CR>
" Quick macros
	nn <silent> Q @q
" Tabs
	map <c-t>k :tabr<CR>
	map <c-t>j :tabl<CR>
	map <c-t>h :tabp<CR>
	map <c-t>l :tabn<CR>
	map <c-t>n :tabnew<CR>

" Perform dot commands over visual blocks:
	vn . :normal .<CR>

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
	nn <silent> <esc><esc> <esc>:nohlsearch<cr><esc>

" C compiling
	nn <leader>co :!gcc -Wall -pedantic % -o %:r<CR>
	nn <leader>cp :vsp<CR>:te<CR>a ./

" Open Terminal
	nn <leader>t :te<CR>a

"		 +------+
"		 | Misc |
"		 +------+
" Netrw stuff
	let g:netrw_home=$XDG_CACHE_HOME.'/nvim' " Xdg base directory specifications compliant location for .netrwhist TODO this should be merged in neovim (and could then be removed)
	let g:netrw_banner=0        " disable annoying banner
	let g:netrw_altv=1          " open splits to the right
	let g:netrw_browse_split=4
	let g:netrw_liststyle=3     " tree view
	let g:netrw_browsex_viewer="xdg-open" " Use xdg-open(mimi) to open files externally

" make inline more readable
	fu! UnMinify( )
			%s/{\ze[^\r\n]/{\r/g
			%s/){/) {/g
			%s/};\?\ze[^\r\n]/\0\r/g
			%s/;\ze[^\r\n]/;\r/g
			%s/[^\s]\zs[=&|]\+\ze[^\s]/ \0 /g
			normal ggVG=
	endfu
	nn <silent> <leader>y <esc>:cal UnMinify()<cr><esc>

"		 +---------+
"		 | Plugins |
"		 +---------+
" Definitions
	so ~/.config/nvim/plug/plug.vim

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
" Turns off highlighting on the bits of code that are changed,
" so the line that is changed is highlighted but the actual
" text that has changed stands out on the line and is readable.
	if &diff
		hi! link DiffText MatchParen
	endi
	hi Comment gui=italic
" ColorScheme
	se termguicolors
	se background=dark
	" colwal
	colo gruvbox-material | hi Visual cterm=NONE ctermfg=NONE ctermbg=237 guibg=#3a3a3a
	" colo NeoSolarized
" Transparency
	hi LineNr ctermbg=NONE guibg=NONE
	hi Normal ctermbg=NONE guibg=NONE
" Enable blinking together with different cursor shapes and cursor highlighting:
	se guicursor=n-v-c:block,i-ci-ve:ver25,r-cr:hor20,o:hor50
	\,a:blinkwait700-blinkoff400-blinkon250-Cursor/lCursor
	\,sm:block-blinkwait175-blinkoff150-blinkon175
