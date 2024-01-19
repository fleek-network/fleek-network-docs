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
import InfoNetworkParticipation from '../../guides/partials/_info_network_participation.mdx';
import TipShutdownGracefully from '../../guides/partials/_tip_shutdown_gracefully.mdx';

The Lightning CLI provides a wide range of capabilities, including running the node, accessing key management utilities, network participation management and printing the loaded configuration. 

Its user-friendly interface provides detailed information about each command through the **help** sub-command, making it easy to navigate and operate efficiently.

:::tip
A quick reference of frequently used commands are available for [native](/references/Lightning%20CLI/frequently-used-commands-for-native-setup) and [docker](/references/Docker/frequently-used-commands-for-docker-setup) setups.
:::


## Commands

The commands are the interface in which users enter specific commands and options for the Fleek Network to process.

### Run

The command to **run** allows you to start the node process in Fleek Network.

Here's a basic example of how to **run** a node with default settings:

```sh
lgtn run
```

On the other hand, the default setup provided by the **get.fleek.network** assisted installer is quite verbose and explicitly defines the configuration path.

```sh
lgtn -c /home/user/customPath/config.toml -vv run
```

### Keys

Key management utilities to **show** (print the node's public keys) or **generate** private keys. For example, to generate new private keys execute:

```sh
lgtn keys generate
```

Two private keys are created in the signer configuration paths defined in the configuration (default ~/.lightning/config.toml).

For example, if the configuration file declares the signer consensus_key_path and node_key_path as follows:

```sh
[signer]
consensus_key_path = "/home/<USERNAME>/.lightning/keystore/consensus.pem"
node_key_path = "/home/<USERNAME>/.lightning/keystore/node.pem"
```

The private keys will be placed in the corresponding locations, as defined for the consensus_key_path (/home/\<USERNAME\>/.lightning/consensus.pem) and node_key_path (/home/\<USERNAME\>/.lightning/node.pem) file paths.

:::warning
The \<USERNAME\> is a placeholder for the actual system username. So, make sure that you have declared the correct path corresponding to your preferred system username.
:::

### Opt

The Opt command allows the user to opt into or out of Network participation.

<InfoNetworkParticipation />

To opt-in, use the subcommand **in**:

```sh
lgtn opt in
```

Once successful, you will receive a confirmation text message as feedback, notifying you of your inclusion in the next Epoch.

Opt-out of network participation by using **out** (note that this command should be sent before shutting down the node to avoid reputation penalties). Similarly, should shutdown only after the Epoch ends to mitigate any participation faults.

```sh
lgtn opt out
```

:::warning
To prevent any negative impact on the node's reputation, it's advisable to wait until the end of the Epoch (~24h) before shutting down the node when opting out.
:::

<TipShutdownGracefully />

To query the node participation status in the network, use the subcommand **status**.

```sh
lgtn opt status
```

:::tip
Network participation control can be carried out regardless of whether the node is started or online.
:::

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
