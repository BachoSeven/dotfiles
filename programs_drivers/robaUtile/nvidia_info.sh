#!/bin/zsh

echo "1. inxi"|lolcat
echo "\n"
inxi -Gx #cool cli utility which lists Graphic card info with -G (-x additional stuf)
echo "\n"
echo "2. lspci"|lolcat
echo "\n"
lspci -nnk | grep -iA3 --color 'vga\|3d\|2d' #find video  PCI devices
echo "\n"
echo "3. dmesg"|lolcat
echo "\n"
dmesg -H | grep -i nouveau
echo "\n"
echo "4. journalctl"|lolcat
echo "\n"
journalctl -b -1 --no-hostname -o short-monotonic | grep ': nouveau' #systemd journal noveau errors
echo "\n"
echo "5. lshw"|lolcat
echo "\n"
sudo lshw -class video #list video hardware
echo "\n"
