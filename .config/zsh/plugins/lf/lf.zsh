lfcd () {
	# TODO: update for r31 with     cd "$(command lf -print-last-dir "$@")"
	#                               (+ whatever else for archivemount)
	local file="$HOME/.cache/lf-last-dir-path"

	# Run in a subshell so cleanup works as expected
	(
	# The file that will contain all the directories mounted inside of lf
	export LF_MOUNTS=$(mktemp)

	cleanup () {
		# Unmount any directories that were mounted inside of lf
		if [ -f "$LF_MOUNTS" ]; then
			while IFS= read -r mnt; do
				umount "$mnt"
				rmdir "$mnt"
			done < "$LF_MOUNTS"
			rm "$LF_MOUNTS"
		fi
	}
	trap cleanup EXIT

	lf -last-dir-path "$file" -- "$@"
	)

	dir="$(cat "$file")"
	if [ -d "$dir" ] && [ "$dir" != "$(pwd)" ]; then
		cd "$dir"
	fi
}
