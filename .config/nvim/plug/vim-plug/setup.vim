" Plug Setup {{{
" options relating to vim-plug automation, thanks https://github.com/kelp/nvim/blob/master/home/.config/nvim/init.vim


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
