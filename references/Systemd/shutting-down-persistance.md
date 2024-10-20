---
title: Shutting down persistance
slug: shutting-down-persistance
hide_title: true
tags:
- reference
- shutdown
- frozen
- idle
- service error
- systemctl
- systemd
---

## Systemd Service as frozen or idle

If you have a `Shutting node down` message on the service log, the process is likely failing to respond to Systemd shut down command by failing to terminate all the child processes that were started by the service.

The logs should be similar to the following:

```sh
2023-09-11 18:02:07 | ERROR | lightning_consensus::consensus - core/consensus/src/consensus.rs:371 - node: XsE9KtedDRUGv22MLHvy8qcc52QsWGWJYY1LBnWhglg=
2023-09-11 18:02:07 | ERROR | lightning_consensus::consensus - core/consensus/src/consensus.rs:371 - node: zBmZaycvQsdFRfe0p5Rig/KgyYPD4yNKQTPDo7JrugM=
2023-09-11 18:02:07 | WARN  | lightning_consensus::consensus - core/consensus/src/consensus.rs:373 - ##################
2023-09-11 18:02:07 | WARN  | lightning_consensus::consensus - core/consensus/src/consensus.rs:374 - ********************************
RPC server starting up
listening on 0.0.0.0:4230
Shutting node down.
Shutting node down.
Shutting node down.
Shutting node down.
Shutting node down.
```

To resolve this issue, start by executing a new `shutdown` command as follows:

```sh
systemctl stop lightning
```

If you need to delegate to root, then use the **sudo** keyword, as follows:

```sh
sudo systemctl stop lightning
```

Once completed, clear the logs to avoid confusion as the log aggregates messages past and current.

Delete all the log files (output.log and diagnostic.log) by running:

```sh
sudo rm -f /var/log/lightning/*.log
```

Launch the service:

```sh
systemctl start lightning
```

If you need to delegate to root, then use the **sudo** keyword, as follows:

```sh
sudo systemctl start lightning
```

You can watch the log output of the service by running:

```sh
tail -f /var/log/lightning/output.log
```

The output should be similar to:

```sh
2023-09-12 13:53:51 | WARN  | lightning_consensus::consensus - core/consensus/src/consensus.rs:373 - ##################
2023-09-12 13:53:51 | WARN  | lightning_consensus::consensus - core/consensus/src/consensus.rs:374 - ********************************
```

Alternatively, you can watch the diagnostic.log

```sh
tail -f /var/log/lightning/diagnostic.log
```
