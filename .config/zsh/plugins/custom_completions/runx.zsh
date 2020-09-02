## Run a command x times | Usage: runx <value>
# http://www.stefanoforenza.com/how-to-repeat-a-shell-command-n-times/
runx() {
    n=$1
    shift
    while [ $(( n -= 1 )) -ge 0 ]
    do
        "$@"
    done
}
