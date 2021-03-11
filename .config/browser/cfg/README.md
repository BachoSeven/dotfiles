# UNGOOGLED-CHROMIUM

## Options
- keep local cookies
- gtk theme
- font_size=large, minimum size=8
- add italian as spellchecking language
- block notifications globally from "Site settings"(!)
- setup search engines: choose a valid Searx from `searx.space`, and then add ddg (and keep nosearch)
- chrome://settings/content/pdfDocuments: download instead of horrible pdf viewer.
- startup: continue where you left off

## Cli flags [now in chromium-flags.conf]
``` sh
# Hardware acceleration
--ignore-gpu-blocklist
--use-gl=desktop
--enable-gpu-rasterization
--enable-accelerated-video-decode
--disable-gpu-driver-bug-workarounds

# Appearance
--force-device-scale-factor=1.1
--force-dark-mode
--enable-smooth-scrolling

# Miscellaneous
--no-default-browser-check
--enable-features=WebUIDarkMode,CSSColorSchemeUARendering,CompositorThreadedScrollbarScrolling,NativeNotifications,QuietNotificationPrompts,ReaderMode

# ungoogled-specific flags
--disable-search-engine-collection
--extension-mime-request-handling=always-prompt-for-install
--pdf-plugin-name=chrome
--enable-features=SetIpv6ProbeFalse
--bookmark-bar-ntp=never # Bookmarks on about:new-tab-page (which I don't even use but whatevs)
```

## Bookmarks
- Import from file.

## Passwords manager
- [keepassxc+extension(backup)]

## theme
- sol ref dark(favs)
- gtk (gruvbox)

## Plugins
~~PACKAGED: `chromium-keepassxc-browser stylus-git chromium-ublock-origin chromium-extension-https-everywhere`~~
> Install plugin manager's .CRX for ung-chromium: https://github.com/NeverDecaf/chromium-web-store/tags
> Install sci-hub plugin manually (crx is in this repo)

### Utils
- custom ntp extension
- linux speed scroll fix: (set to 1.7)
- vimium(Master) (bkp){allow file access}[ctrl+shift+v]
	- Append
		/* Temporary fix, suggested here: https://github.com/philc/vimium/issues/3732 */
		.vimiumUIComponentVisible { color-scheme: light; }
	to the `vimium.css` file
- vimium_helper
- stylus(beta)[backup,alt+shift+s]
- Redirector

### Privacy-focused
- ublock Origin[ctrl+b delete elements, ctrl+shift+u activate it, import List(s)]
- I don't care about cookies
- HTTPS Everywhere
- ClearURLs

searchengs:
{

a:	https://www.amazon.it/s/?field-keywords=%s Amazon
abs:	https://www.archlinux.org/packages/?q=%s,
alib:	https://www.alibaba.com/trade/search?fsb=y&IndexArea=product_en&CatId=&SearchText=%s alibaba
ali:	https://www.aliexpress.com/wholesale?&SearchText=%s aliexpress
ab:	https://www.amazon.it/s/?url=search-alias%3Dstripbooks&field-keywords=%s amazonbooks
ae:	https://www.amazon.it/s/?url=search-alias%3Delectronics&field-keywords=%s amazonelectronics
au:	https://askubuntu.com/search?q=%s askubuntu
aur:	https://aur.archlinux.org/packages.php?K=%s AUR
aw:	https://wiki.archlinux.org/index.php/Special:Search/%s archwiki
ax:	https://arxiv.org/search?query=%s&searchtype=all&source=header arxiv
bg:	https://it.banggood.com/search/%s.html bangood
bit:		https://btcache.me/torrent/%s bittorcache
btd:		https://btdig.com/search?q=%s bitdig
ca:	https://it.camelcamelcamel.com/search?sq=%s camelcamelcamel
cd:	javascript:location='https://www.google.com/search?num=100&q=site:'%20+%20escape(location.hostname)%20+%20'%20%S'%20;%20void%200 cd
ct:	https://tube.cadence.moe/search?q=%s cloudtube
d:	https://duckduckgo.com/?q=%s DuckDuckGo
dw:	https://www.merriam-webster.com/dictionary/%s Merriam-Webster
eb:	https://www.ebay.com/sch/i.html?_nkw=%s ebay
fb:	https://www.facebook.com/search/top/?q=%s facebook
g:	https://www.google.com/search?q=%s Google
gd:	https://drive.google.com/drive/search?q=%s gdrive
ge:	https://genius.com/search?q=%s Genius
gh:	https://github.com/search?q=%s GitHub
gi:	https://www.google.com/searchbyimage?image_url=%s Google Image Search
gl:	https://gitlab.com/search?search=%s GitLab
gm:	https://www.google.com/maps?q=%s Google maps
go:	https://www15.gogoanime.io//search.html?keyword=%s gogoanime
gt:	https://translate.google.com/?source=osdd#auto|auto|%s gtranslate
hn:	https://hn.algolia.com/?dateRange=all&page=0&prefix=true&query=%s&sort=byPopularity&type=story
imslp:	https://www.google.com/search?q=site:imslp.org+%s imslp
j:	http://localhost:9117/UI/Dashboard#search=%s Jackett
ki:	https://kickass.cm/usearch/?q=%s kickass
ka:	https://kissanime.ac/Search/?s=%s kissanime
l:	http://93.174.95.27/search.php?req=%s libgen
lk:	https://www.google.com/search?q=%s&btnI I'm feeling lucky...
lp:	https://launchpad.net/+search?field.text=%s launchpad
lt:	https://www.limetorrents.cc/search/all/%s/ limetorrents
mal:	https://myanimelist.net/anime.php?q=%s myanimelist
mo:	https://mathoverflow.net/search?q=%s mathoverflow
ms:	https://math.stackexchange.com/search?q=%s mathstackexchange
mw:	https://mathworld.wolfram.com/search/?query=%s mathworld
nc:	https://ncatlab.org/nlab/search?query=%s ncatlab
nh:	https://nhentai.net/search/?q=%s nh
oeis:	https://oeis.org/search?q=%s oeis
om:	https://www.openstreetmap.org/search?query=%s openstreetmap
os:	https://www.opensubtitles.com/en/it/search-all/q-%s/hearing_impaired-include/machine_translated-/trusted_sources-
pip:	https://pypi.org/search/?q=%s PyPI
r:	https://www.reddit.com/search/?q=%s Reddit
repo:	https://repology.org/projects/?search=%s repology
rt:	https://rutracker.net/forum/tracker.php?nm=%s rutracker
sc:	https://scholar.google.com/scholar?q=%s scihub
tldr:	https://tldr.ostera.io/%s tldr
tp:	https://torrentproject.cc/?t=%s torrentproject
tt:	javascript:location='https://translate.google.com/translate?sl=auto&tl=%s&u='%20+%20encodeURIComponent(document.URL); tt
ud:	https://www.urbandictionary.com/define.php?term=%s UrbanDictionary
w:	https://wikipedia.org/w/index.php?search=%s Wikipedia
wa:	https://www.wolframalpha.com/input/?i=%s Wolfram|Alpha
y:	https://www.youtube.com/results?search_query=%s Youtube
yr:	https://yandex.ru/search/?text=%s yandex.ru

}

## Cadence
https://tube.cadence.moe/formapi/importsession/lvBtddNCiyjBY3qQ__HJ0A8q
