---
hide_title: true
title: Managing the keystore
slug: managing-the-keystore
date: 2023-11-14T12:00:00Z
description: The following will guide you through some of the fundamentals to help understand how to manage the key store at the very basics, and help you persist the key store identity, in any supported system you’re migrating to.
category: Tutorial
tags:
- guide
- keystore
- public keys
- private keys
- keys
---

import Author from '@site/src/components/Author';

## Introduction

Fleek Network incentivizes participation by rewarding its node providers. A node is identifiable by an identity, which the reward mechanism uses to identify the node to reward it.

:::info
At time of writing the rewards mechanism hasn't yet been introduced, read the [testnet plans](https://blog.fleek.network/post/fleek-network-testnet-plans) to get a high level perspective over the plans. A token and economics paper should be released in the future.
:::

We'll use the term identity to describe the key store declared in the configuration, in our case [PEM](https://en.wikipedia.org/wiki/Privacy-Enhanced_Mail) files. The content of the PEM files and the file itself should be kept secret.

The key store is in the file system and the location is defined in the Fleek Network `~/.lightning/config.toml`, as a private key stored in an identity named PEM file (by default `consensus.pem` and `node.pem`). It's essential to understand this, as you may want to copy the identity to a new server setup, to persist the identity accross to the new server setup.

The following will guide you through some of the fundamentals to help understand how to manage the key store at the very basics, and help you persist the key store identity, in any [supported system](/docs/node/requirements#server) you're migrating to.

## Pre-requisites

To follow the guide, you will need the following:

- Familiarity with the command-line interface
- A basic understanding of [how public key cryptography works](https://en.wikipedia.org/wiki/Public-key_cryptography)

## Configuration file

### Locating the file

The Lightning CLI has a configuration file in the home directory of the user, which by default is located in the path `$HOME/.lightning` or `~/.lightning` under the name `config.toml`. It's generally described as `~/.lightning/config.toml`.

:::tip
The tilde in `~/.lightning` represents `$HOME` which is simpler, but we'll use `$HOME` to make it easy to follow.
:::

If you're following the install recommendations you should be logged in with a **sudoer** account. For our guide, let's imagine that the **sudoer** username we are logged in with is **lgtn**.

:::tip
The word **sudo** is the abbreviation of the term "super user do". As the name suggests, it is the privilege that a super user, such as an administrator has to do whatever it wants in the system. A super user can be an administrator, like the **root** or what we described here as a user in the group **sudo** aka **sudoer**.
:::

If you are logged in with a username, that'd be:

```sh
/home/<USERNAME>/.lightning/config.toml
```

For our example for user `lgtn` that is:

```sh
/home/lgtn/.lightning/config.toml
```

If you log in with another user, let's say `fleek` it'd be:

```sh
/home/fleek/.lightning/config.toml
```

At any time, you can check which user you are logged in with by running the command:

```sh
whoami
```

Here's an example of our user `lgtn`, which for the command above outputs:

```sh
lgtn
```

:::tip
To switch to a particular user, you can run the command `su <USERNAME>` e.g. for the user **lgtn** we would execute the command `su lgtn`.
:::

Now that you know where to locate the configuration file for any given user you are logged in with, learn about the [Configuration sections](#configuration-sections).

### Configuration sections

The Fleek Network node configuration settings are located in the path `$HOME/.lightning/config.toml`, and it's organized by configuration sections.

At the time of writing, we have a TOML file with sections. Here are some examples amongst others:
- application
- origin-ipfs
- rpc
- signer

Each of the sections holds several property names and values. If you are accustomed to the [JSON](https://en.wikipedia.org/wiki/JSON) or [YAML](https://en.wikipedia.org/wiki/YAML) formats, you'll find the TOML format a bit similar (if you'd like to learn more about the TOML file format, read about it [here](https://toml.io/en/)).

By default and at time of writting the Lightning CLI configuration file (config.toml) is similar to:

```sh
[BLANK]

[application]
db_path = "/home/lgtn/.lightning/data/app_db"
mode = "Prod"
storage = "RocksDb"
testnet = true

[blockserver]
address = "0.0.0.0:4211"

[broadcast]
address = "0.0.0.0:4200"

[consensus]
store_path = "/home/lgtn/.lightning/data/narwhal_store"

[dht]
address = "0.0.0.0:8101"
bootstrappers = []

[fetcher]

[fsstore]
root = "/home/lgtn/.lightning/blockstore"

[[handshake.transport]]
signal_address = "0.0.0.0:4210"
type = "WebRTC"

[[handshake.worker]]
type = "AsyncWorker"

[[handshake.worker]]
type = "AsyncWorker"

[[handshake.worker]]
type = "AsyncWorker"

[[handshake.worker]]
type = "AsyncWorker"

[[origin-ipfs.gateways]]
authority = "ipfs.io"
protocol = "Https"

[[origin-ipfs.gateways]]
authority = "fleek.ipfs.io"
protocol = "Https"

[[origin-ipfs.gateways]]
authority = "ipfs.runfission.com"
protocol = "Https"

[rep-collector]
reporter_buffer_size = 5

[resolver]
store_path = "/home/lgtn/.lightning/data/resolver_store"

[rpc]
addr = "0.0.0.0"
port = 4069

[service-executor]
services = [0, 1]

[signer]
consensus_key_path = "/home/lgtn/.lightning/keystore/consensus.pem"
node_key_path = "/home/lgtn/.lightning/keystore/node.pem"

[topology]
testing_min_nodes = 9
testing_target_k = 8
```

:::tip
Beware that the configuration file might look a bit different depending on the version you're running and the current development features in place by the Fleek Network core team. You shouldn't copy the example above and replace with yours, as this only servers for illustrative purposes.
:::

Some advanced use cases might require dealing with the host and port number binding, depending on the service provider's needs and customization. We'll keep things simple and assume the default settings.

In this guide, we are interested in the `[signer]` section settings for the `consensus_key_path` and `node_key_path` which by default is set to `~/.lightning/keystore`.

:::tip
The identity is a text description for the Keystore and at the time of writing we have not yet implemented multiple identity management via the CLI. Thereupon, the identity value serves to find the filename match in the `keystore_path`. This might change as we progress with development. Check the [Identity selection](#identity-selection) to learn more about it!
:::

### Identity selection

[TODO]

## Conclusion

Discover more about the project by [watching/contributing on Github](https://github.com/fleek-network/lightning), following us on [Twitter](https://twitter.com/fleek_net), and joining [our community Discord](https://discord.gg/fleekxyz) for all the best updates!

<Author
    name="Helder Oliveira"
    image="https://github.com/heldrida.png"
    title="Software Developer + DX"
    url="https://github.com/heldrida"
/>