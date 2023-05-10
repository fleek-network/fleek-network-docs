---
template: post
draft: false
hide_title: false
title: "Error trying to connect: dns error: failed to lookup address information: Temporary failure in name resolution"
slug: failed-to-lookup-address-information-temporary-failure-in-name-resolution
date: 2023-03-21T23:00:00Z
canonical: ''
description: Troubleshooting dns error failed to lookup address information
category: Reference
tags:
- Reference
- Fleek Network
- DNS
- Dynamic name system
- nameserver
---

Docker users that get the "Failed to lookup address information", should update Docker to >= 23.

```sh
error trying to connect: dns error: failed to lookup address information: Temporary failure in name resolution
```

This problem is due to changes in Docker naming services, as the hostname we use on the latest version of our Lets Encrypt script names the Docker Stack services under the latest versions.

💡 If you don't want to upgrade Docker, then you have to modify the `~/.ursa/proxy/config.toml`, find and replace the service name from `full-node-ursa-1` to `full-node_ursa_1`. Followed by restarting the Docker stack. In the future, if you upgrade Docker, you'll have to revert it! For this reason, you are advised to upgrade Docker to avoid confusion.

We're going to use Ubuntu as an example of what is required to do. Change to the required command suitable to your preferred package manager or setup to follow along. Alternatively, you might find it best to follow the official documentation [here](https://docs.docker.com/engine/install/ubuntu/).

Check the current version of Docker

```sh
docker --version
```

For example, let's say that you get version `20.x`

```sh
Docker version 20.x.x, build xxxx
```

Uninstall the Current Version.

Here's an example, but this will depend on how you have installed Docker, make the changes accordingly:

```sh
sudo apt remove docker-ce docker-ce-cli  containerd.io docker-compose-plugin docker-compose
```

Verify the Uninstallation 

```sh
docker --version
```

You should get a `Command docker not found` to confirm you have uninstalled Docker.

Update the `apt` package index

```sh
sudo apt-get update
```

Install dependencies

```sh
sudo apt-get install ca-certificates curl gnupg
```

Add Docker’s official GPG key

```sh
sudo install -m 0755 -d /etc/apt/keyrings
```

```sh
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
```

```sh
sudo chmod a+r /etc/apt/keyrings/docker.gpg
```

Set up the repository

```sh
echo "deb [arch="$(dpkg --print-architecture)" signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu "$(. /etc/os-release && echo "$VERSION_CODENAME")" stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
```

Update the `apt` package index

```sh
sudo apt-get update
```

Install the latest version

```sh
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

Verify the installation, where you should get a "Hello world" message back.

```sh
sudo docker run hello-world
```

To learn more about installing Docker, check the official guide [here](https://docs.docker.com/engine/install).