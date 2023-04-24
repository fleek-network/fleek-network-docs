---
template: post
draft: false
hide_title: false
title: How to secure a node with SSL/TSL
slug: how-to-secure-a-node-with-ssl-tls
date: 2023-01-02T26:00:00Z
canonical: ''
description: Quick reference to secure a Node with SSL/TSL
category: Reference
tags:
- Reference
- Git
- Fleek Network
- SSL
- TSL
- HTTPS
- security
---

Change the directory to the Ursa directory in your file system:

```sh
cd <PATH-TO-URSA-CLI-PROJECT-SOURCE>
```

Set up the DNS settings for a Node server:

| Type        | Host                              | Answer                          | TTL         |
| ----------- | --------------------------------- | ------------------------------- | ----------- |
| A           | `<YOUR-DOMAIN-NAME>`                | `<SERVER-PUBLIC-IP-ADDRESS>`  | 300         |

Here's an example:

| Type        | Host                              | Answer            | TTL         |
| ----------- | --------------------------------- | ----------------- | ----------- |
| A           | fleek-network-node.fleek.xyz      |  181.196.118.156  | 300         |

Verify the DNS records

```sh
dig fleek-network-node.fleek.xyz +nostats +nocomments +nocmd
```

The result should contain a response with the `<SERVER-PUBLIC-IP-ADDRESS>` set in the DNS record. Your domain should point to the machine address.

```sh
;`<YOUR-DOMAIN-NAME>`.      IN	A
`<YOUR-DOMAIN-NAME>`.		484 IN	A	`<SERVER-PUBLIC-IP-ADDRESS>` 
```

Run the Let's Encrypt script to generate the SSL/TLS certificates.

```sh
curl https://get.fleek.network/lets_encrypt | bash
```

💡 This will only work you've followed the previous steps and confirmed that the DNS records are correct. Also, if multiple domains are provided, the certificates will be stored under the first one.

If successful, you should get a response that is similar to:

```sh
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
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
```

The process should create `~/.ursa/proxy/config.toml` with the required domain name customization.

```sh
[[server]]
proxy_pass = "127.0.0.1:4069"
listen_addr = "0.0.0.0:80"
serve_dir_path = ".well-known"

[[server]]
proxy_pass = "127.0.0.1:4069"
listen_addr = "0.0.0.0:443"

[server.tls]
cert_path = "/etc/letsencrypt/live/<YOUR-DOMAIN-NAME>/fullchain.pem"
key_path = "/etc/letsencrypt/live/<YOUR-DOMAIN-NAME>/privkey.pem"

[admin]
addr = "0.0.0.0:8881"
```

The `cert_path` and `key_path` should have declared your custom domain name, e.g. for the domain name node.foobar.xyz would look like:

```sh
# SSL code
cert_path = "/etc/letsencrypt/live/node.foobar.xyz/fullchain.pem"
key_path = "/etc/letsencrypt/live/node.foobar.xyz/privkey.pem"
```

Do a health check anywhere on the web to confirm

```sh
curl https://<YOUR DOMAIN NAME>/ping
```

Should get the response back `pong`

```sh
pong
```

For longer detailed instructions, check our guide [Securing a Node with SSL/TSL](../../guides/Network nodes/fleek-network-securing-a-node-with-ssl-tls).