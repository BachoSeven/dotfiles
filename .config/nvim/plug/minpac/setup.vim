" Plugin autosetup {{{
" Thanks to https://github.com/yukimemi/dotfiles/blob/master/.config/nvim/minpac.vim

set packpath^=$CACHE_HOME
let s:package_home = $CACHE_HOME . '/pack/minpac'
let s:minpac_dir = s:package_home . '/opt/minpac'
let s:plugpac_dir = $CACHE_HOME . '/plugpac'
let s:minpac_download = 0
if has('vim_starting')
  if !isdirectory(expand(s:minpac_dir))
    echo "Install minpac ..."
    execute 'silent! !git clone --depth 1 https://github.com/k-takata/minpac ' . s:minpac_dir
    let s:minpac_download = 1
  endif
  if !filereadable(expand(s:plugpac_dir . '/autoload/plugpac.vim'))
    echo "Install plugpac ..."
    execute 'silent! !git clone --depth 1 https://github.com/yukimemi/plugpac.vim ' . s:plugpac_dir . '/autoload'
  endif
  execute 'set runtimepath^=' . fnamemodify(s:plugpac_dir, ':p')
  let g:plugpac_cfg_path = $VIM_PATH . '/rc'
endif

function! IsInstalled(name) abort
  return !empty(globpath(&pp, "pack/minpac/*/" . a:name))
endfunction

" Plugin list
call plugpac#begin()
source $VIM_PATH/minpac_plugins.vim
call plugpac#end()

" Install on initial setup.
if s:minpac_download
  PackInstall
endif

" }}}
