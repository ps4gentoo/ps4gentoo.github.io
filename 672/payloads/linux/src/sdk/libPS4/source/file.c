#include "syscall.h"

#include "file.h"

SYSCALL(read, 3);
SYSCALL(write, 4);
SYSCALL(open, 5);
SYSCALL(close, 6);
SYSCALL(unlink, 10);
SYSCALL(readlink, 58);
SYSCALL(mount, 21);
SYSCALL(nmount, 378);
SYSCALL(unmount, 22);
SYSCALL(fchown, 123);
SYSCALL(fchmod, 124);
SYSCALL(rename, 128);
SYSCALL(mkdir, 136);
SYSCALL(rmdir, 137);
SYSCALL(stat, 188);
SYSCALL(fstat, 189);
SYSCALL(getdents, 272);
SYSCALL(lseek, 478);
SYSCALL(fstatat, 493);

int getSandboxDirectory(char *destination, int *length) {
  return syscall(602, 0, destination, length);
}
