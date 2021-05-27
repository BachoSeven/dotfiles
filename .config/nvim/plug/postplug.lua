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

	-- Enable lsp snippets for nvim-compe
	local capabilities = vim.lsp.protocol.make_client_capabilities()
	capabilities.textDocument.completion.completionItem.snippetSupport = true
	capabilities.textDocument.completion.completionItem.resolveSupport = {
		properties = {
			'documentation',
			'detail',
			'additionalTextEdits',
		}
	}

	-- Completion
	require'compe'.setup {
		enabled = true;
		autocomplete = true;
		debug = false;
		min_length = 1;
		preselect = 'enable';
		throttle_time = 80;
		source_timeout = 200;
		incomplete_delay = 400;
		max_abbr_width = 100;
		max_kind_width = 100;
		max_menu_width = 100;
		documentation = true;

		source = {
			path = true;
			buffer = true;
			nvim_lsp = true;
			ultisnips = true;
		};
	}
	_G.enter_with_snippets = function()
		local autocompleteOpen = vim.fn.pumvisible() == 1
		local autocompleteSelected = isAutocompleteSelected()

		if not autocompleteSelected then
			if autocompleteOpen then
				vim.fn['compe#close']('<C-e>')
			end

			return t "<cmd>lua return require('snippets').expand_or_advance(1)<CR>"
		elseif vim.api.nvim_eval([[ UltiSnips#CanExpandSnippet() ]]) == 1 then
			if autocompleteOpen then
				vim.fn['compe#close']('<C-e>')
			end

			return t "<cmd>call UltiSnips#ExpandSnippet()<CR>"
		else
			return vim.fn['compe#confirm']("\n")
		end
	end
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
lsp.texlab.setup {
	settings = {
		latex = {
			forwardSearch = {
				executable = "zathura",
				args = { "%p" },
				onSave = true
			},
			lint = { -- pretty useful
				onChange = true,
				onSave = true
			}
		}
	},
	on_attach = custom_lsp_attach
}
EOF
