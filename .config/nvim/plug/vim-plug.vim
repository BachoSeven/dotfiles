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
	execute '!curl -fLo ' . g:plug_location . g:autoload_plug . ' --create-dirs ' . g:plug_github_url
endif

" Run PlugInstall if there are missing plugins
au VimEnter * if len(filter(values(g:plugs), '!isdirectory(v:val.dir)'))
	\| PlugInstall --sync | source $MYVIMRC
\| endif

" Shortcut to upgrade all plugins, including Plug
com! PU PlugUpdate | PlugUpgrade

" }}}
" {{{ Plugins
cal plug#begin(g:plugin_location)

" Utilities
	Plug 'ptzz/lf.vim'
	Plug 'voldikss/vim-floaterm'
	Plug 'junegunn/fzf.vim'
	Plug 'scrooloose/nerdcommenter'
	Plug 'mbbill/undotree', { 'on': 'UndotreeToggle' }
	Plug 'junegunn/goyo.vim', { 'on': 'Goyo' }
	Plug 'junegunn/limelight.vim', { 'on': 'Goyo' }
	Plug 'jamessan/vim-gnupg' " Automatically decrypt on buffer enter
	Plug 'mhinz/vim-startify'
	Plug 'jdhao/better-escape.vim'
	Plug 'tpope/vim-speeddating'
	" Plug 'ludovicchabant/vim-gutentags'

" Markdown
"" Live Preview
	Plug 'iamcco/markdown-preview.nvim', { 'do': { -> mkdp#util#install() }, 'for': ['markdown', 'vim-plug'] }
"" Markdown Table of Contents
	Plug 'mzlogin/vim-markdown-toc', { 'for': ['markdown', 'vim-plug'] }

" Various filetypes support
	Plug 'Konfekt/vim-office'
	Plug 'HiPhish/info.vim'
	Plug 'chrisbra/csv.vim', { 'for': ['csv', 'vim-plug'] }

" Html
	Plug 'mattn/emmet-vim'

" F#
	Plug 'ionide/Ionide-vim'

" Go
	Plug 'fatih/vim-go', { 'do': ':GoUpdateBinaries' }

" Julia
	Plug 'JuliaEditorSupport/julia-vim'

" Lean
	Plug 'Julian/lean.nvim'
	Plug 'nvim-lua/plenary.nvim'
" For Lean switch support
	Plug 'andrewradev/switch.vim'

" Lsp
	Plug 'neovim/nvim-lspconfig'
"	Neovim completion
	Plug 'hrsh7th/cmp-nvim-lsp'
	Plug 'hrsh7th/cmp-buffer'
	Plug 'hrsh7th/cmp-path'
	Plug 'hrsh7th/cmp-cmdline'
	Plug 'hrsh7th/nvim-cmp'
" Fuzzy lsp integration
	Plug 'ojroques/nvim-lspfuzzy'

" Treesitter
	Plug 'nvim-treesitter/nvim-treesitter', {'do': ':TSUpdate'}

" Copilot
	Plug 'github/copilot.vim'

" Vimtex
	Plug 'lervag/vimtex'
	Plug 'sirver/ultisnips'
" nvim-cmp integration
	Plug 'quangnguyen30192/cmp-nvim-ultisnips'
" Expand vim's % motion beyond just brackets and quotes
	" Plug 'andymass/vim-matchup'
	Plug 'okuuva/auto-save.nvim'

" Appearance
"" Color highlighting
	Plug 'ap/vim-css-color'
"" Colorschemes
	Plug 'dylanaraps/wal.vim'
	Plug 'sainnhe/gruvbox-material'
	" Plug 'gruvbox-community/gruvbox'
	" Plug 'overcache/NeoSolarized'
"" Lightline
	Plug 'itchyny/lightline.vim'
"" Syntax highlighting
	Plug 'camnw/lf-vim', { 'as': 'lf-syntax' }
	Plug 'McSinyx/vim-octave'
	Plug 'jceb/vim-orgmode'

cal plug#end()
" }}}
