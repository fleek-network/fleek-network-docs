---
title: Keys not found
slug: keys-not-found
hide_title: true
tags:
- keystore
- lost keys
- ownership
- file permissions
---

## Node key does not exist

When watching the Fleek Network Lightning service log output, you find the "Node key does not exist" message placed recursively. As follows:

```sh
thread 'main' panicked at 'Node key does not exist. Use CLI to generate keys.', core/node/src/testnet_sync.rs:126:9
note: run with `RUST_BACKTRACE=1` environment variable to display a backtrace
thread 'main' panicked at 'Node key does not exist. Use CLI to generate keys.', core/node/src/testnet_sync.rs:126:9
note: run with `RUST_BACKTRACE=1` environment variable to display a backtrace
```

If you haven't deleted the keystore and can locate it, it's due to how the service is being run. As a user can delegate (sudo) the execution of the process to **root**, the location of the keystore differs on runtime.

To learn more about how file permissions and ownership work, you're advised to read the reference document [here](/references/Lightning%20CLI/file-permissions-and-ownership.md).
