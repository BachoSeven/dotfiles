local mpv_scripts_dir_path = os.getenv("HOME") ..  "/.config/mpv/scripts/"
function load(relative_path) dofile(mpv_scripts_dir_path .. relative_path) end

-- mpvSockets overrides input-ipc-server; skip it when the caller already set
-- one (jfsh, for example, needs to connect to the socket it passed on argv).
if mp.get_property("options/input-ipc-server") == "" then
  load("mpvSockets/mpvSockets.lua")
end
