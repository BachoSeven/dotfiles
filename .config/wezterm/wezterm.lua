local wezterm = require 'wezterm'

return {
  font_size = 20.0,

  hide_tab_bar_if_only_one_tab = true,
  scrollback_lines=20000,
  line_height=0.91,

  window_padding = {
    left = 17,
    right = 17,
    top = 17,
    bottom = 17,
  },

  window_background_opacity = 0.8,

  leader = { key="a", mods="CTRL", timeout_milliseconds=400 },
  keys = {
    {key="+", mods="CTRL", action="IncreaseFontSize"},
    {key="t", mods="LEADER", action=wezterm.action{SpawnTab="CurrentPaneDomain"}},
    {key="c", mods="LEADER", action=wezterm.action{CloseCurrentTab={confirm=false}}},
    {key="l", mods="LEADER", action=wezterm.action{ActivateTabRelative=1}},
    {key="h", mods="LEADER", action=wezterm.action{ActivateTabRelative=-1}},
    {key="v", mods="LEADER", action=wezterm.action{SplitVertical={domain="CurrentPaneDomain"}}},
    {key="b", mods="LEADER", action=wezterm.action{SplitHorizontal={domain="CurrentPaneDomain"}}},
    {key="n", mods="LEADER", action="SpawnWindow"},
    {key="f", mods="LEADER", action="TogglePaneZoomState"},
    {key="p", mods="LEADER", action="ShowLauncher"},
    {key="s", mods="LEADER", action=wezterm.action{Search={CaseInSensitiveString=""}}},
    {key="LeftArrow", mods="CTRL", action=wezterm.action{ActivatePaneDirection="Left"}},
    {key="RightArrow", mods="CTRL", action=wezterm.action{ActivatePaneDirection="Right"}},
    {key="DownArrow", mods="CTRL", action=wezterm.action{ActivatePaneDirection="Down"}},
    {key="UpArrow", mods="CTRL", action=wezterm.action{ActivatePaneDirection="Up"}},
  },

  colors = {
    background = "#282828",
    foreground = "#ebdbb2",
    cursor_bg = "#8ec07c",
    cursor_border = "#8ec07c",
    cursor_fg = "#282828",
    selection_bg = "#e6d4a3",
    selection_fg = "#534a42",
    ansi =    {"#282828", "#cc241d", "#98971a", "#d79921", "#458588", "#b16286", "#689d6a", "#a89984"},
    brights = {"#928374", "#fb4934", "#b8bb26", "#fabd2f", "#83a598", "#d3869b", "#8ec07c", "#ebdbb2"},

    tab_bar = {
      background = "#282828",
      active_tab = {
        bg_color = "#689D6A",
        fg_color = "#282828"
      },
      inactive_tab = {
        bg_color = "#3C3836",
        fg_color = "#8ec07c"
      },

      inactive_tab_hover = {
        bg_color = "#1d2021",
        fg_color = "#8ec07c",
        italic = false
      }
    }
  }
}
