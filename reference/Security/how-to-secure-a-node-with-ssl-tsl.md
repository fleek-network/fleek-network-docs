---
template: post
draft: false
hide_title: false
title: How to secure a node with SSL/TSL
slug: how-to-secure-a-node-with-ssl-tsl
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

Update the Nginx `app.conf`, providing the `server_name` to match the desired domain name `<YOUR-DOMAIN-NAMe>`

```sh
server {
    listen 80;
    listen [::]:80;
    server_name `<YOUR-DOMAIN-NAME>`;

    ...
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name `<YOUR-DOMAIN-NAME>`;

    ...
}
```

💡 We are using the three dots `...` to represent the text that is omitted to keep it short. You are not supposed to add the dots or delete any other text apart from replacing the `server_name` value with your desired domain.

If you have followed our introductory guides, you have probably commented out or removed the SSL configuration, you can find the `app.conf` file [here](https://raw.githubusercontent.com/fleek-network/ursa/cd6fb3d21ce647dc3f06ee9128ba2a4164623ee5/docker/full-node/data/nginx/app.conf). This is pointing to the file version at a certain commit in history, recent versions might differ! Beware, that this is highly customizable and we might make tweaks in any earlier version of `ursa` which that guide might not consider. Check our original repository on recent commits for any updates!

 Replace the pathname with your custom domain `<YOUR-DOMAIN-NAME>`

```sh
# SSL code
ssl_certificate /etc/letsencrypt/live/<YOUR-DOMAIN-NAME>/fullchain.pem;
ssl_certificate_key /etc/letsencrypt/live/<YOUR-DOMAIN-NAME>/privkey.pem;
```

Run the Let's encrypt initialization script to generate the SSL/TLS certificates. The process is the following:

- Create a dummy certificate
- Start Nginx
- Delete the dummy certificate
- Request the real certificates

Change the directory to the location where the `init-letsencrypt.sh` is located.

```sh
cd docker/full-node
```

Run the script by executing the command and providing the arguments to `EMAIL` and `DOMAINS`:

```sh
EMAIL="<VALID EMAIL>" DOMAINS="<DOMAIN WITH CORRECT DNS RECORDS>" ./init-letsencrypt.sh
```

💡 This will only work you've followed the previous steps and confirmed that the DNS records are correct. Also, if multiple domains are provided, the certificates will be stored under the first one.

If successful, you should get a long response (we replaced the long text with `...`) with the following:

```sh
...

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
### Reloading nginx ...
2023/01/25 18:56:34 [notice] 17#17: signal process started
```

Do a health check anywhere in the web to confirm

```sh
curl https://<YOUR DOMAIN NAME>/ping
```

Should get the response back `pong`

```sh
pong
```

For longer detailed instructions, check our guide [Securing a Node with SSL/TSL](../../guides/Network nodes/fleek-network-securing-a-node-with-ssl-tls).