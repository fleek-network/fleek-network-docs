---
template: post
draft: false
hide_title: false
title: Update nightly stack images
slug: update-nightly-stack-images
date: 2023-02-09T31:00:00Z
canonical: ''
description: Update Nightly stack images
category: Reference
tags:
- Reference
- docker-compose
- Fleek Network
- update
- nightly
- stack
---

This is only useful if you are using `nightly`. You can see the latest builds [here](https://github.com/fleek-network/ursa/pkgs/container/ursa).

💡 This is because you either have the `nightly` image declared in the `docker-compose.yml` file for the `ursa` service (quick process), or the local `Dockerfile`, which requires to have it built (longer process). By default, located in `$HOME/fleek-network/ursa/docker/full-node/docker-compose.yml`

Change directory to ursa, e.g., by default is `$HOME/fleek-network/ursa` (you may have opted for a different location, if that's the case check your notes).

💡 You can ommit the `-f <path-to-config-file>` by changing the directory to where the `docker-compose.yml` file is e.g., `$HOME/fleek-network/ursa/docker/full-node`

Stop the Stack

```sh
docker-compose -f ./docker/full-node/docker-compose.yml stop
```

Remove stopped containers

```sh
docker-compose -f ./docker/full-node/docker-compose.yml rm
```

Pull the latest images e.g., Ursa's nightly

```sh
docker-compose -f ./docker/full-node/docker-compose.yml pull
```

Start the Stack

```sh
docker-compose -f ./docker/full-node/docker-compose.yml up
```

Most users find that is enough to do (you have to restart the service)

```sh
docker-compose -f ./docker/full-node/docker-compose.yml pull
```

```sh
docker-compose -f ./docker/full-node/docker-compose.yml up
```