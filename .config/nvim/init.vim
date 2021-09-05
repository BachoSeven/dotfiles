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
	se nu
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
	se inccommand=split " this is amazing for :%substitute
	se hidden " hide buffers, don't close them
	se sb spr " better split defaults
	se acd " automatically cd into active vim buffer, useful i.e. for :Lf
	se lz
	se list " show invisibles
	se listchars=
	se listchars+=tab:·\
	se listchars+=trail:•
	se listchars+=extends:»
	se listchars+=precedes:«
	se listchars+=nbsp:░
	se fcs=vert:▒,eob:\ " " Remove annoying tilde characters and set split style
	se autoread " Automatically re-read file if a change was detected outside of vim
	se updatetime=100 " useful for fast markdown previews; reduce if it slows things down.
	se scrolloff=11
	se mouse=nv
	se diffopt+=vertical " vertical diffs
" case insensitive search
	se ignorecase
	se smartcase
	se infercase " For insert mode completion
	se completeopt=menuone,noinsert,noselect " Set completeopt to have a better completion experience
	se shortmess+=c " Avoid showing message extra message when using completion

"		 +--------------+
"		 | Key Mappings |
"		 +--------------+
"
" Clipboard utilities
""" Standard method to interface with the system clipboard
	" se clipboard=unnamed,unnamedplus
" "" Unlink system clipboard from vim's paste buffer
	" nn <leader>U :se clipboard=<CR>
" "" Don't copy in my system clipboard when I use these
	" no c "_c
	" no x "_x
	" no s "_s
""" Alternative method
	fu! X11Copy()
			silent %w !setsid xclip -r -sel c
	endfu
	fu! X11CopyRegister(reg)
			let l:ignore = system('setsid xclip -r -sel c', getreg(a:reg))
	endfu
	fu! X11PasteClipboard()
			r !xclip -sel c -o
	endfu
	fu! X11PastePrimary()
			r !xclip -o
	endfu
	nmap <Leader>x :call X11Copy()<CR>
	vmap <Leader>x "xy:call X11CopyRegister('x')<CR>
	nmap <Leader>p :call X11PasteClipboard()<CR>
	nmap <Leader>P :call X11PastePrimary()<CR>

" Printing from Vim is complicated due to UTF-8. The author of the PS
" driver explained it here:
" http://vim.1045645.n5.nabble.com/Printing-with-utf-8-characters-on-Windows-td1193441.html
" So, just use plain old 'lp' as a workaround.
	fun! Hardcopy()
			" CUPS documentation says about '-o page-*':
			" The value argument is the margin in points; each point is 1/72
			" inch or 0.35mm.
			" http://www.cups.org/documentation.php/doc-1.7/options.html
			" I want a margin of about 1.8cm.
			exe "!lp -o media=A4 -o page-left=50 -o page-right=50"
					\" -o page-top=50 -o page-bottom=50 -o prettyprint"
					\(&pdev != "" ? " -d " . &pdev : "") . " " . expand("%")
	endfun
	command! Hardcopy :call Hardcopy()

" Fix syntax higlighting on the fly (https://vim.fandom.com/wiki/Fix_syntax_highlighting)
	nn <leader>sy :syntax sync fromstart<CR>
" change <C-L> redraw mapping, which is useful in neovim as it also clears search highlighting and updates diffs
	nn <leader>L <Cmd>nohlsearch<Bar>diffupdate<CR><C-L>
" <CR> clears hlsearch, but only after doing a search.
	nn <silent> <expr> <CR> {-> v:hlsearch ? ":nohl\<CR>" : "\<CR>"}()
" Toggle search highlight
	nn <silent> <esc><esc> :let v:hlsearch=!v:hlsearch<CR>


" Edit vimrc/zshrc and load vimrc bindings
	nn <leader>ev :vsp $XDG_CONFIG_HOME/nvim/init.vim<CR>
	nn <leader>ez :vsp ~/.config/zsh/.zshrc<CR>
	nn <leader>sv :so $XDG_CONFIG_HOME/nvim/init.vim<CR>

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
" Move lines with Alt+{j,k} in normal mode
	nn <A-j> :m .+1<CR>==
	nn <A-k> :m .-2<CR>==
	ino <A-j> <Esc>:m .+1<CR>==gi
	ino <A-k> <Esc>:m .-2<CR>==gi
	vn <A-j> :m '>+1<CR>gv=gv
	vn <A-k> :m '<-2<CR>gv=gv
" Move visually selected lines with {J,K} in visual mode.
	vno J :m '>+1<CR>gv=gv
	vno K :m '<-2<CR>gv=gv
" These are amazing.
	nn <leader>w :up<CR>
	nn <leader>q :q<CR>
	nn <leader>n :vne<CR>
" Quick macros
	nn <silent> Q @q
" Tabs
	map <c-t>k :tabr<CR>
	map <c-t>j :tabl<CR>
	map <c-t>h :tabp<CR>
	map <c-t>l :tabn<CR>
	map <c-t>n :tabnew<CR>
" Remapping for the optimistic [use Ctrl+BS for normal BS]
	ino <Backspace> <C-w>
" Arrows behave like Ctrl+arrows, and Shift+arrows goes to the end of whole words.
	ino <Right> <esc>ea
	ino <Left> <esc>gea
	ino <S-Right> <esc>Ea
	ino <S-Left> <esc>gEa

" Perform dot commands over visual blocks:
	vn . :normal .<CR>

" Replace all occurrences aliased to S
	nn S :%s//g<Left><Left>

" Compile document, be it groff/LaTeX/markdown/etc.
	map <leader>C :w! \| !compiler <c-r>%<CR>

" Allow saving of files as sudo when I forgot to start vim using sudo.
	cm w!! w !sudo tee > /dev/null %

" Insert new lines in Normal Mode
	nn <leader>o mao<Esc>`a
	nn <leader>O maO<Esc>`a

" Shift the section of the line after the cursor downwards.
	nn <leader>J maa<CR><ESC>`a

" C compiling
	nn <leader>co :!gcc -Wall -pedantic % -o %:r<CR>
	nn <leader>cp :vsp<CR>:te<CR>a ./

" Terminal mappings
"" Open Terminal
	nn <leader>t :te<CR>
"" Leave terminal easily
	tno <leader><Esc> <C-\><C-n>

	" sHrUg
	ino ,shrug ¯\_(ツ)_/¯

"		 +------+
"		 | Misc |
"		 +------+
" Netrw stuff
	let g:netrw_banner=0        " disable annoying banner
	let g:netrw_altv=1          " open splits to the right
	let g:netrw_browse_split=4
	let g:netrw_liststyle=3     " tree view

" Because of gh#vim/vim#4738
	nn <silent> gx :execute 'silent! !xdg-open ' . shellescape(expand('<cWORD>'), 1)<CR>

" make inline more readable
	fu! UnMinify()
		%s/{\ze[^\r\n]/{\r/e
		%s/){/) {/e
		%s/};\?\ze[^\r\n]/\0\r/e
		%s/;\ze[^\r\n]/;\r/e
		%s/[^\s]\zs[=&|]\+\ze[^\s]/ \0 /e
		normal ggVG=
	endfu
	nn <silent> <leader>y <esc>:cal UnMinify()<CR><esc>

" Sessions
	let g:session_dir = '~/.config/nvim/sessions'
	let g:session#default_opener = 'edit'
	exec 'nn <Leader>ss :mks! ~/.config/nvim/sessions/'
	exec 'nn <Leader>sl :so ~/.config/nvim/sessions/<C-D>'

"		 +---------+
"		 | Plugins |
"		 +---------+
" Definitions
	so $XDG_CONFIG_HOME/nvim/plug/vim-plug.vim
" Icons
	so $XDG_CONFIG_HOME/nvim/plug/mpi.vim
" Lua configurations
	so $XDG_CONFIG_HOME/nvim/plug/postplug.vim
	so $XDG_CONFIG_HOME/nvim/plug/postplug.lua

"		 +----------+
"		 | Autocmds |
"		 +----------+
	so $XDG_CONFIG_HOME/nvim/autocmd.vim

"		 +-----------+
"		 | Filetypes |
"		 +-----------+
	so $XDG_CONFIG_HOME/nvim/ft.vim

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
