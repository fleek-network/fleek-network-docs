---
template: post
draft: false
hide_title: false
title: Uninstalling the Ursa CLI
slug: uninstall-the-ursa-cli
date: 2023-01-02T23:00:00Z
canonical: ''
description: Instructions about how to find help for the Ursa command line
category: Tutorial
tags:
- Reference
- Fleek Network
- node
- uninstall
- removal
---

Before proceeding make sure you've stopped the Fleek Network Node process, find how [here](stop-the-fleek-network-node-process).

Tell where the `ursa` cli in the current shell environment is located (the `ursa` executable).

```sh
which ursa
```

Here's an example of what the output looks like on macos

```sh
/Users/fleek/.cargo/bin/ursa
```

Remove the `ursa` cli

```sh
rm <PATH-OF-URSA-CLI>
```