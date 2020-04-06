call plug#begin('~/.local/share/nvim/plugged')

"set shell to zsh
set shell=/usr/bin/zsh

Plug 'wlemuel/vim-tldr'

Plug 'junegunn/fzf'
  nnoremap <silent> <C-p> :FZF -m<cr>
" Better command history with q:
  command! CmdHist call fzf#vim#command_history({'right': '40'})
  nnoremap q: :CmdHist<CR>
  let g:fzf_layout = { 'window': '10new' }



set hidden
Plug 'Shougo/deoplete.nvim', { 'do': ':UpdateRemotePlugins' }
let g:deoplete#enable_at_startup = 1
"deoplete_zsh
Plug 'deoplete-plugins/deoplete-zsh'
"vim completion with deoplete
Plug 'Shougo/neco-vim'
"mail_deoplete_stuff
Plug 'paretje/deoplete-notmuch', {'for': 'mail'}
let g:deoplete#sources#notmuch#command = ['notmuch', 'address', '--format=json', '--deduplicate=address', '*']
Plug 'fszymanski/deoplete-abook'
"misc_deoplete
Plug 'Shougo/neco-syntax'


Plug 'preservim/nerdtree'

map <C-n> :call NERDTreeToggleAndFind()<cr>
"map <C-n> :NERDTreeToggle<CR>
function! NERDTreeToggleAndFind()
    if (exists('t:NERDTreeBufName') && bufwinnr(t:NERDTreeBufName) != -1)
      execute ':NERDTreeClose'
    else
      execute ':NERDTreeFind'
    endif
  endfunction

"close vim if nerdtree is the last thing open
autocmd bufenter * if (winnr("$") == 1 && exists("b:NERDTree") && b:NERDTree.isTabTree()) | q | endif
"let NERDTreeShowHidden=1
let g:NERDTreeMinimalUI = 1
autocmd StdinReadPre * let s:std_in=1
autocmd VimEnter * if argc() == 0 && !exists("s:std_in") | NERDTree | endif

"try to experiment with tabs:
map <C-t>k :tabr<cr>
map <C-t>j :tabl<cr>
map <C-t>h :tabp<cr>
map <C-t>l :tabn<cr>

"Command for clearing all register entries&REMOVING them form :reg
function! CleanReg()
let regs=split('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/-"', '\zs')
for r in regs
  call setreg(r, [])
endfor
endfunction
nnoremap <leader>rr :call CleanReg()<CR>

"Vim-Airline! 
Plug 'vim-airline/vim-airline'
Plug 'vim-airline/vim-airline-themes'
let g:airline_theme='base16_solarized'
let g:airline_powerline_fonts = 1

"Todos :))))
Plug 'aserebryakov/vim-todo-lists'
"syntax highlighting
Plug 'arakashic/chromatica.nvim'
Plug 'VebbNix/lf-vim'
Plug 'cespare/vim-toml'
let g:chromatica#libclang_path='/usr/lib/llvm-6.0/lib/libclang.so'
let g:chromatica#enable_at_startup=1

"universal luke compiler:
" Compile document, be it groff/LaTeX/markdown/etc.
	map <leader>C :w! \| !compiler <c-r>%<CR>

" Shortcutting split navigation, saving a keypress:
	map <C-h> <C-w>h
	"map <C-j> <C-w>j doesn't work..
	"map <C-k> <C-w>k
	map <C-l> <C-w>l
	map <leader>h <C-w>h:q<CR>
	map <leader>j <C-w>j:q<CR>
	map <leader>k <C-w>k:q<CR>
	map <leader>l <C-w>l:q<CR>

"Remap \y to COPYYYYYY
nnoremap <leader>Y yy:!echo '<C-r>"'<bar>xclip -sel clip<CR><CR>
nnoremap <leader>yw yw:!echo '<C-r>"'<bar>xclip -sel clip<CR><CR>
xnoremap <leader>y y:!echo '<C-r>"'<bar>xclip -sel clip<CR><CR>

"remapping for insert new line without leaving NormMode & staying where you
"are
nnoremap <leader>o mao<Esc>`a
nnoremap <leader>O maO<Esc>`a


" turn off search highlight
nnoremap <leader><space> :nohlsearch<CR>

" Allow saving of files as sudo when I forgot to start vim using sudo.
cmap w!! w !sudo tee > /dev/null %

" edit vimrc/zshrc and load vimrc bindings
nnoremap <leader>ev :vsp ~/.config/nvim/init.vim<CR>
nnoremap <leader>ez :vsp ~/.config/zsh/.zshrc<CR>
nnoremap <leader>sv :source ~/.config/nvim/init.vim<CR>
"non funzia...
nnoremap <leader>sz :!source ~/.zshrc

"C compiling
nnoremap <leader>co :!gcc -Wall -pedantic % -o %:r<CR>
nnoremap <leader>cp :vsp<CR>:te<CR>a ./

"Open Terminal
nnoremap <leader>t :te<CR>a

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


"FIX annoying cursor movement while updown,backforward scrolling
Plug 'lukelbd/vim-scrollwrapped'

"tex options
Plug 'lervag/vimtex'
let g:tex_flavor='latex'
let g:vimtex_view_method='zathura'
let g:vimtex_quickfix_latexlog = {'fix_paths':0}
let g:vimtex_quickfix_mode=0
let g:vimtex_compiler_progname = 'nvr'
set conceallevel=1
let g:tex_conceal='abdmg'

"plugin for lf file manager
    Plug 'ptzz/lf.vim'
    Plug 'rbgrouleff/bclose.vim'
	let g:lf_command_override = 'lf -command "set hidden"'


"sessions
let g:session_dir = '~/.config/nvim/vim-sessions'
let g:session#default_opener = 'edit'
let g:session#default_session = 'default'
exec 'nnoremap <Leader>ss :mks! ' . g:session_dir . '/*.vim<C-D><BS><BS><BS><BS><BS>'
exec 'nnoremap <Leader>sr :so ' . g:session_dir. '/*.vim<C-D><BS><BS><BS><BS><BS>'


"line numbers
set number
set relativenumber
"Nerd Commenting
Plug 'scrooloose/nerdcommenter'

"Color Settings
set termguicolors
Plug 'iCyMind/NeoSolarized' "NeoSolarized
colorscheme NeoSolarized
set background=dark
"Transparent Background settings
au ColorScheme * hi Normal ctermbg=none guibg=none

"lilypond config
filetype off
set runtimepath+=/usr/share/lilypond/2.18.2/vim/
filetype on
syntax on

"randomstuff
set wildmenu
set wildmode=longest,list,full
set autoindent
set cursorline
set incsearch           " search as characters are entered

Plug 'sirver/ultisnips'
    let g:UltiSnipsExpandTrigger = '<tab>'
    let g:UltiSnipsJumpForwardTrigger = '<tab>'
    let g:UltiSnipsJumpBackwardTrigger = '<s-tab>'
    let g:UltiSnipsSnippetDirectories = ['UltiSnips',$HOME.'/.config/nvim/UltiSnips']
    let g:UltiSnipsSnippetsDir = $HOME."/.config/nvim/UltiSnips"

"set browser
let g:netrw_browsex_viewer= "xdg-open"

setlocal spell
set spelllang=en_us

Plug '907th/vim-auto-save'
let g:auto_save = 1
call plug#end()
