---
template: post
draft: false
hide_title: false
title: Uninstalling
slug: uninstalling
date: 2023-02-09T31:00:00Z
canonical: ''
description: Uninstalling
category: Reference
tags:
- Reference
- docker
- Fleek Network
- uninstall
- remove
- assisted-installer
---

⚠️ Bear in mind that the applications mentioned might be in use by other applications, or were already installed before Ursa assisted the installer process or other methods. Uninstall at your responsibility!

Find how to remove Docker images [here](https://docs.docker.com/engine/reference/commandline/rm/) and [here](https://docs.docker.com/engine/reference/commandline/image_rm/)

List container ids

```sh
docker ps
```

Remove a container id

```sh
docker rm <container id>
```

Delete all existing containers

```sh
docker rm $(docker ps -q -f status=exited)
```

Delete all stopped containers

```sh
docker rm $(docker ps -a -q)
```

Delete All Running and Stopped Containers

```sh
docker stop $(docker ps -a -q)
docker rm $(docker ps -a -q)
```

Remove all containers

```sh
docker container rm $(docker container ps -aq)
```

Complete system cleanup

```sh
docker system prune
```

Docker list images

```sh
docker images -a
```

Remove image

```sh
docker rmi <image-id>
```

Remove all images

```sh
docker rmi $(docker images -q)
```

Uninstall docker, e.g., Ubuntu

```sh
apt-get purge docker-engine docker docker.io docker-ce docker-ce-cli docker-compose-plugin
```

```sh
apt-get autoremove --purge docker-engine docker docker.io docker-ce docker-compose-plugin
```

Force delete docker images, containers, volumes, etc

```sh
rm -rf /var/lib/docker /etc/docker
rm /etc/apparmor.d/docker
groupdel docker
rm -rf /var/run/docker.sock
```

Alternatively, for `snap` package manager

```sh
snap remove docker
```

Delete or remove the Ursa repository stored locally, which by default is installed at `$HOME/fleek-network/ursa`

```sh
rm -rf $HOME/fleek-network/ursa
```

Uninstall `jq`

```sh
apt-get remove jq
```

```sh
apt-get purge --auto-remove jq 
```

Uninstall `yq`

```sh
apt-get remove yq
```

```sh
apt-get purge --auto-remove yq 
```

Uninstall `whois`

```sh
apt-get remove whois
```

```sh
apt-get purge --auto-remove whois
```

Uninstall `tldextract`

```sh
apt-get remove tldextract
```

```sh
apt-get purge --auto-remove tldextract
```

Uninstall `dnsutils`

```sh
apt-get remove dnsutils
```

Uninstall `git`

```sh
apt-get remove git
```