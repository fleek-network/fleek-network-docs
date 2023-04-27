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
- Install the Ursa-proxy
  - Create the configuration for the Ursa-proxy
- Updated the Docker compose stack
  - Replace the NGINX service with the Ursa-proxy
  - Bind the host machine `.ursa` configuration directory to the container
  - Bind a host machine directory to keep the Lets Encrypt TLS certificates, e.g. `~/fleek-network/ursa/data/certbot`
  - Generate the TLS certifications
- Do a health check