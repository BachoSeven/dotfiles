local function setup()
    xplr.config.node_types.directory.style.fg = "Blue"
    xplr.config.node_types.file.style.add_modifiers = { "Dim" }
end

return { setup = setup }
