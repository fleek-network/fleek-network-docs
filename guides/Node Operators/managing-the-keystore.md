---
title: Managing the keystore
hide_title: true
slug: managing-the-keystore
date: 2023-11-14T12:00:00Z
image: ./assets/managing-the-keystore.png?202311181211
description: The following will guide you through some of the fundamentals to help understand how to manage the key store at the very basics, and help you persist the key store identity, in any supported system you’re migrating to
category: Tutorial
tags:
- guide
- keystore
- public keys
- private keys
- keys
---

![Managing the keystore](./assets/managing-the-keystore.png?202311181211)

import Author from '@site/src/components/Author';
import RestoreKeystore from '../partials/_restore-keystore.mdx';

## Introduction

Fleek Network incentivizes participation by rewarding its node providers. A node is identifiable by an identity, which the reward mechanism uses to identify the node to reward it.

:::info
At time of writing the rewards mechanism hasn't yet been introduced, read the [testnet plans](https://blog.fleek.network/post/fleek-network-testnet-plans) to get a high level perspective over the plans. A token and economics paper should be released in the future.
:::

We'll use the term identity to describe the key store declared in the configuration, in our case [PEM](https://en.wikipedia.org/wiki/Privacy-Enhanced_Mail) files. The content of the PEM files and the file itself should be kept secret.

The key store is in the file system and the location is defined in the Fleek Network `~/.lightning/config.toml`, as a private key stored in an identity named PEM file (by default `consensus.pem` and `node.pem`). It's essential to understand this, as you may want to copy the identity to a new server setup, to persist the identity accross to the new server setup.

:::caution
Security is achieved by issuing users private cryptographic keys. Only the holder of the private key has access to sensitive information, such as an identity, which relates to reputation, rewards, etc. The security of the private key is the responsibility of the user. Unfortunately, Fleek Network is unable to help you regain access to your private key if you've lost or failed to secure it. The private keys are your responsibility.
:::

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

By default, and at time of writing the Lightning CLI configuration file (config.toml) is similar to:

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
port = 4230

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

### Type of keys

There are three types of keys related to the identity of a node and the account ownership. The keys are based in public-key cryptography, or asymmetric cryptography where each key pair consists of a public key and a corresponding private key. The keys are described in the section [identity on the Fleek Network](/docs/learn/the-network/#identity-on-the-fleek-network) as follows:

-  A Node key (ConsensusPublicKey) is [BLS12-381](https://electriccoin.co/blog/new-snark-curve/) which facilitates the consensus algorithm or persistence of state, resilience and fault tolerance. Has multi-signature support, the ability to aggregate many signatures into one used for consensus committee when signing certificates

- A Node Networking key (NodePublicKey) is [Ed25519](https://en.wikipedia.org/wiki/EdDSA) used for the speed and performance of the network communications

- Account Owner keys are based on [secp256k1](https://www.secg.org/sec2-v2.pdf), which corresponds to an Ethereum Address

For instance, a public key is open to anybody to see, and it represents a unique node identifier in the Fleek Network, a bit like a passport number. On the other hand, the private key is secret, and the operator is responsible to store it privately.

The Fleek Network relies on cryptography, thus the Fleek Network team and anybody can access, compromise or manipulate the secrets of an identity. On the other hand, the public key can be used by anyone, Fleek Network included, to identify a node or send rewards to the address without jeopardizing identity security.

To learn more about the identities on the Fleek Network [here](/docs/learn/the-network/#identity-on-the-fleek-network).

### Key privacy

If you don’t keep your private keys secret, you'll have your node compromised.

Here are a few examples of what you should not do:
- Share the `$HOME/.lightning/keystore` directory file content publicly
- Track the `$HOME/.lightning/keystore` directory files in a version control repository e.g. git
- Have poor "rights" permissions in UNIX systems e.g. everyone can read, delete, modify `$HOME/.lightning`
- Allow anyone to access the node provider physically without any access control to the operating and file systems e.g. a VPS provider
- Get rid of a hard drive unformatted or blind erased by selling to somebody or dumping in the bin, which contains `$HOME/.lightning/keystore`

There are many other ways of getting compromised, but hopefully, the ones put above give you a good starter into the subject.

Remember, the node provider is the only one responsible when managing the key store. Neither Fleek Network nor the most sophisticated AI system presently can compromise the cryptography in use to help you out. You are fully responsible for securing and retaining your private keys.


### Identity selection

Multiple identity management is yet to be implemented but in any case, some users might find it trivial to keep multiple identities and switch between them referencing them by name. The following section is not advocating this approach but sharing some approaches that can help certain use-cases.

Let's suppose that we've recently moved to a new server setup and copied our previous server keystore keys as `consensus.pem` and `node.pem` and renamed the `$HOME/.lightning/keystore/*.pem` to `$HOME/.lightning/keystore/new-*.pem`.

:::tip
We are using a wildcard `*` to reduce verbosity. The wildcard means as replacement for all the filenames encountered in the path and extension without having to name them individually as we know they are `consensus.pem` and `node.pem`.
:::

To illustrate this scenario, here's an example of how our `$HOME/.lightning/keystore` directory could look like:

```sh
.
├── new-consensus.pem
├── new-node.pem
└── old-consensus.pem
└── old-node.pem

0 directories, 4 file
```

The `old-*.pem` files are the original key store and `new-*.pem` could correspond to the new identity created while setting up the node in the new server.

Since we have `[signer]` set to the default values, in particular:

```toml
[signer]
consensus_key_path = "/home/lgtn/.lightning/keystore/consensus.pem"
node_key_path = "/home/lgtn/.lightning/keystore/node.pem"
```

We'd be required to change and switch to the preferred keys. The identity is switch to the provided values once the node is restarted. Thus, we can switch to any identity by changing the `[signer]` `consensus_key_path` and `node_key_path` pathname values anytime as long we restart the server successfully.

To verify which keys are loaded by the Lightning CLI run the command:

```sh
lgtn keys show
```

You'd find the public keys in the output, which can be used for comparision and should be different everytime the configuration changes and reloaded. Here's an example of the output:

```sh
Node Public Key: RwPpr35H5AAfWwSDFxwYuJv5TA8PWUd2pdBg+UKsORc=
Consensus Public Key: s36g09qQzaaOJxi0UZDRCXj3HUUWjaGiYrQV6Ylo9Ih6jMvrnxM5s1OpBnsEj5R1AVYcuxlnVR+oyEjgJ3WpI5LOHSN1Q6Zur33vka3IachBEIKIbsiXMJW16vu4n4bG
```

:::tip
The PEM files can be named as you wish, but by default we like to keep it sound to avoid confusion and make it as clear as possible.
:::

## Backing up the keystore

When dealing with Fleek Network it's crucial to always be aware of the identity. You should backup private keys in case the unexpected happens, as it's impossible to recover the identity in any other way, including the core team, any other person or system.

Backing up your keystore pem files are crucial to ensure the safety and accessibility of your identity on the Fleek Network. For example, if your `$HOME/.lightning` is deleted you'll still be able to restore it if you have backed it up properly.

There are many ways to make identity backups, each with its own benefits and drawbacks. At risk of oversimplifying, we'll focus on a simple manual approach to expose some principles you should have awareness.

:::caution
The security is never stronger than its weakest link, and it is very likely that the weakest link is not the method itself. It's pointless to encrypt the backup archive with sophisticated methods when the passphrase is weak or of an easy guess.
:::

None of the methods described here are being endorsed by the Fleek Network team use the knowledge provided here for educational purposes only and at your own risk.

### Lower security

If you opt for the lowest level of security, you can use zip and unzip. The man page of zip described the encryption algorithm used to be weaker than PGP.

To zip and encrypto the `$HOME/.lightning/keystore` directory run:

```sh
# It'll prompt for password (remember)
zip --encrypt -r keystore.zip.enc $HOME/.lightning/keystore
```

To unzip and decrypt the `keystore.zip.enc`, you'd run:

```sh
# It'll prompt for password (recall)
unzip keystore.zip.enc -d $HOME/.lightning/keystore
```

:::tip
We provide the unzip destiny target to the flag `-d`. The unzip process outputs the files onto the desired location `$HOME/.lightning/keystore`, thus overriding any contents. If you have any files in the destiny target directory it'll be overriden, effectively replacing with the output of the unzipped directory content, so make sure you backup any files as required.
:::

### Higher security

Create a `Tar` archive, which will contain the target directory, files and the Tar stores all of the relative paths in the tarball itself.

Create a `tarbar` by executing:

```sh
tar -cf "keystore.tar" $HOME/.lightning/keystore
```

The `keystore.tar` should be in the current work directory.

Use `gpg` with the [symmetric option](https://www.gnupg.org/gph/en/manual/x110.html), it creates the keys for that file and request a password to protect them. If you are familiar with asymmetric `gpg`, it's similar, but it's not signed with your public key or such.

The encryption command is:

```sh
sudo gpg -a --symmetric --cipher-algo AES256 keystore.tar
```

The `keystore.tar.asc` should be in the current work directory.

To decrypt the `keystore.tar.asc` file, enter:

```sh
sudo gpg -a --output keystore.tar --decrypt keystore.tar.asc
```

To extract the `keystore.tar` is simple, but be aware that it unarchives with the original directory structure, which might be a bit confusing. So, we'll create a new temporary directory for our example that will use to extract to.

```sh
mkdir $HOME/tar_keystore_extract
```

Now, run the command to extract to the target directory, as follows:

```sh
tar -xf keystore.tar -C $HOME/tar_keystore_extract
```

The `/home/<username>/.lightning/keystore` should be in the `tar_keystore_extract` directory where you'll find the PEM files.

### Storage

The backup archive should only be accessible by yourself. If you decided to store it in a cloud storage provider, be aware of increased security risks. Cloud storage is convenient, but it ultimately puts data into the hands of others. If you're not particularly concerned, or have confidence about the encryption of the files, then that's at your own risk. But it's recommended to store in a physical hard drive that remains disconnected from computers and network devices.

:::caution
If you use cloud storage to store your sensitive data, encryption should be your first line of defense. Encrypting files before uploading them to the cloud is crucial to reduce others from accessing information without your permissions and knowledge.
:::

Remember that the security of the private key is the responsibility of the user. Unfortunately, the Fleek Network team and any others are unable to help regain access to private key if lost or failed to secure them. The private keys are the user responsibility. The Fleek Network team doesn't endorse any methods of encryption and storage, the methods described here are for educational purposes only.

## Loading keys on runtime

As described in the section [configuration files](#configuration-file) the default location of the `.lightning` system configuration directory is `$HOME/.lightning`.

The `$HOME/.lightning/config.toml` holds the information of where the Lightning CLI node process should pull the keystore pem files. The location of the pem files can be placed anywhere the node process has permissions to read.

When unarchiving the backup files, the keystore directory or pem files should be placed in the directory declared in the `$HOME/.lightning/config.toml`. That is if the location is the one specified on the runtime–the command declared to launch and run the lightning service, that has the optional `-c` configuration flag that takes any custom location which overrides the default `$HOME/.lightning/config.toml`.

:::caution
On runtime, the Lightning service can have specified a configuration file in any readable location. If a configuration pathname isn't passed, it'll default to the `$HOME/.lightning/config.toml`. It's important to understand this to avoid confusion.

The service that starts with:

```sh
lgtn -c /root/custom-configuration.toml run
```

Can have complete different settings from any of the following:

```sh
lgtn -c /home/lgtn/.lightning/config.toml run
```

```sh
lgtn -c ~/.lightning/config.toml run
```

```sh
lgtn run
```

Due to the fact that any of the fails above might contain different settings declared in the file body.
:::

For instance, we can imagine a scenario where our service is started with the command:

```sh
lgtn -c /home/lgtn/.lightning/config.toml run
```

Where the `keystore` is placed under the parent directory `/home/lgtn/.lightning/`. Resulting in the configuration file have the following settings for the hypothetical username `lgtn`:

```sh
[signer]
consensus_key_path = "/home/lgtn/.lightning/keystore/consensus.pem"
node_key_path = "/home/lgtn/.lightning/keystore/node.pem"
```

:::tip
On the [install instructions](/docs/node/install) provided by the documentation, a [Systemd service unit](/docs/node/install#systemd-service-setup) is recommended to allow the user control the Lightning service via systemctl. The Systemd service unit file should contain the recommended usage of `-c` configuration. If you have followed the recommendations it should be familiar.
:::

## Restoring the keystore

<RestoreKeystore />

## Conclusion

We've walked through most basics of where the configuration file is located, the configuration settings we use to set up and run the node, the different configuration sections we have, and most importantly the identity section.

Additionally, a brief guide on the [identity](#identity-selection), more specifically an introduction to the [type of keys](#type-of-keys) and [key privacy](#key-privacy), which we find important to understand for anyone seriously interested in running a node by hinting into some system administration and security principles.

Separately, at risk of oversimpliying provided a brief introduction into the backup of the keystore directory.

In the future, we'll introduce more advanced topics that will help you improve the knowledge you get from this, but we are glad that you followed this guide and got some comprehension to help you manage the key store.

While we do our best to provide the clearest instructions, there's always space for improvement, therefore feel free to make any contributions by messaging us on our [Discord](https://discord.gg/fleek) or by opening a [PR](https://github.com/fleek-network) in any of our repositories.

Discover more about the project by [watching/contributing on Github](https://github.com/fleek-network/lightning), following us on [Twitter](https://twitter.com/fleek_net), and joining [our community Discord](https://discord.gg/fleek) for all the best updates!

<Author
    name="Helder Oliveira"
    image="https://github.com/heldrida.png"
    title="Software Developer + DX"
    url="https://github.com/heldrida"
/>