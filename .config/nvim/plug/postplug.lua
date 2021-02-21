lua << EOF
	-- LSP
	-- Aliases
	local lsp = require 'lspconfig'

	-- Enable servers with autcompletion via completion-nvim
	lsp.bashls.setup{
		on_attach=require'completion'.on_attach,
		cmd={"bash-language-server", "start"},
		cmd_env={GLOB_PATTERN="*@(.sh|.inc|.bash|.command)"},
		filetypes = {"sh"}
	}
EOF
