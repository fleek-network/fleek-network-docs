---
title: Permission denied (os error 13)
slug: permission-denied-os-error-13
hide_title: true
tags:
- permissions
---

<!--
  The following import is intentional (see partial <CheckoutCommitWarning />)
-->
import Author from '@site/src/components/Author';

Regarding the introduction of writing to /tmp (although I'd suggest sticking with stdout/stderr or flag this as seems only meaningful for troubleshooting). I decided to take a look at the file permissions of /tmp on the default DO Ubuntu 22.x which is drwxr-xr-x.  According to what's documented, it should be 1777. This is because writing to /tmp regardless of the comment on standards, should be widely accessible. For this reason, I've introduced a step in the installer as a test to change /tmp to what's supposed to be default (we shouldn't mess with user choice, though).

During testnet the Lightning binary process is required to write to `/tmp`. The `/tmp` directory is used to store temporary DB checkpoints when synch state. For the users who're following the recommended Systemd unit service, to control the Fleek Network service via systemctl, it should not be mistaken with the stdout/stderr `/var/log/lightning/output.log` and `/var/log/lightning/diagnostic.log` log files declared in the service file.

Users are recommended to use systemctl to manage the service as a non-admin user. The use of **sudo** or **root** causes permissions issues, as we see in the output below:

```
[00007fcbe168e764] openat(AT_FDCWD, "/tmp/lightning.log", O_WRONLY|O_CREAT|O_APPEND|O_CLOEXEC, 0666) = -1 EACCES (Permission denied)
[00007fcbe168ea6f] write(2, "thread '", 8thread ') = 8
[00007fcbe168ea6f] write(2, "main", 4main)  = 4
[00007fcbe168ea6f] write(2, "' panicked at '", 15' panicked at ') = 15
[00007fcbe168ea6f] write(2, "called `Result::unwrap()` on an "..., 114called `Result::unwrap()` on an `Err` value: Os { code: 13, kind: PermissionDenied, message: "Permission denied" }) = 114
[00007fcbe168ea6f] write(2, "', ", 3', )   = 3
```

The `/tmp` directory should have wide permissions for all applications, but to mitigate any permission issues the user can override the system environment `TMPDIR`. For example, the `installer` and `update` scripts override `TMPDIR` environment variable to `/var/tmp` setting it in the service unit `Environment=`.

<Author
    name="Helder Oliveira"
    image="https://github.com/heldrida.png"
    title="Software Developer + DX"
    url="https://github.com/heldrida"
/>