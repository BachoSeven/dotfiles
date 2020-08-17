#!/bin/bash
#w3m treat_as_url.cgi file_with_urls.txt
#convert url-like string in the current file to hyperlinks
printf "%s\r\n" "W3m-control: PREV";
printf "%s\r\n" "W3m-control: MARK_URL"
