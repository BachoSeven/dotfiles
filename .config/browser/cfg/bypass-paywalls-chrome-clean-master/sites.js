var defaultSites = {
  "* BPC settings": {
    domain: "###"
  },
  "Show options on update": {
    domain: "#options_on_update"
  },
  "Enable new sites by default": {
    domain: "#options_enable_new_sites"
  },
  "Check for update rules at startup": {
    domain: "#options_optin_update_rules"
  },
  "* Default sites": {
    domain: "###"
  },
  "60 Millions de consommateurs": {
    domain: "60millions-mag.com",
    allow_cookies: 1,
    block_regex: /\.poool\.fr\//
  },
  "Abcmais.com": {
    domain: "abcmais.com",
    allow_cookies: 1,
    block_regex: /\.ampproject\.org\/v0\/amp-(access|subscriptions)-.+\.js/,
    cs_dompurify: 1
  },
  "Actu.fr": {
    domain: "actu.fr",
    allow_cookies: 1,
    block_regex: /\.poool\.fr\//
  },
  "Advance Local": {
    domain: "###_usa_adv_local",
    group: [
      "al.com",
      "cleveland.com",
      "lehighvalleylive.com",
      "masslive.com",
      "mlive.com",
      "nj.com",
      "oregonlive.com",
      "pennlive.com",
      "silive.com",
      "syracuse.com"
    ],
    allow_cookies: 1,
    block_regex: /\.sophi\.io\//,
    cs_dompurify: 1
  },
  "Adweek": {
    domain: "adweek.com",
    remove_cookies_select_drop: ["blaize_session"],
    block_regex: /\.adweek\.com\/wp-content\/plugins\/adw-zephr\//
  },
  "Al-Monitor (fetch from archive.is)": {
    domain: "al-monitor.com",
    allow_cookies: 1,
    cs_dompurify: 1
  },
  "Albuquerque Journal": {
    domain: "abqjournal.com",
    allow_cookies: 1
  },
  "Algemeen Dagblad (+ regional/ADR; fetch from archive.is)": {
    domain: "###_nl_dpg_adr",
    group: [
      "ad.nl",
      "bd.nl",
      "bndestem.nl",
      "destentor.nl",
      "ed.nl",
      "gelderlander.nl",
      "pzc.nl",
      "tubantia.nl"
    ],
    allow_cookies: 1,
    block_regex: "temptation\\.{domain}\\/",
    cs_dompurify: 1
  },
  "Alternatives Economiques": {
    domain: "alternatives-economiques.fr",
    block_regex: /\.poool\.fr\//
  },
  "Ámbito": {
    domain: "ambito.com",
    remove_cookies_select_drop: ["TDNotesRead"]
  },
  "America's Test Kitchen": {
    domain: "americastestkitchen.com",
    allow_cookies: 1,
    block_regex: /\.tinypass\.com\//
  },
  "American Affairs": {
    domain: "americanaffairsjournal.org",
    allow_cookies: 1,
    block_regex: /\/americanaffairsjournal\.org\/wp-content\/mu-plugins\/app\/src\/paywall\/paywall\.js/
  },
  "American Banker (+ Arizent/opt-in to custom sites)": {
    domain: "americanbanker.com",
    allow_cookies: 1,
    block_regex: /\.tinypass\.com\//
  },
  "American Purpose": {
    domain: "americanpurpose.com",
    allow_cookies: 1,
    block_regex: /\/steadyhq\.com\//
  },
  "Anandabazar Patrika (not epaper)": {
    domain: "anandabazar.com",
    allow_cookies: 1,
    block_js_inline: /\.anandabazar\.com\/.+\/cid\//,
    block_regex: /\.anandabazar\.com\/subscription-assets\/js\/paywall.*\.js/
  },
  "Anchorage Daily News": {
    domain: "adn.com",
    allow_cookies: 1,
    block_regex: /\.adn\.com\/script\.js/
  },
  "Aoc.media": {
    domain: "aoc.media",
    allow_cookies: 1,
    block_regex: /\.poool\.fr\//,
    cs_dompurify: 1
  },
  "ARA": {
    domain: "###_cat_ara",
    group: [
      "ara.cat",
      "arabalears.cat"
    ],
    allow_cookies: 1,
    block_regex: /\.ampproject\.org\/v0\/amp-access-.+\.js/,
    useragent: "googlebot"
  },
  "Arena Holdings (ZA; opt-in to custom sites for unlisted)": {
    domain: "###_za_arena",
    group: [
      "businessday.co.za",
      "timeslive.co.za"
    ],
    allow_cookies: 1,
    block_regex: /\.arc-cdn\.net\/arc\/subs\/p\.min\.js/
  },
  "Artforum": {
    domain: "artforum.com"
  },
  "Artnet": {
    domain: "artnet.com",
    allow_cookies: 1,
    block_regex: /(\.artnet\.com\/paywall-ajax\.php|\.ampproject\.org\/v0\/amp-subscriptions-.+\.js)/
  },
  "Ärzte Zeitung": {
    domain: "aerztezeitung.de",
    allow_cookies: 1
  },
  "Atavist Magazine": {
    domain: "atavist.com"
  },
  "Atlantico.fr": {
    domain: "atlantico.fr",
    allow_cookies: 1,
    block_regex: /\.tonos\.gjirafa\.tech\/init\/access/
  },
  "Australia News Corp": {
    domain: "###_au_news_corp",
    group: [
      "adelaidenow.com.au",
      "cairnspost.com.au",
      "codesports.com.au",
      "couriermail.com.au",
      "dailytelegraph.com.au",
      "geelongadvertiser.com.au",
      "goldcoastbulletin.com.au",
      "heraldsun.com.au",
      "ntnews.com.au",
      "theaustralian.com.au",
      "thechronicle.com.au",
      "themercury.com.au",
      "townsvillebulletin.com.au",
      "weeklytimesnow.com.au"
    ],
    allow_cookies: 1,
    block_regex: /\.ampproject\.org\/v0\/amp-subscriptions-.+\.js/
  },
  "Australian Community Media (opt-in to custom sites for unlisted)": {
    domain: "###_au_comm_media",
    group: [
      "bendigoadvertiser.com.au",
      "bordermail.com.au",
      "canberratimes.com.au",
      "centralwesterndaily.com.au",
      "dailyadvertiser.com.au",
      "dailyliberal.com.au",
      "examiner.com.au",
      "illawarramercury.com.au",
      "newcastleherald.com.au",
      "northerndailyleader.com.au",
      "standard.net.au",
      "theadvocate.com.au",
      "thecourier.com.au",
      "westernadvocate.com.au"
    ],
    allow_cookies: 1,
    block_regex: /\.piano\.io\//
  },
  "Australia Nine Entertainment": {
    domain: "###_au_nine_ent",
    group: [
      "afr.com",
      "brisbanetimes.com.au",
      "smh.com.au",
      "theage.com.au",
      "watoday.com.au"
    ],
    allow_cookies: 1,
    block_regex: /\.tinypass\.com\//,
    exception: [{
        domain: "afr.com",
        allow_cookies: 1,
        block_regex: /\.tinypass\.com\//,
        cs_dompurify: 1
      }
    ]
  },
  "Autocar.co.uk": {
    domain: "autocar.co.uk",
    allow_cookies: 1
  },
  "AutoHebdo.fr": {
    domain: "autohebdo.fr",
    allow_cookies: 1,
    cs_dompurify: 1
  },
  "Automobilwoche": {
    domain: "automobilwoche.de",
    allow_cookies: 1,
    block_regex: /(\.automobilwoche\.de\/script\.js|js\.pelcro\.com\/|\.sophi\.io\/)/
  },
  "AutoPlus.fr": {
    domain: "autoplus.fr",
    allow_cookies: 1,
    block_regex: /\.qiota\.com\//
  },
  "Autosport (free articles only)": {
    domain: "autosport.com",
    allow_cookies: 1,
    block_regex: /\.tinypass\.com\//
  },
  "Axios": {
    domain: "axios.com",
    allow_cookies: 1
  },
  "Badische Neueste Nachrichten (fetch from archive.is)": {
    domain: "bnn.de",
    allow_cookies: 1,
    cs_dompurify: 1
  },
  "Balkan Insight": {
    domain: "balkaninsight.com",
    allow_cookies: 1,
    cs_dompurify: 1
  },
  "Bangkok Post": {
    domain: "bangkokpost.com",
    allow_cookies: 1
  },
  "Bar and Bench": {
    domain: "barandbench.com",
    allow_cookies: 1,
    cs_dompurify: 1
  },
  "BBC History Extra": {
    domain: "historyextra.com",
    allow_cookies: 1,
    block_regex: /\.historyextra\.com\/zephr\/feature/
  },
  "BBC USA": {
    domain: "bbc.com",
    allow_cookies: 1,
    block_regex: /\.tinypass\.com\//
  },
  "BDU media.nl (opt-in to custom sites)": {
    domain: "###_nl_bdumedia",
    group: [],
    allow_cookies: 1,
    useragent: "googlebot",
    cs_code: [{"hide_elem":"div.pgAdWrapper"}]
  },
  "Benzinga": {
    domain: "benzinga.com"
  },
  "Bergens Tidende": {
    domain: "bt.no",
    allow_cookies: 1,
    useragent: "facebookbot"
  },
  "Berliner Zeitung": {
    domain: "berliner-zeitung.de",
    allow_cookies: 1,
    useragent: "googlebot"
  },
  "Berlingske Media": {
    domain: "###_dk_berlingske_media",
    group: [
      "berlingske.dk",
      "weekendavisen.dk"
    ],
    allow_cookies: 1,
    block_regex: /\.piano\.io\//,
    cs_dompurify: 1
  },
  "Bhaskar": {
    domain: "bhaskar.com",
    allow_cookies: 1
  },
  "Bild (fetch from archive.is)": {
    domain: "bild.de",
    allow_cookies: 1,
    cs_dompurify: 1
  },
  "Blaze Media": {
    domain: "theblaze.com",
    allow_cookies: 1,
    block_regex: /\.piano\.io\//
  },
  "Bloomberg (not Terminal)": {
    domain: "bloomberg.com",
    allow_cookies: 1,
    block_regex: /\.bwbx\.io\/s3\/fence\/fortress-client\/.+\.css/,
    cs_dompurify: 1
  },
  "Bloomberg Adria": {
    domain: "bloombergadria.com",
    allow_cookies: 1,
    block_js_inline: /\.bloombergadria\.com\/.+\/news/
  },
  "BNP Media (opt-in to custom sites)": {
    domain: "###_usa_bnp_media",
    group: [],
    allow_cookies: 1,
    block_regex: /\/paywall\/evercookie_get\.js/
  },
  "Bonnier News Group (SE; opt-in to custom sites for unlisted)": {
    domain: "###_se_bonnier_group",
    group: [
      "dagensmedicin.se",
      "dn.se",
      "hd.se",
      "sydsvenskan.se"
    ],
    allow_cookies: 1,
    useragent: "googlebot",
    exception: [{
        domain: "dn.se",
        allow_cookies: 1,
        cs_dompurify: 1
      }
    ]
  },
  "Börsen-Zeitung": {
    domain: "boersen-zeitung.de",
    allow_cookies: 1,
    cs_dompurify: 1
  },
  "Bridge Tower Media (opt-in to custom sites)": {
    domain: "###_usa_bridge_tower",
    group: [],
    allow_cookies: 1,
    block_regex: "(\\.{domain}\\/script\\.js|\\.blueconic\\.net\\/)"
  },
  "Bulletin of the Atomic Scientists": {
    domain: "thebulletin.org",
    allow_cookies: 1,
    block_regex: /\.tinypass\.com\//,
    cs_dompurify: 1
  },
  "BusinessAM.be": {
    domain: "businessam.be",
    allow_cookies: 1,
    cs_dompurify: 1
  },
  "BusinessDesk.co.nz": {
    domain: "businessdesk.co.nz",
    allow_cookies: 1,
    useragent_custom: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36",
    cs_dompurify: 1
  },
  "Business Insider": {
    domain: "businessinsider.com",
    allow_cookies: 1,
    block_regex: /(\.businessinsider\.com\/chunks\/scripts\/\d.+\.js|\.sophi\.io\/)/,
    useragent: "googlebot"
  },
  "Business Insider Japan": {
    domain: "businessinsider.jp",
    allow_cookies: 1,
    block_regex: /(\.cxense\.com\/|\.piano\.io\/)/
  },
  "Business Insider Nederland": {
    domain: "businessinsider.nl",
    allow_cookies: 1,
    block_regex: /\.piano\.io\//,
    cs_dompurify: 1
  },
  "Business Post.ie": {
    domain: "businesspost.ie",
    allow_cookies: 1,
    block_regex: /\.businesspost\.ie\/api\/tinypass\.min\.js/,
    cs_dompurify: 1
  },
  "Business Standard": {
    domain: "business-standard.com",
    remove_cookies_select_drop: ["userUid"],
    cs_dompurify: 1
  },
  "California Business Journals": {
    domain: "###_usa_cbj",
    group: [
      "labusinessjournal.com",
      "ocbj.com",
      "sdbj.com",
      "sfvbj.com"
    ],
    allow_cookies: 1,
    block_regex: /\/olytics\.omeda\.com\//
  },
  "Capital.bg": {
    domain: "capital.bg",
    allow_cookies: 1
  },
  "Capital.fr": {
    domain: "capital.fr",
    allow_cookies: 1
  },
  "CaravanMagazine.in (fetch from archive.is)": {
    domain: "caravanmagazine.in",
    allow_cookies: 1,
    cs_dompurify: 1
  },
  "CartaCapital": {
    domain: "cartacapital.com.br",
    allow_cookies: 1
  },
  "Causeur": {
    domain: "causeur.fr",
    allow_cookies: 1,
    block_regex: /\.qiota\.com\//
  },
  "Cerveau et Psycho.fr": {
    domain: "cerveauetpsycho.fr",
    allow_cookies: 1,
    block_regex: /\.qiota\.com\//
  },
  "Challenges": {
    domain: "challenges.fr",
    allow_cookies: 1,
    block_regex: /\.poool\.fr\//,
    cs_dompurify: 1
  },
  "Charlie Hebdo": {
    domain: "charliehebdo.fr",
    allow_cookies: 1,
    cs_dompurify: 1
  },
  "Chemical & Engineering News": {
    domain: "cen.acs.org"
  },
  "Chicago Sun-Times": {
    domain: "chicago.suntimes.com",
    allow_cookies: 1,
    block_regex: /\.tinypass\.com\//
  },
  "Chunichi Shimbun Group": {
    domain: "###_jp_chunichi_shimbun",
    group: [
      "chunichi.co.jp",
      "tokyo-np.co.jp"
    ],
    allow_cookies: 1,
    useragent: "googlebot",
    exception: [{
        domain: "tokyo-np.co.jp",
        allow_cookies: 1,
        block_regex: /\.tokyo-np\.co\.jp\/tokyo-np\/js\/comment\/comment_scroll_list\.js/,
        useragent: "googlebot"
      }
    ]
  },
  "Cicero.de (fetch from archive.is)": {
    domain: "cicero.de",
    allow_cookies: 1,
    cs_dompurify: 1
  },
  "Citeline Insights": {
    domain: "insights.citeline.com",
    allow_cookies: 1,
    cs_dompurify: 1
  },
  "Citywire": {
    domain: "citywire.com",
    allow_cookies: 1,
    useragent: "facebookbot"
  },
  "CNBC (news only)": {
    domain: "cnbc.com",
    allow_cookies: 1,
    block_regex: /\.tinypass\.com\//
  },
  "CNHI Group (opt-in to custom sites)": {
    domain: "###_usa_cnhi",
    group: [],
    allow_cookies: 1,
    block_regex: /(\/tncms\/api\/access(\..+)?\.js|\.newsmemory\.com\/\?meter)/,
    cs_dompurify: 1
  },
  "CNN": {
    domain: "cnn.com",
    allow_cookies: 1
  },
  "Commentary Magazine": {
    domain: "commentary.org",
    block_regex: /\.commentary\.org\/.+\/js\/dg-locker-public\.js/
  },
  "CommonWealth Magazine Taiwan (free articles only)": {
    domain: "cw.com.tw"
  },
  "Condé Nast magazines": {
    domain: "###_usa_conde_nast",
    group: [
      "architecturaldigest.com",
      "bonappetit.com",
      "cntraveler.com",
      "epicurious.com",
      "gq.com",
      "newyorker.com",
      "pitchfork.com",
      "vanityfair.com",
      "vogue.co.uk",
      "vogue.com",
      "wired.com"
    ],
    allow_cookies: 1,
    block_regex: "www\\.{domain}\\/[-\\w]+$",
    exception: [{
        domain: "pitchfork.com",
        remove_cookies_select_drop: ["pay_ent_msmp"]
      }
    ]
  },
  "Connaissance des Arts": {
    domain: "connaissancedesarts.com",
    allow_cookies: 1,
    block_regex: /\.connaissancedesarts\.com\/wp-content\/.+\/vendor\/iptools-jquery-inview\.min\.js/
  },
  "Correio do Povo": {
    domain: "correiodopovo.com.br",
    allow_cookies: 1,
    block_regex: /(paywall\.correiodopovo\.com\.br|\.ampproject\.org\/v0\/amp-access-.+\.js)/
  },
  "Corriere della Sera": {
    domain: "corriere.it",
    allow_cookies: 1,
    block_regex: /(\.tinypass\.com\/|\.ith9ueyuhu\.it\/|\.ampproject\.org\/v0\/amp-subscriptions-.+\.js)/
  },
  "Corriere dello Sport": {
    domain: "corrieredellosport.it",
    allow_cookies: 1
  },
  "Cosmopolitan.fr": {
    domain: "cosmopolitan.fr",
    allow_cookies: 1,
    block_regex: /\.qiota\.com\//
  },
  "Courrier international": {
    domain: "courrierinternational.com",
    allow_cookies: 1,
    cs_dompurify: 1
  },
  "Cox First Media (opt-in to custom sites for unlisted)": {
    domain: "###_usa_cox_first_media",
    group: [
      "daytondailynews.com"
    ],
    allow_cookies: 1,
    block_regex: /\.coxohio\.com\/prod\/ajc\/loader\.min\.js/
  },
  "Crain Communications": {
    domain: "###_usa_craincomm",
    group: [
      "360dx.com",
      "adage.com",
      "autonews.com",
      "chicagobusiness.com",
      "crainscleveland.com",
      "crainsdetroit.com",
      "crainsgrandrapids.com",
      "crainsnewyork.com",
      "european-rubber-journal.com",
      "genomeweb.com",
      "modernhealthcare.com",
      "pionline.com",
      "plasticsnews.com",
      "precisionmedicineonline.com",
      "rubbernews.com",
      "tirebusiness.com",
      "utech-polyurethane.com"
    ],
    allow_cookies: 1,
    block_regex: "(js\\.pelcro\\.com\\/|\\.sophi\\.io\\/|\\.{domain}\\/script\\.js)",
    cs_dompurify: 1,
    exception: [{
        domain: ["360dx.com", "genomeweb.com", "precisionmedicineonline.com"],
        allow_cookies: 1,
        block_regex: "(js\\.pelcro\\.com\\/|\\.{domain}\\/(script|profiles\\/.+\\/crain_pelcro_user)\\.js)"
      }, {
        domain: "european-rubber-journal.com",
        allow_cookies: 1
      }
    ]
  },
  "Crusoe.com.br": {
    domain: "crusoe.com.br",
    allow_cookies: 1,
    cs_dompurify: 1
  },
  "CyclingNews": {
    domain: "cyclingnews.com",
    allow_cookies: 1
  },
  "Dagsavisen.no": {
    domain: "dagsavisen.no",
    allow_cookies: 1,
    block_regex: /\.piano\.io\//,
    useragent: "googlebot"
  },
  "Daily Herald (USA)": {
    domain: "dailyherald.com",
    allow_cookies: 1,
    block_regex: /\.tinypass\.com\//
  },
  "Daily Mail Group UK": {
    domain: "###_uk_dmg_media",
    group: [
      "dailymail.com",
      "thisismoney.co.uk"
    ],
    allow_cookies: 1,
    block_regex: "\\.{domain}\\/zephr\\/feature"
  },
  "De Tijd": {
    domain: "tijd.be",
    allow_cookies: 1,
    cs_dompurify: 1
  },
  "Decanter (not reviews)": {
    domain: "decanter.com",
    allow_cookies: 1,
    cs_dompurify: 1
  },
  "Defector": {
    domain: "defector.com",
    allow_cookies: 1,
    cs_dompurify: 1
  },
  "Denik.cz": {
    domain: "denik.cz",
    allow_cookies: 1,
    cs_dompurify: 1
  },
  "Der Freitag": {
    domain: "freitag.de",
    allow_cookies: 1,
    block_js_inline: /\.freitag\.de\//
  },
  "Der Spiegel (fetch from archive.is)": {
    domain: "spiegel.de",
    allow_cookies: 1,
    cs_dompurify: 1
  },
  "Der Standard.at": {
    domain: "derstandard.at",
    allow_cookies: 1,
    block_regex: /\.tinypass\.com\//
  },
  "Der Tagesspiegel (fetch from archive.is; not background/checkpoint)": {
    domain: "tagesspiegel.de",
    allow_cookies: 1,
    cs_dompurify: 1
  },
  "Deutscher Fachverlag Mediengruppe (opt-in to custom sites)": {
    domain: "###_de_dfv_medien",
    group: [],
    allow_cookies: 1,
    useragent: "googlebot",
    add_ext_link: ".FormRegisterNG:is(div,section)|div.PageArticle",
    add_ext_link_type: "google_search_tool",
    cs_code: [{"hide_elem":"div.Ad"}]
  },
  "Diario de Navarra (text only)": {
    domain: "diariodenavarra.es",
    allow_cookies: 1
  },
  "Diário de Notícias (dn.pt)": {
    domain: "dn.pt",
    allow_cookies: 1,
    cs_dompurify: 1
  },
  "Diario Financiero (df.cl)": {
    domain: "df.cl",
    allow_cookies: 1,
    useragent: "googlebot"
  },
  "Die Presse (AT)": {
    domain: "diepresse.com",
    allow_cookies: 1,
    block_regex: /\.tinypass\.com\//
  },
  "Die Rheinpfalz": {
    domain: "rheinpfalz.de",
    allow_cookies: 1,
    block_regex: /\.piano\.io\//,
    useragent: "googlebot"
  },
  "Die Welt (fetch from archive.is)": {
    domain: "welt.de",
    allow_cookies: 1,
    cs_dompurify: 1
  },
  "Die Zeit (fetch from archive.is)": {
    domain: "zeit.de",
    allow_cookies: 1,
    block_regex: /\.piano\.io\//,
    cs_dompurify: 1
  },
  "Digiday Media": {
    domain: "###_usa_digiday",
    group: [
      "digiday.com",
      "glossy.co",
      "modernretail.co"
    ],
    allow_cookies: 1,
    block_regex: /\.tinypass\.com\//
  },
  "Discover Magazine": {
    domain: "discovermagazine.com"
  },
  "DK Medier Group (opt-in to custom sites)": {
    domain: "###_dk_medier",
    group: [],
    allow_cookies: 1,
    useragent: "googlebot"
  },
  "DN Media Group": {
    domain: "###_no_dn_media",
    group: [
      "dn.no",
      "europower.no",
      "fiskeribladet.no",
      "hydrogeninsight.com",
      "intrafish.com",
      "intrafish.no",
      "kystens.no",
      "rechargenews.com",
      "tradewindsnews.com",
      "upstreamonline.com"
    ],
    allow_cookies: 1,
    cs_dompurify: 1
  },
  "Dnevnik.bg": {
    domain: "dnevnik.bg",
    allow_cookies: 1,
    cs_dompurify: 1
  },
  "Domani": {
    domain: "editorialedomani.it",
    allow_cookies: 1,
    block_regex: /(\.editorialedomani\.it\/pelcro\.js|js\.pelcro\.com\/)/
  },
  "Doorbraak.be": {
    domain: "doorbraak.be",
    allow_cookies: 1,
    cs_dompurify: 1
  },
  "DPG Media (not ADR)": {
    domain: "###_nl_dpg_media",
    group: [
      "demorgen.be",
      "flair.nl",
      "humo.be",
      "libelle.nl",
      "margriet.nl",
      "parool.nl",
      "trouw.nl",
      "volkskrant.nl"
    ],
    remove_cookies_select_drop: ["TID_ID"],
    block_regex: "(\\.{domain}\\/temptation\\/resolve|temptation\\.{domain}\\/temptation\\.js)"
  },
  "DVV Media International (opt-in to custom sites)": {
    domain: "###_uk_dvv_media",
    group: [],
    remove_cookies_select_drop: ["AnonUserCookie"],
    block_regex: /\/wp-json\/api\/v\d\/has-access/,
    exception: [{
        domain: "railwaygazette.com",
        allow_cookies: 1,
        useragent: "googlebot"
      }
    ]
  },
  "Dwell": {
    domain: "dwell.com",
    allow_cookies: 1,
    block_js_inline: /\.dwell\.com\/article\/.+\?rel=plus/,
    cs_dompurify: 1
  },
  "Eastwest.eu": {
    domain: "eastwest.eu",
    allow_cookies: 1
  },
  "El Confidencial": {
    domain: "elconfidencial.com",
    allow_cookies: 1,
    block_regex: /\.tinypass\.com\//
  },
  "El Cronista": {
    domain: "cronista.com",
    allow_cookies: 1
  },
  "El Deber.com.bo": {
    domain: "eldeber.com.bo",
    allow_cookies: 1,
    block_regex: /cdn\.lavoz\.com\.ar\/sites\/.+\/paywall\/eldeber\/pw\.js/
  },
  "El Diario.es": {
    domain: "eldiario.es",
    allow_cookies: 1,
    block_regex: /\.ampproject\.org\/v0\/amp-access-.+\.js/
  },
  "El Español": {
    domain: "elespanol.com",
    allow_cookies: 1,
    block_regex: /(\.tinypass\.com\/|\.ampproject\.org\/v0\/amp-(access|subscriptions)-.+\.js)/
  },
  "El Espectador": {
    domain: "elespectador.com",
    allow_cookies: 1,
    block_regex: /(\.tinypass\.com\/|\.cxense\.com\/|js\.matheranalytics\.com\/|\.ampproject\.org\/v0\/amp-access-.+\.js)/
  },
  "El Mercurio (digital only)": {
    domain: "elmercurio.com",
    allow_cookies: 1,
    block_regex: /\.(elmercurio\.com|emol\.cl)\/(.+\/)?js\/(.+\/)?(modal|merPramV\d|(FuncionesComun|PramModal)\.min)\.js/,
    useragent: "googlebot"
  },
  "El Observador.com.uy": {
    domain: "elobservador.com.uy",
    allow_cookies: 1,
    block_regex: /(\.elobservador\.com\.uy\/shares|\.ampproject\.org\/v0\/amp-access-.+\.js)/
  },
  "El País": {
    domain: "elpais.com",
    allow_cookies: 1,
    block_js_inline: /\/verne\.elpais\.com\/.+\.html/,
    block_regex: /(\.prisa\.com\/dist\/subs\/pmwall\/.+\/pmwall\.min\.js|\.ampproject\.org\/v0\/amp-access-.+\.js)/
  },
  "El País.com.uy": {
    domain: "elpais.com.uy",
    allow_cookies: 1,
    block_regex: /(\.elpais\.com\.uy\/user\/authStatus|\.evolok\.net\/|\.cxense\.com\/)/
  },
  "El Tiempo (CO)": {
    domain: "eltiempo.com",
    allow_cookies: 1,
    block_regex: /\.tinypass\.com\//
  },
  "El Tribuno (AR)": {
    domain: "eltribuno.com",
    allow_cookies: 1,
    block_regex: /\.ampproject\.org\/v0\/amp-access-.+\.js/
  },
  "El Universal.com.mx": {
    domain: "eluniversal.com.mx",
    allow_cookies: 1,
    block_regex: /\.tinypass\.com\//
  },
  "El Universo (EC)": {
    domain: "eluniverso.com",
    allow_cookies: 1,
    block_regex: /\.tinypass\.com\//,
    cs_dompurify: 1
  },
  "Elle.fr": {
    domain: "elle.fr",
    allow_cookies: 1,
    block_regex: /(\.poool\.fr\/|\.ampproject\.org\/v0\/amp-access-.+\.js)/
  },
  "Encyclopedia Britannica": {
    domain: "britannica.com"
  },
  "eNotes": {
    domain: "enotes.com",
    remove_cookies_select_drop: ["ENOTESID"]
  },
  "Enter media.nl (opt-in to custom sites)": {
    domain: "###_nl_enter_media",
    group: [],
    allow_cookies: 1,
    useragent: "googlebot",
    cs_code: [{"hide_elem":"div.pgAdWrapper"}]
  },
  "Entrepreneur": {
    domain: "entrepreneur.com",
    allow_cookies: 1,
    block_regex: /\.tinypass\.com\//
  },
  "Erna Media.se (opt-in to custom sites)": {
    domain: "###_se_erna_media",
    group: [],
    allow_cookies: 1,
    useragent: "googlebot"
  },
  "ESPN USA (news only; fetch from archive.is)": {
    domain: "espn.com",
    allow_cookies: 1,
    cs_dompurify: 1
  },
  "Esprit": {
    domain: "esprit.presse.fr",
    allow_cookies: 1,
    block_regex: /\.poool\.fr\//
  },
  "Estado de Minas": {
    domain: "em.com.br",
    allow_cookies: 1,
    block_regex: /\.ampproject\.org\/v0\/amp-subscriptions-.+\.js/
  },
  "EUobserver": {
    domain: "euobserver.com",
    allow_cookies: 1,
    cs_dompurify: 1
  },
  "Evening Standard (UK)": {
    domain: "standard.co.uk",
    allow_cookies: 1,
    block_regex: /(\.tinypass\.com\/|\.ampproject\.org\/v0\/amp-access-.+\.js)/
  },
  "Exame": {
    domain: "exame.com",
    allow_cookies: 1,
    block_regex: /\/exame\.com\/_next\/static\/chunks\/app\/%5B.+\.js/
  },
  "Expresso.pt (not Tribuna)": {
    domain: "expresso.pt",
    allow_cookies: 1,
    cs_dompurify: 1
  },
  "Fast Company": {
    domain: "fastcompany.com",
    allow_cookies: 1,
    block_regex: /(\.tinypass\.com\/|\.fastcompany\.com\/script\.js)/,
    cs_dompurify: 1
  },
  "Field & Stream": {
    domain: "fieldandstream.com",
    allow_cookies: 1
  },
  "Financial News (London)": {
    domain: "fnlondon.com",
    allow_cookies: 1,
    block_regex: /\.tinypass\.com\//
  },
  "Financial Times (not cn subdomain)": {
    domain: "ft.com",
    referer: "google",
    cs_dompurify: 1
  },
  "First Things": {
    domain: "firstthings.com",
    allow_cookies: 1,
    block_regex: /\/firstthings\.com\/wp-content\/plugins\/leaky-paywall\/js\/leaky-paywall-cookie\.js/
  },
  "FMR": {
    domain: "fmrmagazine.com",
    allow_cookies: 1,
    cs_dompurify: 1
  },
  "FocusPlus.de": {
    domain: "focusplus.de",
    allow_cookies: 1,
    block_regex: /\.piano\.io\/xbuilder\/experience\/execute/
  },
  "Fokus.se": {
    domain: "fokus.se",
    allow_cookies: 1,
    block_regex: /\.fokus\.se\/app\/.+\/sesamy-fpg\.js/
  },
  "Follow the Money (ftm.nl & ftm.eu)": {
    domain: "###_nl_eu_ftm",
    group: [
      "ftm.eu",
      "ftm.nl"
    ],
    allow_cookies: 1,
    block_regex: /\.ftm\.(nl|eu)\/js\/routing\?/
  },
  "Forbes (not newsletters)": {
    domain: "forbes.com",
    allow_cookies: 1,
    block_regex: /(\.forbes\.com\/zephr\/feature|\.ampproject\.org\/v0\/amp-access-.+\.js)/
  },
  "Forbes Australia": {
    domain: "forbes.com.au",
    remove_cookies_select_drop: ["blaize_session"],
    cs_dompurify: 1
  },
  "Forbes.ua (text only)": {
    domain: "forbes.ua",
    allow_cookies: 1
  },
  "Foreign Affairs (not reader)": {
    domain: "foreignaffairs.com",
    allow_cookies: 1,
    block_regex: /\.foreignaffairs\.com\/modules\/custom\/fa_paywall_js\/js\/paywall\.js/
  },
  "Foreign Policy": {
    domain: "foreignpolicy.com",
    allow_cookies: 1,
    block_regex: /(\.piano\.io\/xbuilder\/experience\/execute|\.cxense\.com\/)/,
    cs_dompurify: 1
  },
  "Fortune": {
    domain: "fortune.com",
    allow_cookies: 1,
    block_regex: /\.fortune\.com\/api\/tinypass\.min\.js/
  },
  "Forum Communications (opt-in to custom sites)": {
    domain: "###_usa_forum_comm",
    group: [],
    allow_cookies: 1,
    block_regex: "\\.{domain}\\/script\\.js"
  },
  "Fox News (regwall)": {
    domain: "foxnews.com",
    allow_cookies: 1
  },
  "Franc-Tireur.fr": {
    domain: "franc-tireur.fr",
    allow_cookies: 1,
    block_regex: /\.poool\.fr\//,
    cs_dompurify: 1
  },
  "Frankfurter Allgemeine Zeitung (not rechner)": {
    domain: "faz.net",
    allow_cookies: 1,
    cs_dompurify: 1
  },
  "Freie Presse.de": {
    domain: "freiepresse.de",
    allow_cookies: 1,
    useragent: "googlebot"
  },
  "Funke Mediengruppe": {
    domain: "###_de_funke_medien",
    group: [
      "abendblatt.de",
      "braunschweiger-zeitung.de",
      "harzkurier.de",
      "ikz-online.de",
      "morgenpost.de",
      "nrz.de",
      "otz.de",
      "thueringer-allgemeine.de",
      "tlz.de",
      "waz.de",
      "wp.de",
      "wr.de"
    ],
    allow_cookies: 1,
    block_regex: /\.piano\.io\//,
    cs_dompurify: 1
  },
  "Gannett Group (local USA Today; opt-in to custom sites for unlisted)": {
    domain: "###_usa_gannett",
    group: [
      "azcentral.com",
      "cincinnati.com",
      "commercialappeal.com",
      "courier-journal.com",
      "democratandchronicle.com",
      "desmoinesregister.com",
      "detroitnews.com",
      "dispatch.com",
      "freep.com",
      "indystar.com",
      "jacksonville.com",
      "jsonline.com",
      "knoxnews.com",
      "news-press.com",
      "northjersey.com",
      "oklahoman.com",
      "palmbeachpost.com",
      "tennessean.com"
    ],
    allow_cookies: 1,
    useragent: "googlebot",
    headers_filter: "\\.{domain}\\/.+\\/\\d{10,}\\/"
  },
  "GaúchaZH": {
    domain: "gauchazh.clicrbs.com.br",
    allow_cookies: 1,
    block_regex: /\.piano\.io\//
  },
  "Gazeta do Povo": {
    domain: "gazetadopovo.com.br",
    allow_cookies: 1,
    block_regex: /(\.tinypass\.com\/|\.cxense\.com\/|\.ampproject\.org\/v0\/amp-subscriptions-.+\.js)/
  },
  "GB News": {
    domain: "gbnews.com",
    allow_cookies: 1,
    block_regex: /\.piano\.io\//
  },
  "Glassdoor (regwall)": {
    domain: "glassdoor.com"
  },
  "Globes": {
    domain: "globes.co.il",
    block_regex: /\.tinypass\.com\//
  },
  "Granta Magazine": {
    domain: "granta.com",
    allow_cookies: 1,
    cs_dompurify: 1
  },
  "GremiMedia.pl Group": {
    domain: "###_pl_gremi_media",
    group: [
      "parkiet.com",
      "rp.pl"
    ]
  },
  "Groene Amsterdammer": {
    domain: "groene.nl",
    remove_cookies_select_hold: ["accept-cookies", "popunder-hidden"],
    useragent: "googlebot"
  },
  "Groupe Capitales Médias (+ regional/opt-in to custom sites)": {
    domain: "###_ca_gcm",
    group: [
      "lesoleil.com"
    ],
    allow_cookies: 1,
    block_regex: /\.poool\.fr\//
  },
  "Groupe Centre France (opt-in to custom sites for unlisted)": {
    domain: "###_fr_gcf",
    group: [
      "lamontagne.fr"
    ],
    allow_cookies: 1,
    block_regex: /\.poool\.fr\//
  },
  "Groupe EBRA": {
    domain: "###_fr_groupe_ebra",
    group: [
      "bienpublic.com",
      "dna.fr",
      "estrepublicain.fr",
      "lalsace.fr",
      "ledauphine.com",
      "lejsl.com",
      "leprogres.fr",
      "republicain-lorrain.fr",
      "vosgesmatin.fr"
    ],
    allow_cookies: 1,
    cs_dompurify: 1
  },
  "Groupe ESH Médias": {
    domain: "###_ch_esh_medias",
    group: [
      "arcinfo.ch",
      "lacote.ch",
      "lenouvelliste.ch"
    ],
    allow_cookies: 1,
    cs_dompurify: 1
  },
  "Groupe Infopro Digital (opt-in to custom sites for unlisted)": {
    domain: "###_fr_groupe_infopro",
    group: [
      "usinenouvelle.com"
    ],
    allow_cookies: 1,
    block_regex: /\.poool\.fr\//,
    exception: [{
        domain: ["argusdelassurance.com", "cahiers-techniques-batiment.fr"],
        allow_cookies: 1,
        useragent: "googlebot"
      }
    ]
  },
  "Groupe IPM": {
    domain: "###_be_groupe_ipm",
    group: [
      "dhnet.be",
      "lalibre.be",
      "lavenir.net",
      "moustique.be"
    ],
    allow_cookies: 1,
    block_regex: /(\.piano\.io\/xbuilder\/experience\/execute|\.cxense\.com\/)/
  },
  "Groupe La Dépêche": {
    domain: "###_fr_groupe_la_depeche",
    group: [
      "centrepresseaveyron.fr",
      "journaldemillau.fr",
      "ladepeche.fr",
      "lindependant.fr",
      "midilibre.fr",
      "nrpyrenees.fr",
      "petitbleu.fr",
      "rugbyrama.fr"
    ],
    allow_cookies: 1
  },
  "Groupe La Manche Libre": {
    domain: "###_fr_groupe_la_manche_libre",
    group: [
      "lamanchelibre.fr"
    ],
    allow_cookies: 1,
    cs_dompurify: 1
  },
  "Groupe MacGeneration": {
    domain: "###_fr_groupe_macg",
    group: [
      "igen.fr",
      "macg.co",
      "watchgeneration.fr"
    ],
    allow_cookies: 1,
    cs_dompurify: 1
  },
  "Groupe Nice-Matin": {
    domain: "###_fr_groupe_nice_matin",
    group: [
      "monacomatin.mc",
      "nicematin.com",
      "varmatin.com"
    ],
    allow_cookies: 1,
    block_regex: /(\.qiota\.com\/|\.nicematin\.com\/build\/js\/viewpay\..+\.js)/
  },
  "Groupe Profession Santé": {
    domain: "###_fr_groupe_prof_sante",
    group: [
      "lequotidiendumedecin.fr",
      "lequotidiendupharmacien.fr"
    ],
    allow_cookies: 1,
    block_regex: /\.poool\.fr\//
  },
  "Groupe Québecor": {
    domain: "###_ca_groupe_quebecor",
    group: [
      "journaldemontreal.com",
      "journaldequebec.com"
    ],
    allow_cookies: 1
  },
  "Groupe Rossel": {
    domain: "###_fr_be_groupe_rossel",
    group: [
      "aisnenouvelle.fr",
      "courrier-picard.fr",
      "lardennais.fr",
      "lavoixdunord.fr",
      "lemessager.fr",
      "lesoir.be",
      "lest-eclair.fr",
      "liberation-champagne.fr",
      "lunion.fr",
      "nordlittoral.fr",
      "paris-normandie.fr",
      "sudinfo.be"
    ],
    allow_cookies: 1,
    block_regex: /\.qiota\.com\//,
    cs_dompurify: 1
  },
  "Groupe Sud Ouest": {
    domain: "###_fr_groupe_sud_ouest",
    group: [
      "sudouest.fr",
      "charentelibre.fr",
      "larepubliquedespyrenees.fr"
    ],
    allow_cookies: 1,
    exception: [{
        domain: "sudouest.fr",
        allow_cookies: 1,
        block_regex: /\.poool\.fr\//
      }
    ]
  },
  "Groupe SynerJ Media (opt-in to custom sites)": {
    domain: "###_fr_synerj",
    group: [],
    allow_cookies: 1,
    ld_json_url: "div#encart_abo|div.article_bloc_texte",
    useragent: "googlebot"
  },
  "Groupe Télégramme": {
    domain: "###_fr_groupe_telegramme",
    group: [
      "letelegramme.fr",
      "meretmarine.com"
    ],
    allow_cookies: 1,
    block_regex: /\.poool\.fr\//,
    cs_code: [{"hide_elem": "div[id^='advertising-']"}]
  },
  "Grupo Abril": {
    domain: "abril.com.br",
    allow_cookies: 1,
    block_regex: /\.abril\.com\.br\/.+\/abril-paywall\//
  },
  "Grupo Clarín": {
    domain: "###_ar_grupo_clarin",
    group: [
      "clarin.com",
      "lavoz.com.ar",
      "losandes.com.ar",
      "ole.com.ar"
    ],
    allow_cookies: 1,
    block_regex: /zonda\.clarin\.com\//,
    exception: [{
        domain: "losandes.com.ar",
        allow_cookies: 1,
        block_regex: /cdn\.lavoz\.com\.ar\/sites\/.+\/paywall\/losandes\/pw\.js/
      }
    ]
  },
  "Grupo El Comercio": {
    domain: "###_pe_grupo_elcomercio",
    group: [
      "diariocorreo.pe",
      "elcomercio.pe",
      "gestion.pe"
    ],
    allow_cookies: 1,
    block_regex: "(\\.tinypass\\.com\\/|\\/{domain}\\/pf\\/dist\\/engine\\/react\\.js)"
  },
  "Grupo Joly (ES; opt-in to custom sites for unlisted)": {
    domain: "###_es_grupo_joly",
    group: [
      "diariodesevilla.es"
    ],
    allow_cookies: 1,
    block_regex: /\.poool\.fr\//,
    cs_code: [{"hide_elem":"aside[data-ad-type]"}]
  },
  "Grupo Prensa Ibérica (opt-in to custom sites for unlisted)": {
    domain: "###_es_epiberica",
    group: [
      "diariodemallorca.es",
      "eldia.es",
      "elperiodico.com",
      "epe.es",
      "farodevigo.es",
      "informacion.es",
      "laprovincia.es",
      "levante-emv.com",
      "lne.es",
      "mallorcazeitung.es",
      "superdeporte.es"
    ],
    allow_cookies: 1,
    block_regex: /\.piano\.io\//
  },
  "Grupo Unidad Editorial": {
    domain: "###_es_unidad",
    group: [
      "elmundo.es",
      "expansion.com",
      "marca.com"
    ],
    allow_cookies: 1,
    block_regex: /(\.tinypass\.com\/|\.ampproject\.org\/v0\/amp-(access|subscriptions)-.+\.js)/
  },
  "Grupo Vocento": {
    domain: "###_es_grupo_vocento",
    group: [
      "abc.es",
      "canarias7.es",
      "diariosur.es",
      "diariovasco.com",
      "elcomercio.es",
      "elcorreo.com",
      "eldiariomontanes.es",
      "elnortedecastilla.es",
      "hoy.es",
      "ideal.es",
      "larioja.com",
      "lasprovincias.es",
      "laverdad.es",
      "lavozdigital.es"
    ],
    allow_cookies: 1,
    block_regex: /(\.evolok\.net\/|\.ampproject\.org\/v0\/amp-access-.+\.js)/
  },
  "Gruppo GEDI.it": {
    domain: "###_it_gedi",
    group: [
      "italian.tech",
      "lastampa.it",
      "lescienze.it",
      "repubblica.it"
    ],
    remove_cookies_select_drop: ["blaize_session"],
    block_regex: /scripts\.repubblica\.it\/pw\/pw\.js/,
    useragent: "googlebot",
    exception: [{
        domain: "lastampa.it",
        block_js_inline: /\.it\/.+\/news\//
      }, {
        domain: "repubblica.it",
        allow_cookies: 1,
        block_regex: /\.ampproject\.org\/v0\/amp-subscriptions-.+\.js/
      }
    ]
  },
  "Gruppo SAE.it (free articles only; opt-in to custom sites for unlisted)": {
    domain: "###_it_gruppo_sae",
    group: [
      "iltirreno.it",
      "lanuovasardegna.it"
    ]
  },
  "Haaretz Group (article no menu/footer/comments)": {
    domain: "###_il_haaretz_group",
    group: [
      "haaretz.co.il",
      "haaretz.com",
      "themarker.com"
    ],
    remove_cookies_select_drop: ["ra"],
    headers_custom: {ismobileapp: "true", platform: "app", renderingkind: "opened"},
    useragent_custom: "Mozilla/5.0 (Linux; Android 9) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36 haaretz/5.0.49"
  },
  "Handelsblatt": {
    domain: "handelsblatt.com",
    allow_cookies: 1,
    block_regex: /\.piano\.io\//,
    useragent: "googlebot",
    headers_filter: /\.handelsblatt\.com\/.+\.html/
  },
  "Harper's Magazine (free articles only)": {
    domain: "harpers.org",
    block_regex: /\/harpers\.org\/wp-content\/themes\/timber\/static\/js\/modal.+\.js/
  },
  "Harvard Business Review (do not block TinyPass-script externally)": {
    domain: "hbr.org",
    block_regex: /(\.cxense\.com\/|cdn\.tinypass\.com\/|\.adobedtm\.com\/.+\/launch-.+\.js)/,
    remove_cookies_select_drop: ["xbc"]
  },
  "Haymarket Media Group (opt-in to custom sites)": {
    domain: "###_uk_haymarket",
    group: [],
    useragent: "googlebot"
  },
  "Haymarket Medical Network (opt-in to custom sites)": {
    domain: "###_uk_haymarket_medical",
    group: [],
    allow_cookies: 1,
    remove_cookies: 1,
    cs_code: [{"hide_elem":"div#modal-register-popup, div.gating-banner"}, {"cond":"div[data-gated]", "rm_attrib":"data-gated"}]
  },
  "Hearst Communications (newspapers; opt-in to custom sites for unlisted)": {
    domain: "###_usa_hearst_comm",
    group: [
      "ctinsider.com",
      "ctpost.com",
      "expressnews.com",
      "houstonchronicle.com",
      "nhregister.com",
      "sfchronicle.com",
      "statesman.com",
      "timesunion.com"
    ],
    allow_cookies: 1,
    block_regex: "(\\.{domain}\\/script\\.js|\\.ensighten\\.com\\/|js\\.matheranalytics\\.com\\/)"
  },
  "Hearst Communications magazines": {
    domain: "###_usa_hearst_comm_mag",
    group: [
      "bicycling.com",
      "cosmopolitan.com",
      "countryliving.com",
      "delish.com",
      "elle.com",
      "elledecor.com",
      "esquire.com",
      "goodhousekeeping.com",
      "harpersbazaar.com",
      "housebeautiful.com",
      "menshealth.com",
      "oprahdaily.com",
      "popularmechanics.com",
      "prevention.com",
      "roadandtrack.com",
      "runnersworld.com",
      "townandcountrymag.com",
      "womenshealthmag.com"
    ],
    allow_cookies: 1,
    block_regex: /(\.com\/_assets\/jam\/|\.ensighten\.com\/.+\/Bootstrap\.js)/
  },
  "Heise online (fetch from archive.is)": {
    domain: "heise.de",
    allow_cookies: 1,
    cs_dompurify: 1
  },
  "Het Laatste Nieuws (fetch from archive.is)": {
    domain: "hln.be",
    allow_cookies: 1,
    block_regex: /temptation\.hln\.be\//,
    cs_dompurify: 1
  },
  "Hindustan Times (not epaper)": {
    domain: "hindustantimes.com",
    allow_cookies: 1,
    block_regex: /\.ampproject\.org\/v0\/amp-access-.+\.js/
  },
  "Historia.fr": {
    domain: "historia.fr",
    allow_cookies: 1,
    cs_dompurify: 1
  },
  "History Today (app only)": {
    domain: "historytoday.com",
    allow_cookies: 1,
    block_regex: /app\.historytoday\.com\/pugpig-websmartbanner\.js/,
    cs_all_frames: 1
  },
  "Hola": {
    domain: "hola.com",
    allow_cookies: 1,
    block_regex: /(\.hola\.com\/evolok\/ev-em\.min\.js|\.poool\.fr\/)/,
    cs_code: [{"hide_elem":"div[data-ad-title]"}]
  },
  "Honolulu Star-Advertiser": {
    domain: "staradvertiser.com",
    allow_cookies: 1,
    block_regex: /js\.matheranalytics\.com\//
  },
  "HotNews.ro": {
    domain: "hotnews.ro",
    allow_cookies: 1
  },
  "Iconic Media Group (UK; opt-in to custom sites for unlisted)": {
    domain: "###_uk_iconic_media",
    group: [
      "scotsman.com",
      "yorkshirepost.co.uk"
    ],
    allow_cookies: 1,
    block_regex: /\.tinypass\.com\//
  },
  "Il Fatto Quotidiano (free articles only)": {
    domain: "ilfattoquotidiano.it",
    allow_cookies: 1,
    block_regex: /\.ampproject\.org\/v0\/amp-subscriptions-.+\.js/
  },
  "Il Foglio": {
    domain: "ilfoglio.it",
    allow_cookies: 1,
    block_regex: /\.newsmemory\.com\/\?meter/
  },
  "Il Manifesto": {
    domain: "ilmanifesto.it",
    allow_cookies: 1,
    useragent: "googlebot",
    cs_dompurify: 1
  },
  "Il Messaggero (+ regional)": {
    domain: "###_it_ilmessaggero",
    group: [
      "corriereadriatico.it",
      "ilgazzettino.it",
      "ilmattino.it",
      "ilmessaggero.it",
      "quotidianodipuglia.it"
    ],
    allow_cookies: 1,
    block_regex: /(\.(cedscdn|cedsdigital)\.it\/.+\/(PaywallMeter|cmpConsentWall)\.js|\.ampproject\.org\/v0\/amp-(access|subscriptions)-.+\.m?js)/
  },
  "Il Sole 24 Ore (24+ only)": {
    domain: "ilsole24ore.com",
    allow_cookies: 1,
    block_regex: /\.ilsole24ore\.com\/zephr\/feature/
  },
  "Inc.com": {
    domain: "inc.com",
    block_regex: /\.tinypass\.com\//
  },
  "Inc42": {
    domain: "inc42.com",
    allow_cookies: 1,
    block_regex: /(\/inc42\.com\/wp-admin\/admin-ajax\.php$|\.ampproject\.org\/v0\/amp-access-.+\.js)/
  },
  "India Today": {
    domain: "indiatoday.in",
    allow_cookies: 1,
    block_regex: /\.ampproject\.org\/v0\/amp-access-.+\.js/
  },
  "Industry Dive (opt-in to custom sites)": {
    domain: "###_usa_industrydive",
    group: [],
    allow_cookies: 1,
    block_regex: "\\.{domain}\\/static\\/js\\/dist\\/contentGate\\.bundle\\.js"
  },
  "iNews (UK)": {
    domain: "inews.co.uk",
    allow_cookies: 1,
    block_js_inline: /liveapp\.inews\.co\.uk\/.+\/content\.html/,
    block_regex: /\.tinypass\.com\//
  },
  "InfoLibre.es": {
    domain: "infolibre.es",
    allow_cookies: 1,
    block_regex: /\.ampproject\.org\/v0\/amp-access-.+\.js/,
    useragent: "googlebot"
  },
  "Inkl": {
    domain: "inkl.com"
  },
  "Inside Higher Ed": {
    domain: "insidehighered.com",
    allow_cookies: 1,
    block_regex: /js\.pelcro\.com\//
  },
  "Inside Retail (opt-in to custom sites)": {
    domain: "###_au_inside_retail",
    group: [],
    ld_json_url: "div#premium-box|div.article__text__holder|1"
  },
  "Institute of Art and Ideas (articles only)": {
    domain: "iai.tv",
    allow_cookies: 1,
    cs_dompurify: 1
  },
  "Interesting Engineering": {
    domain: "interestingengineering.com",
    allow_cookies: 1,
    cs_dompurify: 1
  },
  "Internazionale.it": {
    domain: "internazionale.it",
    allow_cookies: 1,
    block_regex: /\.internazionale\.it\/templates_js_ajax\.inc\.php/
  },
  "Investor's Business Daily": {
    domain: "investors.com",
    block_regex: /\.tinypass\.com\//
  },
  "Investors' Chronicle (UK)": {
    domain: "investorschronicle.co.uk",
    allow_cookies: 1,
    referer: "google"
  },
  "iPolitics.ca": {
    domain: "ipolitics.ca",
    allow_cookies: 1,
    cs_dompurify: 1
  },
  "Ippen.media (opt-in to custom sites for unlisted)": {
    domain: "###_de_ippen_media",
    group: [
      "fr.de",
      "merkur.de",
      "ovb-online.de"
    ],
    allow_cookies: 1,
    block_regex: "\\.{domain}\\/sub\\/js\\/pc-offer-west\\.js"
  },
  "Italia Oggi": {
    domain: "italiaoggi.it",
    allow_cookies: 1,
    cs_dompurify: 1
  },
  "Jacobin.de": {
    domain: "jacobin.de",
    allow_cookies: 1,
    cs_dompurify: 1
  },
  "Jazzwise": {
    domain: "jazzwise.com",
    allow_cookies: 1,
    useragent: "googlebot"
  },
  "Jeune Afrique (last month only)": {
    domain: "jeuneafrique.com",
    allow_cookies: 1,
    block_regex: /(\.poool\.fr\/|\.jeuneafrique\.com\/cdn-cgi\/trace)/,
    cs_param: {"x-exp": "1741079242710", "x-sig": "b431724e94023a6969c5427133e1614db2cbe90e"},
    cs_dompurify: 1
  },
  "Kathimerini.gr": {
    domain: "kathimerini.gr",
    allow_cookies: 1,
    block_regex: /\.piano\.io\//
  },
  "Kölner Stadt-Anzeiger": {
    domain: "ksta.de",
    remove_cookies_select_drop: ["anon_cookie"]
  },
  "Kölnische Rundschau": {
    domain: "rundschau-online.de",
    remove_cookies_select_drop: ["anon_cookie"]
  },
  "Kompas.id": {
    domain: "kompas.id",
    allow_cookies: 1
  },
  "Krautreporter.de": {
    domain: "krautreporter.de",
    allow_cookies: 1
  },
  "Kurier.at": {
    domain: "kurier.at",
    allow_cookies: 1,
    block_regex: /\.tinypass\.com\//
  },
  "L'Écho": {
    domain: "lecho.be",
    allow_cookies: 1,
    cs_dompurify: 1
  },
  "L'Équipe.fr": {
    domain: "lequipe.fr",
    allow_cookies: 1,
    block_regex: /(\.poool\.fr\/|\.lequipe\.fr\/assets\/js\/.*[wW]all.+\.js)/,
    cs_dompurify: 1
  },
  "L'Express": {
    domain: "lexpress.fr",
    allow_cookies: 1,
    block_regex: /\.qiota\.com\/data/
  },
  "L'Informé (not pro)": {
    domain: "linforme.com",
    allow_cookies: 1,
    useragent: "googlebot"
  },
  "L'Oeil de la Photographie": {
    domain: "loeildelaphotographie.com",
    allow_cookies: 1,
    block_regex: /cdn\.loeildelaphotographie\.com\/wp-content\/.+\/hague-child\/js\/script-.+\.js/
  },
  "L'Opinion (not Le Journal)": {
    domain: "lopinion.fr",
    allow_cookies: 1,
    block_regex: /\.piano\.io\//,
    useragent: "googlebot",
    cs_dompurify: 1
  },
  "La Croix": {
    domain: "la-croix.com",
    allow_cookies: 1,
    block_regex: /\.poool\.fr\//
  },
  "La Diaria.com.uy": {
    domain: "ladiaria.com.uy",
    allow_cookies: 1,
    useragent: "googlebot"
  },
  "La Gaceta.com.ar (no menu)": {
    domain: "lagaceta.com.ar",
    allow_cookies: 1,
    block_regex: /\.lagaceta\.com\.ar\/ajax\/getInfo/,
    useragent: "facebookbot"
  },
  "La Gazzetta dello Sport (text only)": {
    domain: "gazzetta.it",
    allow_cookies: 1
  },
  "La Nación": {
    domain: "lanacion.com.ar",
    allow_cookies: 1,
    block_regex: /\.glanacion\.com\/.+\/metering\/.+\.js/,
    cs_dompurify: 1
  },
  "La Segunda (not digital)": {
    domain: "lasegunda.com",
    allow_cookies: 1,
    block_regex: /\.emol\.cl\/(.+\/)?(pram-modal|PramModal)\.min\.js/,
    cs_dompurify: 1
  },
  "La Tercera": {
    domain: "latercera.com",
    allow_cookies: 1,
    block_regex: /\.latercera\.com\/arc\/subs\/p\.min\.js/
  },
  "La Vanguardia": {
    domain: "lavanguardia.com",
    allow_cookies: 1,
    block_regex: /\/ev\.lavanguardia\.com\//
  },
  "Lance.com.br": {
    domain: "lance.com.br",
    allow_cookies: 1
  },
  "Landwirtschaftsverlag": {
    domain: "###_de_lv",
    group: [
      "profi.de",
      "topagrar.com",
      "wochenblatt.com"
    ],
    allow_cookies: 1,
    exception: [{
        domain: "topagrar.com",
        allow_cookies: 1,
        block_js_inline: /\.topagrar\.com\/.+\/news\//
      }
    ]
  },
  "Las Vegas Review-Journal": {
    domain: "reviewjournal.com",
    allow_cookies: 1,
    block_regex: /\.reviewjournal\.com\/wp-content\/plugins\/.+\/loader_prod\.min\.js/
  },
  "Las Vegas Sun": {
    domain: "lasvegassun.com",
    allow_cookies: 1,
    block_regex: /\.q0losid\.com\/prod\/gmg\/loader\.min\.js/
  },
  "Law.com (not archive)": {
    domain: "law.com",
    allow_cookies: 1,
    useragent: "googlebot"
  },
  "Le Canard enchaîné.fr": {
    domain: "lecanardenchaine.fr",
    useragent: "googlebot"
  },
  "Le Courrier des Stratèges": {
    domain: "lecourrierdesstrateges.fr",
    allow_cookies: 1,
    cs_dompurify: 1
  },
  "Le Devoir": {
    domain: "ledevoir.com",
    block_regex: /\.tinypass\.com\//,
    remove_cookies_select_drop: ["pw6"]
  },
  "Le Figaro (no video)": {
    domain: "lefigaro.fr",
    allow_cookies: 1,
    cs_dompurify: 1
  },
  "Le Grand Continent": {
    domain: "legrandcontinent.eu",
    allow_cookies: 1
  },
  "Le Journal du Dimanche": {
    domain: "lejdd.fr",
    allow_cookies: 1,
    block_regex: /\.poool\.fr\//
  },
  "Le Journal du Net": {
    domain: "journaldunet.com",
    allow_cookies: 1
  },
  "Le Monde.fr": {
    domain: "lemonde.fr",
    allow_cookies: 1,
    cs_dompurify: 1
  },
  "Le Monde Diplomatique Brasil": {
    domain: "diplomatique.org.br",
    allow_cookies: 1,
    cs_dompurify: 1
  },
  "Le Nouvel Economiste": {
    domain: "lenouveleconomiste.fr",
    allow_cookies: 1,
    useragent: "googlebot"
  },
  "Le Parisien": {
    domain: "leparisien.fr",
    allow_cookies: 1,
    useragent: "googlebot",
    headers_filter: /\/www\.leparisien\.fr\//,
    cs_dompurify: 1
  },
  "Le Point": {
    domain: "lepoint.fr",
    allow_cookies: 1,
    block_regex: /\.poool\.fr\//
  },
  "Le Revenu": {
    domain: "lerevenu.com",
    allow_cookies: 1,
    block_regex: /\.qiota\.com\//
  },
  "Le Temps.ch (fetch from archive.is)": {
    domain: "letemps.ch",
    allow_cookies: 1,
    cs_dompurify: 1
  },
  "Le1Hebdo.fr": {
    domain: "le1hebdo.fr",
    allow_cookies: 1,
    block_regex: /\.qiota\.com\//
  },
  "Lee Enterprises Group (opt-in to custom sites for unlisted)": {
    domain: "###_usa_lee_ent",
    group: [
      "buffalonews.com",
      "journalnow.com",
      "journalstar.com",
      "madison.com",
      "nwitimes.com",
      "omaha.com",
      "richmond.com",
      "stltoday.com",
      "tucson.com",
      "tulsaworld.com"
    ],
    allow_cookies: 1,
    block_regex: /\.com\/.+\/tncms\/api\/access\..+\.js/,
    cs_dompurify: 1
  },
  "Les Échos": {
    domain: "lesechos.fr",
    allow_cookies: 1,
    cs_dompurify: 1
  },
  "Les Inrockuptibles": {
    domain: "lesinrocks.com",
    allow_cookies: 1,
    block_regex: /\.qiota\.com\//
  },
  "Libération.fr": {
    domain: "liberation.fr",
    allow_cookies: 1,
    cs_dompurify: 1
  },
  "Linda.nl": {
    domain: "linda.nl",
    allow_cookies: 1,
    cs_dompurify: 1
  },
  "Literary Review (UK)": {
    domain: "literaryreview.co.uk",
    allow_cookies: 1,
    cs_dompurify: 1
  },
  "Live Law": {
    domain: "livelaw.in",
    allow_cookies: 1
  },
  "LiveMint (not epaper)": {
    domain: "livemint.com",
    allow_cookies: 1,
    block_regex: /(\.livemint\.com\/lm-img\/subscription\/|\.tinypass\.com\/|\.ampproject\.org\/v0\/amp-access-.+\.js)/
  },
  "Loeb Classical Library": {
    domain: "loebclassics.com",
    remove_cookies_select_drop: ["hupLclFreeReadsCookie"]
  },
  "London Review of Books": {
    domain: "lrb.co.uk",
    allow_cookies: 1,
    cs_clear_lclstrg: 1
  },
  "Los Angeles Times": {
    domain: "latimes.com",
    allow_cookies: 1,
    block_regex: /(\.latimes\.com\/meteringjs|\.californiatimes\.com\/caltimes\/latimes\/Bootstrap\.js)/
  },
  "MacroBusiness.com.au": {
    domain: "macrobusiness.com.au",
    allow_cookies: 1,
    cs_dompurify: 1
  },
  "Madsack Mediengruppe (opt-in to custom sites for unlisted)": {
    domain: "###_de_madsack",
    group: [
      "haz.de",
      "kn-online.de",
      "ln-online.de",
      "lvz.de",
      "maz-online.de",
      "neuepresse.de",
      "ostsee-zeitung.de",
      "rnd.de",
      "saechsische.de"
    ],
    allow_cookies: 1,
    block_regex: /\.tinypass\.com\//,
    cs_dompurify: 1
  },
  "Maine Trust for Local News (opt-in to custom sites)": {
    domain: "###_usa_maine_trust",
    group: [],
    allow_cookies: 1,
    block_regex: "\\.{domain}\\/(script|.+\\/loader\\.min)\\.js"
  },
  "Malayala Manorama": {
    domain: "manoramaonline.com",
    allow_cookies: 1,
    block_regex: /\.ampproject\.org\/v0\/amp-access-.+\.js/,
  },
  "MarketWatch": {
    domain: "marketwatch.com",
    allow_cookies: 1,
    block_regex: /(\.tinypass\.com\/|\.cxense\.com\/)/,
    referer_custom: "https://www.drudgereport.com/"
  },
  "McClatchy Group (opt-in to custom sites for unlisted)": {
    domain: "###_usa_mcc",
    allow_cookies: 1,
    group: [
      "bnd.com",
      "charlotteobserver.com",
      "elnuevoherald.com",
      "fresnobee.com",
      "kansas.com",
      "kansascity.com",
      "kentucky.com",
      "mcclatchydc.com",
      "miamiherald.com",
      "newsobserver.com",
      "sacbee.com",
      "star-telegram.com",
      "thestate.com",
      "tri-cityherald.com"
    ],
    block_regex: /(\.amplitude\.com\/|\.mcclatchy\.com\/mcc-paywall\.js|\.ampproject\.org\/v0\/amp-(access|subscriptions)-.+\.js)/
  },
  "McPherson Media Group (opt-in to custom sites)": {
    domain: "###_au_mmg",
    allow_cookies: 1,
    group: []
  },
  "Mediahuis België (fetch from archive.is)": {
    domain: "###_be_mediahuis",
    group: [
      "gva.be",
      "hbvl.be",
      "nieuwsblad.be",
      "standaard.be"
    ],
    allow_cookies: 1,
    cs_dompurify: 1
  },
  "MediaNews Group (opt-in to custom sites for unlisted)": {
    domain: "###_usa_mng",
    group: [
      "bostonherald.com",
      "denverpost.com",
      "eastbaytimes.com",
      "mercurynews.com",
      "ocregister.com",
      "pressenterprise.com",
      "sandiegouniontribune.com",
      "twincities.com"
    ],
    allow_cookies: 1,
    block_regex: /(\.com\/(script|.+\/loader\.min)\.js|\.tinypass\.com\/|\.ampproject\.org\/v0\/amp-subscriptions-.+\.js)/,
    cs_dompurify: 1
  },
  "Medium (opt-in to custom sites for custom domains)": {
    domain: "###_medium",
    group: [
      "medium.com",
      "betterprogramming.pub",
      "towardsdatascience.com"
    ],
    allow_cookies: 1
  },
  "Medscape (regwall)": {
    domain: "medscape.com",
    allow_cookies: 1,
    block_regex: /\.adobedtm\.com\/.+\/launch-.+\.js/
  },
  "Mexico News Daily": {
    domain: "mexiconewsdaily.com",
    allow_cookies: 1,
    block_regex: /\/mexiconewsdaily\.com\/wp-json\/leaky-paywall\/v1\/check-restrictions/
  },
  "Mid-Day (not epaper)": {
    domain: "mid-day.com",
    allow_cookies: 1,
    block_regex: /\.ampproject\.org\/v0\/amp-access-.+\.js/
  },
  "MilanoFinanza.it": {
    domain: "milanofinanza.it",
    allow_cookies: 1
  },
  "Milenio": {
    domain: "milenio.com",
    allow_cookies: 1,
    block_regex: /\.tinypass\.com\//
  },
  "MIT Sloan Management Review": {
    domain: "sloanreview.mit.edu",
    allow_cookies: 1,
    block_regex: /(\.tinypass\.com\/|\/sloanreview\.mit\.edu\/.+\/welcome-ad\.js)/
  },
  "MIT Technology Review": {
    domain: "technologyreview.com",
    allow_cookies: 1,
    block_regex: /(\.tinypass\.com\/|\.ampproject\.org\/v0\/amp-access-.+\.mjs)/
  },
  "Mittelbayerische Zeitung (fetch from archive.is)": {
    domain: "mittelbayerische.de",
    allow_cookies: 1,
    block_regex: /\.piano\.io\//,
    cs_dompurify: 1
  },
  "Monocle": {
    domain: "monocle.com",
    useragent: "googlebot"
  },
  "Motor Presse Stuttgart": {
    domain: "###_de_motor_presse",
    group: [
      "aerokurier.de",
      "auto-motor-und-sport.de",
      "flugrevue.de",
      "motorradonline.de",
      "womenshealth.de"
    ],
    allow_cookies: 1,
    block_regex: "\\.{domain}\\/thenewsbar\\/config\\/"
  },
  "Motor Sport Magazine (UK)": {
    domain: "motorsportmagazine.com",
    allow_cookies: 1,
    block_regex: /\.motorsportmagazine\.com\/wp-admin\/admin-ajax\.php/,
    cs_dompurify: 1
  },
  "Mountain View Voice": {
    domain: "mv-voice.com"
  },
  "Mundo Deportivo": {
    domain: "mundodeportivo.com",
    allow_cookies: 1,
    block_regex: /\/ev\.mundodeportivo\.com\//
  },
  "MusicOMH": {
    domain: "musicomh.com",
    allow_cookies: 1,
    block_regex: /(\.axate\.io\/|\.musicomh\.com\/wp-content\/.+\/bundle\.js)/
  },
  "Nation Media Group (Kenya; opt-in to custom sites for unlisted)": {
    domain: "###_ke_nation_media",
    group: [
      "businessdailyafrica.com",
      "nation.africa"
    ],
    allow_cookies: 1
  },
  "National Geographic ES": {
    domain: "nationalgeographic.com.es",
    allow_cookies: 1,
    block_regex: /\.nationalgeographic\.com\.es\/Content\/js\/lib\/runtime\.min\.js/
  },
  "National Geographic IT": {
    domain: "nationalgeographic.it",
    allow_cookies: 1
  },
  "National Geographic NL": {
    domain: "nationalgeographic.nl",
    allow_cookies: 1,
    block_regex: /\.piano\.io\//
  },
  "National Geographic USA": {
    domain: "nationalgeographic.com",
    allow_cookies: 1,
    block_regex: /cdn\.registerdisney\.go\.com\//,
    random_ip: "eu"
  },
  "National Review": {
    domain: "nationalreview.com",
    allow_cookies: 1,
    block_regex: /\.ampproject\.org\/v0\/amp-access-.+\.js/,
    cs_dompurify: 1
  },
  "Nautilus": {
    domain: "nautil.us",
    allow_cookies: 1,
    block_regex: /\/nautil\.us\/_next\/static\/chunks\/pages\/_sites\/%5BsiteSlug%5D\/%5B\.\.\.slug.+\.js/
  },
  "Nature (regwall only; fetch from archive.is)": {
    allow_cookies: 1,
    domain: "nature.com",
    cs_dompurify: 1
  },
  "NBC News": {
    domain: "nbcnews.com",
    allow_cookies: 1,
    block_regex: /\.tinypass\.com\//,
    useragent: "googlebot"
  },
  "NDTV Profit": {
    domain: "ndtvprofit.com",
    allow_cookies: 1,
    block_regex: /\.ampproject\.org\/v0\/amp-subscriptions-.+\.js/
  },
  "Nederlands Dagblad": {
    domain: "nd.nl",
    allow_cookies: 1,
    block_js_inline: /\.nd\.nl\/.+\/\d{7,}\//,
    useragent: "googlebot"
  },
  "Neue Westfälische": {
    domain: "nw.de",
    allow_cookies: 1
  },
  "Neue Zürcher Zeitung": {
    domain: "nzz.ch",
    allow_cookies: 1,
    block_regex: /(\.piano\.io\/xbuilder\/experience\/execute|\.cxense\.com\/|tms\.danzz\.ch\/scripts\/t\.min\.js)/
  },
  "New Scientist": {
    domain: "newscientist.com",
    allow_cookies: 1,
    block_regex: /(\.newscientist\.com\/api\/tinypass\.min\.js|appan\.newscientist\.com\/pugpig-websmartbanner\.js)/,
    cs_all_frames: 1,
    cs_dompurify: 1
  },
  "New Voice (nv.ua)": {
    domain: "nv.ua",
    allow_cookies: 1,
    block_regex: /\.ampproject\.org\/v0\/amp-access-.+\.js/
  },
  "New York Post": {
    domain: "nypost.com",
    allow_cookies: 1,
    block_regex: /\.nypost\.com\/zephr\/feature/,
    cs_param: {"app-identifier": "com.news.screens", "device-type": "phone", "user-agent": "okhttp/4.12.0", "x-access-token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJBVVRIX1BIUkFTRV9QUk9EX0FORFJPSUQiOiJGNGYzYnhzZGlIa1M1QzVIWUxUNSJ9.OGooBqisVQznx2FDxZpHAqWu-oG1wPJLUxYBMd3xOKiLakoR2XQC2hXnyS3zb1Dw6AkKcMhWyZfRerUckFjga8Ii59lZtP8Xt92iCUyJjs0yjmLJgkZWEGqZ8szM2UK7jZJ5SsHaYfe2V3c7KrtfbY74aWGwddvg-Ex4O5hwv3aiAJpI_aZMFqniClGM2pYbGNSPxH-I0PMuwTzt-oyofhQsRJWOQES8fmQz1H-opqQVr3B0-ev4MxYZjfk8kKnXxRbf7tDbQvastQh8kLe3KN90ptSp_LWbkPgo0G8Vw9Jzxy1TUd_VNgTE21uNdRAoZbxDly7aw-9CTDtb1OtXVg"}
  },
  "New Zealand Geographic": {
    domain: "nzgeo.com",
    remove_cookies_select_drop: ["visits"]
  },
  "New Zealand Herald": {
    domain: "nzherald.co.nz",
    allow_cookies: 1,
    block_regex: /\.nzherald\.co\.nz\/zephr\//
  },
  "Newsday": {
    domain: "newsday.com",
    allow_cookies: 1,
    block_regex: /\.newsday\.com\/nd-user\/nd_user_ace\.bundle\.js/
  },
  "Newslaundry": {
    domain: "newslaundry.com",
    allow_cookies: 1,
    cs_dompurify: 1
  },
  "Newsquest Media Group (UK; opt-in to custom sites)": {
    domain: "###_uk_newsquest",
    group: [],
    allow_cookies: 1,
    block_regex: /\.tinypass\.com\//,
    cs_code: [{"hide_elem":"div.advert-background, div[data-uses-js='dfp-top-ad-fixed'], div#premium_mpu_container, iframe[aria-label='Advertisement']"}]
  },
  "Newsweek": {
    domain: "newsweek.com",
    allow_cookies: 1,
    block_regex: /\.newsweek\.com\/api\/tinypass\.min\.js/
  },
  "Nikkei Asian Review": {
    domain: "asia.nikkei.com",
    allow_cookies: 1,
    block_regex: /\.piano\.io\//,
    cs_dompurify: 1
  },
  "Nordwest Zeitung": {
    domain: "nwzonline.de",
    allow_cookies: 1,
    block_regex: /\.piano\.io\//
  },
  "NOZ/MHN Mediengruppe (fetch from archive.is)": {
    domain: "###_de_noz_mhn",
    group: [
      "noz.de",
      "shz.de"
    ],
    allow_cookies: 1,
    useragent: "googlebot",
    cs_dompurify: 1
  },
  "NRC Handelsblad": {
    domain: "nrc.nl",
    remove_cookies_select_drop: ["counter"],
    block_regex: /\.nrc\.nl\/paywall-api\/api\/zephr/
  },
  "NSC Total": {
    domain: "nsctotal.com.br",
    allow_cookies: 1,
    block_regex: /\.nsctotal\.com\.br\/wp-content\/themes\/nsctotal\/js\/paywall\.min\.js/
  },
  "NyTeknik": {
    domain: "nyteknik.se",
    allow_cookies: 1,
    useragent: "googlebot"
  },
  "O Estado de S. Paulo": {
    domain: "estadao.com.br",
    allow_cookies: 1,
    block_regex: /(\.estadao\.com\.br\/(paywall\/|access\.js)|\.ampproject\.org\/v0\/amp-(access|subscriptions)-.+\.js)/
  },
  "O Globo (& Valor Econômico)": {
    domain: "globo.com",
    allow_cookies: 1,
    block_regex: /(\.tinypass\.com\/|\.ampproject\.org\/v0\/amp-subscriptions-.+\.js)/
  },
  "Observador.pt": {
    domain: "observador.pt",
    allow_cookies: 1,
    block_regex: /\/observador\.pt\/wp-content\/.+\/paywall-compact-new\.min\.js/
  },
  "Oil & Gas Journal": {
    domain: "ogj.com",
    allow_cookies: 1,
    block_js_inline: /\.ogj\.com\/.+\/\d{8,}\//
  },
  "OKO.press (PL)": {
    domain: "oko.press",
    allow_cookies: 1,
    block_regex: /\/oko\.press\/_next\/static\/chunks\/pages\/%5Bslug.+\.js/
  },
  "Ostdeutsche Allgemeine": {
    domain: "ostdeutscheallgemeine.com",
    allow_cookies: 1,
    useragent: "googlebot"
  },
  "Ouest-France.fr (not subdomains)": {
    domain: "ouest-france.fr",
    allow_cookies: 1
  },
  "Outdoor Life": {
    domain: "outdoorlife.com",
    allow_cookies: 1,
    block_regex: /js\.pelcro\.com\//
  },
  "Outlook Business": {
    domain: "outlookbusiness.com",
    allow_cookies: 1,
    cs_dompurify: 1
  },
  "Outlook India": {
    domain: "outlookindia.com",
    allow_cookies: 1
  },
  "Outside magazines": {
    domain: "###_usa_outside_mag",
    group: [
      "backpacker.com",
      "betamtb.com",
      "betternutrition.com",
      "cleaneatingmag.com",
      "climbing.com",
      "outsideonline.com",
      "oxygenmag.com",
      "skimag.com",
      "trailrunnermag.com",
      "triathlete.com",
      "vegetariantimes.com",
      "womensrunning.com",
      "yogajournal.com"
    ],
    allow_cookies: 1,
    block_regex: /\.tinypass\.com\//
  },
  "Oxford University Press (not oup.com; opt-in to custom sites)": {
    domain: "###_uk_oup",
    group: [],
    allow_cookies: 1
  },
  "Palo Alto Online": {
    domain: "paloaltoonline.com"
  },
  "Paris Match": {
    domain: "parismatch.com",
    allow_cookies: 1,
    block_regex: /\.poool\.fr\//
  },
  "Passauer Neue Presse (fetch from archive.is)": {
    domain: "pnp.de",
    allow_cookies: 1,
    block_regex: /\.piano\.io\//,
    cs_dompurify: 1
  },
  "Paste Magazine": {
    domain: "pastemagazine.com",
    allow_cookies: 1,
    block_regex: /\.pastemagazine\.com\/wp-content\/cache\/autoptimize\/js\/autoptimize_.+\.js/
  },
  "Penske Media Corporation": {
    domain: "###_usa_penske_media",
    group: [
      "billboard.com",
      "rollingstone.com",
      "sourcingjournal.com",
      "sportico.com",
      "variety.com",
      "wwd.com"
    ],
    allow_cookies: 1,
    block_regex: /\.tinypass\.com\//
  },
  "PhiloMag.com": {
    domain: "philomag.com",
    allow_cookies: 1,
    block_regex: /\.qiota\.com\//
  },
  "PhiloMag.de": {
    domain: "philomag.de",
    allow_cookies: 1
  },
  "Philonomist": {
    domain: "philonomist.com",
    allow_cookies: 1
  },
  "Philosophy Now": {
    domain: "philosophynow.org"
  },
  "Pittsburgh Post Gazette": {
    domain: "post-gazette.com",
    block_regex: /\.tinypass\.com\//
  },
  "Política Exterior": {
    domain: "politicaexterior.com",
    allow_cookies: 1
  },
  "Politico (regwall; not pro)": {
    domain: "politico.com",
    allow_cookies: 1,
    block_regex: /\.piano\.io\//
  },
  "Polityka.pl": {
    domain: "polityka.pl",
    allow_cookies: 1,
    useragent: "googlebot"
  },
  "Popular Science": {
    domain: "popsci.com",
    allow_cookies: 1,
    block_regex: /js\.pelcro\.com\//
  },
  "Postmedia Network (opt-in to custom sites for unlisted)": {
    domain: "###_ca_postmedia",
    group: [
      "calgaryherald.com",
      "financialpost.com",
      "nationalpost.com",
      "theprovince.com",
      "torontosun.com",
      "vancouversun.com"
    ],
    allow_cookies: 1,
    block_regex: /(\.tinypass\.com\/|\.sophi\.io\/|\.amplitude\.com\/)/
  },
  "Pour l'Éco": {
    allow_cookies: 1,
    domain: "pourleco.com",
    block_regex: /\.poool\.fr\//
  },
  "Pour la Science.fr": {
    domain: "pourlascience.fr",
    allow_cookies: 1,
    block_regex: /\.qiota\.com\//
  },
  "Private Media AU": {
    domain: "###_au_private_media",
    group: [
      "crikey.com.au",
      "smartcompany.com.au",
      "themandarin.com.au"
    ],
    remove_cookies_select_drop: ["blaize_session"],
    cs_dompurify: 1
  },
  "Profil.at": {
    domain: "profil.at",
    allow_cookies: 1,
    block_regex: /\.piano\.io\//
  },
  "Project Syndicate": {
    domain: "project-syndicate.org",
    allow_cookies: 1,
    useragent: "googlebot",
    cs_dompurify: 1
  },
  "ProMedia.nl Group (opt-in to custom sites)": {
    domain: "###_nl_promedia",
    group: [],
    useragent: "googlebot",
    cs_dompurify: 1
  },
  "Prospect Magazine": {
    domain: "prospectmagazine.co.uk",
    allow_cookies: 1,
    block_regex: /\.piano\.io\//
  },
  "Public.fr": {
    domain: "public.fr",
    allow_cookies: 1,
    block_regex: /\.poool\.fr\//
  },
  "Público.es": {
    domain: "publico.es",
    allow_cookies: 1,
    block_regex: /\.piano\.io\//
  },
  "Puck.news (fetch from archive.is)": {
    domain: "puck.news",
    allow_cookies: 1,
    cs_dompurify: 1
  },
  "Puls Biznesu": {
    domain: "pb.pl",
    allow_cookies: 1,
    block_regex: /\.pb\.pl\/api\/tinypass\.min\.js/
  },
  "Quartz (newsletter)": {
    domain: "qz.com",
    allow_cookies: 1,
    block_regex: /\.kinja-static\.com\/assets\/.+\/regwalled-content.+\.js/
  },
  "Quora": {
    domain: "quora.com",
    allow_cookies: 1
  },
  "Quotidiano.net (+ regional)": {
    domain: "###_it_quotidiano",
    group: [
      "ilgiorno.it",
      "ilrestodelcarlino.it",
      "iltelegrafolivorno.it",
      "lanazione.it",
      "quotidiano.net"
    ],
    allow_cookies: 1,
    block_regex: /(\.tinypass\.com\/|\.ampproject\.org\/v0\/amp-access-.+\.js)/
  },
  "Rane Worldview": {
    domain: "worldview.ranenetwork.com",
    allow_cookies: 1,
    useragent: "googlebot"
  },
  "Reach Group UK": {
    domain: "###_uk_reach",
    group: [
      "dailyrecord.co.uk",
      "express.co.uk"
    ],
    allow_cookies: 1,
    block_regex: /\.piano\.io\//
  },
  "Réforme.net": {
    domain: "reforme.net",
    allow_cookies: 1,
    cs_dompurify: 1
  },
  "Reuters": {
    domain: "reuters.com",
    allow_cookies: 1,
    block_regex: /\.reuters\.com\/arc\/subs\/p\.min\.js/
  },
  "Revista Oeste": {
    domain: "revistaoeste.com",
    allow_cookies: 1,
    block_js_inline: /\/revistaoeste\.com\/revista\//,
    block_regex: /\/revistaoeste\.com\/wp-content\/.+\/js\/app\..+\.js/
  },
  "Revue Conflits": {
    domain: "revueconflits.com",
    allow_cookies: 1,
    block_regex: /\.qiota\.com\/data/
  },
  "Revue21.fr": {
    domain: "revue21.fr",
    allow_cookies: 1,
    block_regex: /\.qiota\.com\//
  },
  "Rheinische Post Mediengruppe (fetch from archive.is)": {
    domain: "###_de_rp_medien",
    group: [
      "ga.de",
      "rp-online.de",
      "saarbruecker-zeitung.de",
      "volksfreund.de"
    ],
    allow_cookies: 1,
    block_regex: /\.piano\.io\//,
    cs_dompurify: 1
  },
  "Ringier Gruppe (CH)": {
    domain: "###_ch_ringier",
    group: [
      "beobachter.ch",
      "blick.ch",
      "handelszeitung.ch"
    ],
    allow_cookies: 1,
    block_regex: /\.tinypass\.com\//,
    cs_dompurify: 1,
    exception: [{
        domain: "blick.ch",
        allow_cookies: 1,
        block_regex: /\.tinypass\.com\//
      }
    ]
  },
  "Ringier Axel Springer Polska": {
    domain: "###_pl_ringier",
    group: [
      "auto-swiat.pl",
      "businessinsider.com.pl",
      "forbes.pl",
      "komputerswiat.pl",
      "newsweek.pl",
      "onet.pl"
    ],
    allow_cookies: 1,
    block_regex: /\.piano\.io\//
  },
  "Rotowire": {
    domain: "rotowire.com",
    allow_cookies: 1
  },
  "Roularta Media Group": {
    domain: "###_be_roularta",
    group: [
      "beleggersbelangen.nl",
      "femmesdaujourdhui.be",
      "flair.be",
      "knack.be",
      "kw.be",
      "levif.be",
      "libelle.be"
    ],
    allow_cookies: 1,
    block_regex: "[\\.\\/]{domain}\\/(script|.+\\/rmg-paywall)\\.js",
    useragent: "googlebot"
  },
  "RugbyPass": {
    domain: "rugbypass.com",
    allow_cookies: 1,
    block_js_inline: /\.rugbypass\.com\/plus\/\w/,
    block_regex: /\.tinypass\.com\//
  },
  "S&P Global": {
    domain: "spglobal.com",
    block_regex: /\.spglobal\.com\/script\.js/,
    remove_cookies_select_drop: ["count"],
    cs_dompurify: 1
  },
  "Sábado (not video)": {
    domain: "sabado.pt",
    allow_cookies: 1,
    block_regex: /\.ampproject\.org\/v0\/amp-access-.+\.js/
  },
  "Scholastic": {
    domain: "scholastic.com",
    allow_cookies: 1
  },
  "Schweizer Monat": {
    domain: "schweizermonat.ch",
    allow_cookies: 1,
    cs_dompurify: 1
  },
  "Science (free articles only)": {
    domain: "science.org",
    allow_cookies: 1
  },
  "Science & Vie": {
    domain: "science-et-vie.com",
    block_regex: /\.qiota\.com\//
  },
  "ScienceNews.org": {
    domain: "sciencenews.org",
    remove_cookies_select_drop: ["blaize_session"]
  },
  "Sciences et Avenir": {
    domain: "sciencesetavenir.fr",
    allow_cookies: 1,
    block_regex: /(\.poool\.fr\/|\.ampproject\.org\/v0\/amp-access-.+\.js)/
  },
  "Scientific American": {
    domain: "scientificamerican.com",
    remove_cookies_select_drop: ["article_meter"],
    block_regex: /\.scientificamerican\.com\/api\/tinypass\.min\.js/
  },
  "Semana (CO)": {
    domain: "semana.com",
    allow_cookies: 1,
    block_regex: /\.ampproject\.org\/v0\/amp-subscriptions-.+\.js/
  },
  "Sky.it (sport & tg24 only)": {
    domain: "sky.it",
    allow_cookies: 1
  },
  "Slate": {
    domain: "slate.com",
    allow_cookies: 1,
    block_regex: /(\.piano\.io\/xbuilder\/experience\/execute|\.cxense\.com\/|\.sophi\.io\/)/
  },
  "SlideShare": {
    domain: "slideshare.net",
    allow_cookies: 1,
    cs_clear_lclstrg: 1
  },
  "SOFREP": {
    domain: "sofrep.com"
  },
  "Sound Publishing (opt-in to custom sites)": {
    domain: "###_usa_sound_publishing",
    allow_cookies: 1,
    block_regex: /(\.com\/script\.js|\/wp-content\/plugins\/incognito_dectector\/)/
  },
  "South China Morning Post": {
    domain: "scmp.com",
    allow_cookies: 1,
    block_regex: /(\.tinypass\.com\/|cdn\.ampproject\.org\/v0\/amp-(access|subscriptions)-.+\.js)/
  },
  "Southern Weekly (fetch from archive.is)": {
    domain: "infzm.com",
    allow_cookies: 1,
    cs_dompurify: 1
  },
  "Spacenews": {
    domain: "spacenews.com",
    allow_cookies: 1,
    cs_dompurify: 1
  },
  "Spektrum.de": {
    domain: "spektrum.de",
    allow_cookies: 1,
    block_regex: /\.poool\.fr\//
  },
  "SPH Media (SG)": {
    domain: "###_sg_sph_media",
    group: [
      "businesstimes.com.sg",
      "straitstimes.com"
    ],
    allow_cookies: 1,
    exception: [{
        domain: "straitstimes.com",
        allow_cookies: 1,
        block_js_inline: /\.straitstimes\.com\/(opinion\/|.+(\w+-){3,}.+\?rel=plus)/,
        cs_dompurify: 1
      }
    ]
  },
  "Sport Life Ibérica (text only; opt-in to custom sites)": {
    domain: "###_es_sport_life",
    group: [],
    allow_cookies: 1,
    ld_json: "div.c-paywall|div.c-mainarticle__body"
  },
  "Sports Illustrated": {
    domain: "si.com",
    allow_cookies: 1,
    block_regex: /\.si\.com\/script\.js/
  },
  "Springer Medizin": {
    domain: "springermedizin.de",
    allow_cookies: 1
  },
  "Standardmedia.co.ke (text only)": {
    domain: "standardmedia.co.ke",
    allow_cookies: 1,
    cs_dompurify: 1
  },
  "Star Tribune": {
    domain: "startribune.com",
    allow_cookies: 1,
    block_regex: /\.tinypass\.com\//
  },
  "StatNews (fetch from archive.is)": {
    domain: "statnews.com",
    allow_cookies: 1,
    block_regex: /\.tinypass\.com\//,
    cs_dompurify: 1
  },
  "Stereogum (no comments)": {
    domain: "stereogum.com",
    allow_cookies: 1,
    block_regex: /\/stereogum\.com\/_next\/static\/chunks\/pages\/_sites\/%5BsiteSlug%5D\/%5B\.\.\.slug.+\.js/,
    cs_dompurify: 1
  },
  "Stern.de (fetch from archive.is)": {
    domain: "stern.de",
    allow_cookies: 1,
    cs_dompurify: 1
  },
  "Stock News": {
    domain: "stocknews.com",
    allow_cookies: 1
  },
  "Study.com (only lessons; no videos)": {
    domain: "study.com",
    allow_cookies: 1
  },
  "Stylist.co.uk": {
    domain: "stylist.co.uk",
    allow_cookies: 1,
    cs_dompurify: 1
  },
  "Südwest Media Network (opt-in to custom sites for unlisted)": {
    domain: "###_de_smn",
    group: [
      "schwarzwaelder-bote.de",
      "stuttgarter-nachrichten.de",
      "stuttgarter-zeitung.de"
    ],
    allow_cookies: 1,
    block_regex: /\.de\/xbuilder\/experience\/execute/,
    exception: [{
        domain: ["cannstatter-zeitung.de", "esslinger-zeitung.de", "frankenpost.de", "insuedthueringen.de", "krzbb.de", "kurier.de", "np-coburg.de"],
        allow_cookies: 1,
        cs_dompurify: 1
      }
    ]
  },
  "Suomen Sotilas": {
    domain: "suomensotilas.fi",
    allow_cookies: 1,
    block_regex: /\/suomensotilas\.fi\/wp-content\/plugins\/epflpw\/js\/pw\.js/
  },
  "Süddeutsche Zeitung (fetch from archive.is)": {
    domain: "sueddeutsche.de",
    allow_cookies: 1,
    block_regex: /\.sueddeutsche\.de\/api\/tinypass\.min\.js/,
    cs_dompurify: 1
  },
  "Swarajyamag": {
    domain: "swarajyamag.com",
    allow_cookies: 1
  },
  "Tamedia.ch Group (opt-in to custom sites for unlisted)": {
    domain: "###_ch_tamedia",
    group: [
      "24heures.ch",
      "bazonline.ch",
      "bernerzeitung.ch",
      "derbund.ch",
      "tagesanzeiger.ch",
      "tdg.ch"
    ],
    remove_cookies_select_drop: ["entitlementToken", "tmc"],
    block_regex: /\.tinypass\.com\//,
    useragent: "googlebot"
  },
  "Tampa Bay Times": {
    domain: "tampabay.com",
    allow_cookies: 1,
    block_regex: /(\.zephr\.com\/zephr-browser\/|js\.matheranalytics\.com\/|\.ampproject\.org\/v0\/amp-access-.+\.js)/
  },
  "Tech in Asia": {
    domain: "techinasia.com",
    allow_cookies: 1,
    cs_dompurify: 1
  },
  "TechTarget Group": {
    domain: "###_usa_techtarget",
    group: [
      "computerweekly.com",
      "lemagit.fr",
      "techtarget.com"
    ],
    allow_cookies: 1
  },
  "Telegraaf (fetch from archive.is)": {
    domain: "telegraaf.nl",
    remove_cookies_select_drop: ["mh_pw_se"],
    cs_dompurify: 1
  },
  "Telegram.hr": {
    domain: "telegram.hr",
    allow_cookies: 1,
    block_js_inline: /\.telegram\.hr\/.+\/(\w+-){3,}/
  },
  "Télérama.fr": {
    domain: "telerama.fr",
    allow_cookies: 1,
    cs_dompurify: 1
  },
  "Tes Magazine": {
    domain: "tes.com",
    remove_cookies_select_drop: ["tg_paywall"]
  },
  "Texas Monthly": {
    domain: "texasmonthly.com",
    allow_cookies: 1,
    block_regex: /\.texasmonthly\.com\/script\.js/
  },
  "The (New Orleans) Advocate": {
    domain: "###_usa_theadvocate",
    group: [
      "nola.com",
      "shreveportbossieradvocate.com",
      "theadvocate.com"
    ],
    allow_cookies: 1,
    block_regex: "(\\.{domain}\\/(script|.+\\/tncms\\/api\\/access\\..+)\\.js|\\.townnews\\.com\\/.+\\/engage\\.min\\.js)"
  },
  "The American Conservative": {
    domain: "theamericanconservative.com",
    allow_cookies: 1,
    cs_dompurify: 1
  },
  "The American Interest": {
    domain: "the-american-interest.com",
    allow_cookies: 1
  },
  "The American Scholar": {
    domain: "theamericanscholar.org",
    allow_cookies: 1,
    cs_dompurify: 1
  },
  "The Art Newspaper": {
    domain: "theartnewspaper.com",
    allow_cookies: 1,
    block_regex: /\.theartnewspaper\.com\/_next\/static\/chunks\/pages\/access-allowed-.+\.js/
  },
  "The Atlanta Journal-Constitution": {
    domain: "ajc.com",
    allow_cookies: 1,
    block_regex: /(\.piano\.io\/xbuilder\/experience\/execute|\.cxense\.com\/)/,
    useragent: "googlebot"
  },
  "The Atlantic": {
    domain: "theatlantic.com",
    allow_cookies: 1,
    block_regex: /\.theatlantic\.com\/zephr\//
  },
  "The Baffler": {
    domain: "thebaffler.com",
    allow_cookies: 1,
    block_regex: /\/blink\.net\/.+\/blink-sdk\.js/
  },
  "The Baltimore Banner": {
    domain: "thebanner.com",
    allow_cookies: 1,
    block_regex: /(\.tinypass\.com\/|\.thebaltimorebanner\.com\/script\.js)/
  },
  "The Boston Globe": {
    domain: "bostonglobe.com",
    allow_cookies: 1,
    block_regex: /(\.blueconic\.net\/|meter\.bostonglobe\.com\/js\/|\.ampproject\.org\/v0\/amp-subscriptions-.+\.js)/
  },
  "The Business Journals (free articles only)": {
    domain: "bizjournals.com",
    allow_cookies: 1,
    block_regex: /\.cxense\.com\//,
    block_js_inline: /\.bizjournals\.com\/.+\/(news|stories)\/.+\.html\?rel=plus/,
    cs_dompurify: 1
  },
  "The Business of Fashion": {
    domain: "businessoffashion.com",
    allow_cookies: 1,
    block_regex: /\.businessoffashion\.com\/arc-platform-proxy\.js/
  },
  "The Christian Science Monitor": {
    domain: "csmonitor.com",
    allow_cookies: 1,
    cs_clear_lclstrg: 1
  },
  "The Chronicle of Higher Education (& Philanthropy)": {
    domain: "###_usa_chronicle",
    group: [
      "chronicle.com",
      "philanthropy.com"
    ],
    allow_cookies: 1,
    block_regex: "\\.{domain}\\/script\\.js"
  },
  "The Columbian": {
    domain: "columbian.com",
    remove_cookies_select_drop: ["blaize_session"]
  },
  "The Critic": {
    domain: "thecritic.co.uk",
    block_regex: /\.hadrianpaywall\.com\//
  },
  "The Daily Beast": {
    domain: "thedailybeast.com",
    block_regex: /\.tinypass\.com\//
  },
  "The Dallas Morning News": {
    domain: "dallasnews.com",
    allow_cookies: 1,
    block_regex: /(\.dallasnews\.com\/script\.js|js\.matheranalytics\.com\/|\.ampproject\.org\/v0\/amp-subscriptions-.+\.js)/,
    useragent: "googlebot"
  },
  "The Diplomat": {
    domain: "thediplomat.com",
    useragent: "facebookbot",
    cs_dompurify: 1
  },
  "The Dispatch (not newsletters; do not block TinyPass-script externally)": {
    domain: "thedispatch.com",
    remove_cookies_select_drop: ["xbc"],
    cs_dompurify: 1
  },
  "The Economic Times (ET Prime)": {
    domain: "###_economictimes",
    group: [
      "economictimes.com",
      "economictimes.indiatimes.com",
      "epaper.indiatimes.com"
    ],
    allow_cookies: 1,
    block_regex: /apw\.economictimes\.indiatimes\.com\//,
    useragent: "googlebot",
    headers_filter: /\/economictimes\.indiatimes\.com\/.+\.cms/,
    exception: [{
        domain: "economictimes.com",
        allow_cookies: 1,
        useragent: "googlebot",
        headers_filter: /\.economictimes\.com\/.+\.cms/,
        cs_dompurify: 1
      }, {
        domain: "epaper.indiatimes.com",
        allow_cookies: 1
      }
    ]
  },
  "The Economist": {
    domain: "economist.com",
    allow_cookies: 1,
    block_regex: /(\/zephr\/feature|\.economist\.com\/(latest\/wall-ui|script)\.js)/,
    useragent_custom: "Mozilla/5.0 (Linux; Android 14) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Mobile Safari/537.36 Liskov"
  },
  "The Epoch Times (+ cz|de|fr|jp; opt-in to custom sites)": {
    domain: "###_usa_epochtimes",
    group: [
      "epoch.org.il",
      "theepochtimes.com"
    ],
    allow_cookies: 1,
    block_regex: /\.(theepochtimes|epochbase)\.com\/(rules\/get|api\/rule\/)/,
    exception: [{
        domain: "epoch.org.il",
        allow_cookies: 1,
        block_js_inline: /\/epoch\.org\.il\/.+\/\d{5,}\//,
        useragent: "googlebot",
        cs_dompurify: 1
      }
    ]
  },
  "The Financial Express": {
    domain: "financialexpress.com",
    allow_cookies: 1,
    block_regex: /(\.financialexpress\.com\/.+\/min\/premiumStoryContent\.js|\.ampproject\.org\/v0\/amp-access-.+\.js)/
  },
  "The Globe and Mail": {
    domain: "theglobeandmail.com",
    allow_cookies: 1,
    block_regex: /(\.sophi\.io\/|\.theglobeandmail\.com\/zephr\/feature)/
  },
  "The Hill": {
    domain: "thehill.com",
    allow_cookies: 1,
    block_regex: /\.tinypass\.com\//
  },
  "The Hill Times": {
    domain: "hilltimes.com",
    allow_cookies: 1,
    block_regex: /\.hilltimes\.com\/.+\/js\/loadingoverlay\/loadingoverlay\.min\.js/,
    useragent: "googlebot",
    cs_dompurify: 1
  },
  "The Hindu (not epaper)": {
    domain: "thehindu.com",
    allow_cookies: 1,
    block_regex: /(\.cxense\.com\/|\.piano\.io\/|\.ampproject\.org\/v0\/amp-subscriptions-.+\.js)/
  },
  "The Hindu BusinessLine (not epaper)": {
    domain: "thehindubusinessline.com",
    allow_cookies: 1,
    block_regex: /(\.tinypass\.com\/|\.ampproject\.org\/v0\/amp-subscriptions-.+\.js)/
  },
  "The Independent (UK & USA)": {
    domain: "###_uk_independent",
    group: [
      "independent.co.uk",
      "the-independent.com"
    ],
    allow_cookies: 1,
    block_regex: /\.independent\.co\.uk\/api\/tinypass\.min\.js/
  },
  "The Indian Express": {
    domain: "indianexpress.com",
    allow_cookies: 1,
    block_regex: /\.ampproject\.org\/v0\/amp-access-.+\.js/
  },
  "The Intercept (regwall)": {
    domain: "theintercept.com",
    allow_cookies: 1,
    block_js_inline: /\/theintercept\.com\//
  },
  "The Irish Examiner": {
    domain: "irishexaminer.com",
    remove_cookies_select_drop: ["blaize_session"],
    cs_dompurify: 1
  },
  "The Irish News": {
    domain: "irishnews.com",
    allow_cookies: 1,
    block_regex: /\.poool\.fr\//
  },
  "The Irish Times": {
    domain: "irishtimes.com",
    allow_cookies: 1,
    block_regex: /\.irishtimes\.com\/zephr\/feature/
  },
  "The Japan Times (do not block TinyPass-script externally)": {
    domain: "japantimes.co.jp",
    block_regex: /\.cxense\.com\//,
    remove_cookies_select_drop: ["xbc"]
  },
  "The Jerusalem Post": {
    domain: "jpost.com",
    allow_cookies: 1,
    block_regex: /\.jpost\.com\/js\/js_article\.min\.js/
  },
  "The Juggernaut": {
    domain: "###_usa_thejuggernaut",
    group: [
      "thejuggernaut.com",
      "jgnt.co"
    ],
    allow_cookies: 1
  },
  "The Lamp Magazine": {
    domain: "thelampmagazine.com",
    allow_cookies: 1
  },
  "The Lawyer (UK; not mda)": {
    domain: "thelawyer.com",
    allow_cookies: 1,
    block_regex: /\.tinypass\.com\//,
    cs_dompurify: 1
  },
  "The Leaflet.in": {
    domain: "theleaflet.in",
    allow_cookies: 1,
    cs_dompurify: 1
  },
  "The Local Group (EU)": {
    domain: "###_eu_thelocal",
    allow_cookies: 1,
    block_regex: /\.tinypass\.com\//
  },
  "The Logic.co (do not block TinyPass-script externally)": {
    domain: "thelogic.co",
    block_regex: /(\.piano\.io\/xbuilder\/experience\/execute|\.cxense\.com\/)/,
    remove_cookies_select_drop: ["firstarticle"]
  },
  "The Market.ch": {
    domain: "themarket.ch",
    allow_cookies: 1,
    block_regex: /(\.piano\.io\/|tms\.danzz\.ch\/scripts\/t\.min\.js)/
  },
  "The Nation": {
    domain: "thenation.com",
    allow_cookies: 1,
    block_regex: /(\.thenation\.com\/wp-content\/themes\/.+\/js\/paywall\/main\.js|\.ampproject\.org\/v0\/amp-access-.+\.js)/
  },
  "The New Atlantis": {
    domain: "thenewatlantis.com",
    allow_cookies: 1,
    block_regex: /\.thenewatlantis\.com\/.+\/thenewatlantis\/js\/(gate|donate)\.js/
  },
  "The New Criterion": {
    domain: "newcriterion.com",
    allow_cookies: 1,
    cs_dompurify: 1
  },
  "The New Republic": {
    domain: "newrepublic.com",
    allow_cookies: 1,
    block_regex: /\/blink\.net\/.+\/blink-sdk\.js/
  },
  "The New Statesman": {
    domain: "newstatesman.com",
    allow_cookies: 1,
    block_regex: /(\.piano\.io\/|magazine\.newstatesman\.com\/pugpig-websmartbanner\.js)/,
    cs_all_frames: 1,
    cs_dompurify: 1
  },
  "The New World (UK)": {
    domain: "thenewworld.co.uk",
    allow_cookies: 1,
    block_regex: /cdn\.tinypass\.com\//
  },
  "The New York Review of Books": {
    domain: "nybooks.com",
    allow_cookies: 1,
    block_regex: /\.nybooks\.com\/wp-admin\/admin-ajax\.php/
  },
  "The New York Sun (text only)": {
    domain: "nysun.com",
    allow_cookies: 1
  },
  "The New York Times": {
    domain: "nytimes.com",
    allow_cookies: 1,
    block_regex: /(\.nytimes\.com\/(meter\.js|svc\/onsite-messaging\/query)|mwcm\.nyt\.com\/.+\.js|cooking\.nytimes\.com\/api\/.+\/access)/,
    useragent_custom: "Mozilla/5.0 (compatible; Google-InspectionTool/1.0)"
  },
  "The News Lens (JP)": {
    domain: "thenewslens.com",
    allow_cookies: 1
  },
  "The News Minute": {
    domain: "thenewsminute.com",
    allow_cookies: 1,
    cs_dompurify: 1
  },
  "The Observer UK": {
    domain: "observer.co.uk",
    allow_cookies: 1,
    block_regex: /\.piano\.io\//
  },
  "The Past": {
    domain: "the-past.com"
  },
  "The Philadelphia Inquirer": {
    domain: "inquirer.com",
    allow_cookies: 1,
    block_regex: /\.sophi\.io\//
  },
  "The Point Magazine": {
    domain: "thepointmag.com",
    remove_cookies_select_drop: ["monthly_history"]
  },
  "The Quint": {
    domain: "thequint.com",
    allow_cookies: 1,
    cs_dompurify: 1
  },
  "The San Francisco Standard": {
    domain: "sfstandard.com",
    remove_cookies_select_drop: ["sfs-experiment-bucketing"],
    useragent: "googlebot"
  },
  "The Saturday Paper (AU)": {
    domain: "thesaturdaypaper.com.au",
    allow_cookies: 1,
    block_regex: /\.thesaturdaypaper\.com\.au\/api\/tinypass\.min\.js/
  },
  "The Scientist (archive)": {
    domain: "the-scientist.com",
    allow_cookies: 1
  },
  "The Seattle Times": {
    domain: "seattletimes.com",
    allow_cookies: 1,
    block_regex: /(\.seattletimes\.com\/.+\/st-user-messaging.+\.js|js\.matheranalytics\.com\/)/
  },
  "The Spectator Group (UK)": {
    domain: "###_uk_spectator",
    group: [
      "spectator.com",
      "spectator.com.au",
      "apollo-magazine.com"
    ],
    allow_cookies: 1,
    block_regex: /\.tinypass\.com\//
  },
  "The Spokesman-Review": {
    domain: "spokesman.com",
    allow_cookies: 1,
    block_regex: /\.wgchrrammzv\.com\/prod\/spokesman\/loader\.min\.js/
  },
  "The Stage Media (UK)": {
    domain: "###_uk_thestage_media",
    group: [
      "thebookseller.com",
      "thestage.co.uk"
    ],
    allow_cookies: 1,
    cs_dompurify: 1,
    exception: [{
        domain: "thebookseller.com",
        allow_cookies: 1,
        useragent: "googlebot"
      }
    ]
  },
  "The Star.co.ke": {
    domain: "the-star.co.ke",
    allow_cookies: 1
  },
  "The Sun Group (UK)": {
    domain: "###_uk_thesun",
    group: [
      "thescottishsun.co.uk",
      "thesun.co.uk",
      "thesun.ie"
    ],
    allow_cookies: 1,
    block_regex: "\\.{domain}\\/zephr\\/feature"
  },
  "The Telegraph": {
    domain: "telegraph.co.uk",
    allow_cookies: 1,
    block_regex: /(\.tinypass\.com\/|\.telegraph\.co\.uk\/martech\/js\/)/
  },
  "The Times UK (fetch from archive.is)": {
    domain: "thetimes.com",
    allow_cookies: 1,
    block_regex: /(\.zephr\.com\/zephr-browser\/|\.thetimes\.com\/wp-content\/plugins\/tm-wp-zephr\/)/,
    cs_dompurify: 1
  },
  "The Times Literary Supplement": {
    domain: "the-tls.com",
    allow_cookies: 1,
    cs_dompurify: 1
  },
  "The Toronto Star (+ local TorStar sites)": {
    domain: "###_ca_torstar",
    group: [
      "niagarafallsreview.ca",
      "stcatharinesstandard.ca",
      "thepeterboroughexaminer.com",
      "therecord.com",
      "thespec.com",
      "thestar.com",
      "wellandtribune.ca"
    ],
    allow_cookies: 1,
    block_regex: "\\.{domain}\\/.+\\/tncms\\/api\\/access\\..+\\.js",
    cs_dompurify: 1
  },
  "The Wall Street Journal": {
    domain: "wsj.com",
    allow_cookies: 1,
    referer_custom: "https://www.drudgereport.com/",
    cs_dompurify: 1
  },
  "The Washington Post": {
    domain: "washingtonpost.com",
    allow_cookies: 1,
    block_regex: /\.washingtonpost\.com\/.+\/tetro-client\//,
    useragent: "googlebot"
  },
  "The Week (regwall)": {
    domain: "theweek.com",
    allow_cookies: 1
  },
  "The West Australian (+ regional/opt-in to custom sites)": {
    domain: "thewest.com.au",
    allow_cookies: 1
  },
  "The Wrap": {
    domain: "thewrap.com",
    remove_cookies_select_drop: ["blaize_session"],
    cs_dompurify: 1
  },
  "Times Higher Education": {
    domain: "timeshighereducation.com",
    allow_cookies: 1
  },
  "Times of India": {
    domain: "timesofindia.indiatimes.com",
    allow_cookies: 1,
    block_js_inline: /timesofindia\.indiatimes\.com\/.+\.cms\?rel=plus/,
    cs_dompurify: 1
  },
  "Tom's Hardware": {
    domain: "tomshardware.com",
    allow_cookies: 1
  },
  "Tribune Publishing Company": {
    domain: "###_usa_tribune",
    group: [
      "baltimoresun.com",
      "capitalgazette.com",
      "chicagotribune.com",
      "courant.com",
      "dailypress.com",
      "mcall.com",
      "nydailynews.com",
      "orlandosentinel.com",
      "pilotonline.com",
      "sun-sentinel.com"
    ],
    allow_cookies: 1,
    block_regex: "(\\.{domain}\\/(script|.+\\/loader-wp\\/static\\/loader\\.min)\\.js|\\.sophi\\.io\\/)",
    cs_dompurify: 1
  },
  "Tuttosport": {
    domain: "tuttosport.com",
    allow_cookies: 1,
    cs_dompurify: 1
  },
  "UnHerd": {
    domain: "unherd.com",
    allow_cookies: 1,
    block_regex: /\.piano\.io\//
  },
  "UOL.com.br": {
    domain: "uol.com.br",
    allow_cookies: 1,
    block_regex: /(paywall\.folha\.uol\.com\.br\/|\.(tinypass|matheranalytics)\.com\/|\.poool\.fr\/|\.ampproject\.org\/v0\/amp-subscriptions-.+\.js)/,
    useragent: "googlebot",
    headers_filter: /\.folha\.uol\.com\.br\//
  },
  "USA Today": {
    domain: "usatoday.com",
    allow_cookies: 1,
    useragent: "googlebot",
	headers_filter: /\.usatoday\.com\/.+\/\d{10,}\//
  },
  "Vanity Fair Italia": {
    domain: "vanityfair.it",
    allow_cookies: 1,
    block_regex: /\.vanityfair\.it\/[-\w]+$/
  },
  "Valeurs Actuelles (text only)": {
    domain: "valeursactuelles.com",
    allow_cookies: 1,
    block_regex: /\.qiota\.com\//
  },
  "Valnet Group (regwall; opt-in to custom sites)": {
    domain: "###_ca_valnet",
    group: [],
    remove_cookies_select_drop: ["articlesLimitDepth", "articlesReadPerDay"]
  },
  "Verlagsgruppe Rhein Main (fetch from archive.is; opt-in to custom sites for unlisted)": {
    domain: "###_de_vrm",
    group: [
      "allgemeine-zeitung.de",
      "echo-online.de",
      "wiesbadener-kurier.de"
    ],
    allow_cookies: 1,
    block_regex: /\.piano\.io\//,
    cs_dompurify: 1
  },
  "Vice": {
    domain: "vice.com",
    allow_cookies: 1,
    cs_dompurify: 1
  },
  "Vibilagare.se": {
    domain: "vibilagare.se",
    allow_cookies: 1,
    useragent: "googlebot"
  },
  "Vikatan": {
    domain: "vikatan.com",
    allow_cookies: 1,
    cs_dompurify: 1
  },
  "VmnMedia.nl Group (opt-in to custom sites)": {
    domain: "###_nl_vmnmedia",
    group: [],
    allow_cookies: 1,
    useragent: "googlebot"
  },
  "Vogue Business": {
    domain: "voguebusiness.com",
    block_regex: /\.voguebusiness\.com\/journey\/compiler\/build-.+\.js/,
    remove_cookies_select_drop: ["userId"]
  },
  "Vorarlberg Nachrichten": {
    domain: "vn.at",
    allow_cookies: 1,
    block_js_inline: /\.vn\.at\/.+\/\d{4}\//,
    block_regex: /\.tinypass\.com\//,
  },
  "Vorarlberg Online": {
    domain: "vol.at",
    allow_cookies: 1,
    block_regex: /\.piano\.io\//,
    cs_dompurify: 1
  },
  "Vox Media Group": {
    domain: "###_usa_vox_media",
    group: [
      "curbed.com",
      "grubstreet.com",
      "nymag.com",
      "thecut.com",
      "theverge.com",
      "vox.com",
      "vulture.com"
    ],
    allow_cookies: 1,
    block_regex: /\.zephr\.com\/zephr-browser\//
  },
  "Vrij Nederland": {
    domain: "vn.nl",
    allow_cookies: 1,
    cs_dompurify: 1
  },
  "War on the Rocks": {
    domain: "warontherocks.com",
    allow_cookies: 1,
    cs_dompurify: 1
  },
  "Washington Examiner": {
    domain: "washingtonexaminer.com",
    allow_cookies: 1,
    block_regex: /\.zephr\.com\/zephr-browser\//
  },
  "Weltkunst": {
    domain: "weltkunst.de",
    allow_cookies: 1,
    useragent: "googlebot"
  },
  "Weser-Kurier": {
    domain: "weser-kurier.de",
    allow_cookies: 1,
    block_regex: /\.weser-kurier\.de\/assets\/.+\/wk-bundle\.min\.js/
  },
  "William Reed Group (opt-in to custom sites)": {
    domain: "###_uk_william_reed",
    group: [],
    block_regex: /\.tinypass\.com\//,
    add_ext_link: "div.accessMessage|div.accessContainer",
    add_ext_link_type: "google_search_tool",
  },
  "Winnipeg Free Press": {
    domain: "winnipegfreepress.com",
    allow_cookies: 1,
    block_regex: /(\.winnipegfreepress\.com\/(api\/v\d\/auth\/identify|.+\/gdpr\.js)|\.cxense\.com\/)/
  },
  "WirtschaftsWoche": {
    domain: "wiwo.de",
    allow_cookies: 1,
    useragent: "googlebot"
  },
  "Wonderzine": {
    domain: "wonderzine.com",
    allow_cookies: 1,
    useragent: "facebookbot"
  },
  "World Economics": {
    domain: "worldeconomics.com",
    allow_cookies: 1
  },
  "Wyborcza.pl Group (fetch from archive.is)": {
    domain: "###_pl_wyborcza_group",
    group: [
      "magazyn-kuchnia.pl",
      "wyborcza.biz",
      "wyborcza.pl",
      "wysokieobcasy.pl"
    ],
    allow_cookies: 1,
    cs_dompurify: 1
  },
  "Ynet": {
    domain: "ynet.co.il",
    allow_cookies: 1,
    block_js_inline: /\.ynet\.co\.il\/.+\/article\/.+\?rel=plus/
  },
  "* Block general paywall-scripts (opt-in to custom sites to enable also for unlisted sites)": {
    domain: "###"
  },
  "Amp-access": {
    domain: "cdn.ampproject.org",
    allow_cookies: 1,
    block_regex_general: /\.ampproject\.org\/.+\/amp-(access|(.+-)?ad|analytics|fx-flying-carpet|subscriptions)-.+\.m?js/,
    excluded_domains: ["cdn.ampproject.org", "cambridge.org", "cmjornal.pt"]
  },
  "Amplitude": {
    domain: "amplitude.com",
    allow_cookies: 1,
    block_regex_general: /\.amplitude\.com\//,
    excluded_domains: ["amplitude.com"]
  },
  "Arc XP": {
    domain: "###_arcxp.com",
    allow_cookies: 1,
    block_regex_general: /\/arc\/subs\/p\.min\.js/
  },
  "Axate.io": {
    domain: "###_uk_axate.io",
    allow_cookies: 1,
    block_regex_general: /\.axate\.io\//
  },
  "Azure Connext Loader": {
    domain: "###_azure_connext",
    allow_cookies: 1,
    block_regex_general: /(cdn|loader)\..+\.com\/prod\/.+\/loader\.min\.js/
  },
  "BlueConic": {
    domain: "blueconic.net",
    allow_cookies: 1,
    block_regex_general: /(\.blueconic\.net\/|[a-z]{1}[0-9]{2,3}\.[\w-]+\.(co(m|\.uk)|net|org)\/script\.js)/
  },
  "Cxense": {
    domain: "cxense.com",
    allow_cookies: 1,
    block_regex_general: /\.cxense\.com\//,
    excluded_domains: ["journaldemontreal.com", "journaldequebec.com", "wsj.com"]
  },
  "Ensighten": {
    domain: "ensighten.com",
    allow_cookies: 1,
    block_regex_general: /\.ensighten\.com\/.+\/Bootstrap\.js/
  },
  "EverCookie": {
    domain: "###_evercookie",
    allow_cookies: 1,
    block_regex_general: /\/paywall\/evercookie_get\.js/
  },
  "Evolok": {
    domain: "evolok.net",
    allow_cookies: 1,
    block_regex_general: /\.evolok\.net\//
  },
  "Evolok WordPress": {
    domain: "###_wp_evolok",
    allow_cookies: 1,
    block_regex_general: /\/evolok\/(.+\/)?ev-(em|widgets)\.min\.js/,
    excluded_domains: ["vikatan.com"]
  },
  "FewCents": {
    domain: "fewcents.co",
    allow_cookies: 1,
    block_regex_general: /\.fewcents\.co\/.+\/paywall.*\.js/
  },
  "Leaky Paywall (WordPress plugin)": {
    domain: "###_wp_leaky_paywall",
    group: [],
    block_regex_general: /\/(wp-content\/plugins\/leaky-paywall\/js\/leaky-paywall-cookie\.js|wp-json\/leaky-paywall\/v\d\/check-restrictions)/
  },
  "MatherAnalytics": {
    domain: "matheranalytics.com",
    allow_cookies: 1,
    block_regex_general: /js\.matheranalytics.com\//
  },
  "NewsMemory": {
    domain: "newsmemory.com",
    allow_cookies: 1,
    block_regex_general: /\.newsmemory\.com\/\?meter/
  },
  "Memberstack": {
    domain: "memberstack.com",
    group: [],
    allow_cookies: 1,
    block_regex_general: /\.memberstack\.com\/scripts\/.+\/memberstack\.js/,
    excluded_domains: ["memberstack.com"]
  },
  "Newspack (WordPress plugin)": {
    domain: "###_wp_newspack_gate",
    allow_cookies: 1,
    block_regex_general: /\/wp-content\/plugins\/newspack-plugin\/dist\/.+-gate-metering\.js/
  },
  "Omeda Olytics": {
    domain: "omeda.com",
    allow_cookies: 1,
    block_regex_general: /olytics\.omeda\.com\//,
    excluded_domains: ["omeda.com"]
  },
  "OneCount": {
    domain: "onecount.net",
    allow_cookies: 1,
    block_regex_general: /\.onecount\.net\//
  },
  "Pelcro": {
    domain: "pelcro.com",
    allow_cookies: 1,
    block_regex_general: /js\.pelcro\.com\//,
    excluded_domains: ["pelcro.com"]
  },
  "Piano.io (+ TinyPass)": {
    domain: "piano.io",
    allow_cookies: 1,
    block_regex_general: /\/xbuilder\/experience\/execute/,
    excluded_domains: ["piano.io", "automobilwoche.de", "frontline.thehindu.com", "hbr.org", "japantimes.co.jp", "nacion.com", "thedispatch.com"]
  },
  "Pico.tools": {
    domain: "pico.tools",
    allow_cookies: 1,
    block_regex_general: /api\.pico\.tools\//
  },
  "Pigeon (WordPress plugin)": {
    domain: "###_wp_pigeon",
    allow_cookies: 1,
    block_regex_general: /\/c\/assets\/pigeon\.js/
  },
  "Pmpro Limit Post Views (WordPress plugin)": {
    domain: "###_wp_pmpro_limit_post_views",
    allow_cookies: 1,
    block_regex_general: /\/wp-content\/plugins\/pmpro-limit-post-views\/js\/pmprolpv\.js/
  },
  "Poool.fr": {
    domain: "poool.fr",
    allow_cookies: 1,
    block_regex_general: /\.poool\.fr\//,
    excluded_domains: ["poool.fr"]
  },
  "Qiota": {
    domain: "qiota.com",
    allow_cookies: 1,
    block_regex_general: /\.qiota\.com\/data/,
    excluded_domains: ["qiota.com"]
  },
  "RCP-View Limit (WordPress plugin)": {
    domain: "###_rcp_view_limit",
    allow_cookies: 1,
    block_regex_general: /\/wp-content\/.+\/plugins\/rcp-view-limit\//
  },
  "Sophi.io": {
    domain: "sophi.io",
    allow_cookies: 1,
    block_regex_general: /\.sophi\.io\//,
    excluded_domains: ["sophi.io"]
  },
  "Steady": {
    domain: "steadyhq.com",
    allow_cookies: 1,
    block_regex_general: /\/steadyhq\.com\//,
    excluded_domains: ["steadyhq.com"]
  },
  "TownNews sites (Blox CMS)": {
    domain: "###_usa_townnews",
    block_regex_general: /\/tncms\/api\/access(\..+)?\.js/,
    cs_dompurify: 1,
    exception: [{
        domain: "berkshireeagle.com",
        block_regex_general: /\/tncms\/api\/access(\..+)?\.js/,
        useragent: "googlebot",
        cs_dompurify: 1
      }
    ]
  },
  "Wallkit (WordPress plugin)": {
    domain: "###_wp_wallkit",
    group: [],
    allow_cookies: 1,
    block_regex_general: /\.wallkit\.net\/js\//
  },
  "Zephr": {
    domain: "zephr.com",
    allow_cookies: 1,
    block_regex_general: /(\.zephr\.com\/zephr-browser\/|\/zephr\/feature)/
  },
}

var ext_api = chrome || browser;
var manifestData = ext_api.runtime.getManifest();
var ext_chromium = !!manifestData.key;
if (ext_chromium) {
  var ja_title = 'Jeune Afrique (last month only)';
  defaultSites[ja_title]['headers_custom'] = defaultSites[ja_title]['cs_param'];
  var nyp_title = 'New York Post';
  defaultSites[nyp_title] = {
    domain: "nypost.com",
    group: [
      "nypost.com",
      "nypost.djservices.io"
    ],
    allow_cookies: 1,
    block_regex: /\.nypost\.com\/zephr\/feature/,
    exception: [{
        domain: "nypost.djservices.io",
        allow_cookies: 1,
        headers_custom: defaultSites[nyp_title]['cs_param']
      }
    ]
  };
}

var defaultSites_grouped_domains = Object.values(defaultSites).filter(function (value) {
    return (value.hasOwnProperty('domain') && value.domain !== '###');
  }).map(x => x.domain);
var defaultSites_groups_domains = [].concat.apply([], Object.values(defaultSites).filter(function (value) {
    return value.hasOwnProperty('group');
  }).map(x => x.group));
var defaultSites_domains = defaultSites_grouped_domains.concat(defaultSites_groups_domains);

function expandSiteRules(sites, updated = false) {
  for (let site in sites) {
    let rule = sites[site];
    if (rule.hasOwnProperty('group_rule')) {
      let rules = sites[rule.group_rule];
      for (key in rules) {
        if (key !== 'group_rule_domains')
          sites[site][key] = rules[key];
      }
      //delete sites[site].group_rule;
    }
    if (updated) {
      if (rule.hasOwnProperty('group_rule_domains')) {
        let domains = rule.group_rule_domains;
        for (let domain of domains) {
          let defaultTitle = Object.keys(defaultSites).find(key => defaultSites[key].domain === domain);
          if (defaultTitle) {
            for (key in rule) {
              if (key !== 'group_rule_domains')
                defaultSites[defaultTitle][key] = rule[key];
            }
          }
        }
      }
    }
    if (rule.hasOwnProperty('group')) {
      let domain = rule.domain;
      grouped_sites[domain] = rule.group
    }
  }
}

var grouped_sites = {};
expandSiteRules(defaultSites);

// custom domains (background)
var custom_flex_not = {
  "###_ca_postmedia": ["canada.com", "canoe.com", "driving.ca"],
  "###_de_dfv_medien": ["dfv.de"],
  "###_de_madsack": ["madsack.de", "madsack-medien-campus.de"],
  "###_es_epiberica": ["sport.es", "stilo.es"],
  "###_wp_leaky_paywall": ["koreapro.org", "nknews.org", "theregistrysf.com", "uppereastsite.com"],
  "###_uk_axate.io": ["thecricketer.com", "thinkofx.net"],
  "###_uk_haymarket": ["asianinvestor.net", "classicandsportscar.com", "financeasia.com", "gpbusiness.co.uk", "scmagazineuk.com", "thecorporatetreasurer.com"],
  "###_uk_haymarket_medical": ["mycme.com"],
  "###_usa_hearst_comm": ["chron.com", "sfgate.com"],
  "###_usa_mcc": ["mcclatchy.com"],
  "###_usa_townnews": ["bloxdigital.com", "townnews.com"],
  "thewest.com.au": ["perthnow.com.au"]
}
var custom_flex;
var custom_flex_domains;
var custom_flex_not_domains;
var custom_flex_nofix_domains = [].concat(custom_flex_not['###_wp_leaky_paywall'], custom_flex_not['###_uk_axate.io'], custom_flex_not['###_uk_haymarket']);

function init_custom_flex_domains() {
  custom_flex = {};
  custom_flex_domains = [];
  custom_flex_not_domains = [].concat.apply([], Object.values(custom_flex_not));
  nofix_groups = [];
}
init_custom_flex_domains();

// sites with no fix (background)
var ch_media_nofix_domains = ['aargauerzeitung.ch', 'luzernerzeitung.ch', 'tagblatt.ch'];
var de_mg_pressedruck_nofix_domains = ['allgaeuer-zeitung.de', 'augsburger-allgemeine.de', 'mainpost.de', 'suedkurier.de'];
var de_westfalen_medien_nofix_domains = ['muensterschezeitung.de', 'westfalen-blatt.de', 'wn.de'];
var fi_sanoma_nofix_domains = ['aamulehti.fi', 'hs.fi', 'is.fi'];
var fr_groupe_infopro_nofix_domains = ['centralbanking.com', 'lagazettedescommunes.com', 'risk.net', 'usine-digitale.fr'];
var fr_indigo_nofix_domains = ['africaintelligence.com', 'africaintelligence.fr', 'glitz.paris', 'intelligenceonline.com', 'intelligenceonline.fr', 'lalettre.fr'];
var fr_jamg_nofix_domains = ['africabusinessplus.com', 'theafricareport.com'];
var fr_monde_diplo_nofix_domains = ['editionarabediplo.com', 'eldiplo.org', 'lemondediplomatique.cl', 'lmd.nedeljnik.rs', 'lmd.no', 'monde-diplomatique.fr', 'mondediplo.com', 'mondediplo.fi'];
var it_gedi_nofix_domains = ['gelocal.it', 'huffingtonpost.it', 'limesonline.com'];
var it_gruppo_nem_nofix_domains = ['corrierealpi.it', 'ilnordest.it', 'ilpiccolo.it', 'mattinopadova.it', 'messaggeroveneto.it', 'nuovavenezia.it', 'tribunatreviso.it'];
var mx_grupo_reforma_nofix_domains = ['elnorte.com', 'mural.com.mx', 'reforma.com'];
var nl_mediahuis_regional_nofix_domains = ['dvhn.nl', 'haarlemsdagblad.nl', 'lc.nl', 'leidschdagblad.nl', 'limburger.nl', 'noordhollandsdagblad.nl'];
var pt_medialivre_nofix_domains = ['cmjornal.pt', 'jornaldenegocios.pt', 'record.pt'];
var se_bonnier_group_nofix_domains = ['di.se', 'expressen.se'];
var uk_derivia_nofix_domains = ['fow.com', 'globalcapital.com', 'structuredretailproducts.com'];
var uk_ft_group_nofix_domains = ['ftchinese.com', 'ftchineselive.com', 'sustainableviews.com', 'thebanker.com'];
var uk_ft_specialist_nofix_domains = ['agendanews.com', 'boardiq.com', 'financialadvisoriq.com', 'fundfire.com', 'healthpayerspecialist.com', 'ignites.com', 'ignitesasia.com', 'igniteseurope.com', 'lifeannuityspecialist.com', 'pandcspecialist.com'];
var usa_allcity_network_nofix_domains = ['allchgo.com', 'alldlls.com', 'allphly.com', 'gophnx.com', 'thednvr.com'];
var nofix_sites = ['11freunde.de', '24.hu', '444.hu', 'aachener-zeitung.de', 'abplive.com', 'aerzteblatt.de', 'africa-confidential.com', 'aftenposten.no', 'aftonbladet.se', 'agefi.fr', 'altroconsumo.it', 'americanscientist.org', 'arkansasonline.com', 'arretsurimages.net', 'asahi.com', 'asiatimes.com', 'autocarpro.in', 'aviationweek.com', 'badische-zeitung.de', 'barrons.com', 'belfasttelegraph.co.uk', 'bgov.com', 'bisnis.com', 'bloomberglaw.com', 'bloombergtax.com', 'bmj.com', 'bnef.com', 'borsen.dk', 'breakingviews.com', 'breitbart.com', 'brill.com', 'bunshun.jp', 'businessinsider.de', 'businesslive.co.za', 'caixin.com', 'caixinglobal.com', 'cambiocolombia.com', 'capital.de', 'catalyst-journal.com', 'cfnews.net', 'chegg.com', 'cieletespace.fr', 'consumerreports.org', 'cookpolitical.com', 'costar.com', 'coursehero.com', 'crunchbase.com', 'dailywire.com', 'dealstreetasia.com', 'defence24.pl', 'delfi.ee', 'denikn.cz', 'deraktionaer.de', 'deutsche-wirtschafts-nachrichten.de', 'die-glocke.de', 'digitimes.com', 'digitimes.com.tw', 'donaukurier.de', 'dorzeczy.pl', 'e24.no', 'echo24.cz', 'eenews.net', 'eliteprospects.com', 'elnuevodia.com', 'elordenmundial.com', 'epochtimes.se', 'etc.se', 'epw.in', 'euractiv.com', 'ewmagazine.nl', 'fd.nl', 'finance.si', 'finanz-szene.de', 'forbes.cz', 'gamestar.de', 'gazetaprawna.pl', 'gazeteoksijen.com', 'geo.de', 'geopoliticalfutures.com', 'golem.de', 'gp.se', 'haufe.de', 'hbr-caijing.com', 'hbrarabic.com', 'hbrfrance.fr', 'hedgehogreview.com', 'heraldo.es', 'hindutamil.in', 'histoire-et-civilisations.com', 'history.org.uk', 'hn.cz', 'hpdetijd.nl', 'hsj.co.uk', 'humanite.fr', 'hvg.hu', 'ideas.tikvah.org', 'idnes.cz', 'iex.nl', 'ifre.com', 'independent.ie', 'ilsecoloxix.it', 'iltalehti.fi', 'indiasworld.in', 'information.dk', 'intelligentinvestor.com.au', 'investing.com', 'jacobin.com', 'janes.com', 'jazziz.com', 'jn.pt', 'jota.info', 'jungefreiheit.de', 'jutarnji.hr', 'jyllands-posten.dk', 'kicker.de', 'kleinezeitung.at', 'kommunen.dk', 'krone.at', 'lanouvellerepublique.fr', 'laprovence.com', 'latribune.fr', 'laverita.info', 'lavie.fr', 'lavozdegalicia.es', 'law360.ca', 'law360.co.uk', 'law360.com', 'leconomiste.com', 'ledesk.ma', 'lefilmfrancais.com', 'lesjours.fr', 'lexisnexis.co.uk', 'libertiesjournal.com', 'lindipendente.online', 'lloydslist.com', 'lorientlejour.com', 'lr-online.de', 'mailplus.co.uk', 'main-echo.de', 'mainichi.jp', 'malaysiakini.com', 'manager-magazin.de', 'marianne.net', 'maville.com', 'mediapart.fr', 'micromega.net', 'mlex.com', 'mnimarkets.com', 'money.it', 'moneycontrol.com', 'moodys.com', 'mopo.de', 'morningstar.com', 'motorsport.com', 'moz.de', 'mt.de', 'mz.de', 'nachrichten.at', 'natgeo.nikkeibp.co.jp', 'nationaljournal.com', 'nbr.co.nz', 'nejm.org', 'newleftreview.org', 'news24.com', 'newsmax.comac', 'newspapers.com', 'newsroom.co.nz', 'nexojornal.com.br', 'nexos.com.mx', 'next.ink', 'ngalarabiya.com', 'nikkansports.com', 'nikkei.com', 'nn.de', 'noen.at', 'note.com', 'nouvelobs.com', 'oantagonista.com.br', 'odt.co.nz', 'ojogo.pt', 'on3.com', 'onetz.de', 'oup.com', 'pagina12.com.ar', 'penews.com', 'pff.com', 'piratewires.com', 'politicopro.com', 'politiken.dk', 'politis.fr', 'postimees.ee', 'pressreader.com', 'publico.pt', 'quechoisir.org', 'racingpost.com', 'rbc.ru', 'reason.com', 'republic.ru', 'rhein-zeitung.de', 'riffreporter.de', 'rnz.de', 'rtings.com', 'ruhrnachrichten.de', 'sankei.com', 'sciencedirect.com', 'scienceshumaines.com', 'seekingalpha.com', 'slobodnadalmacija.hr', 'sn.at', 'sponichi.co.jp', 'springer.com', 'statista.com', 'stimme.de', 'storm.mg', 'streetinsider.com', 'studocu.com', 'substack.com', 'suedostschweiz.ch', 'svd.se', 'swp.de', 't3n.de', 'table.media', 'tabletmag.com', 'taxation.co.uk', 'taxjournal.com', 'telquel.ma', 'tempo.co', 'test.de', 'the-ken.com', 'theinformation.com', 'theinitium.com', 'thejakartapost.com', 'thelancet.com', 'themorningcontext.com', 'theparisreview.org', 'thestar.com.my', 'tipranks.com', 'tradingview.com', 'tribunemag.co.uk', 'tt.com', 'tvn24.pl', 'udn.com', 'valueresearchonline.com', 'van-magazin.de', 'van-magazine.com', 'vedomosti.ru', 'vg.no', 'vi.nl', 'volksstimme.de', 'voguescandinavia.com', 'weltwoche.ch', 'weltwoche.de', 'which.co.uk', 'wissenschaft.de', 'worldpoliticsreview.com', 'woz.ch', 'wpolityce.pl', 'wz.de', 'xakep.ru', 'yomiuri.co.jp', 'zaobao.com.sg', 'zerohedge.com', 'zive.cz', 'zvw.de'].concat(custom_flex_nofix_domains, ch_media_nofix_domains, de_mg_pressedruck_nofix_domains, de_westfalen_medien_nofix_domains, fi_sanoma_nofix_domains, fr_groupe_infopro_nofix_domains, fr_indigo_nofix_domains, fr_jamg_nofix_domains, fr_monde_diplo_nofix_domains, it_gedi_nofix_domains, it_gruppo_nem_nofix_domains, mx_grupo_reforma_nofix_domains, nl_mediahuis_regional_nofix_domains, pt_medialivre_nofix_domains, se_bonnier_group_nofix_domains, uk_derivia_nofix_domains, uk_ft_group_nofix_domains, uk_ft_specialist_nofix_domains, usa_allcity_network_nofix_domains);
