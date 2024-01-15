---
title: Lightning CLI
slug: lightning-cli
hide_title: true
tags:
  - command line interface
  - cli
  - lightning
  - lgtn
---

import Author from '@site/src/components/Author';

The Lightning CLI provides a wide range of capabilities, including running the node, accessing key management utilities, network participation management and printing the loaded configuration. 

Its user-friendly interface provides detailed information about each command through the **help** sub-command, making it easy to navigate and operate efficiently.

:::tip
A quick reference of frequently used commands are available for [native](/references/Lightning%20CLI/frequently-used-commands-for-native-setup) and [docker](/references/Docker/frequently-used-commands-for-docker-setup) setups.
:::


## Commands

The commands are the interface in which users enter specific commands and options for the Fleek Network to process.

### Run

Run the full node

### Keys

Key management utilities to **show** (print the node's public keys) or **generate** private keys.

### Opt

The Opt command allows the user to opt into or out of Network participation. To opt-in, use the subcommand **in**, or opt-out of network participation by using **out**–note that this command should be sent before shutting down the node to avoid reputation penalties. To query the node participation status in the network, use the subcommand **status**.

### Print-config

Print the loaded configuration.

## Options

The Options flags allows further control or override default settings:

- `-c`, or `--config`, path to the toml configuration file which defaults to ~/.lightning/config.toml
- `--with-mock-consensus`, determines use of mock consensus backend
- `--with-console`, enable the Tokio Console asynchronous debugger
- `--with-log-locations`, enable code locations when printing logs
- `-v`, increases the level of verbosity (the max level is -vvv)

## Help

```sh
lgtn help
```

```sh
Usage: lgtn [OPTIONS] <COMMAND>

Commands:
  run           Run the full node
  keys          Key management utilities
  opt           Opt into or opt out of network participation
  print-config  Print the loaded configuration
  help          Print this message or the help of the given subcommand(s)

Options:
  -c, --config <CONFIG>      Path to the toml configuration file [default: ~/.lightning/config.toml]
      --with-mock-consensus  Determines that we should be using the mock consensus backend
      --with-console         Enable the Tokio Console asynchronous debugger
      --with-log-locations   Enable code locations when printing logs
  -v...                      Increases the level of verbosity (the max level is -vvv)
  -h, --help                 Print help
  -V, --version              Print version
```

### Find help for a specific option

Use the subcommand `help` after the `command`. Here's an example to find help for the command **keys**:

```sh
lgtn keys help
```

```sh
Key management utilities

Usage: lgtn keys [OPTIONS] <COMMAND>

Commands:
  show      Print the node's public keys
  generate  Generate new private keys. This command will fail if the keys already exist
  help      Print this message or the help of the given subcommand(s)

Options:
  -c, --config <CONFIG>      Path to the toml configuration file [default: ~/.lightning/config.toml]
      --with-mock-consensus  Determines that we should be using the mock consensus backend
      --with-console         Enable the Tokio Console asynchronous debugger
      --with-log-locations   Enable code locations when printing logs
  -v...                      Increases the level of verbosity (the max level is -vvv)
  -h, --help                 Print help
```

<Author
    name="Helder Oliveira"
    image="https://github.com/heldrida.png"
    title="Software Developer + DX"
    url="https://github.com/heldrida"
/>
