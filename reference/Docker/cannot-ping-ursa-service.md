---
template: post
draft: false
hide_title: false
title: Cannot ping the Ursa service
slug: cannot-ping-ursa-service
date: 2023-02-09T31:00:00Z
canonical: ''
description: How to troubleshoot ping failure
category: Reference
tags:
- Reference
- docker
- Fleek Network
- ping
- troubleshoot
---

Make sure that the Docker container for Ursa is running. If you run the recommended Docker Stack e.g. have used the assisted installer or followed the [running a node in a docker container](../../guides/Network%20nodes/fleek-network-running-a-node-in-a-docker-container) then you should be familiar with the commands.

In the Ursa repository directory (by default ~/fleek-network/ursa). Change directory:

```sh
cd ~/fleek-network/ursa
```

Start (up):

```sh
docker compose -f ./docker/full-node/docker-compose.yml up
```

Or, stop (down):

```sh
docker compose -f ./docker/full-node/docker-compose.yml down
```

Can use the flag `-d` at the very end to start detached.

Here's an example of up in detached mode.

```sh
docker compose -f ./docker/full-node/docker-compose.yml up -d
```

Here's an example of down in detached mode.

```sh
docker compose -f ./docker/full-node/docker-compose.yml down -d
```

If you do, you can see the logs at anytime by:

```sh
docker compose -f ./docker/full-node/docker-compose.yml logs -f
```

From your host, you should have attempted to ping the Stack's Ursa-proxy (reverse proxy), expecting the response `pong`. 

```sh
curl http://localhost/ping
```

If you haven't then, you need to troubleshoot and figure out why you're not getting the response `pong`.

Check the Docker container status and logs to ensure that the `ursa` service, is indeed running.

Is the `ursa` container listed, healthy and running?

Run the command:

```sh
docker ps -a
```

You can execute commands in the container shell with the `bash`. Run `bash` in the `ursa` container by:

```sh
docker exec -it $(docker ps -a | grep 'ursa' | cut -d ' ' -f1) bash
```

Ping the port `4069`, as described in the guide [node healthchecks](../../guides/Network%20nodes/fleek-network-node-health-check-guide).

```sh
curl -s http://localhost:4069/ping | grep 'pong'
```

If the Ursa CLI started a node process in the container, and is running, you should get the response `pong`.

Confirm that Docker container Ursa-proxy service is running, by executing.

```sh
docker ps -a
```

Ensure that you don't have any Firewalls or similar applications blocking the required ports (80 and 443). Learn more about the services and the ports by reading our guide [Node Healthcheck](../../guides/Network%20nodes/fleek-network-node-health-check-guide) to help you comprehend to better troubleshoot.