---
template: post
draft: false
hide_title: false
title: Docker compose build docker image from source
slug: docker-compose-build-docker-image-from-source
date: 2023-02-09T31:00:00Z
canonical: ''
description: Quick reference on how to build the docker image from source
category: Reference
tags:
- Reference
- docker compose
- Fleek Network
- build
- latest
- stack
---

This is only useful if your `docker-compose.yml` is set to use the prebuilt docker image, e.g. the "ursa.image" is declared and has a remote address instead of having "ursa.build.context" and "build.context.dockerfile". You can see that our team provides "latest" builds based on the latest commits in the Ursa source-code [here](https://github.com/fleek-network/ursa/pkgs/container/ursa), this works great for many servers but since we prebuild this image in a modern CPU, there are servers with old CPU where this fails, caused by a signal termination (SIGKIL 132, or exit code 4) when listing `docker ps -a`.

💡 This is because you either have the `latest` image declared in the `docker-compose.yml` file for the `ursa` service (quick process), or the local `Dockerfile`, which requires to have it built (longer process). By default, located in `$HOME/fleek-network/ursa/docker/full-node/docker-compose.yml`

For this to work, ensure that the `Docker-compose.yml` has the `build.context` and `build.dockerfile`.

Change directory to the location of the ursa source-code (by default `$HOME/fleek-network/ursa` and open the file `$HOME/fleek-network/ursa/docker-full-node/docker-compose.yml` in your favorite text editor).

You'll find:

```sh
  ursa:
    image: ghcr.io/fleek-network/ursa:latest
```

Change it, to include the missing "build" to look like the following:

```sh
  ursa:
    image: ursa
    build:
      context: ../../.
      dockerfile: Dockerfile
```

💡 You can omit the `-f <path-to-config-file>` by changing the directory to where the `docker-compose.yml` file is e.g., `$HOME/fleek-network/ursa/docker/full-node`

Stop the Stack

```sh
docker compose -f ./docker/full-node/docker-compose.yml stop
```

Remove stopped containers

```sh
docker compose -f ./docker/full-node/docker-compose.yml rm
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

When starting the stack the image will be built from the source-code.