---
template: post
draft: false
hide_title: false
title: Docker compose use latest image instead of building
slug: docker-compose-use-latest-image-instead-of-building
date: 2023-02-09T31:00:00Z
canonical: ''
description: Quick reference on how to use the latest image instead of building
category: Reference
tags:
- Reference
- docker compose
- Fleek Network
- build
- latest
- stack
---

This is only useful if your `docker-compose.yml` is set to build the image locally, e.g. the "ursa.build.context" and "ursa.build.dockerfile" are declared. You can see that our team provides "nightly" builds based on the latest commits in the Ursa source-code [here](https://github.com/fleek-network/ursa/pkgs/container/ursa).

💡 This is because you either have the `latest` image declared in the `docker-compose.yml` file for the `ursa` service (quick process), or the local `Dockerfile`, which requires to have it built (longer process). By default, located in `$HOME/fleek-network/ursa/docker/full-node/docker-compose.yml`

For this to work, ensure that the `Docker-compose.yml` has the `latest` tag declared. Open the `docker-compose.yml` and make sure that the `Ursa` service has the following image with the correct tag, if not modify it (we are only revealing what matters, the remaining source text is omitted with three dots `...`, don't type it).

Change directory to the location of the ursa source-code (by default `$HOME/fleek-network/ursa` and open the file `$HOME/fleek-network/ursa/docker-full-node/docker-compose.yml` in your favourite text editor).

You'll find:

```sh
  ...

  ursa:
    image: ursa
    build:
      context: ../../.
      dockerfile: Dockerfile
    ...
```

Remove `build` and replace `image` with:

```sh
  ursa:
    image: ghcr.io/fleek-network/ursa:latest
```

Change directory to ursa root, e.g., by default is `$HOME/fleek-network/ursa`.

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