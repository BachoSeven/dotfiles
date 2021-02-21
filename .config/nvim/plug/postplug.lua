lua << EOF
	-- Simplify the creation of mappings
	local function map(mode, lhs, rhs, opts)
	  local options = {noremap = true}
	  if opts then options = vim.tbl_extend('force', options, opts) end
	  vim.api.nvim_set_keymap(mode, lhs, rhs, options)
	end

	-- Aliases
	local lsp = require 'lspconfig'

	-- Lsp
	-- Enable servers with autcompletion via completion-nvim
	lsp.bashls.setup{
		on_attach=require'completion'.on_attach,
		cmd={"bash-language-server", "start"},
		cmd_env={GLOB_PATTERN="*@(.sh|.inc|.bash|.command)"},
		filetypes = {"sh"}
	}
EOF
