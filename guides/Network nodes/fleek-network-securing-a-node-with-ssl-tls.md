---
template: post
draft: false
hide_title: true
title: Securing a node with SSL/TLS
slug: fleek-network-securing-a-node-with-ssl-tls
date: 2023-01-04T23:00:00Z
canonical: ''
description: We'll look into how to secure a Fleek Node with TLS certificates provided by the nonprofit Certificate Authority (CA) Let's Encrypt in the Docker stack
category: Tutorial
tags:
- DCDN
- Guide
- Getting Started
- Fleek Network
- security
- SSL/TSL
- Let's Encrypt
- Certbot
- Docker
---

<!--
  The following import is intentional (see partial <CheckoutCommitWarning />)
-->
import CheckoutCommitWarning from '../partials/_checkout-commit-warning.mdx';
import Author from '@site/src/components/Author';

![](./assets/fleek-network-how-to-secure-a-network-node.png?202301251236)

## Introduction

Secure Sockets Layer or Transport Layer Security are the technologies used to keep an internet connection secure by protecting sensitive data that is transferred between systems. It's a protocol for servers and web clients to ensure that data passed between them is private!

A secure connection is required to prevent others from modifying, reading or tempering the data that is transmitted. Otherwise, it can be intercepted by third parties, such as hackers.
HTTP connections are insecure by default, SSL or TLS (the modern version of SSL) is used to encrypt the data by using advanced encryption algorithms in transit, preventing others from reading it as it's transferred over the connection.

💡 Generally referred to as SSL, or TLS (Transport Layer Security), the modern version that's usually named SSL)

You've likely noticed `HTTPS`://` when surfing the web, and more specifically when making payments or dealing with sensitive data! This is used to secure and encrypt the connection.

Nonetheless, accessing a service via `HTTPS://` does not make it secure, as the SSL/TLS requires a valid certificate that is processed by a [Certificate Authority (CA)](https://en.wikipedia.org/wiki/Certificate_authority). Historically, SSL/TLS Certificates are usually purchased from a retailer that acts as a Certificate Authority (CA), known to be costly and especially when setting up multiple web services!

In recent years, the non-profit organization [Let's Encrypt](https://en.wikipedia.org/wiki/Let's_Encrypt) started providing TLS certificate encryption, that is free of charge. The Let's Encrypt organization also improved the administration experience by providing automation features for system administrator processes.

In that respect, we'll look into how to secure a Fleek Node with TLS certificates provided by the nonprofit Certificate Authority (CA) Let's Encrypt, by harnessing the knowledge provided in our [Running a node in a Docker container](fleek-network-running-a-node-in-a-docker-container) guide. We'll look into how to set up our custom domain in the Nginx configuration, generate dummy certificates, and real certificates and understand how the certificate automation is handled to mitigate issues, such as expiration.

The knowledge demonstrated here should be useful and can be easily applied to native setups (none Docker). As some troubleshooting and differences are found in different systems, we'll stick with our Docker Stack for that matter and simplicity!

If you have any feedback or questions join [our community Discord](https://discord.gg/fleekxyz) channel!

## Pre-requisites

To follow the guide, you will need the following:

- Familiarity with the command-line interface
- Ability to run the Docker Stack successfully as instructed in our [Running a node in a Docker container](fleek-network-running-a-node-in-a-docker-container) or [video guide](https://www.youtube.com/watch?v=uAFIDu3UBvw)
- Have a domain name and DNS setup management permissions (ideally if you want to persist a domain for longtime, as we'll provide you with a free alternative that is dynamic only suitable for the demo)

 <CheckoutCommitWarning />

## What are SSL/TLS certificates?

## Why secure the Network Node?

## Domain name setup

### How to get a domain name for a Node server?

### Alternatively, getting a free domain name for testing?

### How to verify DNS records?

## Stack Services

## NGINX SSL/TLS configuration

### Creating a valid certificate

### Which came first: the chicken or the egg?

### Running the Let's Encrypt automation script

### How to run a domain name health check?

## Conclusion

WIP

While we do our best to provide the clearest instructions, there's always space for improvement, therefore feel free to make any contributions by messaging us on our [Discord](https://discord.gg/fleekxyz) or by opening a [PR](https://github.com/fleek-network) in any of our repositories 🙏.

Discover more about the project by [watching/contributing on Github](https://github.com/fleek-network/ursa), following us on [Twitter](https://twitter.com/fleek_net), and joining [our community Discord](https://discord.gg/fleekxyz) for all the best updates!

<Author
    name="Helder Oliveira"
    image="https://github.com/heldrida.png"
    title="Software Developer + DX"
    url="https://github.com/heldrida"
/>
