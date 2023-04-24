---
template: post
draft: false
hide_title: true
title: Securing a node with SSL/TLS
slug: fleek-network-securing-a-node-with-ssl-tls
image: ./assets/fleek-network-how-to-secure-a-network-node.png?202301261536
date: 2023-01-24T09:30:00Z
canonical: ''
description: We'll look into how to secure a Fleek Node with TLS certificates provided by Let's Encrypt, the nonprofit Certificate Authority (CA) used in the Docker stack
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
import YoutubePlayer from '@site/src/components/YoutubePlayer';

![](./assets/fleek-network-how-to-secure-a-network-node.png?202301251236)

## Introduction

Secure Sockets Layer or Transport Layer Security are the technologies used to keep an internet connection secure by protecting sensitive data that is transferred between systems. It's a protocol for servers and web clients to ensure that data passed between them is private!

A secure connection is required to prevent others from modifying, reading or tampering with the data that is transmitted. Otherwise, it can be intercepted by third parties, such as hackers.
HTTP connections are insecure by default. SSL, or TLS (the modern version of SSL), uses advanced encryption algorithms in transit, keeping the data transferred over the connection private.

You've likely noticed `HTTPS://` when surfing the web, and more specifically when making payments or dealing with sensitive data! This is used to secure and encrypt the connection.

Nonetheless, accessing a service via `HTTPS://` does not make it secure, as the SSL/TLS requires a valid certificate that is processed by a [Certificate Authority (CA)](https://en.wikipedia.org/wiki/Certificate_authority). Historically, SSL/TLS Certificates are usually purchased from a retailer that acts as a Certificate Authority (CA), known to be costly and especially when setting up multiple web services!

In recent years, the non-profit organization [Let's Encrypt](https://en.wikipedia.org/wiki/Let's_Encrypt) started providing TLS certificate encryption, that is free of charge. The Let's Encrypt organization also improved the administration experience by providing automation features for system administrator processes.

In that respect, we'll look into how to secure a Fleek Node with TLS certificates provided by Let's Encrypt, by harnessing the knowledge provided in our [Running a node in a Docker container](fleek-network-running-a-node-in-a-docker-container) guide. We'll look into how to set up our custom domain in the ursa-proxy configuration, generate dummy certificates, and finally real certificates to understand how the certificate automation is handled to mitigate issues, such as expiration.

The knowledge demonstrated here should be useful and can be easily applied to native setups (not Docker). As some troubleshooting and differences are found in different systems, we'll stick with our Docker Stack for that matter and simplicity!

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

> You want to secure the server for better participation in the network and ensure good behavior, rewards, and global network security.

## Why is a domain name required?

A domain name is required to secure the communications. SSL/TLS by Let's Encrypt is used to improve the operator experience. Let's Encrypt makes it easy as possible for you by automating the process without cost.

Unfortunately, Let's Encrypt doesn't issue certificates for IP addresses, only domain names are supported.

For this reason, a domain name is required to get a Let's Encrypt certificate.

Advanced users might want to set up the node as they wish, for example, have their own SSL provider or even secure the IP address of their servers. But bear in mind, that is very likely that the reward mechanism and performance of your Node will be taken into account, so to avoid disappointment make the right choice and follow our recommendations.

## Where to get a domain name?

We are not affiliated with any domain name registrar, so recommend getting a domain name at a reasonable cost. Some domain name registrars provide "cheap" registrations which have rather expensive renewals, so make sure you check the renewals before committing to registering a domain name.

## Can I use an ENS domain?

ENS stands for Ethereum Name Service, and ENS domains are not supported. You're required to have a [DNS - Domain Name System](https://en.wikipedia.org/wiki/Domain_Name_System) web domain.

## Domain name setup

A domain name is required to follow the instructions, these can be registered by a domain registry provider such as [Open domain registry](https://www.opendomainregistry.net/), [Gandi](https://www.gandi.net/en-GB) and many others! Some domain name registrars provide SSL certificates as an additional service, but we are going to create TLS certificates on our own, so you won't need the domain name registry provider SSL service for this guide!

💡 SSL without a domain is possible, but we are going to work with domain names to keep this guide simple. If you are looking into securing a public IP Address, you'll have to do it on your own or wait for a future guide!

The domain name DNS records should point to the Network Node server IP address so that when the custom domain is requested, the DNS translates into the server IP address. Our reverse proxy will identify itself with the transport-layer authentication mechanism that includes the SSL certificates.

### How to set up the DNS settings for a Node server?

Create or update the `A record` to point to the server IP Address.

As an example, let's say that we have a domain `fleek.xyz`, where we set up a subdomain `fleek-network-node` and that our server IP Address (where the Fleek Network Node is running from) is `181.196.118.156`.

The custom domain address would be:

```sh
fleek-network-node.fleek.xyz
```

💡 Keep a note about the domain name as it'll be required for your reverse proxy configuration.

Our server IP Address (this should be public, accessible outside the private network, otherwise external Nodes won't be able to communicate):

```sh
181.196.118.156
```

Depending on the "domain name registry" dashboard, you'd have to update the `A Records`, here's an example:

| Type        | Host                              | Answer            | TTL         |
| ----------- | --------------------------------- | ----------------- | ----------- |
| A           | fleek-network-node.fleek.xyz      |  181.196.118.156  | 300         |


Learn more about record types [here](https://en.wikipedia.org/wiki/List_of_DNS_record_types).

DNS changes may take some time to propagate, thus make sure to [verify the DNS records](#how-to-verify-dns-records).

### Alternatively, how can one get a free domain name for testing?

Domain names are costly, you might not have one, or not be interested at this time! For this reason, we're going to provide some hints on how to set up a free domain name for your server.

There are plenty of free domain server providers, but for this guide, we will opt for [Ngrok](https://ngrok.com). There are other alternatives such as [Localhost.run](https://localhost.run) or [LocalTunnel.me](https://localtunnel.me), but we're keeping things simple here and will not try to provide support for anything else. Using an alternative should be quite similar!

> While `localhost.run` doesn't require you to install any apps, it requires exposing port 22 publicly and some users might not be happy about it.

Bear in mind that the domain address provided by this service changes whenever you restart it! Purchasing a domain is better in the long term (which services like Ngrok also provide), as otherwise, you'd have to modify the configuration every time you restart the server as the domain changes, etc. 

With that in mind, let's use `Ngrok`, as a quick demo only!

Visit the [Ngrok website](https://ngrok.com), visit the downloads page and follow the instructions to install it on your operating system. Here's how we'd install it for Linux `snap` package manager users.

```sh
snap install ngrok
```

Or, via Apt

```sh
curl -s https://ngrok-agent.s3.amazonaws.com/ngrok.asc | sudo tee /etc/apt/trusted.gpg.d/ngrok.asc >/dev/null && echo "deb https://ngrok-agent.s3.amazonaws.com buster main" | sudo tee /etc/apt/sources.list.d/ngrok.list && sudo apt update && sudo apt install ngrok
```

Once installed, you can do a quick check by checking the version:

```sh
ngrok --version
```

You should get a response

```sh
ngrok version 3.1.0
```

To create a new domain name via `Ngrok`, use the following syntax:

```sh
ngrok http 80
```

The Ngrok process will generate the following output, where you can find the address created (that is publicly accessible) which maps to the server port `80`. Our reverse proxy forwards request to port `80` to our `Ursa` node. Find more about how the services work in the [Node Health check guide](fleek-network-node-health-check-guide).

```sh
Add Okta or Azure to protect your ngrok dashboard with SSO: https://ngrok.com/dashSSO                                                               
                                                                                                                                                    
Session Status                online                                                                                                                
Session Expires               1 hour, 53 minutes                                                                                                    
Update                        update available (version 3.1.1, Ctrl-U to update)                                                                    
Terms of Service              https://ngrok.com/tos                                                                                                 
Version                       3.1.0                                                                                                                 
Region                        Europe (eu)                                                                                                           
Latency                       14ms                                                                                                                  
Web Interface                 http://127.0.0.1:4040                                                                                                 
Forwarding                    https://94e7-159-65-87-194.eu.ngrok.io -> http://localhost:80                                                         
                                                                                                                                                    
Connections                   ttl     opn     rt1     rt5     p50     p90                                                                           
                              0       0       0.00    0.00    0.00    0.00
```

We can conclude that at the time of running, `Ngrok` generated the following domain:

```sh
https://94e7-159-65-87-194.eu.ngrok.io 
```

> Be aware that this is useful for a quick demo, by stopping the Ngrok process the domain it generates might differ if you are not a paying customer. We have no affiliation with `Ngrok` and you are happy to use whichever domain provider of your liking. We are only using `Ngrok` as a quick example for the users educational interest. If you've been following the guide, should know that the domain name is declared in the reverse proxy configuration file and the Let's encrypt initialisation script, meaning you'd have to update it everytime. In fact, Ngrok forces HTTPS by default, you wouldn't have to set up, but in any case we are not knowledgable with the service it provides and the level of security but its useful for quick demos.

### How to verify DNS records?

Once you have [set up the DNS records](#how-to-set-up-the-dns-settings-for-a-node-server), verify the records are set correctly, for that you can easily run `dig` CLI or website like [mxtoolbox](https://mxtoolbox.com/). As an example, we're going to use the `dig` CLI!

`Dig` (Domain Information Groper) is a network administration command-line tool for querying the Domain Name System (DNS). Read more about it [here](https://en.wikipedia.org/wiki/Dig_(command)).

```sh
dig fleek-network-node.fleek.xyz +nostats +nocomments +nocmd
```

```sh
;fleek-network-node.fleek.xyz.      IN	A
fleek-network-node.fleek.xyz.		484 IN	A	181.196.118.156
```

👆 The goal is to determine if the DNS record matches the machine IP Address we set up earlier. There might be cases you'll need to wait longer, but it's good to double-check your DNS record dashboard and revise it if the desired settings fail to show!

There are many other tools you can use to verify the DNS records, feel free to pick your favorite!

## Stack Services

In our [Running a node in a Docker container](fleek-network-running-a-node-in-a-docker-container) guide, we propose a Stack to run the Network Node that offers you a service for:

- Ursa - The Network Node (Ursa CLI process)
- Ursa-proxy - A reverse proxy for Ursa Node service
- Prometheus - A monitoring system for real-time metrics with a web client
- Grafana - Metric visualization for logs, traces, etc.

This can be fully customized or exchanged for other options for the reverse proxy, monitoring or metric visualization. You are free to pick your tools!

⚠️ We only provide support for [Ursa CLI](https://github.com/fleek-network/ursa), which we are developing. You'll have to visit the official project for more information on how to operate them!

## Ursa-proxy SSL/TLS configuration

Our reverse proxy has a `config.toml` file where the SSL certificate(s) are, or can be configured. We keep the `config.toml` pre-configured with an example that you can modify with yours.

```toml
# Server settings for insecure communication via HTTP
[[server]]
proxy_pass = "127.0.0.1:4069"
listen_addr = "0.0.0.0:80"
# Certobot requirement for ACME challenge
# during the SSL/TLS certificate generation
# the certbot standalone web server
# will serve a file in the directory path
serve_dir_path = ".well-known"

# Server settings for secure communication via HTTPS (SSL/TLS)
[[server]]
proxy_pass = "127.0.0.1:4069"
listen_addr = "0.0.0.0:443"

[server.tls]
cert_path = "/etc/letsencrypt/live/YOUR-DOMAIN/fullchain.pem"
key_path = "/etc/letsencrypt/live/YOUR-DOMAIN/privkey.pem"

# Admin service.
# You can omit this section as this is the default.
[admin]
addr = "0.0.0.0:8881"
```

### Creating a valid certificate

Certificates can be generated by [Certbot](https://certbot.eff.org/), a free, open-source software tool for automating the use of Let’s Encrypt certificates on manually-administrated websites to enable HTTPS.

We provide a [script](https://get.fleek.network/lets_encrypt) to handle this for you - install it, run the commands with correct arguments, etc - that can be run as easily as you do for the assisted installer.

```sh
curl https://get.fleek.network/lets_encrypt | bash
```

Alternatively, we describe how to do it manually by following the guide here.

### Preparing the Certbot initialization

First, check if you already have certbot installed. The certbot documentation suggests uninstalling preinstalled versions and pull the latest version from snap package manager.

```sh
apt-get remove certbot
```

In Ubuntu, you'd start by updating snap package manager.

```sh
sudo snap install core
sudo snap refresh core
```

Install the certbot cli

```sh
snap install --classic certbot
```

If the `/snap/bin` is in the system PATH environment variable, you should be able to:

```
certbot --version
```

Otherwise, add `/snap/bin` to the PATH, or symlink the certbot binary to the `/usr/local/bin`.

```sh
sudo ln -s /snap/bin/certbot /usr/bin/certbot
```

Create the ursa-proxy configuration file in the path `~/.ursa/proxy/config.toml` by default the ursa configuration directory is located under `/root/.ursa` but some users customise it to `$HOME/.ursa`.

Here, we create the directory, if one doesn't exist (we'll use the default .ursa location):

```
mkdir -p /root/.ursa/proxy
```

1) Create a new `config.toml` file:

```sh
touch /root/.ursa/proxy/config.toml
```

2) Put the following content in the newly created file:

```sh
[[server]]
proxy_pass = "127.0.0.1:4069"
listen_addr = "0.0.0.0:80"
serve_dir_path = ".well-known"

[[server]]
proxy_pass = "127.0.0.1:4069"
listen_addr = "0.0.0.0:443"

[server.tls]
cert_path = "/etc/letsencrypt/live/YOUR-DOMAIN/fullchain.pem"
key_path = "/etc/letsencrypt/live/YOUR-DOMAIN/privkey.pem"

[admin]
addr = "0.0.0.0:8881"
```

3) Make sure that you replace the `YOUR-DOMAIN` with your custom domain name in the `config.toml` file

💡 A domain name is required to be pointing to your server public IP address, this is used by certbot to create the Let's Encrypt TLS certificates

Here's an example of how the `cert_path` or `key_path` would look like for the hypothetical domain name `fleek-network-node.mydomain.com` in the `config.toml` file settings.

```sh
[server.tls]
cert_path = "/etc/letsencrypt/live/fleek-network-node.mydomain.com/fullchain.pem"
key_path = "/etc/letsencrypt/live/fleek-network-node.mydomain.com/privkey.pem"
```

💡 We are just showing the two lines and omitting the remaining lines, to keep it short, you should not delete the remaining lines.

### Running the Let's Encrypt automation script

First, change the directory where you've stored the ursa repository, e.g. by default its located at `~/fleek-network/ursa`

```sh
cd ~/fleek-network/ursa
```

The directory file structure should look like this:

```sh
.
├── CODE_OF_CONDUCT.md
├── Cargo.lock
├── Cargo.toml
├── Dockerfile
├── Dockerfile-gateway
├── Dockerfile-proxy
├── LICENSE-APACHE
├── LICENSE-MIT
├── Makefile
├── README.md
├── contracts
├── crates
├── doc
├── docker
├── foundry.toml
├── infra
├── remappings.txt
├── rust-toolchain.toml
├── sdk
├── target
├── test-plans
└── test_files
```

We have to provide a domain name, such as the example `fleek-network-node.fleek.xyz` and a valid email address `ops@fleek.xyz` that you as an operator have access to.

```sh
sudo certbot certonly --standalone --preferred-challenges http --email <YOUR-EMAIL-ADDRESS> --domain YOUR-DOMAIN --rsa-key-size 4096
```

Since we have already:

- Updated the `A Records` in the [previous step](#how-to-set-up-the-dns-settings-for-a-node-server)
- [Verified](#how-to-verify-dns-records) that the DNS records are correct

We can go ahead and execute the command. Here we've replaced the YOUR-EMAIL and YOUR-DOMAIN with our example domain and email addresses.

```sh
sudo certbot certonly --standalone --preferred-challenges http --email ops@fleek.xyz --domain fleek-network-node.fleek.xyz --rsa-key-size 4096
```

If the script is executed successfully, the output should be similar to (have in mind that we are using `fleek-network-node.fleek.xyz` as an example, you should see yours):

```sh
Domains: fleek-network-node.fleek.xyz
Creating full-node_certbot_run ... done
Generating a RSA private key
...........................................++++
......................................................................................................................................................................................................++++
writing new private key to '/etc/letsencrypt/live/fleek-network-node.fleek.xyz/privkey.pem'
-----

Creating full-node_certbot_run ... done
Saving debug log to /var/log/letsencrypt/letsencrypt.log
Requesting a certificate for fleek-network-node.fleek.xyz

Successfully received certificate.
Certificate is saved at: /etc/letsencrypt/live/fleek-network-node.fleek.xyz/fullchain.pem
Key is saved at:         /etc/letsencrypt/live/fleek-network-node.fleek.xyz/privkey.pem
This certificate expires on 2023-04-25.
These files will be updated when the certificate renews.

NEXT STEPS:
- The certificate will need to be renewed before it expires. Certbot can automatically renew the certificate in the background, but you may need to take steps to enable that functionality. See https://certbot.org/renewal-setup for instructions.

- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
If you like Certbot, please consider supporting our work by:
 * Donating to ISRG / Let's Encrypt:   https://letsencrypt.org/donate
 * Donating to EFF:                    https://eff.org/donate-le
```

It's a long output but we can find the last few paragraphs useful, where it reads:

```sh
Successfully received certificate.
Certificate is saved at: /etc/letsencrypt/live/fleek-network-node.fleek.xyz/fullchain.pem
Key is saved at:         /etc/letsencrypt/live/fleek-network-node.fleek.xyz/privkey.pem
This certificate expires on 2023-04-25.
These files will be updated when the certificate renews.
```

You may also find that the paragraph after, that mentions that the certificate expires is important. If you are running the Docker Stack we provide, the `certbot` is installed and automates renewing the certification for you.

```sh
NEXT STEPS:
- The certificate will need to be renewed before it expires. Certbot can automatically renew the certificate in the background, but you may need to take steps to enable that functionality. See https://certbot.org/renewal-setup for instructions.
```

### How to run a domain name health check?

As previously instructed in our [guide](fleek-network-node-health-check-guide), we can do a quick health check by making `cURL` requests to our server and reading the response. There's the option to get the response body that should be text `pong` or get some HTTP Headers.

```sh
curl -w "\n" https://<YOUR DOMAIN NAME>/ping
```

For our example, we have the domain `fleek-network-node.fleek.xyz` and this is how the `cURL` request would look like:

```sh
curl -w "\n" https://fleek-network-node.fleek.xyz/ping
```

A successful response should be `pong`

```sh
pong
```

Use the flag `-I` to get the HTTP Headers. To learn more read the guide [here](fleek-network-node-health-check-guide).

You can do these tests from any remote location that is not your server or local machine and the health check should pass, as the port should be publicly available to any service on the internet.

## Conclusion

Congratulations! If you reached this far you have improved the security of your Network Node and helped contribute to a safer Fleek Network!

By providing a brief introduction to SSL/TLS certificates, the reasons why they exist or why you'd want to secure the Network Node, we jumped quickly to the domain name setup. After completing the verification of the DNS records, where our Stack and Node are running from, prepared the ursa-proxy configuration.

To complete we verified that our Node is healthy by doing a quick checkup, using one of the options previously discussed in our [Node health check](fleek-network-node-health-check-guide) guide. We have then secured the Node!

While we do our best to provide the clearest instructions, there's always space for improvement, therefore feel free to make any contributions by messaging us on our [Discord](https://discord.gg/fleekxyz) or by opening a [PR](https://github.com/fleek-network) in any of our repositories 🙏.

Discover more about the project by [watching/contributing on Github](https://github.com/fleek-network/ursa), following us on [Twitter](https://twitter.com/fleek_net), and joining [our community Discord](https://discord.gg/fleekxyz) for all the best updates!

<Author
    name="Helder Oliveira"
    image="https://github.com/heldrida.png"
    title="Software Developer + DX"
    url="https://github.com/heldrida"
/>
