---
template: post
draft: false
hide_title: true
title: Getting Started
slug: getting-started
date: 2023-08-31T23:00:00.000+00:00
image: ./assets/getting-started.png?202311181211
canonical: ''
description: A first look at what Fleek Network is, why it's important, and a simple tutorial of running and interacting with a node on your local machine!
category: Tutorial
tags:
- Edge computing
- Guide
- Getting Started
---

![Getting started guide](./assets/getting-started.png?202311181211)

<!--
  The following import is intentional (see partial <CheckoutCommitWarning />)
-->
import Author from '@site/src/components/Author';
import GitCloneOptions from '../partials/_git-clone-options.mdx';

## Introduction

For this guide, we’ll have a simple look into how Fleek Network works in its current development phase and briefly share some of the core concepts like spinning up a node.

For those seeking advanced knowledge:

* Read our [whitepaper](/docs/whitepaper).
* Check out [our open-source code](https://github.com/fleek-network/lightning).

:::tip
If you find any typos in our documentation, feel free to [provide us feedback](https://discord.gg/fleek) or contribute by opening a PR in our repository [here](https://github.com/fleek-network/fleek-network-docs/).
:::

## Pre-requisites

To follow the guide, you will need the following:

- Familiarity with the command-line interface
- Git

## Need a quick Fleek Network TL;DR?

Fleek Network is an open-source edge computing platform to accelerate the development and execution of the next generation of web services.

The system is built on a distributed network of nodes, where services run within a fair and incentivized ecosystem constituted by an open community of developers and operators. It relies on blockchain technology at its core, allowing governance and token rewards as incentives for participation in serving the network.

Made by an open community that's free to operate nodes or build services without the need for approvals, permissions, or intermediaries. Or simply, consume Fleek Network resources on demand, from anywhere, provided by services running on the edge.

Applications, platforms and protocols build and utilize decentralized services on the Fleek Network to optimize performance and reduce dependency on typical centralized cloud providers and corporate infrastructure.

Developers can build faster and launch better products by offloading parts of the development stack to the edge to focus on core features for the value proposition of the services being developed.

To get started, install a Network Node in a [supported](/docs/node/requirements) Linux server, such as Debian or Ubuntu (latest) by utilizing our simple [assisted installer](/docs/node/install#assisted-installer) to help onboard as quickly as possible.

:::tip
Our network is open to everyone, so you're more than welcome to join us anytime without any restrictions, permission or formalities. We'd be happy to have you as part of our community!
:::

Once connected to the server, open a terminal window and execute the following command:

```sh
curl https://get.fleek.network | bash
```

Follow the install assistant recommendations to have the node ready without hassle and as quickly as possible.

## Why is Fleek Network needed?

Web3 products typically rely on centralized cloud infrastructure, which is vulnerable to attacks as computation and data can be easily manipulated to suit business goals. However, blockchain technology has paved the way for a new era of decentralized cloud computing and data storage. The Fleek Network offers a sustainable alternative to traditional centralized architectures, providing a secure, transparent, and accessible decentralized edge computing future for everyone.

## How Does Fleek Network Work?

When a client requests a service, the protocol determines the best route to the nodes where the service replicas and workload are allocated.

Once the computation is successful, the data streaming routes to the client. On-client request fulfillment, a proof of delivery is generated containing cryptographically secured metadata about the original request, any parts involved and the resources consumed.

The Delivery Acknowledgements are stored locally in the participating node memory pools, rolled up to the protocol consensus consistently throughout the Epoch. This agreement is formed by a random committee of any healthy Nodes that use the information provided to reward the Nodes fairly.

## Running a Node

A Fleek Network node can be built and run on your machine. It’s an [open-source project](https://github.com/fleek-network/lightning) and is open for contributions.

The project is written with Rust, a general-purpose programming language that you need to have installed in advance to be able to follow the current guide.

:::tip
To set up Rust, packages and library dependencies can be tricky. The quickest is to visit the [rustup.rs](https://rustup.rs/). Alternatively, if you haven't already, the build section has a [manual installation](/docs/node/install#manual-installation) document to help.
:::

### Clone the source code

We’ll clone the repository locally, build it and interact with the node through the binary or the HTTP JSON-RPC API with a client like cURL, but you can use a GUI (Postman, Insomnia, amongst others) if you prefer.

:::note
The ~/fleek-network/lightning or $HOME/fleek-network/lightning directory is the default or recommended location to store the repository. If you like to follow conventions, then is best to stick with the recommendation, to avoid confusion and make it easier to follow our documentation.
:::

Start by cloning the repository located at [https://github.com/fleek-network/lightning](https://github.com/fleek-network/lightning)

<GitCloneOptions />

Once the git clone completes, you’ll have the latest version at the time of cloning. You should use git to fetch or pull the latest versions consequently.

### Dependencies

Install the required dependencies necessary for compiling general software and for our use-case Lightning CLI.

```sh
sudo apt-get install \
    build-essential \
    clang \
    pkg-config \
    libssl-dev \
    gcc-multilib \
    protobuf-compiler
```

### Build

Start by changing the directory to the project directory where the source code is stored. If you have followed the recommended location that'll be `~/fleek-network/lightning`, as follows:

```sh
cd ~/fleek-network/lightning
```

Run the Rust package manager clean and update commands.

```sh
cargo clean
cargo update
```

Next, execute the build command to compile the Fleek Network Lightning CLI binary.

```sh
cargo +stable build --release
```

:::tip
The build command uses the Rust compiler, which might take a while depending on how speedy the host machine is capable.
:::

Once the Rust compiler completes, the generated binary will be available in the source code project directory. If you stick with the default, that'll look like `~/fleek-network/lightning/target/debug/lightning-node`.

To avoid having to specify the pathname every time, create a symbolic link to keep it short. Here we'll name the process as the global `lgtn`:

```sh
sudo ln -s "~/fleek-network/lightning/target/debug/lightning-node" /usr/local/bin/lgtn
```

Run the CLI with the flag `version` to confirm it's available globally.

```sh
lgtn --version
```

The output should look like:

```sh
Usage: lgtn [OPTIONS] <COMMAND>

Commands:
  run             Start the node
  keys            Handle keys
  print-config    Print the loaded configuration
  dev-init-only   Initialize the node without starting it
  dev-dump-graph  Dump the infusion graph of the node instance
  help            Print this message or the help of the given subcommand(s)

Options:
  -c, --config <CONFIG>      Path to the toml configuration file [default: ~/.lightning/config.toml]
      --with-mock-consensus  Determines that we should be using the mock consensus backend
  -v...                      Increases the level of verbosity (the max level is -vvv)
      --log-location         Print code location on console logs
  -h, --help                 Print help
  -V, --version              Print version
```

### Node Launch

After [building](#build), the node can be launched by running the subcommand `run`:

```sh
lgtn run
```

:::tip
It's highly recommend to use systemd to manage the Fleek Network service for node operators. Systemd is a system and service manager for Linux operating systems that provides a consistent way to manage system services across various distributions.
:::

Learn how to create a new Systemd service in the [manual installation](/docs/node/install#manual-installation) document.

### Health check

It's important for Node operators to regularly check on the health of their resources to make sure everything is running smoothly. By doing this, they can get helpful feedback and know for sure if their Node is up and running. Some experienced node operators even automate this process using cronjobs and get reports sent to them via email or other custom methods.

```sh
curl -w "\n" localhost:4230/health
```

If everything goes well, the response should be:

```sh
OK
```

Alternatively, use the JSON-RPC method `flk_ping`:

```sh
curl -s \
    -X POST \
    -H "Content-Type: application/json" \
    -d '{
        "jsonrpc": "2.0",
        "method": "flk_ping",
        "params": [],
        "id": 1
        }' \
    localhost:4230/rpc/v0
```

Which response should return the key `result` with value `pong`:

```sh
{
    "jsonrpc": "2.0",
    "result": "pong",
    "id": 1
}
```


## Next steps

While you can run the Network Node as described here, it's required to set up the Network Node correctly and securely! It requires some degree of patience, knowledge and time to go through our guides, but we'll provide some guides and references to help you manage your network node server!

To avoid having to go through all the steps manually, we recommend reading our [assisted installer](/docs/node/install#assisted-installer) document for quick onboarding.

## Conclusion

We introduced Fleek Network as an open-source edge computing platform to help us accelerate the development and execution of the next generation of web services.

We have learned a bit about the importance of a decentralized edge computing network to reach and fulfill the future of computation and how the Fleek Network protocol works succinctly.

Furthermore, we guide you through a step-by-step installation of the network node process, where we pull the source code, build the binary and launch the service.

Finally, we do a quick health check to confirm the status of our node.

Discover more about the project by [watching/contributing on GitHub](https://github.com/fleek-network/lightning), following us on [Twitter](https://twitter.com/fleek_net), and joining [our community Discord](https://discord.gg/fleek) for any updates.

<Author
    name="Helder Oliveira"
    image="https://github.com/heldrida.png"
    title="Software Developer + DX"
    url="https://github.com/heldrida"
/>