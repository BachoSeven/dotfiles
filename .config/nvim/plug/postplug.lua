lua << EOF
	-- LSP
	-- Aliases
	local lsp = require 'lspconfig'

	-- Custom attach function
	local custom_lsp_attach = function(client)
		-- keybindings
		vim.api.nvim_buf_set_keymap(0, 'n', 'K', '<cmd>lua vim.lsp.buf.hover()<CR>', {noremap = true})
		-- completion-nvim callback
		require('completion').on_attach()
	end

	-- Enable servers with autcompletion via completion-nvim
	lsp.bashls.setup{
		cmd={"bash-language-server", "start"},
		cmd_env={GLOB_PATTERN="*@(.sh|.inc|.bash|.command)"},
		filetypes = {"sh"},

		on_attach = custom_lsp_attach
	}
EOF
