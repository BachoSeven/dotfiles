" {{{ Plugins
cal plug#begin('~/.local/share/nvim/plugged')

"" Utilities
	Pack 'ptzz/lf.vim'
	Pack 'rbgrouleff/bclose.vim'
	Pack 'junegunn/fzf'
	Pack 'junegunn/fzf.vim'
	Pack 'scrooloose/nerdcommenter'
	Pack 'mbbill/undotree', {'on': 'UndotreeToggle'}
	Pack 'junegunn/goyo.vim'
	Pack 'junegunn/limelight.vim'
	Pack 'jamessan/vim-gnupg'
  Pack 'mhinz/vim-startify'
	Pack 'jdhao/better-escape.vim'
	Pack '907th/vim-auto-save' " toggle with :AutoSaveToggle

"" Markdown
" Live Preview
	Pack 'iamcco/markdown-preview.nvim', { 'do': { -> mkdp#util#install() }, 'for': ['markdown', 'vim-plug'] }
" Markdown Table of Contents
	Pack 'mzlogin/vim-markdown-toc', { 'for': ['markdown', 'vim-plug'] }

" Vimtex
  Pack 'lervag/vimtex'
  Pack 'sirver/ultisnips'

" Various filetypes support
	Pack 'Konfekt/vim-office'
	Pack 'alx741/vinfo'
	Pack 'chrisbra/csv.vim', { 'for': ['csv', 'vim-plug'] }

" Autocompletion
	Pack 'Shougo/deoplete.nvim', { 'do': ':UpdateRemotePackins' }
	Pack 'Shougo/neco-vim'
	Pack 'Shougo/neco-syntax'

" Expand vim's `%` motion beyond just brackets and quotes
  Pack 'andymass/vim-matchup'

"" Appearance
" Color highlighting
	Pack 'ap/vim-css-color'

" Colorschemes
	Pack 'dylanaraps/wal.vim'
	Pack 'gruvbox-community/gruvbox'
	" Pack 'overcache/NeoSolarized' 	" NeoSolarized

" Airline
	Pack 'vim-airline/vim-airline'
	Pack 'vim-airline/vim-airline-themes'
  Pack 'lambdalisue/battery.vim'

" Syntax highlighting
	Pack 'VebbNix/lf-vim'
	Pack 'cespare/vim-toml'
	Pack 'bfrg/vim-cpp-modern'
  Pack 'McSinyx/vim-octave', {'for': 'octave'}

" Icons
	Pack 'ryanoasis/vim-devicons'

cal plug#end()

" }}}
