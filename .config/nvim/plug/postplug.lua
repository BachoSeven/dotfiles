-- Easier mappings
local map = function(mode, key, result)
	vim.api.nvim_buf_set_keymap(0, mode, key, "<cmd>lua " .. result .. "<CR>", {noremap = true, silent = true})
end

-- LSP
-- (nvim 0.11+ LSP API: vim.lsp.config + vim.lsp.enable)

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
	map('n','<leader>ca','vim.lsp.buf.code_action()')
	map('n','<leader>rn','vim.lsp.buf.rename()')
	-- map('n','<leader>M','vim.lsp.buf.format()')
	vim.keymap.set('n','<leader>ee',vim.diagnostic.open_float,{noremap=true,silent=true})
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
		['<C-n>'] = cmp.mapping.select_next_item(),
		['<C-p>'] = cmp.mapping.select_prev_item(),
		['<C-b>'] = cmp.mapping(cmp.mapping.scroll_docs(-4), { 'i', 'c' }),
		['<C-f>'] = cmp.mapping(cmp.mapping.scroll_docs(4), { 'i', 'c' }),
		['<C-Space>'] = cmp.mapping(cmp.mapping.complete(), { 'i', 'c' }),
		['<C-y>'] = cmp.config.disable,
		['<C-e>'] = cmp.mapping({
			i = cmp.mapping.abort(),
			c = cmp.mapping.close(),
		}),
		['<CR>'] = cmp.mapping.confirm({ select = true }),
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
vim.lsp.config('ionide', {
	on_attach = custom_lsp_attach,
	capabilities = capabilities
})
vim.lsp.enable('ionide')
vim.lsp.config('bashls', {
	cmd={"bash-language-server", "start"},
	cmd_env={GLOB_PATTERN="*@(.sh|.inc|.bash|.command)"},
	filetypes = {"sh"},

	on_attach = custom_lsp_attach,
	capabilities = capabilities
})
vim.lsp.enable('bashls')
vim.lsp.config('vimls', {
	on_attach = custom_lsp_attach,
	capabilities = capabilities
})
vim.lsp.enable('vimls')
vim.lsp.config('ts_ls', {
	on_attach = custom_lsp_attach,
	capabilities = capabilities
})
vim.lsp.enable('ts_ls')
vim.lsp.config('eslint', {
	on_attach = custom_lsp_attach,
	capabilities = capabilities
})
vim.lsp.enable('eslint')
vim.lsp.config('cssls', {
	on_attach = custom_lsp_attach,
	capabilities = capabilities
})
vim.lsp.enable('cssls')
vim.lsp.config('html', {
	on_attach = custom_lsp_attach,
	capabilities = capabilities
})
vim.lsp.enable('html')
vim.lsp.config('jsonls', {
	on_attach = custom_lsp_attach,
	capabilities = capabilities
})
vim.lsp.enable('jsonls')
vim.lsp.config('emmet_ls', {
	on_attach = custom_lsp_attach,
	capabilities = capabilities
})
vim.lsp.enable('emmet_ls')
vim.lsp.config('julials', {
	cmd={ "julia", "--startup-file=no", "--history-file=no", "-e", 'ls_install_path = joinpath(\n        get(DEPOT_PATH, 1, joinpath(homedir(), ".local")), "share", "julia", "environments", "v1.9"\n    )\n    pushfirst!(LOAD_PATH, ls_install_path)\n    using LanguageServer\n    popfirst!(LOAD_PATH)\n    depot_path = get(ENV, "JULIA_DEPOT_PATH", "")\n    project_path = let\n        dirname(something(\n            ## 1. Finds an explicitly set project (JULIA_PROJECT)\n            Base.load_path_expand((\n                p = get(ENV, "JULIA_PROJECT", nothing);\n                p === nothing ? nothing : isempty(p) ? nothing : p\n            )),\n            ## 2. Look for a Project.toml file in the current working directory,\n            ##    or parent directories, with $HOME as an upper boundary\n            Base.current_project(),\n            ## 3. First entry in the load path\n            get(Base.load_path(), 1, nothing),\n            ## 4. Fallback to default global environment,\n            ##    this is more or less unreachable\n            Base.load_path_expand("@v#.#"),\n        ))\n    end\n    @info "Running language server" VERSION pwd() project_path depot_path\n    server = LanguageServer.LanguageServerInstance(stdin, stdout, project_path, depot_path)\n    server.runlinter = true\n    run(server)\n  ' },
	on_attach = custom_lsp_attach,
	capabilities = capabilities
})
vim.lsp.enable('julials')
vim.lsp.config('texlab', {
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
})
vim.lsp.enable('texlab')
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
require("nvim-treesitter").setup({})
require("nvim-treesitter").install({ "c", "go", "vim", "latex", "matlab", "markdown", "toml", "bash", "html", "javascript", "json", "julia" })

-- Treesitter highlighting
vim.api.nvim_create_autocmd("FileType", {
	pattern = { "c", "go", "vim", "latex", "matlab", "markdown", "toml", "bash", "html", "javascript", "json", "julia", "lean" },
	callback = function(args)
		if args.match ~= "latex" then
			pcall(vim.treesitter.start)
		end
	end,
})

-- Treesitter textobjects
require("nvim-treesitter-textobjects").setup({})

local select = require("nvim-treesitter-textobjects.select").select_textobject

vim.keymap.set({ "x", "o" }, "af", function() select("@function.outer", "textobjects") end, { desc = "outer function" })
vim.keymap.set({ "x", "o" }, "if", function() select("@function.inner", "textobjects") end, { desc = "inner function" })
vim.keymap.set({ "x", "o" }, "ac", function() select("@class.outer", "textobjects") end, { desc = "outer class" })
vim.keymap.set({ "x", "o" }, "ic", function() select("@class.inner", "textobjects") end, { desc = "inner class" })
vim.keymap.set({ "x", "o" }, "aa", function() select("@parameter.outer", "textobjects") end, { desc = "outer parameter" })
vim.keymap.set({ "x", "o" }, "ia", function() select("@parameter.inner", "textobjects") end, { desc = "inner parameter" })

-- Lean
vim.g.lean_config = {
  abbreviations = { enable = true },
  mappings = true,
}
vim.lsp.config('leanls', {
  on_attach = custom_lsp_attach,
  capabilities = capabilities,
})

-- Render-markdown: math-aware markdown rendering.
-- Perf (2026-08-02): re-enabled. Converter = utftex (C, ~14x faster than latex2text),
-- latex2text as automatic fallback; debounce=300 coalesces scroll-triggered renders
-- (renders fire once scrolling pauses, not per CursorMoved/WinScrolled event).
--
-- NOTE (2026-11-13): markdown injections MUST stay enabled. render-markdown uses
-- the injected markdown_inline parser for bold/italic/inline code/links/checkboxes.
-- Turning injections off leaves `**`, backticks and `- [ ]` visible, which makes
-- the rendered view look broken. The old nil-range crash is fixed in current
-- render-markdown; tested on nvim 0.12.6.
require('render-markdown').setup({
	enabled = true,
	file_types = { 'markdown' },
	debounce = 300,
	latex = {
		enabled = true,
		converter = { 'utftex-stdin', 'latex2text' },
	},
	heading = {
		-- An empty string conceals '#+' without drawing an icon. Do NOT use {}:
		-- with no icon render-markdown skips the conceal and leaves '##' visible.
		icons = { '' },
		sign = false,
		-- 'full' avoids render-markdown's block-padding virtual text, which
		-- otherwise blanks the tail of folded lines in the INDEX hub.
		width = 'full',
		backgrounds = {
			'RenderMarkdownH1Bg',
			'RenderMarkdownH2Bg',
			'RenderMarkdownH3Bg',
			'RenderMarkdownH4Bg',
			'RenderMarkdownH5Bg',
			'RenderMarkdownH6Bg',
		},
	},
	bullet = {
		-- Small bullet from JetBrains Mono. The default '●' is an ambiguous-width
		-- glyph and can be clipped in some terminal/font fallback combos.
		icons = { '•', '◦', '▪', '▫' },
		right_pad = 1,
	},
	checkbox = {
		-- Both glyphs are present in JetBrains Mono. ☐/☑ are not, and the
		-- terminal fallback can render the checked one as a broken emoji.
		unchecked = { icon = '○ ' },
		checked = { icon = '✓ ' },
		custom = {},
	},
	link = {
		hyperlink = '→ ',
	},
})

vim.keymap.set('n', '<leader>md', '<cmd>RenderMarkdown toggle<CR>', { desc = 'Toggle markdown rendering' })
vim.keymap.set('n', '<leader>mp', '<cmd>RenderMarkdown preview<CR>', { desc = 'Rendered side preview' })

-- Fidget: LSP progress indicator
require("fidget").setup({})
