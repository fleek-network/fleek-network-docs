---
template: post
draft: false
hide_title: false
title: Update latest stack images
slug: update-latest-stack-images
date: 2023-02-09T31:00:00Z
canonical: ''
description: Update Nightly stack images
category: Reference
tags:
- Reference
- docker-compose
- Fleek Network
- update
- latest
- stack
---

This is only useful if you are using the `latest` (tagged) Docker image. You can see the latest builds [here](https://github.com/fleek-network/ursa/pkgs/container/ursa).

💡 This is because you either have the `latest` image declared in the `docker-compose.yml` file for the `ursa` service (quick process), or the local `Dockerfile`, which requires to have it built (longer process). By default, located in `$HOME/fleek-network/ursa/docker/full-node/docker-compose.yml`

For this to work, ensure that the `Docker-compose.yml` has the `latest` tag declared. Open the `docker-compose.yml` and make sure that the `Ursa` service has the following image with the correct tag, if not modify it (we are only revealing what matters, the remaining source text is omitted with three dots `...`, don't type it):

```sh
  ...

  ursa:
    image: ghcr.io/fleek-network/ursa:latest
    ...
```

For example, if you find:

```sh
  ursa:
    image: ghcr.io/fleek-network/ursa:nightly
```

Replace it with:

```sh
  ursa:
    image: ghcr.io/fleek-network/ursa:latest
```

Change directory to ursa, e.g., by default is `$HOME/fleek-network/ursa` (you may have opted for a different location if that's the case check your notes).

💡 You can ommit the `-f <path-to-config-file>` by changing the directory to where the `docker-compose.yml` file is e.g., `$HOME/fleek-network/ursa/docker/full-node`

Stop the Stack

```sh
docker compose -f ./docker/full-node/docker-compose.yml stop
```

Remove stopped containers

```sh
docker compose -f ./docker/full-node/docker-compose.yml rm
```

Pull the latest images e.g., Ursa's `latest`

```sh
docker compose -f ./docker/full-node/docker-compose.yml pull
```

Start the Stack

```sh
docker compose -f ./docker/full-node/docker-compose.yml up
```

Most users find that is enough to do (you have to restart the service)

```sh
docker compose -f ./docker/full-node/docker-compose.yml pull
```

```sh
docker compose -f ./docker/full-node/docker-compose.yml up
```