---
draft: false
title: Install a Network Node
slug: install-a-network-node
hide_title: true
sidebarCollapsible: false
sidebar_position: 2
date: 2023-01-10T09:00:00.000+00:00
category: Documentation
keywords: [install]
tags:
- Install a Network Node
- Fleek Network
---

import Author from '@site/src/components/Author';

![Fleek Network: Install a Network Node](./assets/fleek-network-install-a-network-node.png?202304211911)

## Prerequisites

- Familiarity with the CLI
- Basics of Linux
- Domain name ownership
- A server with a fixed IP address

### Supported operating systems

A Fleek Network node is supported by most Linux operating systems (server version).

For our installation, we'll run a script to set up a node as quickly and simply as possible. While the Fleek Network node can run in a wide range of operating systems, the installer provides support for:

- Linux server
  - Ubuntu >= 22.04
  - Debian >= 11

More Linux distros will be supported, but you might want to check our [guides](../guides/) for step-by-step instructions and adapt them to your operating system.

### Recommended specifications

- Memory >= 8GB
- CPU >= 4
- Disk space >= 20GB

The recommendation is likely to change as we progress with development. Some users have reported having run a Fleek Network node with 2 GB memory and 2 vCPU for prebuilt Docker image. Nevertheless, if you are building the Docker image, or compiling natively you'll need to have a generous amount of CPU, memory and disk space.

## Getting started

You're going to connect to your server, copy and paste the assisted install command, execute the command and follow the install wizard.

💡 During the install steps, you'll be required to provide a domain name that points to your server IP address. You can open your DNS settings, and edit or update to prepare this in advance.

### Set up the DNS settings

Visit your domain name provider user dashboard and locate the DNS name settings page, generally, this can be found on the domain names panel.

Create or update the `A record` to point to the server IP Address.

As an example, let's say that we have a domain `fleek.xyz`, where we set up a subdomain `fleek-network-node` and that our server IP Address (where the Fleek Network Node is running from) is the IP address `181.196.118.156`.

The custom domain address would be:

```sh
fleek-network-node.fleek.xyz
```

💡 Keep a note about the domain name as it'll be required for your reverse proxy configuration during the installation process.

Our server IP Address should be public, and accessible outside the private network:

```sh
181.196.118.156
```

Depending on the "domain name registry" dashboard, you'd have to update the `A Records`, here's an example of how that'd look like:

| Type        | Host                              | Answer            | TTL         |
| ----------- | --------------------------------- | ----------------- | ----------- |
| A           | fleek-network-node.fleek.xyz      |  181.196.118.156  | 300         |


Learn more about record types [here](https://en.wikipedia.org/wiki/List_of_DNS_record_types).

⚠️ DNS changes may take some time to propagate, if you find that you are stuck we have a few suggestions to help you, check our [DNS troubleshooting](../reference/DNS/domain-name-system-nameserver-troubleshooting) reference guide.

### Connect to the server

We'll assume that you have launched a Ubuntu >= 22.04 VPS with enough memory, vCPU and Disk-space. Some users were successful with VPS from [Digital Ocean](https://digitalocean.com/), [Linode](https://linode.com/), and many others of their liking.

Once the server has booted up and is ready, connect to it!

To accomplish this, you should launch your favorite terminal emulator e.g. [alacritty](https://alacritty.org/), [iTerm](https://iterm2.com/), [kitty](https://sw.kovidgoyal.net/kitty/) and connect to the server.


Here's an example, of how that'd look like:

```sh
Welcome to Ubuntu 22.10 (GNU/Linux 5.19.0-23-generic x86_64)

 * Documentation:  https://help.ubuntu.com
 * Management:     https://landscape.canonical.com
 * Support:        https://ubuntu.com/advantage

  System information as of Fri Apr 21 16:52:23 UTC 2023

  System load:  2.3203125          Users logged in:       0
  Usage of /:   4.6% of 310.09GB   IPv4 address for eth0: 143.110.168.114
  Memory usage: 19%                IPv4 address for eth0: 10.16.0.5
  Swap usage:   0%                 IPv4 address for eth1: 10.106.0.2
  Processes:    151

0 updates can be applied immediately.

*** System restart required ***
Last login: Thu Apr 20 10:57:14 2023 from 86.9.103.1
root@ubuntu-s-8vcpu-16gb-intel-lon1-01:~#
```

### Installation process

Our install script is available as a command that you can copy and paste to your command line and execute. The source code is open and can be verified if you are interested in understanding what it does, if interested find it in the repository [here](https://github.com/fleek-network/get.fleek.network).

Copy and paste to your terminal:

```sh
curl https://get.fleek.network | bash
```

Press enter to execute the command. You should be greeted by a prompt similar to:

```sh
  ⭐️ Ursa, a Decentralized Content Delivery Network (DCDN) ⭐️

       ,-.
      / \  `.   __..-,O
     :   \  --''_..-'.'
     |    . .-' `. '.
     :     .     .`.'
      \     `.  /  ..
       \      `.   ' .
        `,       `.   \
        ,|,`.        `-.\
       '.||  ``-...__..-`
        |  |
        |__|
        /||\
       //||\\
      // || \\
   __//__||__\\__
  '--------------' URSA


👽 Welcome ultra-terrestrial being 👽

We are ready to launch the communication channel with the Fleek Network 📡, but you need to make a choice!
There are two options, where option number 1 is to run a Network Node un a Docker Container, or option number 2, installed natively in your operating system.
Most Node Operators are using the Docker Stack (if you stick with the recommendations, this is the quickest way to setup 🚀), while other's have a preference for running Natively (might take longer to set up, as it requires building the Ursa CLI binary from the Rust 🦀 source-code).

Select how to run the Fleek Network:

1) 🔫 Docker Stack (recommended)
2) 👾 Natively

Type your selection number>
```

Follow the wizard by reading any of the instructions presented. For example, in the prompt above you'll have to select one of the options by typing the number, where the Docker Stack (our recommendation) is option number one!

Once complete, the output should be similar to the following:

```sh
★★★★★★★★★

🥳 Great! We have completed the installation!

The Stack should be running now, and you can show or hide the log output anytime.

Our Stack logs can be quite verbose, as it shows WARNINGS, INFO, ERRORS, etc.
It's essential to understand what they mean by simply reading our Node Health-check guide
https://docs.fleek.network/guides/Network%20nodes/fleek-network-node-health-check-guide

Here are some handy commands to show or hide the logs

  - If you have the Stack running and want to show the logs:

    docker compose -f ./docker/full-node/docker-compose.yml logs -f

  - Terminate by sending the interrupt signal (SIGNIT) to Docker using the hotkey:

    Ctrl-c

You can Stop or Start the Docker Stack at anytime, for that change the directory to the location where the source code of Ursa is stored ("/root/fleek-network/ursa").For example, if you accepted the installation recommendation that is ~/fleek-network/ursa

Then after, run the following commands, to either Start (up) or Stop (down)

  - Start the Docker Stack

    docker compose -f ./docker/full-node/docker-compose.yml up

  - Stop the Docker Stack

    docker compose -f ./docker/full-node/docker-compose.yml down

🥹 Seems a lot? All the commands and much more are available in our documentation site!
🤓  Learn how to maintain your Node by visiting our documentation at "https://docs.fleek.network"🌈 Got feedback? Find our Discord at "https://discord.gg/fleekxyz" and Twitter at https://twitter.com/fleek_net
★★★★★★★★★


🙋‍♀️ Want to see the output for the Docker Stack? Bear in mind that the Network Node Docker Stack is currently running as a background process, displaying logs messages is optional!
Type "yes" or press ENTER to confirm. Otherwise, type skip!
>
```

## Post-installation

### Health check

We provide a [Node health check guide](../guides/Network%20nodes/fleek-network-node-health-check-guide) where you can find a more in-depth approach and detailed information about how the process work (log messages, hostnames, ports, etc).

As a quick take on this during this read, you can do a quick health check to verify that the domain is indeed running and set up correctly.

From outside the server network where the Network Node is running or installed, do a curl request to the `/ping` path, where you should get back a response `pong`, as follows:

```sh
curl -w "\n" https://<YOUR-NETWORK-NODE-DOMAIN-NAME>/ping
```

💡 The `<YOUR-NETWORK-NODE-DOMAIN-NAME>` is the domain name you have provided or set during the assisted installer process.

If successful, you'll get a response back:

```sh
pong
```

If you'd like to have a prettier response use:

```sh
curl -s https://<YOUR-DOMAIN>/ping | grep -q 'pong' && echo "✅ Health check is ok!"
```

You should get back the response:

```sh
✅ Health check is ok!
```

🥳 If you made it this far, congratulations and thank you for the support!

### Docker Stack

Change the directory to where Ursa is installed (e.g., by default is located at `$HOME/fleek-network/ursa`)

```sh
cd ~/fleek-network/ursa
```

⚠️ Warning: If you are running an old version of Docker compose, then switch the command for `docker-compose`, instead of `docker compose` as a subcommand.

#### Start

```sh
docker compose -f docker/full-node/docker-compose.yml up
```

If you don't want to show the service logs or output when executing the commands, you can run in detached mode. You can then show/hide the logs optionally.

```sh
docker compose -f docker/full-node/docker-compose.yml up -d
```

#### Stop

```sh
docker compose -f docker/full-node/docker-compose.yml down
```

#### Logs

```sh
docker compose -f docker/full-node/docker-compose.yml logs -f
```

### Native

Change the directory to where Ursa is installed (e.g., by default is located at `$HOME/fleek-network/ursa`)

```sh
cd ~/fleek-network/ursa
```

#### Start

```sh
sudo systemctl start ursa
```

```sh
sudo systemctl start ursa-proxy
```

#### Stop

```sh
sudo systemctl stop ursa
```

```sh
sudo systemctl stop ursa-proxy
```

#### Restart

```sh
sudo systemctl restart ursa
```

```sh
sudo systemctl restart ursa-proxy
```

#### Status

```sh
sudo systemctl status ursa
```

#### Logs

```sh
tail -f /var/log/ursa/output.log
```

```sh
tail -f /var/log/ursa/diagnostic.log
```

## Feedback

We are open to feedback, either by reporting issues, sending amends, or contributing to our GitHub repositories available [here](https://github.com/fleek-network).

Join our community [Discord](https://discord.gg/fleekxyz) or follow us on [Twitter](https://twitter.com/fleek_net).

When reporting to us, you can run the following diagnostic command on the server, and copy and share the generated URL with our team! It provides us with details about your system helping us provide better support!

```sh
curl https://get.fleek.network/diagnostic | bash
```

✨ When ready you should see a generated URL similar to https://0x0.st/X1h6Z1PR.log

## Next steps

- Help contribute to a healthy network by monitoring the health of your setup! Learn how to check if your node is healthy by reading the [Node health-check guide](../guides/Network%20nodes/fleek-network-node-health-check-guide)

- Would you like to learn how to improve the security of your server file system? Check our guide [Securing the Ursa files](../guides/Network%20nodes/fleek-network-node-health-check-guide)

- Interested in running a fully working Node? Read our [guides](/guides) to learn more about the services powering the Fleek Network, and how to set up a node or customize it for your needs.

- Need a quick reference? Our [reference](/reference) section provides the reference materials for Fleek Network command-line interfaces (CLIs) and application programming interfaces (APIs) for managing the resources.

- Would like to find a bit more from our developers? The [engineering blog](/blog) offers a deeper look into how our engineering team works, research, and technology behind Fleek Network, etc.

Discover more about the project by [watching/contributing on Github](https://github.com/fleek-network/ursa), following us on [Twitter](https://twitter.com/fleek_net), and joining [our community Discord](https://discord.gg/fleekxyz) for all the best updates!

<Author
    name="Helder Oliveira"
    image="https://github.com/heldrida.png"
    title="Software Developer + DX"
    url="https://github.com/heldrida"
/>
