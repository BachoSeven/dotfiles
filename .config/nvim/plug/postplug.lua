-- Easier mappings
local map = function(mode, key, result)
	vim.api.nvim_buf_set_keymap(0, mode, key, "<cmd>lua " .. result .. "<CR>", {noremap = true, silent = true})
end

-- LSP
-- Aliases
local lsp = require'lspconfig'

-- Custom attach function
local custom_lsp_attach = function(client,bufnr)
	-- Fuzzy integration
	require'lspfuzzy'.setup {}

	local function buf_set_option(...) vim.api.nvim_buf_set_option(bufnr, ...) end
	buf_set_option('omnifunc', 'v:lua.vim.lsp.omnifunc')

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
end

-- Completion
local cmp = require'cmp'
cmp.setup({
	snippet = {
		expand = function(args)
			vim.fn["UltiSnips#Anon"](args.body)
		end,
	},
	mapping = {
		['<C-b>'] = cmp.mapping(cmp.mapping.scroll_docs(-4), { 'i', 'c' }),
		['<C-f>'] = cmp.mapping(cmp.mapping.scroll_docs(4), { 'i', 'c' }),
		['<C-Space>'] = cmp.mapping(cmp.mapping.complete(), { 'i', 'c' }),
		['<C-y>'] = cmp.config.disable, -- Specify `cmp.config.disable` if you want to remove the default `<C-y>` mapping.
		['<C-e>'] = cmp.mapping({
			i = cmp.mapping.abort(),
			c = cmp.mapping.close(),
		}),
		['<CR>'] = cmp.mapping.confirm({ select = true }), -- Accept currently selected item. Set `select` to `false` to only confirm explicitly selected items.
	},
	sources = cmp.config.sources({
		{ name = 'omni', },
		{ name = 'nvim_lsp' },
		{ name = 'ultisnips' },
		{ name = 'buffer' },
	})
})

cmp.setup.cmdline('/', {
	sources = {
		{ name = 'buffer' }
	}
})

cmp.setup.cmdline(':', {
	sources = cmp.config.sources({
		{ name = 'path' }
	}, {
		{ name = 'cmdline' }
	})
})

-- Enable lsp snippets for completions
local capabilities = require('cmp_nvim_lsp').default_capabilities(vim.lsp.protocol.make_client_capabilities())

-- Servers
local ionide=require'ionide'
ionide.setup {
	autostart = true,
	on_attach = custom_lsp_attach,
	capabilities = capabilities
}
lsp.bashls.setup {
	cmd={"bash-language-server", "start"},
	cmd_env={GLOB_PATTERN="*@(.sh|.inc|.bash|.command)"},
	filetypes = {"sh"},

	on_attach = custom_lsp_attach,
	capabilities = capabilities
}
lsp.vimls.setup {
	on_attach = custom_lsp_attach,
	capabilities = capabilities
}
lsp.tsserver.setup {
	on_attach = custom_lsp_attach,
	capabilities = capabilities
}
lsp.eslint.setup {
	on_attach = custom_lsp_attach,
	capabilities = capabilities
}
lsp.cssls.setup {
	on_attach = custom_lsp_attach,
	capabilities = capabilities
}
lsp.html.setup {
	on_attach = custom_lsp_attach,
	capabilities = capabilities
}
lsp.jsonls.setup {
	on_attach = custom_lsp_attach,
	capabilities = capabilities
}
lsp.emmet_ls.setup {
	on_attach = custom_lsp_attach,
	capabilities = capabilities
}
lsp.julials.setup{
	cmd={ "julia", "--startup-file=no", "--history-file=no", "-e", 'ls_install_path = joinpath(\n        get(DEPOT_PATH, 1, joinpath(homedir(), ".local")), "share", "julia", "environments", "v1.9"\n    )\n    pushfirst!(LOAD_PATH, ls_install_path)\n    using LanguageServer\n    popfirst!(LOAD_PATH)\n    depot_path = get(ENV, "JULIA_DEPOT_PATH", "")\n    project_path = let\n        dirname(something(\n            ## 1. Finds an explicitly set project (JULIA_PROJECT)\n            Base.load_path_expand((\n                p = get(ENV, "JULIA_PROJECT", nothing);\n                p === nothing ? nothing : isempty(p) ? nothing : p\n            )),\n            ## 2. Look for a Project.toml file in the current working directory,\n            ##    or parent directories, with $HOME as an upper boundary\n            Base.current_project(),\n            ## 3. First entry in the load path\n            get(Base.load_path(), 1, nothing),\n            ## 4. Fallback to default global environment,\n            ##    this is more or less unreachable\n            Base.load_path_expand("@v#.#"),\n        ))\n    end\n    @info "Running language server" VERSION pwd() project_path depot_path\n    server = LanguageServer.LanguageServerInstance(stdin, stdout, project_path, depot_path)\n    server.runlinter = true\n    run(server)\n  ' },
	on_attach = custom_lsp_attach,
	capabilities = capabilities
}
lsp.texlab.setup {
	settings = {
		latex = {
			forwardSearch = {
				executable = "zathura",
				args = { "%p" },
				onSave = true
			},
			lint = {
				onChange = true,
				onSave = true
			}
		}
	},
	on_attach = custom_lsp_attach,
	capabilities = capabilities
}
require("auto-save").setup {
	condition = function(buf)
		local fn = vim.fn
		local utils = require("auto-save.utils.data")

		if
			fn.getbufvar(buf, "&modifiable") == 1 and
			utils.not_in(fn.getbufvar(buf, "&filetype"), {}) and
			fn.getbufvar(buf, "&filetype") == "tex" then
			return true -- met condition(s), can save
		end
		return false -- can't save
	end,
}
vim.api.nvim_set_keymap("n", "<leader>a", ":ASToggle<CR>", {})

-- Treesitter
require("nvim-treesitter.configs").setup({
	ensure_installed = { "c", "go", "vim", "latex", "matlab", "markdown", "toml", "bash", "html", "javascript", "json", "julia" },
	highlight = {
		enable = true,
		disable = { "latex" },
		additional_vim_regex_highlighting = false,
	},
})

-- Lean
require('lean').setup {
  abbreviations = { builtin = true },
  lsp = { on_attach = custom_lsp_attach },
  lsp3 = { on_attach = custom_lsp_attach },
  mappings = true,
  capabilities = capabilities
}
