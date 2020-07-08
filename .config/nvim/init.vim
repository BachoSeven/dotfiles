" 	 _____         _____ _____           _____
" 	 ___(_)_______ ___(_)__  /_  ___   _____(_)_______ ___
" 	 __  / __  __ \__  / _  __/  __ | / /__  / __  __ `__ \
" 	 _  /  _  / / /_  /  / /____ __ |/ / _  /  _  / / / / /
" 	 /_/   /_/ /_/ /_/   \__/_(_)_____/  /_/   /_/ /_/ /_/
"

"" Basic Settings
	se title
	let mapleader =","
	se shell=/usr/bin/zsh
	se clipboard+=unnamedplus
	se number relativenumber
	se wildmenu
	se wildmode=longest,list,full
	se autoindent
	se incsearch
	se hidden
	setlocal spell spelllang=en_us
	se splitbelow splitright
	se lazyredraw
	au BufReadPost * if line("'\"") > 1 && line("'\"") <= line("$") | exe "normal! g'\"" | endif " Return to last edit position when opening files
	se fcs=eob:\ " Protecting trailing whitespace " Remove annoying tilde

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
	map <leader>P :!opout <c-r>%<CR><CR>

" Runs a script that cleans out tex build files whenever I close out of a .tex file.
	au VimLeave *.tex !texclear %

" Allow saving of files as sudo when I forgot to start vim using sudo.
	cm w!! w !sudo tee > /dev/null %

" Insert new lines in Normal Mode
	nn <leader>o mao<Esc>`a
	nn <leader>O maO<Esc>`a

" Turn off search highlight
	nn <leader><space> :nohlsearch<CR>

" Edit vimrc/zshrc and load vimrc bindings
	nn <leader>ev :vsp ~/.config/nvim/init.vim<CR>
	nn <leader>ez :vsp ~/.config/zsh/.zshrc<CR>
	nn <leader>sv :so ~/.config/nvim/init.vim<CR>

" C compiling
	nn <leader>co :!gcc -Wall -pedantic % -o %:r<CR>
	nn <leader>cp :vsp<CR>:te<CR>a ./

" Open Terminal
	nn <leader>t :te<CR>a

" Automatically deletes all trailing whitespace and newlines at end of file on save.
	au BufWritePre * %s/\s\+$//e
	au BufWritepre * %s/\n\+\%$//e

" Recompile and run dwmblocks automatically
	au BufWritePost ~/.local/src/dwmblocks/config.h !cd ~/.local/src/dwmblocks;  sudo make install && { killall -q dwmblocks;setsid dwmblocks & }

" Run xrdb whenever Xdefaults or Xresources are updated.
	au BufWritePost *Xresources,*Xdefaults !xrdb %

" Turns off highlighting on the bits of code that are changed,
" so the line that is changed is highlighted but the actual
" text that has changed stands out on the line and is readable.
	if &diff
	    hi! link DiffText MatchParen
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
" Definitions
	so ~/.config/nvim/plugins/plug.vim
" Configurations
	so ~/.config/nvim/plugins/post-plug.vim

"" Appearance
" ColorScheme
	se termguicolors
	se background=dark
	colo gruvbox | hi Visual cterm=NONE ctermfg=NONE ctermbg=237 guibg=#3a3a3a

	" colwal
	" colo NeoSolarized
	" let g:airline_theme='base16_solarized'

" Highlighting
	hi Comment gui=italic
	hi LineNr ctermbg=NONE guibg=NONE
	hi Normal ctermbg=NONE guibg=NONE
