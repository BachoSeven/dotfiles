#!/bin/bash

# ~/.w3m/cgi-bin/search_engines.cgi

# format [KEYWORD]:[THE-SEARCH-TERM]

# %20 is widely used as a separator in url strings
# In duckduckgo the plus sign '+' is converted into spaces ' '
# In youtube the plus sign '+' is used as a separator
# In wikipedia plus sign '+' and underscores '_' work as spaces


#echo $QUERY_STRING > ~/test1.txt
KEYWORD=$(echo $QUERY_STRING | cut -d ':' -f 1)
# From camp 2 to the end. This is for other colons in the search e.g., type:pdf
SEARCH_PRE=$(echo $QUERY_STRING | cut -d ':' -f 2-)
# convert hyphen to %20
SEARCH=$(echo $SEARCH_PRE | sed 's/-/%20/')
#echo $KEYWORD >> ~/test1.txt
#echo $SEARCH >> ~/test1.txt

if [[ "$KEYWORD" =~ ^d$|^g$|^y$|^w$|^wes$|^se$|^azlyrics$|^darklyrics$ ]]; then
## duckduckgo
 	if [[ "$KEYWORD" =~ ^d$ ]]; then
 	echo "W3m-control: GOTO https://duckduckgo.com/lite/?q=$SEARCH&t=ffab&ia=web"
# google
	elif [[ "$KEYWORD" =~ ^g$ ]]; then
	echo "W3m-control: GOTO https://www.google.com/search?q=$SEARCH"
# YouTube
	elif [[ "$KEYWORD" =~ ^y$ ]]; then
	echo "W3m-control: GOTO https://www.youtube.com/results?search_query=$SEARCH"
# wikipedia
	elif [[ "$KEYWORD" =~ ^w$ ]]; then
	#FINAL_URL=https://en.wikipedia.org/w/index.php?search=%s&title=Special%3ASearch
	echo "W3m-control: GOTO https://en.wikipedia.org/w/index.php?search=$SEARCH&title=Special%3ASearch"
# wikipedia spanish
	elif [[ "$KEYWORD" =~ ^wes$ ]]; then
	echo "W3m-control: GOTO https://es.wikipedia.org/w/index.php?search=$SEARCH&title=Especial%3ABuscar"
# only one website in ddg with "site:"
# ddg site:stackechange
 	elif [[ "$KEYWORD" =~ ^se$ ]]; then
 	echo "W3m-control: GOTO https://duckduckgo.com/?q=%3Asite%3Astackexchange.com+%20$SEARCH&t=ffab&ia=web"
# ddg site:azlyrics
 	elif [[ "$KEYWORD" =~ ^azlyrics$ ]]; then
 	echo "W3m-control: GOTO https://duckduckgo.com/?q=site%3Aazlyrics.com+%20$SEARCH"
# ddg site:darklyrics
 	elif [[ "$KEYWORD" =~ ^darklyrics$ ]]; then
 	echo "W3m-control: GOTO https://duckduckgo.com/?q=site%3Adarklyrics.com%20$SEARCH"
	fi
fi
