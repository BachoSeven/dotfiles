version = "0.14.4"

package.path = os.getenv("XDG_CONFIG_HOME") .. "/xplr/?/init.lua"

require("ui").setup()
require("keys").setup()
require("plug").setup()
