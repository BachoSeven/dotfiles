local wezterm = require 'wezterm'
local config = wezterm.config_builder()

config.window_background_opacity = 0.9
config.color_scheme = 'Gruvbox (Gogh)'
config.font_size = 20.0
config.scrollback_lines=20000
config.line_height=0.91
config.hide_tab_bar_if_only_one_tab = true
config.leader = { key="a", mods="CTRL", timeout_milliseconds=400 }

config.window_padding = {
  left = 17,
  right = 17,
  top = 17,
  bottom = 17,
}

config.keys = {
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
}

return config
