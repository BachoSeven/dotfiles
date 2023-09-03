local function setup()
    package.path = os.getenv("XDG_CONFIG_HOME") .. '/xplr/plug/?.xplr/src/init.lua'

    -- Add as submodules
    require("completion").setup()
    require("icons").setup()
    require("material-landscape").setup()

    require("dua-cli").setup{
      mode = "action",
      key = "D",
    }
    require("fzf").setup{
      mode = "default",
      key = "ctrl-f",
      args = "--preview '${XDG_CONFIG_HOME:-$HOME/.config}/lf/scope {}'"
    }
    require("zoxide").setup{
      mode = "default",
      key = "Z"
    }
    require("dragon").setup{
      mode = "selection_ops",
      key = "D",
      drag_args = "",
      drop_args = "",
      keep_selection = false
    }

    -- require("comex").setup()
    -- require("xargs").setup{
      -- key = "x",
    -- }
    -- require("paste-rs").setup{
      -- db_path = "$XDG_DATA_HOME/paste.rs.list"
    -- }
end

return { setup = setup }
