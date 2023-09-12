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

## Ownership and file permissions

When running the Lightning CLI, the user who's in control can delegate to **root** via **sudo**. Depending on how the Fleek Networking Lightning CLI was installed, this might cause some confusion, which is better explained by reading the reference [Keys not found](/references/Lightning%20CLI/keys-not-found), which illustrates a situation where a user gets an error message about the wrong location of a system path (keystore).

## Override the TMPDIR

The Fleek Network Lightning process requires writing to a temporary directory. As the process requires permissions, this might fail as demonstrated by some of the output logs we have below.

a) A permission denied error message

```sh
Permission denied (os error 13)
```

b) Rust panic error message which includes a permission denied

```sh
thread 'main' panicked at 'called Result::unwrap() on an Err value: Os { code: 13, kind: PermissionDenied, message: "Permission denied" }', core/node/src/cli.rs:181:18
note: run with RUST_BACKTRACE=1 environment variable to display a backtrace
thread 'main' panicked at 'called Result::unwrap() on an Err value: Os { code: 13, kind: PermissionDenied, message: "Permission denied" }', core/node/src/cli.rs:181:18
note: run with RUST_BACKTRACE=1 environment variable to display a backtrace
thread 'main' panicked at 'called Result::unwrap() on an Err value: Os { code: 13, kind: PermissionDenied, message: "Permission denied" }', core/node/src/cli.rs:181:18
note: run with RUST_BACKTRACE=1 environment variable to display a backtrace
thread 'main' panicked at 'called Result::unwrap() on an Err value: Os { code: 13, kind: PermissionDenied, message: "Permission denied" }', core/node/src/cli.rs:181:18
note: run with RUST_BACKTRACE=1 environment variable to display a backtrace
thread 'main' panicked at 'called Result::unwrap() on an Err value: Os { code: 13, kind: PermissionDenied, message: "Permission denied" }', core/node/src/cli.rs:181:18
note: run with RUST_BACKTRACE=1 environment variable to display a backtrace
```

c) A trace showing the path where this has failed

```sh
[00007fcbe168e764] openat(AT_FDCWD, "/tmp/lightning.log", O_WRONLY|O_CREAT|O_APPEND|O_CLOEXEC, 0666) = -1 EACCES (Permission denied)
[00007fcbe168ea6f] write(2, "thread '", 8thread ') = 8
[00007fcbe168ea6f] write(2, "main", 4main)  = 4
[00007fcbe168ea6f] write(2, "' panicked at '", 15' panicked at ') = 15
[00007fcbe168ea6f] write(2, "called `Result::unwrap()` on an "..., 114called `Result::unwrap()` on an `Err` value: Os { code: 13, kind: PermissionDenied, message: "Permission denied" }) = 114
[00007fcbe168ea6f] write(2, "', ", 3', )   = 3
```

:::tip
The `/tmp` directory should have wide permissions for all applications, but to mitigate any permission issues the user can override the system environment `TMPDIR`. For example, the `installer` and `update` scripts override `TMPDIR` environment variable to `/var/tmp` setting it in the service unit `Environment=`.
:::

The Lightning CLI process is aware of the environment variable TMPDIR, which the operators can override as discussed in the reference for [Update the System service unit](/references/Lightning%20CLI/update-cli-from-source-code/#update-the-systemd-service-unit).

In short, it requires you to include an `Environment=` value of `TMPDIR=/var/tmp` as follows:

```sh
[Service]
...
StandardOutput=append:/var/log/lightning/output.log
StandardError=append:/var/log/lightning/diagnostic.log
Environment=TMPDIR=/var/tmp
```

:::caution attention
The `/etc/systemd/system/lightning.service` service unit file presented here is a shorter version for simplicity. Do not replace your service unit file with the shorter content version presented here.
:::

<Author
    name="Helder Oliveira"
    image="https://github.com/heldrida.png"
    title="Software Developer + DX"
    url="https://github.com/heldrida"
/>