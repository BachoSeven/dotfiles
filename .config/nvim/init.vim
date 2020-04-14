" Basic Settings
	set shell=/usr/bin/zsh
	set number
	set relativenumber
	set wildmenu
	set wildmode=longest,list,full
	set autoindent
	set cursorline
	set incsearch
	set hidden
	set conceallevel=1
	set termguicolors
	set splitbelow splitright
	set spelllang=en_us
	setlocal spell
	set splitbelow splitright

" Some mappings and shortcuts

	map <C-h> <C-w>h
	map <C-l> <C-w>l
	map <leader>h <C-w>h:q<CR>
	map <leader>j <C-w>j:q<CR>
	map <leader>k <C-w>k:q<CR>
	map <leader>l <C-w>l:q<CR>
	nnoremap c "_c
	map <C-t>k :tabr<cr>
	map <C-t>j :tabl<cr>
	map <C-t>h :tabp<cr>
	map <C-t>l :tabn<cr>

" Compile document, be it groff/LaTeX/markdown/etc.
	map <leader>C :w! \| !compiler <c-r>%<CR>
" Open corresponding .pdf/.html or preview
	map <leader>p :!opout <c-r>%<CR><CR>

" Runs a script that cleans out tex build files whenever I close out of a .tex file.
	autocmd VimLeave *.tex !texclear %

" Allow saving of files as sudo when I forgot to start vim using sudo.
	cmap w!! w !sudo tee > /dev/null %

" Insert new lines in Normal Mode
	nnoremap <leader>o mao<Esc>`a
	nnoremap <leader>O maO<Esc>`a

" Turn off search highlight
	nnoremap <leader><space> :nohlsearch<CR>

" Edit vimrc/zshrc and load vimrc bindings
	nnoremap <leader>ev :vsp ~/.config/nvim/init.vim<CR>
	nnoremap <leader>ez :vsp ~/.config/zsh/.zshrc<CR>
	nnoremap <leader>sv :source ~/.config/nvim/init.vim<CR>

" C compiling
	nnoremap <leader>co :!gcc -Wall -pedantic % -o %:r<CR>
	nnoremap <leader>cp :vsp<CR>:te<CR>a ./

" Open Terminal
	nnoremap <leader>t :te<CR>a

" Automatically deletes all trailing whitespace and newlines at end of file on save.
	autocmd BufWritePre * %s/\s\+$//e
	autocmd BufWritepre * %s/\n\+\%$//e

" Run xrdb whenever Xdefaults or Xresources are updated.
	autocmd BufWritePost *Xresources,*Xdefaults !xrdb %

" Turns off highlighting on the bits of code that are changed, so the line that is changed is highlighted but the actual text that has changed stands out on the line and is readable.
	if &diff
	    highlight! link DiffText MatchParen
	endif

function! CleanReg()
let regs=split('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/-"', '\zs')
for r in regs
  call setreg(r, [])
endfor
endfunction
nnoremap <leader>rr :call CleanReg()<CR>

" Sessions
let g:session_dir = '~/.config/nvim/vim-sessions'
let g:session#default_opener = 'edit'
let g:session#default_session = 'default'
exec 'nnoremap <Leader>ss :mks! ' . g:session_dir . '/*.vim<C-D><BS><BS><BS><BS><BS>'
exec 'nnoremap <Leader>sr :so ' . g:session_dir. '/*.vim<C-D><BS><BS><BS><BS><BS>'


"Plugins
call plug#begin('~/.local/share/nvim/plugged')

Plug 'junegunn/fzf', { 'do': { -> fzf#install() } }

Plug 'Shougo/deoplete.nvim', { 'do': ':UpdateRemotePlugins' }
Plug 'deoplete-plugins/deoplete-zsh'
Plug 'Shougo/neco-vim'
Plug 'Shougo/neco-syntax'

Plug 'lervag/vimtex'
let g:tex_flavor='latex'
let g:vimtex_view_method='zathura'
let g:vimtex_quickfix_latexlog = {'fix_paths':0}
let g:vimtex_quickfix_mode=0
let g:vimtex_compiler_progname = 'nvr'
let g:tex_conceal='abdmg'

" Syntax highlighting
Plug 'VebbNix/lf-vim'
Plug 'cespare/vim-toml'
" Plug 'arakashic/chromatica.nvim'
" let g:chromatica#libclang_path='/usr/lib/llvm-6.0/lib/libclang.so'
" let g:chromatica#enable_at_startup=1

"NOT NECESSARY
"Plug 'benwoodward/vimify', { 'branch': 'playlists' }
"let g:spotify_token='M2RhYWQ3Y2RjZTRmNDM0Yzg5MDlkOGNlNzBhMWEzMTk6YjBhMmM0NzU1ZGUwNDEzNGI5YzI4NjUxZjNlZWM2MTg='

""remap spotify search//OSS:  Alternativamente, [:-2] Rimuove l'ultimo byte di output di System() :)
"function!  SpotOpen()
"let Val=system("if [[ $(ps axch -o cmd:18,%mem,pid --sort -%mem|head|grep spotify) ]]; then echo ciao; else echo boh;fi")[:-2]
"if Val=~"boh"
	"exe "silent !nohup /snap/bin/spotify 2>&1 &"
	"exe "SpPlaylists"
"elseif Val=~"ciao"
	"exe "SpPlaylists"
"endif
"endfunction
"nnoremap <leader>sp :call SpotOpen()<CR>


" Utilities
Plug 'lukelbd/vim-scrollwrapped'
Plug 'wlemuel/vim-tldr'

Plug 'ptzz/lf.vim'
Plug 'rbgrouleff/bclose.vim'
let g:lf_command_override = 'lf -command "set hidden"'

Plug 'sirver/ultisnips'
    let g:UltiSnipsExpandTrigger = '<tab>'
    let g:UltiSnipsJumpForwardTrigger = '<tab>'
    let g:UltiSnipsJumpBackwardTrigger = '<s-tab>'
    let g:UltiSnipsSnippetDirectories = ['UltiSnips',$HOME.'/.config/nvim/UltiSnips']
    let g:UltiSnipsSnippetsDir = $HOME."/.config/nvim/UltiSnips"

Plug '907th/vim-auto-save'
let g:auto_save = 1

" Nerdcommenter
Plug 'scrooloose/nerdcommenter'
let g:NERDSpaceDelims = 1
let g:NERDCompactSexyComs = 1
let g:NERDCustomDelimiters = { 'lf': { 'left': '#' } } "fix lfrc comments


let g:netrw_browsex_viewer= "xdg-open"

" Color Settings
Plug 'chrisbra/Colorizer'
Plug 'morhetz/gruvbox'	"Gruvbox
Plug 'iCyMind/NeoSolarized' "NeoSolarized

" Vim-Airline
Plug 'vim-airline/vim-airline'
Plug 'vim-airline/vim-airline-themes'
let g:airline_powerline_fonts = 1

call plug#end()

"Post-Plugin

" Deoplete
	let g:deoplete#enable_at_startup = 1

" fzf config:
	nnoremap <silent> <C-p> :FZF -m<cr>
" Better command history with q:
	command! CmdHist call fzf#vim#command_history({'right': '40'})
	nnoremap q: :CmdHist<CR>
	let g:fzf_layout = { 'window': '10new' }

" fzf integration for vimtex
	nnoremap <localleader>lt :call vimtex#fzf#run()<cr>
" vimtex deoplete
	call deoplete#custom#var('omni', 'input_patterns', {
		\ 'tex': g:vimtex#re#deoplete
		\})

" ColorSchemes
	let g:airline_theme='base16_solarized'
	colorscheme NeoSolarized
	" colorscheme gruvbox
	set background=dark
	hi Normal ctermbg=NONE guibg=NONE
	hi NonText ctermbg=NONE guibg=NONE
	hi EndOfBuffer ctermbg=NONE guibg=NONE
	" hi LineNr ctermbg=NONE guibg=NONE
