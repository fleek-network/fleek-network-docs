---
template: post
draft: false
hide_title: true
title: 'Fleek Network: Managing the key store'
slug: fleek-network-managing-the-key-store
image: ./assets/fleek-network-migrate-to-ursa-proxy-from-nginx.png?202304271224
date: 2023-04-27T23:00:00Z
canonical: ''
description: Learn how to migrate to ursa-proxy from nginx
category: Tutorial
tags:
- Guide
- Fleek Network
- reverse-proxy
- ursa-proxy
- nginx
---

![](./assets/fleek-network-migrate-to-ursa-proxy-from-nginx.png?202304271224)

## Introduction

Many actors are free to communicate with your server, as Fleek Network encourages participation, but this comes with challenges, in terms of security, network resource availability, etc. To have a bit of control over the connections, a reverse proxy helps prevent users from connecting to the server processes directly, reducing the number of entry points and actions within the system.

On early builds, an NGINX service was included in the stack, fulfilling requirements and integrations simplicity. On the other hand, NGINX is a big project that offers features that are suitable for a wide range of use cases, which are not necessarily important for our goals.

We came up with the Ursa proxy, as a solution to replace NGINX, to provide us with a higher degree of control and customization to fit our service needs, such as mimicking the caching that NGINX does, SSL/TSL Certification, port mapping, etc.

In the following guide, we'll provide instructions to migrate from NGINX to the Ursa proxy.

## Docker stack

On earlier versions of our Docker stack, an NGINX service was included, as the reverse proxy for the Ursa service. Plus, used during the SSL/TLS certbot certification process to secure the domain name.

Since the Docker stack [Ursa-proxy](https://github.com/fleek-network/ursa/commit/258af75d5ad2e28f85fca908edbcb8062d927d3b) changes, and the related support added from [Ursa-proxy](https://github.com/fleek-network/get.fleek.network/commit/0afa813ab74eaf15d50ad126d0534bbe0a14aed9) configuration in the assisted installer that the Ursa-proxy is now the default reverse proxy in the Docker stack.

If you have set up a node before these features, you'll have NGINX declared in your Docker stack configuration file.

We'll look into:
- Setup the Ursa-proxy
  - Pull the latest from source repository
  - Update the Docker compose file
    - Replace the NGINX service with the Ursa-proxy
    - Bind the host directories to the container
      - The host machine `.ursa` configuration directory to the container
      - A host machine directory to keep the Lets Encrypt TLS certificates, e.g. `~/fleek-network/ursa/data/certbot`
    - Update the port numbers
- Generate the TLS certifications
- Create the configuration for the Ursa-proxy
- Do a health check

### Setup the Ursa proxy

You'll modify the `docker-compose.yml` to include the `ursa-proxy`. Change the directory to where the Ursa project is located, e.g. by default `~/fleek-network/ursa`.

```
cd ~/fleek-network/ursa
```

💡 Make sure you type the correct location of where you've saved the Ursa project source code

1) Pull the latest version of the source code.

```
git checkout main
```

Run the following command to pull the latest commits from `origin/main`:

```
git pull origin main
```

⚠️ If this fails, due to any of the possible several reasons, e.g. handling staged or local changes, having to discard changes, or saving changes, check the [git documentation](https://git-scm.com/doc) to learn the basics.

2) Update the Docker compose file

Open the `./data/full-node/docker-compose.yml` in your favorite text editor.

Locate the NGINX service under `services`. It should be similar to:

```
services:
  nginx:
    image: nginx:latest
    restart: unless-stopped
    command: "/bin/sh -c 'while :; do sleep 6h & wait $${!}; nginx -s reload; done & nginx -g \"daemon off;\"'"
    volumes:
      - ./data/nginx:/etc/nginx/conf.d
      - ./data/certbot/conf:/etc/letsencrypt
      - ./data/certbot/www:/var/www/certbot
      - ./data/nginx/cache:/cache:rw
    ports:
      - "80:80"
      - "443:443"
    expose:
      - 80
    depends_on:
      - certbot
```

Find and replace `nginx.image` with `ursa-proxy.image`.

From:

```
nginx:
  image: nginx:latest
```

To the following:

```
ursa-proxy:
  image: ghcr.io/fleek-network/ursa-proxy:latest
```

Effectively, we are replacing the term "nginx" which is the Docker compose service name with the replacement service "ursa-proxy".

💡 While this prebuilt image `ghcr.io/fleek-network/ursa-proxy:latest` should be suitable for most servers, it might not be supported by a wide range of vCPUs. If you find that the `ursa-proxy` fails to start, it's best to build from the source as that will create an image suitable for your server CPU architecture (errors that cause this are interrupted by signal 4: SIGILL, docker container exit status=132, etc). On the other hand, some users might just prefer to build the image from source code!

```
ursa-proxy:
  image: ursa-proxy
  build:
    context: ../../.
    dockerfile: Dockerfile-proxy
```

3) Bind the host directories to the container

Replace the `ursa-proxy.volumes`, or what was the `nginx.volumes` from:

```
volumes:
  - ./data/nginx:/etc/nginx/conf.d
  - ./data/certbot/conf:/etc/letsencrypt
  - ./data/certbot/www:/var/www/certbot
  - ./data/nginx/cache:/cache:rw
```

To the following:

```
volumes:
  - ${HOME}/.ursa/:/root/.ursa/:rw
  - ./data/certbot/conf:/etc/letsencrypt
```

4) Update the port numbers

Replace the port numbers from:

```
ports:
  - 80:80
  - 443:443
expose:
  - 80
```

To:

```
ports:
  - 80:80
  - 443:443
expose:
  - 443
```

💡 We have the `ports` bound to the host machine (HOST:CONTAINER), and the `expose` which defines which "exposes" ports to other services in the Docker network only

5) How the ursa-proxy configuration should look like

At this stage, the changes you've made for `ursa-proxy` should look like the following:

```
services:
  ursa-proxy:
    image: ursa-proxy
    build:
      context: ../../.
      dockerfile: Dockerfile-proxy
    volumes:
      - ${HOME}/.ursa/:/root/.ursa/:rw
      - ./data/certbot/conf:/etc/letsencrypt
    restart: unless-stopped
    ports:
      - "80:80"
      - "443:443"
    expose:
      - 443
    depends_on:
      - certbot
```