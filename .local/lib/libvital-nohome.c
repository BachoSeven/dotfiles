/* build: cc -shared -fPIC -O2 -o libvital-nohome.so libvital-nohome.c -ldl */
#define _GNU_SOURCE
#include <dlfcn.h>
#include <errno.h>
#include <fcntl.h>
#include <limits.h>
#include <pwd.h>
#include <stdarg.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <dirent.h>
#include <sys/stat.h>
#include <sys/types.h>
#include <unistd.h>

/*
 * libvital-nohome
 *
 * Relocates the "~/.vital" directory out of $HOME without a symlink and
 * without changing $HOME.  Every libc file-syscall on a path that starts
 * with "$HOME/.vital" (or is exactly "$HOME/.vital") is transparently
 * rewritten to start with "$XDG_CONFIG_HOME/vital" instead (default
 * "$HOME/.config/vital"), so the ".vital" name never appears in $HOME.
 *
 * The only thing this shim touches is that exact prefix; all other paths
 * pass through untouched.
 *
 * Crash-safety note: the shim constructor may run AFTER the constructors
 * of other loaded libraries (e.g. libgnutls), so a wrapper can be called
 * before its "real function" pointers are resolved.  Every wrapper first
 * ensures (lazily resolves) the pointer it needs and never dereferences a
 * NULL one, so early calls are safe and just forward to glibc.
 */

static char *g_home;
static size_t g_home_len;
static char *g_target;
static int  g_active;

#define MAX_PATH (PATH_MAX)

static __thread char g_rewrite_buf[MAX_PATH];
static __thread char g_rewrite_buf2[MAX_PATH];

struct real_funcs {
  int (*open)(const char *, int, ...);
  int (*open64)(const char *, int, ...);
  int (*__open_2)(const char *, int);
  int (*__open64_2)(const char *, int);
  int (*openat)(int, const char *, int, ...);
  int (*openat64)(int, const char *, int, ...);
  int (*__openat_2)(int, const char *, int);
  int (*__openat64_2)(int, const char *, int);
  FILE *(*fopen)(const char *, const char *);
  FILE *(*fopen64)(const char *, const char *);
  FILE *(*freopen)(const char *, const char *, FILE *);
  FILE *(*freopen64)(const char *, const char *, FILE *);
  int (*access)(const char *, int);
  int (*faccessat)(int, const char *, int, int);
  int (*faccessat2)(int, const char *, int, int);
  int (*stat)(const char *, struct stat *);
  int (*stat64)(const char *, struct stat64 *);
  int (*lstat)(const char *, struct stat *);
  int (*lstat64)(const char *, struct stat64 *);
  int (*fstatat)(int, const char *, struct stat *, int);
  int (*fstatat64)(int, const char *, struct stat64 *, int);
  int (*__xstat)(int, const char *, struct stat *);
  int (*__xstat64)(int, const char *, struct stat64 *);
  int (*__lxstat)(int, const char *, struct stat *);
  int (*__lxstat64)(int, const char *, struct stat64 *);
  int (*__fxstatat)(int, int, const char *, struct stat *, int);
  int (*__fxstatat64)(int, int, const char *, struct stat64 *, int);
  int (*statx)(int, const char *, int, unsigned int, struct statx *);
  int (*mkdir)(const char *, mode_t);
  int (*mkdirat)(int, const char *, mode_t);
  int (*rmdir)(const char *);
  int (*unlink)(const char *);
  int (*unlinkat)(int, const char *, int);
  int (*remove)(const char *);
  int (*rename)(const char *, const char *);
  int (*renameat)(int, const char *, int, const char *);
  int (*renameat2)(int, const char *, int, const char *, unsigned int);
  DIR *(*opendir)(const char *);
  ssize_t (*readlink)(const char *, char *, size_t);
  ssize_t (*readlinkat)(int, const char *, char *, size_t);
  char *(*realpath)(const char *restrict, char *restrict);
  char *(*canonicalize_file_name)(const char *);
} r;

static void *resolve_next(const char *name) {
  return dlsym(RTLD_NEXT, name);
}
#define ENSURE_R(member) do { if (!r.member) r.member = (typeof(r.member)) resolve_next(#member); } while (0)

static void resolve_funcs(void) {
  ENSURE_R(open);
  ENSURE_R(open64);
  ENSURE_R(__open_2);
  ENSURE_R(__open64_2);
  ENSURE_R(openat);
  ENSURE_R(openat64);
  ENSURE_R(__openat_2);
  ENSURE_R(__openat64_2);
  ENSURE_R(fopen);
  ENSURE_R(fopen64);
  ENSURE_R(freopen);
  ENSURE_R(freopen64);
  ENSURE_R(access);
  ENSURE_R(faccessat);
  ENSURE_R(faccessat2);
  ENSURE_R(stat);
  ENSURE_R(stat64);
  ENSURE_R(lstat);
  ENSURE_R(lstat64);
  ENSURE_R(fstatat);
  ENSURE_R(fstatat64);
  ENSURE_R(__xstat);
  ENSURE_R(__xstat64);
  ENSURE_R(__lxstat);
  ENSURE_R(__lxstat64);
  ENSURE_R(__fxstatat);
  ENSURE_R(__fxstatat64);
  ENSURE_R(statx);
  ENSURE_R(mkdir);
  ENSURE_R(mkdirat);
  ENSURE_R(rmdir);
  ENSURE_R(unlink);
  ENSURE_R(unlinkat);
  ENSURE_R(remove);
  ENSURE_R(rename);
  ENSURE_R(renameat);
  ENSURE_R(renameat2);
  ENSURE_R(opendir);
  ENSURE_R(readlink);
  ENSURE_R(readlinkat);
  ENSURE_R(realpath);
  ENSURE_R(canonicalize_file_name);
}

static void trim_trailing_slashes(char *s) {
  size_t n = strlen(s);
  while (n > 1 && s[n - 1] == '/') {
    s[n - 1] = '\0';
    n--;
  }
}

/* mkdir -p using the real functions only (no re-entry into wrappers). */
static void ensure_dir(const char *path) {
  char buf[MAX_PATH];
  if (!path)
    return;
  ENSURE_R(mkdir);

  strncpy(buf, path, sizeof(buf) - 1);
  buf[sizeof(buf) - 1] = '\0';
  trim_trailing_slashes(buf);

  /* walk up creating missing parents */
  for (char *p = buf + 1; *p; p++) {
    if (*p == '/') {
      *p = '\0';
      (void)r.mkdir(buf, 0700);
      *p = '/';
    }
  }
  (void)r.mkdir(buf, 0700);
}

__attribute__((constructor)) static void vital_nohome_init(void) {
  resolve_funcs();

  const char *home = getenv("HOME");
  if (!home || !*home) {
    struct passwd *pw = getpwuid(getuid());
    if (pw)
      home = pw->pw_dir;
  }
  if (!home || !*home)
    return;

  g_home = strdup(home);
  trim_trailing_slashes(g_home);
  g_home_len = strlen(g_home);
  if (g_home_len == 0)
    return;

  char root[MAX_PATH];
  const char *xch = getenv("XDG_CONFIG_HOME");
  if (xch && *xch) {
    strncpy(root, xch, sizeof(root) - 1);
    root[sizeof(root) - 1] = '\0';
  }
  else {
    snprintf(root, sizeof(root), "%s/.config", g_home);
  }
  trim_trailing_slashes(root);

  g_target = malloc(strlen(root) + 16);
  if (!g_target)
    return;
  sprintf(g_target, "%s/vital", root);

  ensure_dir(g_target);
  g_active = 1;
}

/*
 * Match:  path == "$HOME/.vital"        -> rewritten to g_target
 *         path == "$HOME/.vital/..."    -> rewritten to g_target/...
 * Relatives: a bare ".vital" component (".vital", "./.vital/..", ".vital/x")
 *            is rewritten if the process cwd is the home directory itself.
 * NOT matched: any other path (incl. "$HOME/.vital-*", relatives elsewhere).
 */
static inline const char *rewrite_path(const char *path, char *out) {
  const char *rest;
  size_t plen;
  static __thread char cwd_buf[MAX_PATH];
  if (!g_active || !path)
    return path;

  if (path[0] == '/') {
    if (strncmp(path, g_home, g_home_len) != 0)
      return path;
    rest = path + g_home_len;
    if (rest[0] != '/')
      return path;
    if (strncmp(rest + 1, ".vital", 6) != 0)
      return path;
    rest += 7;
    if (rest[0] != '\0' && rest[0] != '/')
      return path;
  }
  else {
    if (path[0] != '.')
      return path;
    rest = path;
    if (rest[1] == '/')
      rest++;
    if (strncmp(rest, ".vital", 6) != 0)
      return path;
    rest += 6;
    if (rest[0] != '\0' && rest[0] != '/')
      return path;
    if (getcwd(cwd_buf, sizeof(cwd_buf)) == NULL)
      return path;
    if (strcmp(cwd_buf, g_home) != 0)
      return path;
  }

  plen = strlen(rest);
  if (strlen(g_target) + plen >= MAX_PATH)
    return path;

  strcpy(out, g_target);
  strcat(out, rest);
  return out;
}

/* (int)(const char *path, mode/buf ...) wrappers */
int open(const char *path, int flags, ...) {
  ENSURE_R(open);
  const char *p = rewrite_path(path, g_rewrite_buf);
  mode_t mode = 0;
  if (flags & O_CREAT) {
    va_list ap;
    va_start(ap, flags);
    mode = va_arg(ap, mode_t);
    va_end(ap);
  }
  return r.open(p, flags, mode);
}
int open64(const char *path, int flags, ...) {
  ENSURE_R(open64);
  const char *p = rewrite_path(path, g_rewrite_buf);
  mode_t mode = 0;
  if (flags & O_CREAT) {
    va_list ap;
    va_start(ap, flags);
    mode = va_arg(ap, mode_t);
    va_end(ap);
  }
  return r.open64(p, flags, mode);
}
int __open_2(const char *path, int flags)      { ENSURE_R(__open_2); const char *p = rewrite_path(path, g_rewrite_buf); return r.__open_2(p, flags); }
int __open64_2(const char *path, int flags)    { ENSURE_R(__open64_2); const char *p = rewrite_path(path, g_rewrite_buf); return r.__open64_2(p, flags); }

int openat(int dirfd, const char *path, int flags, ...) {
  ENSURE_R(openat);
  const char *p = rewrite_path(path, g_rewrite_buf);
  mode_t mode = 0;
  if (flags & O_CREAT) {
    va_list ap;
    va_start(ap, flags);
    mode = va_arg(ap, mode_t);
    va_end(ap);
  }
  return r.openat(dirfd, p, flags, mode);
}
int openat64(int dirfd, const char *path, int flags, ...) {
  ENSURE_R(openat64);
  const char *p = rewrite_path(path, g_rewrite_buf);
  mode_t mode = 0;
  if (flags & O_CREAT) {
    va_list ap;
    va_start(ap, flags);
    mode = va_arg(ap, mode_t);
    va_end(ap);
  }
  return r.openat64(dirfd, p, flags, mode);
}
int __openat_2(int dirfd, const char *path, int flags)   { ENSURE_R(__openat_2); const char *p = rewrite_path(path, g_rewrite_buf); return r.__openat_2(dirfd, p, flags); }
int __openat64_2(int dirfd, const char *path, int flags) { ENSURE_R(__openat64_2); const char *p = rewrite_path(path, g_rewrite_buf); return r.__openat64_2(dirfd, p, flags); }

FILE *fopen(const char *path, const char *mode)   { ENSURE_R(fopen); const char *p = rewrite_path(path, g_rewrite_buf); return r.fopen(p, mode); }
FILE *fopen64(const char *path, const char *mode) { ENSURE_R(fopen64); const char *p = rewrite_path(path, g_rewrite_buf); return r.fopen64(p, mode); }
FILE *freopen(const char *path, const char *mode, FILE *stream)   { ENSURE_R(freopen); const char *p = rewrite_path(path, g_rewrite_buf); return r.freopen(p, mode, stream); }
FILE *freopen64(const char *path, const char *mode, FILE *stream) { ENSURE_R(freopen64); const char *p = rewrite_path(path, g_rewrite_buf); return r.freopen64(p, mode, stream); }

int access(const char *path, int amode)         { ENSURE_R(access); const char *p = rewrite_path(path, g_rewrite_buf); return r.access(p, amode); }
int faccessat(int dirfd, const char *path, int amode, int flags) { ENSURE_R(faccessat); const char *p = rewrite_path(path, g_rewrite_buf); return r.faccessat(dirfd, p, amode, flags); }
int faccessat2(int dirfd, const char *path, int amode, int flags) {
  ENSURE_R(faccessat2);
  const char *p = rewrite_path(path, g_rewrite_buf);
  if (!r.faccessat2) { errno = ENOSYS; return -1; }
  return r.faccessat2(dirfd, p, amode, flags);
}

int stat(const char *path, struct stat *buf)                          { ENSURE_R(stat); const char *p = rewrite_path(path, g_rewrite_buf); return r.stat(p, buf); }
int stat64(const char *path, struct stat64 *buf)                      { ENSURE_R(stat64); const char *p = rewrite_path(path, g_rewrite_buf); return r.stat64(p, buf); }
int lstat(const char *path, struct stat *buf)                         { ENSURE_R(lstat); const char *p = rewrite_path(path, g_rewrite_buf); return r.lstat(p, buf); }
int lstat64(const char *path, struct stat64 *buf)                     { ENSURE_R(lstat64); const char *p = rewrite_path(path, g_rewrite_buf); return r.lstat64(p, buf); }
int fstatat(int dirfd, const char *path, struct stat *buf, int flags) { ENSURE_R(fstatat); const char *p = rewrite_path(path, g_rewrite_buf); return r.fstatat(dirfd, p, buf, flags); }
int fstatat64(int dirfd, const char *path, struct stat64 *buf, int flags) { ENSURE_R(fstatat64); const char *p = rewrite_path(path, g_rewrite_buf); return r.fstatat64(dirfd, p, buf, flags); }

int __xstat(int ver, const char *path, struct stat *buf)            { ENSURE_R(__xstat); const char *p = rewrite_path(path, g_rewrite_buf); return r.__xstat(ver, p, buf); }
int __xstat64(int ver, const char *path, struct stat64 *buf)        { ENSURE_R(__xstat64); const char *p = rewrite_path(path, g_rewrite_buf); return r.__xstat64(ver, p, buf); }
int __lxstat(int ver, const char *path, struct stat *buf)           { ENSURE_R(__lxstat); const char *p = rewrite_path(path, g_rewrite_buf); return r.__lxstat(ver, p, buf); }
int __lxstat64(int ver, const char *path, struct stat64 *buf)       { ENSURE_R(__lxstat64); const char *p = rewrite_path(path, g_rewrite_buf); return r.__lxstat64(ver, p, buf); }
int __fxstatat(int ver, int dirfd, const char *path, struct stat *buf, int flags)     { ENSURE_R(__fxstatat); const char *p = rewrite_path(path, g_rewrite_buf); return r.__fxstatat(ver, dirfd, p, buf, flags); }
int __fxstatat64(int ver, int dirfd, const char *path, struct stat64 *buf, int flags) { ENSURE_R(__fxstatat64); const char *p = rewrite_path(path, g_rewrite_buf); return r.__fxstatat64(ver, dirfd, p, buf, flags); }

int statx(int dirfd, const char *path, int flags, unsigned int mask, struct statx *buf) {
  ENSURE_R(statx);
  const char *p = rewrite_path(path, g_rewrite_buf);
  if (!r.statx) { errno = ENOSYS; return -1; }
  return r.statx(dirfd, p, flags, mask, buf);
}

int mkdir(const char *path, mode_t mode)          { ENSURE_R(mkdir); const char *p = rewrite_path(path, g_rewrite_buf); return r.mkdir(p, mode); }
int mkdirat(int dirfd, const char *path, mode_t mode) { ENSURE_R(mkdirat); const char *p = rewrite_path(path, g_rewrite_buf); return r.mkdirat(dirfd, p, mode); }
int rmdir(const char *path)                       { ENSURE_R(rmdir); const char *p = rewrite_path(path, g_rewrite_buf); return r.rmdir(p); }
int unlink(const char *path)                      { ENSURE_R(unlink); const char *p = rewrite_path(path, g_rewrite_buf); return r.unlink(p); }
int unlinkat(int dirfd, const char *path, int flags) { ENSURE_R(unlinkat); const char *p = rewrite_path(path, g_rewrite_buf); return r.unlinkat(dirfd, p, flags); }
int remove(const char *path)                      { ENSURE_R(remove); const char *p = rewrite_path(path, g_rewrite_buf); return r.remove(p); }

int rename(const char *old, const char *nw) {
  ENSURE_R(rename);
  const char *p1 = rewrite_path(old, g_rewrite_buf);
  const char *p2 = rewrite_path(nw, g_rewrite_buf2);
  return r.rename(p1, p2);
}
int renameat(int olddirfd, const char *old, int newdirfd, const char *nw) {
  ENSURE_R(renameat);
  const char *p1 = rewrite_path(old, g_rewrite_buf);
  const char *p2 = rewrite_path(nw, g_rewrite_buf2);
  return r.renameat(olddirfd, p1, newdirfd, p2);
}
int renameat2(int olddirfd, const char *old, int newdirfd, const char *nw, unsigned int fl) {
  ENSURE_R(renameat2);
  const char *p1 = rewrite_path(old, g_rewrite_buf);
  const char *p2 = rewrite_path(nw, g_rewrite_buf2);
  if (!r.renameat2) { errno = ENOSYS; return -1; }
  return r.renameat2(olddirfd, p1, newdirfd, p2, fl);
}

DIR *opendir(const char *path) { ENSURE_R(opendir); const char *p = rewrite_path(path, g_rewrite_buf); return r.opendir(p); }

ssize_t readlink(const char *path, char *buf, size_t bufsiz)      { ENSURE_R(readlink); const char *p = rewrite_path(path, g_rewrite_buf); return r.readlink(p, buf, bufsiz); }
ssize_t readlinkat(int dirfd, const char *path, char *buf, size_t bufsiz) { ENSURE_R(readlinkat); const char *p = rewrite_path(path, g_rewrite_buf); return r.readlinkat(dirfd, p, buf, bufsiz); }

char *realpath(const char *restrict path, char *restrict resolved) {
  ENSURE_R(realpath);
  const char *p = rewrite_path(path, g_rewrite_buf);
  return r.realpath(p, resolved);
}
char *canonicalize_file_name(const char *path) {
  ENSURE_R(canonicalize_file_name);
  const char *p = rewrite_path(path, g_rewrite_buf);
  if (!r.canonicalize_file_name) { errno = ENOSYS; return NULL; }
  return r.canonicalize_file_name(p);
}