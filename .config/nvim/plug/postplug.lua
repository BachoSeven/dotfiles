lua << EOF
-- Easier mappings
local map = function(mode, key, result)
	vim.api.nvim_buf_set_keymap(0, mode, key, "<cmd>lua " .. result .. "<CR>", {noremap = true, silent = true})
end

-- LSP
-- Aliases
local lsp = require 'lspconfig'

-- Custom attach function
local custom_lsp_attach = function(client)
	-- keybindings
	map('n','K','vim.lsp.buf.hover()')
	map('n','<c-]>','vim.lsp.buf.definition()')
	map('n','gD','vim.lsp.buf.declaration()')
	map('n','gr','vim.lsp.buf.references()')
	map('n','gs','vim.lsp.buf.signature_help()')
	map('n','gi','vim.lsp.buf.implementation()')
	map('n','gt','vim.lsp.buf.type_definition()')
	map('n','<leader>gw','vim.lsp.buf.document_symbol()')
	map('n','<leader>gW','vim.lsp.buf.workspace_symbol()')

	-- Fuzzy integration
	require('lspfuzzy').setup {}

	-- completion-nvim callback
	require('completion').on_attach()
end

-- Servers
lsp.bashls.setup{
	cmd={"bash-language-server", "start"},
	cmd_env={GLOB_PATTERN="*@(.sh|.inc|.bash|.command)"},
	filetypes = {"sh"},

	on_attach = custom_lsp_attach
}
lsp.vimls.setup{
	on_attach = custom_lsp_attach
}
EOF
