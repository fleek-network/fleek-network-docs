---
template: post
draft: false
hide_title: false
title: Finding help in the command-line
slug: finding-help-in-the-command-line
date: 2023-01-02T23:00:00Z
canonical: ''
description: Instructions about how to find help for the Ursa command line
category: Reference
tags:
- Reference
- Git
- Fleek Network
- Versions
---

Show the `Ursa` CLI help

```sh
ursa --help
```

The output will provide instructions for usage, flags, options and subcommands.

```sh
CLI options

USAGE:
    ursa [FLAGS] [OPTIONS] [SUBCOMMAND]

FLAGS:
    -h, --help       Prints help information
    -r, --rpc        Allow rpc to be active or not (default = true)
    -V, --version    Prints version information

OPTIONS:
    -c, --config <config>        A toml file containing relevant configurations
    -r, --rpc-port <rpc-port>    Port used for JSON-RPC communication

SUBCOMMANDS:
    help    Prints this message or the help of the given subcommand(s)
    rpc     run rpc commands from cli
```

Finding help for a specific option

```sh
ursa rpc help
```

```sh
USAGE:
    ursa rpc <SUBCOMMAND>

FLAGS:
    -h, --help       Prints help information
    -V, --version    Prints version information

SUBCOMMANDS:
    get     get the file from network for a given root cid and store it on given path
    help    Prints this message or the help of the given subcommand(s)
    put     put the file on the node
```

Learn more about a subcommand

```sh
ursa rpc put help
```
