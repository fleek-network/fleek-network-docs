---
template: post
draft: false
hide_title: true
title: Securing a node with SSL/TLS
slug: fleek-network-securing-a-node-with-ssl-tls
date: 2023-01-24T09:30:00Z
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
- Have a domain name and DNS setup management permissions (ideally if you want to persist a domain for a long time, we'll provide you with a free alternative that is dynamic and only suitable for the demo)

 <CheckoutCommitWarning />

## What are SSL/TLS certificates?

An SSL Certificate is a file that is stored on a web server that represents the content of an encrypted key. A certificate file only contains information that is relevant to authenticate a service. Some of the properties of the file include a key pair (a public and private key that work together to establish an encrypted connection), the issuer of the certificate, and the associated subdomains.

In practice when a user navigates to a secure service, the user gets a public key, establishes an encrypted connection and has the server identity verified.

Nowadays, most web clients use TLS (Transport Layer Security) encryption, which is used as SSL (Secure Sockets Layer). Although should be noted that SSL certificates are predecessors of TLS (TLS is an improvement that evolved from SSL), however, the names TLS and SSL remain interchangeable as certificates!

## Why secure the Network Node?

Provide a form to authenticate the Network Node server, and without it, the end client that consumes the data is at higher risk of having transmitted data stolen. You want the ability to authenticate your Network Node!

The secure HTTPS protocol is a norm, while HTTP is obsolete! A Fleek Network Node that is not secure may be punished for bad behavior and thus not be rewarded.

Since this is a serious web security vulnerability, [attackers can place themselves between](https://en.wikipedia.org/wiki/Man-in-the-middle_attack) the users' client and your Network Node server, and intercept sensitive data in transit.

You want to secure the server for greater participation rewards and global network security.

## Domain name setup

A domain name is required to follow the instructions, these can be registered by a domain registry provider such as [Open domain registry](https://www.opendomainregistry.net/), [Gandi](https://www.gandi.net/en-GB) and many others! Some domain name registrys' provide SSL certificates as an additional service, but we are going to create TSA certificates on our own, so you won't need the domain name registry provider SSL service for this guide!

💡 SSL without a domain is possible, but we are going to work with domain names to keep this guide simple. If you are looking into securing a public IP Address, you'll have to do it on your own or wait for a future guide!

The domain name DNS records should point to the Network Node server IP address so that when the custom domain is requested, the DNS translates into the server IP address. Our reverse proxy (NGINX) will identify itself with the transport-layer authentication mechanism that includes the SSL certificates.

### How to set up the DNS settings for a Node server?

Create or update the `A record` to point to the server IP Address.

As an example, let's say that we have a domain `fleek.xyz`, where we set up a subdomain `fleek-network-node` and that our server IP Address is `181.196.118.156`.


The custom domain address would be:

```sh
fleek-network-node.fleek.xyz
```

💡 Keep a note about the domain name as it'll be required for your reverse proxy setup (NGINX)

Our server IP Address (this is public, accessible outside the private network):

```sh
181.196.118.156
```

Depending on the "domain name registry" dashboard, you'd have to update the `A Records`, as suggested:

| Type        | Host                              | Answer            | TTL         |
| ----------- | --------------------------------- | ----------------- | ----------- |
| A           | fleek-network-node.fleek.xyz      |  181.196.118.156  | 300         |


Learn more about record types [here](https://en.wikipedia.org/wiki/List_of_DNS_record_types).

DNS changes may take some time to propagate, thus make sure to [verify the DNS records](#how-to-verify-dns-records).

### Alternatively, getting a free domain name for testing?

Domain names are costly, you might not have one, or not be interested at this time! For this reason, we're going to provide some hints on how to set up a free domain name for your server.

There are plenty of free domain server providers but for this guide will opt for [localhost.run](localhost.run), e.g. if you wish there are other alternatives such as [LocalTunnel.me](https://localtunnel.me), [Ngrok](https://ngrok.com/), but we're keeping things simple here and will not try to provide support for anything else!

### How to verify DNS records?

## Stack Services

## NGINX SSL/TLS configuration

### Creating a valid certificate

### Which came first: the chicken or the egg?

### Running the Let's Encrypt automation script

### How to run a domain name health check?

## References

https://certbot.eff.org/pages/about

https://mxtoolbox.com/

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
