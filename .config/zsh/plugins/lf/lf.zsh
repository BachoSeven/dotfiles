lfcd () {
	# TODO: after r31, still no updated archivemount hack
	cd "$(command lf -print-last-dir "$@")"
}
