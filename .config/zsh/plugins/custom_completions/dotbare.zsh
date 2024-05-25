0="${${ZERO:-${0:#$ZSH_ARGZERO}}:-${(%):-%N}}"
_path="${0:h}"

if [[ -z "${path[(r)$_path]}" ]]; then
  path+=( "${_path}" )
fi

__dotbare_completion() {
  local context state state_descr line ret curcontext
  local -A opt_args
  ret=1
  curcontext="${curcontext}"

  _arguments -C \
    '(- : *)'{-h,--help}'[show help information]' \
    '(- : *)'{-v,--version}'[display dotbare version]' \
    '(-g --git)'{-g,--git}'[use dotbare as a generic fuzzy git tool and operate in current git directory]' \
    '1:cmds:->cmds' \
    '*::options:->options' \
    && ret=0

  case "${state}" in
    cmds)
      local subcommands
      subcommands=(
        'fadd:stage files'
        'fbackup:backup files'
        'fcheckout:checkout file/branch/commit'
        'fedit:edit files'
        'fgrep:grep within tracked files'
        'finit:init/migrate dotbare'
        'flog:interactive log viewer'
        'freset:reset files/commit'
        'fstash:stage management'
        'fstat:toggle stage/unstage of files'
        'funtrack:untrack files'
        'fupgrade:update dotbare'
      )
      _describe 'command' subcommands \
        && ret=0
      ;;
    options)
      case "${line[1]}" in
        fadd)
          _arguments \
            '(- : *)'{-h,--help}'[show help information]' \
            '(-f --file -d --dir -h --help)'{-f,--file}'[select files from PWD and stage]' \
            '(-d --dir -f --file -h --help)'{-d,--dir}'[select directory from PWD and stage]' \
            && ret=0
        ;;
        fbackup)
          _arguments \
            '(- : *)'{-h,--help}'[show help information]' \
            '(-s --select -p --path -h --help)'{-s,--select}'[select tracked files to backup]' \
            '(-p --path -s --select -h --help)'{-p,--path}'[sepcify path of files to backup]:filename:_files' \
            '(-m --move -h --help)'{-m,--move}'[use mv cmd instead of cp cmd]' \
            && ret=0
          ;;
        fcheckout)
          _arguments \
            '(- : *)'{-h,--help}'[show help information]' \
            '(-s --select -b --branch -c --commit -h --help)'{-s,--select}'[select files and then checkout them in selected commits]' \
            '(-b --branch -s --select -c --commit -h --help)'{-b,--branch}'[checkout branch]' \
            '(-c --commit -b --branch -s --select -h --help)'{-c,--commit}'[checkout commit]' \
            '(-y --yes -h --help)'{-y,--yes}'[acknowledge all actions and skip confirmation]' \
            && ret=0
          ;;
        fedit)
          _arguments \
            '(- : *)'{-h,--help}'[show help information]' \
            '(-m --modified -c --commit -h --help)'{-m,--modified}'[edit modified files]' \
            '(-c --commit -m --modified -h --help)'{-c,--commit}'[edit commits]' \
            && ret=0
          ;;
        fgrep)
          _arguments \
            '(- : *)'{-h,--help}'[show help information]' \
            '(-f --full -c --col)'{-f,--full}'[include all columns during fzf search, as if using "--col 1"]' \
            '(-f --full -c --col)'{-c,--col}'[specify a column number to start searching in fzf]: :->cols' \
            && ret=0
          ;;
        finit)
          _arguments \
            '(- : *)'{-h,--help}'[show help information]' \
            '(-u --url -h --help)'{-u,--url}'[migrate remote dotfiles to current system]: :->url' \
            '(-s --submodule -h --help)'{-s,--submodule}'[clone submodules during migration]' \
            '(-y --yes -h --help)'{-y,--yes}'[acknowledge all actions and skip confirmation]' \
            && ret=0
          ;;
        flog)
          _arguments \
            '(- : *)'{-h,--help}'[show help information]' \
            '(-r --revert -R --reset -e --edit -c --checkout -h --help)'{-r,--revert}'[revert the selected commit and skip action menu]' \
            '(-r --revert -R --reset -e --edit -c --checkout -h --help)'{-R,--reset}'[reset the selected commit and skip action menu]' \
            '(-r --revert -R --reset -e --edit -c --checkout -h --help)'{-e,--edit}'[edit the selected commit and skip action menu]' \
            '(-r --revert -R --reset -e --edit -c --checkout -h --help)'{-c,--checkout}'[checkout the selected commit and skip action menu]' \
            '(-y --yes -h --help)'{-y,--yes}'[acknowledge all actions and skip confirmation]' \
            && ret=0
          ;;
        freset)
          _arguments \
            '(- : *)'{-h,--help}'[show help information]' \
            '(-c --commit -h --help)'{-c,--commit}'[reset HEAD to certain commit]' \
            '(-S --soft -H --hard -h --help)'{-S,--soft}'[reset commit using --soft flag]' \
            '(-H --hard -S --soft -h --help)'{-H,--hard}'[reset commit using --hard flag]' \
            '(-y --yes -h --help)'{-y,--yes}'[acknowledge all actions and skip confirmation]' \
            && ret=0
          ;;
        fstash)
          _arguments \
            '(- : *)'{-h,--help}'[show help information]' \
            '(-s --select -d --delete -p --pop -h --help)'{-s,--select}'[list modified files and stash the selected files]' \
            '(-s --select -d --delete -p --pop -h --help)'{-d,--delete}'[list stash and delete the selected stash]' \
            '(-s --select -d --delete -p --pop -h --help)'{-p,--pop}'[use "stash pop" instead of "stash apply"]' \
            && ret=0
          ;;
        fstat)
          _arguments \
            '(- : *)'{-h,--help}'[show help information]' \
            && ret=0
          ;;
        funtrack)
          _arguments \
            '(- : *)'{-h,--help}'[show help information]' \
            '(-t --temp -r --resume -h --help)'{-t,--temp}'[temporarily ignore changes of the selected files]' \
            '(-t --temp -r --resume -h --help)'{-r,--resume}'[resume tracking changes of the selected files]' \
            '(-y --yes -h --help)'{-y,--yes}'[acknowledge all actions and skip confirmation]' \
            && ret=0
          ;;
        fupgrade)
          _arguments \
            '(- : *)'{-h,--help}'[show help information]' \
            && ret=0
          ;;
      esac
      ;;
  esac

  return "${ret}";
}

_dotbare_completion_cmd() {
  local compdef_name="dotbare"
  compdef __dotbare_completion "${compdef_name}"
}

_dotbare_completion_git() {
  local compdef_name="dotbare"
  compdef "${compdef_name}"=git
}

_widget_dotbare_fadd() { dotbare fadd; }
_widget_dotbare_fedit() { dotbare fedit; }
_widget_dotbare_fcheckout() { dotbare fcheckout; }
_widget_dotbare_freset() { dotbare freset; }
_widget_dotbare_flog() { dotbare flog; }
_widget_dotbare_fgrep() { dotbare fgrep; }
_widget_dotbare_fstat() { dotbare fstat; }

zle -N dotbare-fadd _widget_dotbare_fadd
zle -N dotbare-fedit _widget_dotbare_fedit
zle -N dotbare-fcheckout _widget_dotbare_fcheckout
zle -N dotbare-freset _widget_dotbare_reset
zle -N dotbare-flog _widget_dotbare_flog
zle -N dotbare-fgrep _widget_dotbare_fgrep
zle -N dotbare-fstat _widget_dotbare_fstat

_widget_git_transform_dotbare() {
  local dotbare_cmd new_cmd
  dotbare_cmd=$(alias | grep dotbare | cut -d'=' -f1 | head -n 1)
  [[ -z "${dotbare_cmd}" ]] && dotbare_cmd="dotbare"
  dotbare_cmd="${dotbare_cmd} -g"
  BUFFER=$(echo "$BUFFER" \
    | awk -v dotbare="${dotbare_cmd}" '{
        if ($1 == "git") {
          $1=dotbare
          if ($2 ~ /(log|add|reset|checkout|status|stash|grep|untrack|stat)/) {
            if ($2 == "status"){
              $2="stat"
            }
            $2="f"$2
          }
        }
        print $0
      }'
  )
  zle end-of-line
}

zle -N dotbare-transform _widget_git_transform_dotbare
