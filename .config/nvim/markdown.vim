"" In plugin folder:
" 	Plug 'iamcco/markdown-preview.nvim', { 'do': { -> mkdp#util#install() }, 'for': ['markdown', 'vim-plug']}

"" Configuration
	aug specify_filetype
	    au!
	    au BufRead,BufNewFile *.md se filetype=markdown
	aug END

" Enable spell-checking for certain files
	au FileType markdown setl spell spelllang=en_us

" Limit line length for text files
	au FileType text,markdown,tex setl textwidth=180

""""""""""""""""""""""""""""""""""""
" Markdown Preview Plugin Settings "
""""""""""""""""""""""""""""""""""""
" Contains CSS for markdown + page + higlight
	let g:mkdp_markdown_css = '~/.config/nvim/static/markdown-preview/customStyle.css'

" Trick plugin into hosting colors.css so we get nice themes
	let g:mkdp_port = '3456'

" Markdown preview
	nmap <Leader>md <Plug>MarkdownPreviewToggle
