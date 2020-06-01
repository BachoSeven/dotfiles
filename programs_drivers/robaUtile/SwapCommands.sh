sudo dd if=/dev/zero of=/swapfile bs=1024 count=4194304

sudo chmod 600 /swapfile

sudo mkswap /swapfile

sudo swapon /swapfile

# Fstab entry
# /swapfile swap swap defaults 0 0


sudo swapon --show

sudo free -h


cat /proc/sys/vm/swappiness

#Append vm.swappiness=60 to /etc/sysctl.conf
