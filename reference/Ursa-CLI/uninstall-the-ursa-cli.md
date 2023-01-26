---
template: post
draft: false
hide_title: false
title: Uninstalling the Ursa CLI
slug: uninstall-the-ursa-cli
date: 2023-01-02T23:00:00Z
canonical: ''
description: Instructions about how to find help for the Ursa command line
category: Reference
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

The executable (`ursa` binary) is compiled from source code, if you have followed our guides on how to install in a host you might be interested in finding out that you have dependencies installed.

⚠️ Bear in mind that other software or applications can be using these dependencies, if you remove it might break your system.

Uninstalling Rust via `rustup` for Ubuntu linux

```sh
rustup self uninstall
```

It'll also delete the whole $HOME/.cargo directory.

On Ubuntu Linux, if you've followed our guides, you've likely installed and may want to uninstall the following packages:

```sh
apt-get uninstall build-essential cmake clang pkg-config libssl-dev protobuf-compiler
```

If you've build `ursa` cli from source code, you might be interested in removing the source code repository saved in your machine.

```sh
rm -r <PATH-SOURCE-CODE-REPOSITORY-OF-URSA-CLI>
```

For Docker users, it's best to check the official guides to learn how to remove containers and images, [here](https://docs.docker.com/engine/reference/commandline/container_rm/)
