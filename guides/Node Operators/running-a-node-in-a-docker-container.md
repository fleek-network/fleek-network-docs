---
title: Running a node in a Docker container
hide_title: true
slug: fleek-network-running-a-node-in-a-docker-container
date: 2022-12-05T23:00:00Z
description: A guide on how to run Fleek Network's node in a Docker container
category: Tutorial
tags:
- guide
- docker
- container
---

<!--
  The following import is intentional (see partial <CheckoutCommitWarning />)
-->
import Author from '@site/src/components/Author';
import GitCloneOptions from '../partials/_git-clone-options.mdx';
import CreateAUser from '../../guides/partials/_create-a-user.mdx';

## Introduction

Our [Docker](https://www.docker.com/) [image](https://docs.docker.com/engine/reference/commandline/images/) provides all the requirements to have Fleek Network running quickly and the following guide will provide you a quick reference to get you started with Docker. 

**TL;DR** If you have Docker experience then you'll find ours [for the impatient](#for-the-impatient) more satisfying!

Alternatively, if you need a deep dive into Docker, check the official getting started [here](https://docs.docker.com/get-started/).

## Pre-requisites

To follow the guide, you will need the following:

- Familiarity with the command-line interface
- Git

## Setup

### Requirements

To follow the guide successfully, a good amount of memory and disk space is necessary to run Docker. The main reason for our use-case is that your host machine requires a generous amount of memory and disk space, for the containers.

For this guide, we had 4vCPU, 32GB ram memory and 20 GB disk space. Find the latest requirements [here](/docs/node/requirements).

### Create a user

<CreateAUser />

### Lightning CLI source code

Start by cloning the repository located at [https://github.com/fleek-network/lightning](https://github.com/fleek-network/lightning).

<GitCloneOptions />

### Change directory to Lightning source code

If you have cloned the project correctly, you should `change directory` to the project source code directory which by default is `~/fleek-network/lightning`.

```sh
cd ~/fleek-network/lightning
```

At time of writing, this is how the project root looks like (e.g. use the [ls](https://en.wikipedia.org/wiki/Ls) to see the list):

```sh
.
├── CODE_OF_CONDUCT.md
├── CONTRIBUTING.md
├── Cargo.lock
├── Cargo.toml
├── Dockerfile
├── LICENSE
├── README.md
├── codecov.yml
├── core
├── docs
├── etc
├── lib
├── rust-toolchain
├── rustfmt.toml
├── services
└── target
```

### Install Docker on Ubuntu

First, update the existing list of packages:

```sh
sudo apt update
```

Next, install the required packages to let apt use packages over HTTPS:

```sh
sudo apt install apt-transport-https ca-certificates software-properties-common
```

Add the GPG key for the official Docker repository to your system:

```sh
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
```

Add the Docker repository to apt sources and update the package database with the Docker packages from the new added repository:

```sh
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu jammy stable"
```

Set to install from the Docker repo instead of the default Ubuntu repo:

```sh
apt-cache policy docker-ce
```

```sh
docker-ce:
  Installed: (none)
  Candidate: 5:24.0.6-1~ubuntu.22.04~jammy
  Version table:
     5:24.0.6-1~ubuntu.22.04~jammy 500
        500 https://download.docker.com/linux/ubuntu jammy/stable amd64 Packages
     5:24.0.6-1~ubuntu.22.04~jammy 500
```

Finally, install Docker:

```sh
sudo apt install docker-ce
```

Once complete you should be able to run it via the CLI, as such:

```sh
docker -v
```

Here's the output (versions might differ a bit from the time of writing):

```sh
Docker version 24.0.6, build ed223bc
```

The following command's output will indicate if Docker's working correctly:

```sh
sudo docker run hello-world
```

Here's an example of the output you'll find us "Hello from Docker!":

```sh
Hello from Docker!
This message shows that your installation appears to be working correctly.

To generate this message, Docker took the following steps:
 1. The Docker client contacted the Docker daemon.
 2. The Docker daemon pulled the "hello-world" image from the Docker Hub.
    (amd64)
 3. The Docker daemon created a new container from that image which runs the
    executable that produces the output you are currently reading.
 4. The Docker daemon streamed that output to the Docker client, which sent it
    to your terminal.

To try something more ambitious, you can run an Ubuntu container with:
 $ docker run -it ubuntu bash

Share images, automate workflows, and more with a free Docker ID:
 https://hub.docker.com/

For more examples and ideas, visit:
 https://docs.docker.com/get-started/
```

Run all the commands above in your terminal, to confirm everything's working before proceeding to the next steps.

### Create the Docker image

A Docker image is a read-only template with instructions for creating a Docker container, like a template. Docker images also act as a the starting point when using Docker. 

The starting point for our use-case is a Dockerfile, where all those "template instructions" are declared.

Create a new file `Dockerfile` in the [source code directory](#change-directory-to-lightning-source-code):

```sh
touch Dockerfile
```

Copy and paste to the Dockerfile the following content:

```sh
FROM rust:1.72.0-slim-bookworm as builder
RUN apt-get update && \
  apt-get upgrade && \
  apt-get -y install \
    build-essential \
    cmake \
    clang \
    pkg-config \
    libssl-dev \
    gcc \
    protobuf-compiler
WORKDIR /usr/lightning
COPY . .
RUN cargo +stable build --release

FROM debian:bookworm-slim AS runtime
RUN apt-get update && \
  apt-get install -y \
    libssl-dev \
    ca-certificates
WORKDIR /usr/lightning
COPY --from=builder /usr/lightning/target/release/lightning-node lgtn
CMD ["/usr/lightning/lgtn", "run"]
```

### Build the Docker image

Build the image from a Dockerfile:

```sh
docker build -t ursa -f ./Dockerfile .
```

<!-- 
TODO: Create the Docker buildkit reference

:::note
BuildKit is required by Docker Build if you are running the docker daemon (desktop users have it enabled by default), read our reference [BuildKit required by Docker build](../../reference/Docker/buildkit-required-by-docker-build) to learn more about how to enable it.
:::
-->

The build process takes awhile and you have to wait for completion. 

The output should be similar to:

```
[+] Building 11.1s (7/14)                                                                                                              docker:default
 => [internal] load .dockerignore                                                                                                                0.0s
 => => transferring context: 2B                                                                                                                  0.0s
 => [internal] load build definition from Dockerfile                                                                                             0.0s
 => => transferring dockerfile: 579B                                                                                                             0.0s
 => [internal] load metadata for docker.io/library/debian:bookworm-slim                                                                          1.2s
 => [internal] load metadata for docker.io/library/rust:1.72.0-slim-bookworm                                                                     1.2s
 => [builder 1/5] FROM docker.io/library/rust:1.72.0-slim-bookworm@sha256:583f7f3a34bf302d29e70e8ab9a2aab0f73338b54fde1e2f9f3c6ebc1b40e1db       9.9s
 => => resolve docker.io/library/rust:1.72.0-slim-bookworm@sha256:583f7f3a34bf302d29e70e8ab9a2aab0f73338b54fde1e2f9f3c6ebc1b40e1db               0.0s
 => => sha256:583f7f3a34bf302d29e70e8ab9a2aab0f73338b54fde1e2f9f3c6ebc1b40e1db 984B / 984B                                                       0.0s
 => => sha256:42926a35070e536daa04a51601cb1dc6aa7bbea2c841b3b14a70e90fa0e01beb 742B / 742B                                                       0.0s
 => => sha256:3d6a2e2da42cd1d1f4a7b74b2429c75773b665b9912503ccbcd6c65fc7e703dc 4.85kB / 4.85kB                                                   0.0s                                       0.0s
 ```

:::tip
The Docker image is only required to be built once and/or, when changes are pulled from the remote repository, or specific versions you might be interested in. Otherwise, you're not required to build it everytime to run the node. If you'd like to learn how to update the Lightning CLI, find our references [here](/references/Lightning%20CLI/update-cli-from-source-code).
:::

:::caution
If you don't update your source code and binary build often, you won't have the latest changes, which should happen frequently to take advandate of all the ongoing development. This is quite important to understand, as it causes confusion to some users. The Lightning application at time of writing does not update automatically.
:::


## Conclusion

Containers are a way to have a self-contained environment that includes all necessary dependencies, libraries, software, etc, required to run an application 🍰.

Fleek Network's Lightning is developed with [Rust](https://www.rust-lang.org/), a general-purpose programming language, that requires several dependencies and libraries to compile the project. Some of these libraries are not installed by default and require some troubleshooting for the end user. [Docker](https://www.docker.com/) provides us with containers, self-containing all the required libraries for the purpose of running Lightning, our application.

We guided you through the initial installation steps, and how to build a [Docker](https://www.docker.com/) image, which then's used to Docker run a container. Plus, provided lower-level commands, to help you understand other present or advanced use-cases, and also at higher level, offerring simple utility methods.

While we do our best to provide the clearest instructions, there's always space for improvement, therefore feel free to make any contributions by messaging us on our [Discord](https://discord.gg/fleekxyz) or by opening a [PR](https://github.com/fleek-network) in any of our repositories 🙏.

Discover more about the project by [watching/contributing on Github](https://github.com/fleek-network/ursa), following us on [Twitter](https://twitter.com/fleek_net), and joining [our community Discord](https://discord.gg/fleekxyz) for all the best updates!

<Author
    name="Helder Oliveira"
    image="https://github.com/heldrida.png"
    title="Software Developer + DX"
    url="https://github.com/heldrida"
/>