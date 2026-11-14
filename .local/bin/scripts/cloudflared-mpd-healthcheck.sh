#!/bin/bash
if timeout 5 mpc -h localhost -p 6601 status >/dev/null 2>&1; then
    exit 0
fi
systemctl --user restart cloudflared-mpd
exit 0