---
template: post
draft: false
hide_title: true
title: How to install a node easily with the assisted installer
slug: how-to-install-a-node-easily-with-the-assisted-installer
image: ./assets/how-to-install-a-node-easily-with-the-assisted-installer.png?202302101751
date: 2022-11-30T23:00:00.000+00:00
canonical: ''
description: Get Fleek Network, is an attempt to make our software more accessible. By providing scripts to automate the installation process of our software, we believe that it can help improve the onboarding experience of our users.
category: Tutorial
tags:
- CDN
- Guide
- Getting Started
- Fleek Network
---

import Author from '@site/src/components/Author';
import GitCloneOptions from '../partials/_git-clone-options.mdx';
import YoutubePlayer from '@site/src/components/YoutubePlayer';

![Fleek Network: Getting started guide](./assets/how-to-install-a-node-easily-with-the-assisted-installer.png?202302101751)

## Introduction

"Get Fleek Network" is an attempt to make our software more accessible. By providing scripts to automate the installation process of our software, we believe that it can help improve the onboarding experience of our users.

## Pre-requisites

To follow the guide, you will need the following:

- Familiarity with the command-line interface
- cURL installed
- A supported Linux Server Operating system
  - Ubuntu (22.04 LTS), or earlier
  - Debian (version 11), or earlier
  - ArchLinux, which has rolling updates.
- Domain name and permissions to update the DNS Record settings

### 🤖 Requirements

- Bash >= 4.2

## Quick Video

A walkthrough video is provided as a quick reference for the users, we try to keep it simple and would suggest the text guide version to get more detailed information. 

The video content is stored in our Fleek Network [playlist](https://www.youtube.com/watch?v=uAFIDu3UBvw&list=PL3v9ZaTBrN9GEQ2NmS5xc6YH0E2df5VTn) on the Fleek XYZ [Youtube channel](https://www.youtube.com/@fleekxyz).

<YoutubePlayer
  title="How to Install a Node Easily with the Assisted Installer"
  videoId="AnhXbS9GSDw"
/>

## TL;DR

Open your terminal, connect to your Linux server and run the following command:

```sh
curl https://get.fleek.network | bash
```

Follow the steps and have your complete ready quickly! For example, during the process, you are required to provide a domain name that should respond with the server where you want the node installed, as the assisted installer will try to secure it.

***

## What is the assisted installer?

The assisted installer is a shell script written in Bash shell scripting language (a language used to interface with the system), that goes through the installation process instructed in our guide [Running a node in a docker container](./fleek-network-running-a-node-in-a-docker-container).
Operating systems are highly customizable and some users might much prefer to set up the Network Node required applications and dependencies themselves. Some of these users have a lot of system-level knowledge, which not all other users have. By putting down the steps programmatically, or in a sequence of commands, we help reduce the frustration that some users might feel otherwise when following guides or long descriptive processes.

The assisted installer is one of the many options we provide to onboard users of any shape, geographical location, and technical knowledge into the Fleek Network, an open network made for everybody.

## How does it Work?

A user has to copy or type the command provided in the guide or our website and paste it to a terminal connected to the machine or server where the Network Node will be installed and run.

Once the user executes the command, a process is initiated that attempts to provide the user with enough information about what's going on, or what can optionally happen, e.g., [Git - a distributed version control system](https://git-scm.com/) is a required application, if not found, the user will be informed and a request to install it will be presented as a user shell prompt. The users will be able to accept or deny the request, and the installer will only execute accordingly. Most requirements are dependencies, such as libraries or packages that your system must have for our software to run. Apart from the [Ursa CLI](https://github.com/fleek-network/ursa) we're developing, the dependencies are provided by third parties which you as a user might be interested in checking up on.

After the installations, there'll be a request to provide a valid custom domain name of the user control, to decorate the server's public [IP](https://en.wikipedia.org/wiki/IP_address) address, where an attempt to [secure it](./fleek-network-securing-a-node-with-ssl-tls) with SSL/TLS Certificates will be handled by leveraging the [Let's Encrypt](https://letsencrypt.org/) API for the matter.

Once the SSL/TLS certification is provided, the Stack provided by [Docker](https://www.docker.com/) (a program that helps accelerate and simplify the distribution of applications via containers) is restarted. The services in the Stack, as described in our [guide](./fleek-network-node-health-check-guide#healthchecks#processes) will then start with the final changes made during the certification process (mainly the reverse proxy, that's responsible to map the public port 80 to the internal 4069).

If all goes successfully, the user will have a running node that is secured with SSL/TSL and the operations monitored by our suggested apps Prometheus and Grafana available to you easily in our opinionated Docker Stack.

## Which operating systems are supported?

At present, the assisted installer is supporting the latest:

- Ubuntu (22.04 LTS), or earlier
- Debian (version 11), or earlier
- ArchLinux, which has rolling updates.

⚠️ Unfortunately, Desktop operating systems are not supported by the installer (e.g. Docker runs in a Linux virtual machine when running on a Desktop). If you're curious and would like to test, you might want to do it on your own by following our [guide](./fleek-network-running-a-node-in-a-docker-container).

If you are serious about running a Node, consider running a Ubuntu, Debian or ArchLinux server. We'll provide support for more Linux operating systems shortly.

## What are the server requirements?

It's recommended to have enough disk space and memory to run the Stack containers, which is about 8 GB of memory and a reasonable amount of space for the installation and running processes. At the time being, during the initial test phase, this should be above what's required by Docker images, containers, volumes, etc.

You can find more details about it [here](fleek-network-running-a-node-in-a-docker-container#recommended-settings)

## Is running the assisted installer secure?

While `Piped Installers` are widely used on the web, e.g., as you can find for [Docker](https://get.docker.com/), [Rust](https://sh.rustup.rs) the user should be aware that this is run at his own risk.

You are advised to read the source code of the script before accepting to use it. Also, instead of [piping](https://en.wikipedia.org/wiki/Pipeline_(Unix)) the script to your bash shell program, you could instead copy the file locally after verifying it.

```sh
curl https://example.com > install
```

Instead of piping the script immediately to your bash shell

```sh
curl https://example.com | bash
```

Also, if you have a custom environment, then is best to follow the instructions provided in our guide, as otherwise the script risk changing or overriding your custom setup, especially if you are not aware of, or have no interest in going through the source-code logic of what the commands are executed.

We'll provide guides on how to help improve the security of the Network Node server, but be aware that dodgy scripts might take control of the server, which may be locating your private keys, copying them, compromising them, etc.

Without hesitation, you should understand clearly that running a `curl | bash` script from the internet comes with a lot of risks and the responsibility is on your side as a user!

🫡 We'll provide a guide on this subject soon, where we'll expose the issues this may lead to when running random programs or scripts in the server where the Network Node is installed or running, and also some solutions or options to improve security.

## How to use the assisted installer?

Get a custom domain name from one domain name registrar of your liking, or create a subdomain in an existing domain you may have registered and update the DNS Record settings to answer to the server where the Ursa Network Node is going to be installed and run. For example, `my-domain.com` or `some-subdomain.my-domain.com`

💡 The process is illustrated in our guide [Securing a node with SSL/TLS](./fleek-network-securing-a-node-with-ssl-tls#how-to-set-up-the-dns-settings-for-a-node-server) and provides a bit more information about why this is required. If you have questions, start by using the guide to get answers.

### Connect to the server

Once you have the domain prepared, launch a terminal window on your computer and connect to your server.

We generally authenticate with SSH, which is our recommendation, but some users like to authenticate with passwords. This should be familiar to SSH users:

```sh
ssh -i ~/.ssh/id_personal.pub user@ip-address
```

Other's

```sh
ssh user@ip-address
```

💡 Some users have access to their server's terminal through a dashboard from their cloud providers, and others have physical access to the server box. Feel free to use, whichever method suits you best!

### Running the assisted installer

Our [Piped installer](#piped-installer) also known as `curl | bash` installer is available at the following address [https://get.fleek.network](https://get.fleek.network). You are advised to open it on your browser or access it via the repository [here](https://github.com/fleek-network/get.fleek.network/blob/main/install) to read the entire it of it to understand what it does or can do!

⚠️ Notice that you should use `https://` and not `http://` to access the script in the `get.fleek.network` to establish a secure connection.

The command to run it is the following:

```sh
curl https://get.fleek.network | bash
```

```sh
# Alternatively, you can test our multiple language support
# and provide us feedback
curl https://raw.githubusercontent.com/fleek-network/get.fleek.network/feat/localization/install | bash
```

> Currently, we support 🇪🇸 SPA, 🇵🇹 POR, 🇷🇺 RUS, 🇻🇳 VIE, 🇨🇳 CHI, and more! If you're a native speaker of any of the supported languages, give the assisted installer a try by executing the alternative command and help us improve by opening an issue in the Github Repo if you encounter any typos or issues [here](https://github.com/fleek-network/get.fleek.network/issues)

🫡 After copying the command to your terminal, you'd then press ENTER key to start. Once the assisted installer is launched you are guided through the installation process.

Alternatively, which is a safer bet and as suggested in the [Is running the assisted installer secure](#is-running-the-assisted-installer-secure), we have:

```sh
curl https://get.fleek.network > install-node-network.sh
```

🙏 You can then read the content of the file in a text editor of your liking to understand the process or processes declared in the file, which will run in the user operating system, at the user's consent. Alternatively, open the address in the browser https://get.fleek.network to read the source code.

Which would require you to provide execution permissions to the file, only if agreed as a user decision:

```sh
chmod +x install-node-network.sh
```

The difference between the `curl | bash` and this version is that the alternative copies the file locally first and can only be run if you provide the correct permissions (+x, execution) and type the command. Which to run you'd do:

```sh
./install-node-network.sh
```

🚀 Once the assisted installer is launched you are presented with enough information to help you complete the installation process.

### Health check

We provide a [Node health check guide](./fleek-network-node-health-check-guide) where you can find a more in-depth approach and detailed information about how the process work (log messages, hostnames, ports, etc).

As a quick take on this during this read, you can do a quick health check to verify that the domain is indeed running and set up correctly.

From outside the server network where the Network Node is running or installed, do a curl request to the `/ping` path, where you should get back a response `pong`, as follows:

```sh
curl https://<YOUR-NETWORK-NODE-DOMAIN-NAME>/ping
```

💡 The `<YOUR-NETWORK-NODE-DOMAIN-NAME>` is the domain name you have provided or set during the assisted installer process.

If successful, you'll get a response back:

```sh
pong
```

🥳 If you made it this far, congratulations and thank you for the support!

## Firewall tampering

Docker tampers with the firewall rules to some extent and that may cause some headaches if you are not aware of this.

By default, Docker will manipulate the `iptables`, so if you are using `ufw`, you might find that docker overrules it, that is Docker overrides UFW rules.

The `ufw` cli will fail to represent the actual state of `iptables`.

Check our [reference](../../reference/Docker/disable-docker-iptables-tampering) or find more about this subject in the official [Docker iptables](https://docs.docker.com/network/iptables/).

## Update Nightly

The assisted installer can modify the default `docker-compose.yml`, to have the Ursa Stack service use the [nightly image build](https://github.com/fleek-network/ursa/pkgs/container/ursa) from our repository. This is optional, but users have to be aware that to update `nightly`, the latest image has to be docker pulled.

When a user accepts to use `Nightly` the first perceived runtime is faster, in comparison to having to build the Ursa Docker image from the source. Where for building, Docker-compose does it automatically when changes occur, `nightly` users have to pull the latest.

You can see the status of the config file in `$HOME/fleek-network/ursa/docker/full-node/docker-compose.yml` (this is the default location, you may have changed it).

Learn how to pull by checking our reference [here](../../reference/Docker/update-nightly-stack-images).

## How to help improve the onboarding experience?

We try our best to provide the best onboarding experience, but custom scripts to fit a whole range of computers or servers is a big chore and we expect some issues on the journey to make it better. Your feedback is of extreme importance to illustrate our end goal!

For this reason, we are open for contributions, either by reporting issues, sending amends, feedback, etc in our Github repository available [here](https://github.com/fleek-network/get.fleek.network). Alternatively, you can join our [Discord](https://discord.gg/fleekxyz) or follow us on [Twitter](https://twitter.com/fleek_net).

## Final Thoughts

Getting started requires some technical knowledge, that some users might not afford at the time, and have the means or the energy to complete and succeed. Others simply want to have something a bit quicker to test or have a look at. It shouldn't take a university course, or the IQ of [Katherine Johson](https://en.wikipedia.org/wiki/Katherine_Johnson) to run and operate a Node!

For this reason and more inclusivity, we started writing the assisted installer. At its very best it'll help ease the experience, but we are aware that it requires a lot of craft work to get this right for the majority of users and systems.

Our guide breaks all of this down by starting to introduce the assisted installer conceptually, what it does and how, but also questioning it by sharing some [concerns](#is-running-the-assisted-installer-secure) about this piped installer concept.

Finally, we explain what you're required to do to start using it, in a quick and also safer way.

Discover more about the project by [watching/contributing on Github](https://github.com/fleek-network/ursa), following us on [Twitter](https://twitter.com/fleek_net), and joining [our community Discord](https://discord.gg/fleekxyz) for all the best updates!

<Author
    name="Helder Oliveira"
    image="https://github.com/heldrida.png"
    title="Software Developer + DX"
    url="https://github.com/heldrida"
/>
