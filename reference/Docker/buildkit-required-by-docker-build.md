---
template: post
draft: false
hide_title: false
title: Buildkit required by docker build
slug: buildkit-required-by-docker-build
date: 2023-02-09T31:00:00Z
canonical: ''
description: Learn how to enable buildkit for Docker
category: Reference
tags:
- Reference
- docker
- Fleek Network
- buildkit
---

When running Docker on Linux, you can enable BuildKit by using an environment variable or setting the BuildKit feature in the `/etc/docker/daemon.json`

Use the environment variable, e.g., prefix the command with the following variable and values:

```sh
COMPOSE_DOCKER_CLI_BUILD=1
```

```sh
DOCKER_BUILDKIT=1
```

Here's the complete prefixed command

```sh
COMPOSE_DOCKER_CLI_BUILD=1 DOCKER_BUILDKIT=1 docker compose -f docker/full-node/docker-compose.yml up -d
```

Docker desktop users don't have to has its enabled by default default.

Alternatively, you can set the docker buildkit in the `daemon.json` and have it enabled by default.

Open and edit the file `/etc/docker/daemon.json`, if doesn't exist create it.

Add to the settings or put the following content if new file:

```sh
{
  "features": {
    "buildkit" : true
  }
}
```

Restart docker daemon, here's an example for Ubuntu

Docker stop

```sh
service docker stop
```

Docker start

```sh
service docker start
```

💡 You might have to prefix with `sudo`

```sh
sudo service docker stop
```

```sh
sudo service docker start
```