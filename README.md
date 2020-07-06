```
┏━ ┏━┃━┏┛┏━┛┛┃  ┏━┛┏━┛
┃ ┃┃ ┃ ┃ ┏━┛┃┃  ┏━┛━━┃
━━ ━━┛ ┛ ┛  ┛━━┛━━┛━━┛
```

This are my dotfiles set up as a bare git repo and managed with [dotbare](https://github.com/kazhala/dotbare)

## Current Setup

My setup is pretty minimal and fast: although many packages and systemd services are launched at boot, rebooting from dwm to dwm takes approximately 15 seconds(with grub).
I run Arch Linux on an Asus UX310UQK laptop; here are some of the programs I use:
- Suckless utilities (links are to my patched repos): **[dmenu](https://github.com/BachoSeven/dmenu)**, **[dwm](https://github.com/BachoSeven/dwm)** (Window Manager), **[st](https://github.com/BachoSeven/st)** (terminal emulator) and **[xss](https://github.com/9wm/xss)+[slock](https://github.com/BachoSeven/slock)** (screensaver).
- Highly configured **zsh**  shell with many custom plugins for completions and integrations, ~~**[powerlevel10k](https://github.com/romkatv/powerlevel10k)** with a custom lean theme~~ **[pure](https://github.com/sindresorhus/pure)** theme ( my p10k_theme is in .config/zsh/plugins ) and **[fsh](https://github.com/zdharma/fast-syntax-highlighting)** for syntax highlighting. Despite all these customizations, my zsh has an average startup time of `0.047 s`.
- **neovim** text editor
- **[stig](https://github.com/rndusr/stig)** to interact with the transmission-daemon client
- **ncmpcpp** as a music player (with mpd)
- **[ncspot](https://github.com/hrkfdn/ncspot)** as a tui terminal client
- **[lf](https://github.com/gokcehan/lf)** as my file manager
- **neomutt** as an email client
- **brave** browser
- **[sxiv](https://github.com/muennich/sxiv)** image viewer
- **zathura** pdf & djvu reader
- **[ytop](https://github.com/cjbassi/ytop)** system monitoring
- **copyq** is the clipboard manager
- **dunst** is the notification manager
- Last but not least, **[mimi](https://github.com/BachoSeven/mimi)** is an __improved xdg-open__ using bash and dmenu with a very usable config file.

## Eye-candy
- I set `gruvbox` colors in Xresources, zathura, ncspot, dircolors, dunst, neovim, copyq, all suckless config and anywhere else (although I tried to keep a commented solarized alternative where I could for nostalgia).
- The compositor is `picom`
- Icons are Joypixels (`ttf-joypixels` from aur)
- The default gtk 2/3 theme is [Arc-Gruvbox](https://aur.archlinux.org/packages/gtk-theme-arc-gruvbox-git)
- My font is `Hack Nerd Font`

### Various
- I use brave browser, you can find info about my config of it at `.config/brave_plugins`. To improve its aesthetics, I use a gruvbox chrome theme and duckduckgo with `gruvboxytheme` pass phrase (try it!); which make a decent start page together Vimium's Vomnibar. (I now use a custom start page with Brave, check it out [here](https://github.com/BachoSeven/startpage).)
- Most keys I press on any program are vim bindings, around which this setup is oriented.

## Screens

### Dwm

![1](pics/screens/ricing/surreal.gif)

![2](pics/screens/ricing/pink_dwm.png)

![3](pics/screens/ricing/dwm_mountains.png)

![4](pics/screens/ricing/dwm.png)

![5](pics/screens/ricing/dwm2.png)

### Gnome-Shell

![6](pics/screens/ricing/new_rice1.png)

![7](pics/screens/ricing/new_rice-small.png)
