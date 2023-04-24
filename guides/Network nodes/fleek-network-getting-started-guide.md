---
template: post
draft: false
hide_title: true
title: Getting Started Guide
slug: fleek-network-getting-started-guide
image: ./assets/fleek-network-getting-started.png?202301101924
date: 2022-11-30T23:00:00.000+00:00
canonical: ''
description: A first look at what Fleek Network is, why it's important, and a simple
  tutorial of running and interacting with a node on your local machine!
category: Tutorial
tags:
- CDN
- Guide
- Getting Started
- Fleek Network
---

<!--
  The following import is intentional (see partial <CheckoutCommitWarning />)
-->
import CheckoutCommitWarning from '../partials/_checkout-commit-warning.mdx';
import Author from '@site/src/components/Author';
import GitCloneOptions from '../partials/_git-clone-options.mdx';

![Fleek Network: Getting started guide](./assets/fleek-network-getting-started.png?202301101924)

## Introduction

In this guide, we’ll have a simple look into how Fleek Network works in its current development phase and briefly share some of the core concepts like spinning up a node and putting + retrieving .car files from the network.

For those seeking advanced knowledge:

* Read our [whitepaper](https://fleek.network/fleek-network.pdf?202212011428).
* Check out [our open-source code](https://github.com/fleek-network/ursa).

## Pre-requisites

To follow the guide, you will need the following:

- Familiarity with the command-line interface
- Git

<CheckoutCommitWarning />

## Need a quick Fleek Network TL;DR?

Fleek Network is a decentralized content and application layer built on established decentralized storage protocols combined with high-speed caching and an effective delivery layer. An alternative to traditional content delivery networks without a central authority that is reliable and censorship-resistant. Fleek Network relies on blockchain technology at its core, allowing governance and token rewards as incentives for participation in serving the network.

Install a Network Node in a Linux Server e.g., Ubuntu or Debian latest by using our "Get Fleek Network", an assisted installer to help onboard as quickly as possible. Our network is permissionless, as the name suggests, no permission is required to become part of this network, you are free to join and participate at anytime!

To start open a terminal and execute:

```sh
curl https://get.fleek.network | bash
```

Learn more about the assisted installer [here](./how-to-install-a-node-easily-with-the-assisted-installer).

## Why is Fleek Network needed?

The demand for content delivery is skyrocketing, and due to the rise of video, gaming, and other media content popularity, demand will keep going up. Content delivery providers have a central infrastructure giving immense control to obscure authorities that can block access to content and even manipulate it.

On the other hand, content delivery services depend on costly infrastructure that requires a significant number of resources. Traditionally these are dispersed geographically but more commonly located in convenient regions for the business; that is, a resolver might only find a content delivery node close to you sometimes.

Most web3 services have their client-facing interfaces hosted and delivered through centralized host providers and traditional content delivery networks, breaking the trust upfront and causing immense disappointment to the end user.

Since decentralized storage is a reality, a decentralized content delivery network can help achieve the goal of providing a fully decentralized web3 application.

## How Does Fleek Network Work?

Fleek Network will build on web 3 technology. As a starter, it'll focus on static content, accelerating content delivery from protocols, such as FileCoin, IPFS, Arweave, Storj, Sia, etc. While in the future, support dynamic content. Contrary to traditional CDN networks, it grows only on demand, designed to be scalable, highly available, and fault-tolerant: meaning that it's intended to continue its normal operations despite system failures.

Content is replicated across nodes and delivered through peer-to-peer mechanisms while maintaining the user experience of traditional content delivery services we are accustomed to. Peer-to-peer technology is also helpful in providing content as quickly as possible. Fleek Network, at its basics, is a caching and delivery layer that has components based on solid web 3 protocols, inheriting the benefits of years of research and the highest advancements in blockchain and internet data transmission technology.

Fleek Network is offering an alternative route to access content without censorship that is cheaper and more performant! The network promotes a decentralized economy by caching and serving content while incentivizing participants. It features caching, load balancing, reduced round trips (RTT), and in-memory caching for more demanded content for quicker trip time for first-byte (TTFB). In counterpart, content is cleared based on access popularity.

Fleek Network also relies on blockchain technology to handle governance and rewards. Adopting a shared economy model allows anyone to participate with bandwidth and computation in exchange for FLK, the native protocol token. All participants are bound to a consensus algorithm for transparency and verifiable metrics for a fairer and open community.

Clients operate with the Fleek Network independently but interact with the network via Gateway nodes. The Gateway Nodes connect users to the closest Cache Nodes that are responsible for caching, replicating, and delivery of content through client-facing HTTPS GET and PUT methods.

Fleek Network allows direct access to content instead of only being accessible via HTTP-HTTPS methods, as the content is universally addressable and linkable. Users can access Fleek Network via the Gateway or the RPC interfaces.

The Gateway Nodes act like a reverse proxy for the entire network, handling client HTTPS GET requests. There are Origin Servers that persist Client data and respond to trivial requests from Cache Nodes.

## Running a Node

A Fleek Network node can be built and run on your local machine. It’s an [open-source project](https://github.com/fleek-network/ursa) and is open for contributions.

The project is built with Rust, a general-purpose programming language, be sure to have it installed on your local machine in advance to be able to follow the guide.

> Installing and configuring Rust, packages and library dependencies can be tricky! If you haven't already, check the guides [How to install Rust and the dependencies for Ursa CLI](fleek-network-how-to-install-rust-and-the-dependencies-for-ursa-cli),  [Running a node in a Docker container](fleek-network-running-a-node-in-a-docker-container) or our [assisted installer](./how-to-install-a-node-easily-with-the-assisted-installer) for help.

We’ll clone the repository locally, build it and interact with the node through the binary or the HTTP JSON-RPC API with a client like cURL, but you can use a GUI (Postman, Insomnia, etc.) if your preference.

Start by cloning the repository located at [https://github.com/fleek-network/ursa](https://github.com/fleek-network/ursa "https://github.com/fleek-network/ursa")

<GitCloneOptions />

We try our best to document the project as we go, so it should be easy to follow. Of course, don’t shy away from contributing with any amends or your wording poetry!

Once the git clone completes, you’ll have the latest version at the time of cloning. You should use git to fetch or pull the latest versions consequently.

Execute the install command to build and install the Fleek Network CLI.

```sh
make install
```

The install command uses the Rust compiler to build; It might take a while depending on how speedy is your machine.

![](./assets/fleek-network-rust-compiler.png?202301101928)

⚠️ If you encounter errors in the install process, is very likely that you're missing dependencies, packages, and libraries for Rust to compile the Ursa CLI 😅. Save yourself time and energy, read the guide [How to install Rust and the dependencies for Ursa CLI](fleek-network-how-to-install-rust-and-the-dependencies-for-ursa-cli) or [Running a node in a Docker container](fleek-network-running-a-node-in-a-docker-container) for help!

Once the Rust compiler completes generating the binary, it’ll include it in the cargo’s bin directory. On macOS and Linux this is located at `$HOME/.cargo/bin` and on Windows `%USERPROFILE%\\.cargo\\bin`. These should be in your `$PATH` environment variable. If you have customized these, check the [installation guide](https://rust-lang.github.io/rustup/installation/index.html) for any questions.

Run the CLI with the flag `version` to confirm it's available.

```sh
ursa --version
```

The CLI has an optional “config.toml” for custom configuration settings. As it depends on the CLI version, you can find what’s available with the flag "help".

```sh
ursa --help
```

The CLI can be called without flags or options to start a new node with default settings.

```sh
ursa
```

Here’s the output of the listener's host and port numbers:

![](./assets/fleek-network-node-listeners.png?202301101928)

### Put Data Via the CLI

We can interact with the network via the CLI, the HTTP endpoint "/", or the JSON-RPC API endpoint "/rcp/v0". Both HTTP and JSON-RPC are listening on port "4069”.

For today’s example, we're going to “put” a [file](https://ipfs.io/ipfs/bafybeidqdywrzg7c3b4dmm332m4b7uiakgitplz2pep2zntederxpj3odi) and then after, retrieve it.

Make sure you've started the node, as described in the previous section!

At the current development stage, there’s only support for IPLD car file format (content addressable aRchive). If curious, learn more about “IPLD car” in the [official specs](https://ipld.io/specs/transport/car/).

As we’re keeping things simple, we’ll download an existing “car” demo file to our local machine to use later for our example.

```sh
curl https://ipfs.io/ipfs/bafybeidqdywrzg7c3b4dmm332m4b7uiakgitplz2pep2zntederxpj3odi -o basic.car
```

If successful, we should have a `basic.car`!

We can check the available CLI commands to determine how to perform our desired goal and put the [car file](https://ipfs.io/ipfs/bafybeidqdywrzg7c3b4dmm332m4b7uiakgitplz2pep2zntederxpj3odi) into our network.

After we checked our base `help`, we'll find that RPC is available as a subcommand.

```sh
ursa rpc --help

run rpc commands from cli

USAGE:
ursa rpc <SUBCOMMAND>

FLAGS:
-h, --help       Prints help information
-V, --version    Prints version information

SUBCOMMANDS:
help    Prints this message or the help of the given subcommand(s)
put     put the file on the node
```

Very simple to find help by simply passing the help just after the desired subcommand.

```sh
ursa rpc put --help

put the file on the node

USAGE:
    ursa rpc put <path>

FLAGS:
    -h, --help       Prints help information
    -V, --version    Prints version information

ARGS:
    <path>
```

Finally, we can put our `basic.car` file into our node!

```sh
ursa rpc put basic.car
```

On success, you’ll get a hash representing the data of its content; it uses a format called CID (**C**ontent **ID**entifier).

```sh
2022-11-23T20:23:09.440690Z  INFO ursa_rpc_client: Using JSON-RPC v2 HTTP URL: <http://0.0.0.0:4069/rpc/v0>
2022-11-23T20:23:09.441011Z  INFO surf::middleware::logger::native: sending request
2022-11-23T20:23:09.451132Z  INFO surf::middleware::logger::native: request completed
2022-11-23T20:23:09.451216Z  INFO ursa::ursa::rpc_commands: Put car file done: "bafybeifyjj2bjhtxmp235vlfeeiy7sz6rzyx3lervfk3ap2nyn4rggqgei"
```

### Retrieve Data Via the CLI

We can get a file as quickly as we put the file in the network.

The subcommand is `get` followed by a valid `CID` and the output `pathname` where the file will be saved.

Here’s the syntax:

```sh
ursa rpc get <CID> <PATHNAME>
```

As previously explained, we can always use the flag `help` to find out more about any available subcommands.

Following up on the “put” example, we have a valid CID that was returned in response to our request in our network.

```sh
ursa rpc \
    get bafybeifyjj2bjhtxmp235vlfeeiy7sz6rzyx3lervfk3ap2nyn4rggqgei \
    ./output
```

> 💡 Note that we have used a backslash `\` in our command example to break into several lines merely - you can ignore and write all in a single line!

If successful, the output will be similar to the following:

![](./assets/fleek-network-ursa-rpc-get.png?202301101929)

At this point, we are interested in the file in the “output” directory. The file is named after the CID (Content identifier) plus the file extension car (the CAR file type).

```sh
bafybeifyjj2bjhtxmp235vlfeeiy7sz6rzyx3lervfk3ap2nyn4rggqgei.car
```

The content is a string binary that only an interpreter can understand. Still, you can assert the file size by executing a simple list command to check the files in the `output` directory, as follows:

```sh
ls -hl ./output
```

The output in our machines shows the following:

```sh
-rw-r--r-- 1 fleek staff 26K 29 Nov 17:23 
bafybeifyjj2bjhtxmp235vlfeeiy7sz6rzyx3lervfk3ap2nyn4rggqgei.car
```

Notice that it's the same file size, as the original [basic.car](https://ipfs.io/ipfs/bafybeidqdywrzg7c3b4dmm332m4b7uiakgitplz2pep2zntederxpj3odi) we’ve put into the network. You can verify by using the `cmp` command, you'll get no output because there's no difference:

```sh
cmp basic.car ./output/bafybeifyjj2bjhtxmp235vlfeeiy7sz6rzyx3lervfk3ap2nyn4rggqgei.car
```

**We’ve now been successful in retrieving the original car file content we “put” into the network earlier!**

## Next steps 🫡

While you can run the Network Node as described here, it's required to set up the Network Node correctly and securely! It requires some degree of patience, knowledge and time to go through our guides but we provide a recommendation to have it ready quickly!

Our recommendation is to use our Docker compose stack, installed with the [assisted installer](../Network%20nodes/how-to-install-a-node-easily-with-the-assisted-installer). The Docker compose stack provides additional services for monitoring, analytics, and a reverse proxy to allow you to decorate teh service with a nice custom domain name and [SSL/TLS security](../Network%20nodes/fleek-network-securing-a-node-with-ssl-tls.md), etc.

Find our guide [assisted installer](./how-to-install-a-node-easily-with-the-assisted-installer) for quick onboarding, and the running a node in a Docker container [here](../Network%20nodes/fleek-network-running-a-node-in-a-docker-container.md) to learn more about the Docker stack.

## Final Thoughts

Content delivery services have a significant position in our web experience on access to information; If not considered, it might limit access to or manipulate the information we consume.

We have learned a bit about the importance of decentralized content delivery networks to mitigate the conflicting interest we otherwise face when trusting traditional content delivery providers for a complete web 3 experience: the reasoning and fundamentals.

Finally, we introduced an open-source solution called Fleek Network, appealed for collaboration, and gave a brief example of how simple it is to run a node on anyone’s computer; And of course, a call to step up your game and run our recommended stack by reading our [Running a node in a docker container](../Network%20nodes/fleek-network-running-a-node-in-a-docker-container), which can be easily installed with our [assisted installer](../Network%20nodes/how-to-install-a-node-easily-with-the-assisted-installer).

Discover more about the project by [watching/contributing on Github](https://github.com/fleek-network/ursa), following us on [Twitter](https://twitter.com/fleek_net), and joining [our community Discord](https://discord.gg/fleekxyz) for all the best updates!

<Author
    name="Helder Oliveira"
    image="https://github.com/heldrida.png"
    title="Software Developer + DX"
    url="https://github.com/heldrida"
/>
