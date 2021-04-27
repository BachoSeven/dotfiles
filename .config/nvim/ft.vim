" Vimscript
aug init-vim
  au! BufNewFile,BufFilePre,BufRead *.vim se ft=vim
    \ shiftwidth=2 tabstop=2 softtabstop=2
    \ foldmethod=marker
aug END

" markdown
aug init-md
  au! BufNewFile,BufFilePre,BufRead *.markdown,*.md,*.mdown,*.mkd,*.mkdn,*.mdwn  se ft=markdown
    \ expandtab shiftwidth=2 tabstop=2 softtabstop=2
    \ formatoptions+=croq
aug END

" Enable completion-nvim (for snippets)
"" this might take ~12ms
aug ft-snipcomp
	au!
	au FileType tex,c,cpp,markdown,text,sh,zsh,snippets,octave,conf lua require'completion'.on_attach()
aug END

" Set some general options
	au FileType sh,zsh,octave,c se shiftwidth=2 tabstop=2 softtabstop=2

" enable accessing GNU Octave documentation from vim using GNU TexInfo (lol)
  let s:conditionalEnd = '\(([^()]*\)\@!\<end\>\([^()]*)\)\@!'
  au FileType octave let b:match_words = '\<if\>\|\<while\>\|\<for\>\|\<switch\>:' .
       \ s:conditionalEnd . ',\<if\>:\<elseif\>:\<else\>:' . s:conditionalEnd
  au FileType octave au TermOpen * startinsert
  au FileType octave setl keywordprg=:te\ info\ octave\ --init-file\ ~/.config/texinfo/config\ --index-search

" Enable spell-checking for certain files
	au FileType markdown,mail setl spell spelllang=en_us

" Limit line length for text files
	au FileType text,markdown,tex setl textwidth=180

" Contains CSS for markdown + page + highlight
	let g:mkdp_markdown_css = '/home/fra/.config/nvim/mkdp/customStyle.css'

" Use vieb
	let g:mkdp_browser = 'vieb'

" Trick plugin into hosting colors.css so we get nice themes
	let g:mkdp_highlight_css = '/home/fra/.config/nvim/mkdp/colors.css'
" set to 1, preview server available to others in your network
" by default, the server listens on localhost (127.0.0.1)
  let g:mkdp_open_to_the_world = 1
	let g:mkdp_port = '3456'

" Markdown preview
	nmap <Leader>md <Plug>MarkdownPreviewToggle
