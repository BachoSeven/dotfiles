alias lf=lfwrapper

lfwrapper() {
    command lf "$@"

    # cleanup archivemount mounts
    awk '$1 == "archivemount" { print $2 }' /etc/mtab | while read -r mntdir
    do
        umount "$mntdir"
        rmdir "$mntdir"
    done
}

lfcd() {
    dir=$(lf -print-last-dir "$@")
    while ! cd "$dir" 2> /dev/null
    do
        dir=$(dirname "$dir")
    done
}
