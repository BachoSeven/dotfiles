" Vimscript
aug init-vim
  au! BufNewFile,BufFilePre,BufRead *.vim se ft=vim
    \ shiftwidth=2 tabstop=2 softtabstop=2
    \ foldmethod=marker
aug END

" zsh
aug init-zsh
  au! BufNewFile,BufFilePre,BufRead *.zsh se ft=zsh
    \ shiftwidth=2 tabstop=2 softtabstop=2
aug END

" markdown
aug init-md
  au! BufNewFile,BufFilePre,BufRead *.markdown,*.md,*.mdown,*.mkd,*.mkdn,*.mdwn  set ft=markdown
    \ expandtab shiftwidth=4 tabstop=4 softtabstop=4
    \ formatoptions+=croq
aug END

" Set some options for scripts in general
	au FileType sh,zsh,octave se shiftwidth=2 tabstop=2 softtabstop=2

" enable accessing GNU Octave documentation from vim using GNU TexInfo (lol)
  let s:conditionalEnd = '\(([^()]*\)\@!\<end\>\([^()]*)\)\@!'
  au FileType octave let b:match_words = '\<if\>\|\<while\>\|\<for\>\|\<switch\>:' .
       \ s:conditionalEnd . ',\<if\>:\<elseif\>:\<else\>:' . s:conditionalEnd
  au FileType octave au TermOpen * startinsert
  au FileType octave setl keywordprg=:te\ info\ octave\ --init-file\ ~/.config/texinfo/config\ --index-search

" Enable spell-checking for certain files
	au FileType markdown setl spell spelllang=en_us

" Limit line length for text files
	au FileType text,markdown,tex setl textwidth=180

" Contains CSS for markdown + page + highlight
	let g:mkdp_markdown_css = '/home/fra/.config/nvim/static/markdown-preview/customStyle.css'

" Trick plugin into hosting colors.css so we get nice themes
	let g:mkdp_highlight_css = '/home/fra/.config/nvim/colors.css'
" set to 1, preview server available to others in your network
" by default, the server listens on localhost (127.0.0.1)
  let g:mkdp_open_to_the_world = 1
	let g:mkdp_port = '3456'

" Markdown preview
	nmap <Leader>md <Plug>MarkdownPreviewToggle
