---
template: post
draft: false
hide_title: false
title: Ursa database IO error, lock file, resource temporarily unavailable
slug: ursa-database-io-error-lock-file-resource-temporarily-unavailable
date: 2023-01-02T23:00:00Z
canonical: ''
description: Instructions how to fix the ursa database lock file IO error
category: Reference
tags:
- Reference
- Fleek Network
- node
- lockfile
- database
- ursa_db
---

The following is useful for native builds. If you're finding hard to troubleshoot, it's recommended to use the simpler version via Docker. Check the guide [here](../../guides/Network%20nodes/fleek-network-running-a-node-in-a-docker-container).

Stop the Network Node

```sh
pkill ursa
```

If you'd like to learn more about stopping the Nodes, read about it [here](stop-the-fleek-network-node-process).

Clear the `ursa_db` directory

```sh
rm -f ~/.ursa/data/ursa_db/*
```

Restart the Ursa node!