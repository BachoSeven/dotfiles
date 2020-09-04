" Vimscript
aug initvim-vim
  au! BufNewFile,BufFilePre,BufRead *.vim se filetype=vim
    \ expandtab shiftwidth=2 tabstop=2 softtabstop=2
    \ foldmethod=marker
aug END

" bash
aug initvim-bash
  au! BufNewFile,BufFilePre,BufRead *.sh,*.zsh se filetype=sh
    \ expandtab shiftwidth=2 tabstop=2 softtabstop=2
aug END

" markdown
aug initvim-md
  au! BufNewFile,BufFilePre,BufRead *.md se filetype=markdown
    \ expandtab shiftwidth=4 tabstop=4 softtabstop=4
    \ formatoptions+=croq
aug END

" Enable spell-checking for certain files
	au FileType markdown setl spell spelllang=en_us

" Limit line length for text files
	au FileType text,markdown,tex setl textwidth=180

" Contains CSS for markdown + page + highlight
	let g:mkdp_markdown_css = '~/.config/nvim/static/markdown-preview/customStyle.css'

" Trick plugin into hosting colors.css so we get nice themes
	let g:mkdp_port = '3456'

" Markdown preview
	nmap <Leader>md <Plug>MarkdownPreviewToggle
