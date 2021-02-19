" Plug Setup {{{
" vim-plug automation, see the wiki: https://github.com/junegunn/vim-plug/wiki/tips
" Thanks to github.com/rickprice for xdg directories integration.

" Set up variables
let g:xdg_config_home = $XDG_CONFIG_HOME
let g:xdg_data_home = $XDG_DATA_HOME
let g:plug_github_url = "https://raw.githubusercontent.com/junegunn/vim-plug/master/plug.vim"
let g:autoload_plug = '/autoload/plug.vim'

" Find correct locations
if len(g:xdg_data_home) == 0
		let g:plug_location = $HOME . '/.local/share/nvim/site'
		let g:plugin_location = $HOME . '/.local/shared/nvim/plugged'
else
		let g:plug_location= g:xdg_data_home . '/nvim/site'
		let g:plugin_location = g:xdg_data_home . '/nvim/plugged'
endi

" Install vim-plug if not found
if empty(glob(g:plug_location . g:autoload_plug))
    silent '!curl -fLo ' . g:plug_location . g:autoload_plug . ' --create-dirs ' . g:plug_github_url
endif

" Run PlugInstall if there are missing plugins
autocmd VimEnter * if len(filter(values(g:plugs), '!isdirectory(v:val.dir)'))
  \| PlugInstall --sync | source $MYVIMRC
\| endif

" Shortcut to upgrade all plugins, including Plug
com! PU PlugUpdate | PlugUpgrade

" }}}
