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

On earlier versions of our Docker stack, an NGINX service was included, as the reverse proxy for the Ursa service. Plus, required during the SSL/TLS certbot certification process to secure the domain name, relied on.

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
- Create the Ursa-proxy configuration file
- Generate the TLS certifications
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

Open the `./docker/full-node/docker-compose.yml` in your favorite text editor.

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

### Create the Ursa-proxy configuration file

We're going to assume that you're running the Docker stack with a system administrative user, such as a sudoer or root. This means that the `.ursa` directory will be located at:

```sh
/root/.ursa
```

If you have changed the way you run Docker and containers, such as we have described in [Securing the Ursa files](../Network%20nodes/fleek-network-securing-the-ursa-files), then that'll be located at `$HOME/.ursa`.

For the case where the directory does not exist, you can create it:

```
mkdir /root/.ursa
```

Create the proxy directory where the config file for ursa-proxy will be:

```
mkdir /root/.ursa/proxy
```

Create the Ursa proxy `config.toml`:

```
touch /root/.ursa/proxy/config.toml
```

Put the following content in the `config.toml`:

```
# Server without TLS.
[[server]]
proxy_pass = "127.0.0.1:4069"
listen_addr = "0.0.0.0:80"
serve_dir_path = ".well-known"

# Server with TLS
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

Find and replace `YOUR-DOMAIN` with your domain name. That'll be the values for the property `cert_path` and `key_path`, e.g. let's say that your domain name is `node.foobar.com`, you'd replace `YOUR-DOMAIN` to have:

```
[server.tls]
cert_path = "/etc/letsencrypt/live/node.foobar.com/fullchain.pem"
key_path = "/etc/letsencrypt/live/node.foobar.com/privkey.pem"
```

### Generate the TLS Certificates

Change the directory to where the Ursa project is located, e.g. by default `~/fleek-network/ursa`.

```
cd ~/fleek-network/ursa
```

1) Close any processes running on port 80

Find the PID of processes

```
lsof -i :80
```

If the port 80 is in use, you'll get a table similar to:

```
COMMAND PID   USER   FD   TYPE  DEVICE  SIZE/OFF  NODE NAME
foobar  88493 root   11u  IPv4  6545735      0t0  TCP  *:http (LISTEN)
```

Stop the process by name of PID

```
kill -9 <PID>
```

💡 Replace <PID> with the numerical value that corresponds to the process

For example, given the table result the PID is 88493

```
kill -9 88493
```

To complete, confirm there aren't any processes running on port 80 by running the command again

```
lsof -i :80
```

The response should be empty!

3) Stop the Docker stack

```
docker compose -f ./docker/full-node/docker-compose.yml down
```

4) Confirm that the domain name is pointing to the server's public IP address

We are assuming that you have your domain name pointing to the server public IP address since you are migrating NGINX to Ursa-proxy. But if you're at the same time changing the domain name address that points to your server, or haven't done it, you have to open the domain name registrar dashboard and update the record type A records and set the domain name to respond with the server public IP Address.

For example, let's say that your domain name is `node.example.com` and your server's public IP address is `181.196.118.156`, this is how it'd look hypothetically:

| Type        | Host                 | Answer            | TTL         |
| ----------- | -------------------- | ----------------- | ----------- |
| A           | node.example.com     | 181.196.118.156   | 300         |


Once you have [set up the DNS records](#how-to-set-up-the-dns-settings-for-a-node-server), verify the records are set correctly, for that you can easily run `dig` CLI or a website like [mxtoolbox](https://mxtoolbox.com/)](https://mxtoolbox.com/).

For our example, we're going to use the [dig](https://en.wikipedia.org/wiki/Dig_(command)) CLI.

💡 If you don't have `dig` installed, you can use your operating system package manager to install it, e.g. in Ubuntu you can run `apt-get install dig`

```sh
dig node.example.com +nostats +nocomments +nocmd
```

In the response, we get the IP address 181.196.118.156, as declared in the domain name registrar dashboard. Be aware that DNS propagation may take some time, if you need help troubleshooting check our reference [DNS troubleshooting](../../reference/DNS/domain-name-system-nameserver-troubleshooting). 

⚠️ Your server DNS resolver, should get the correct data otherwise the certification process will fail!

```sh
;node.example.com.      IN	A
node.example.com.		484 IN	A	181.196.118.156
```

There are many other tools you can use to verify the DNS records, feel free to pick your favorite!

5) Create the certificates

Execute the command which will start a standalone web server on port 80 of your host.

💡 Find and replace `<YOUR-VALID-EMAIL-ADDRESS>` and `<YOUR-VALID-DOMAIN-NAME>` with your email address and domain name. The email address is for administration purposes by [Let's Encrypt org](https://letsencrypt.org/), we don't store any of your data.

We're using backslashes "\" to break the lines to make it easier to read, you can ignore them.

```sh
docker compose -f ./docker/full-node/docker-compose.yml \
  -p 80:80 \
  --rm --entrypoint "\
  certbot certonly \
    --standalone \
    --preferred-challenges http \
    --email <YOUR-VALID-EMAIL-ADDRESS> \
    --domain <YOUR-VALID-DOMAIN-NAME> \
    --rsa-key-size 4096 \
    --agree-tos -n" certbot
```

For example, let's say that your email address is `skywalker@example.com` and `node.example.com`, this is what it'd look like:

```sh
docker compose -f ./docker/full-node/docker-compose.yml \
  -p 80:80 \
  --rm --entrypoint "\
  certbot certonly \
    --standalone \
    --preferred-challenges http \
    --email skywalker@example.com \
    --domain node.example.com \
    --rsa-key-size 4096 \
    --agree-tos -n" certbot
```

Once executed and if all goes well, you should get a "success" message similar to:

```sh
Domains: node.example.com
Creating full-node_certbot_run ... done
Generating a RSA private key
...........................................++++
......................................................................................................................................................................................................++++
writing new private key to '/etc/letsencrypt/live/node.example.com/privkey.pem'
-----

Creating full-node_certbot_run ... done
Saving debug log to /var/log/letsencrypt/letsencrypt.log
Requesting a certificate for node.example.com

Successfully received certificate.
Certificate is saved at: /etc/letsencrypt/live/node.example.com/fullchain.pem
Key is saved at:         /etc/letsencrypt/live/node.example.com/privkey.pem
This certificate expires on 2023-04-25.
These files will be updated when the certificate renews.

NEXT STEPS:
- The certificate will need to be renewed before it expires. Certbot can automatically renew the certificate in the background, but you may need to take steps to enable that functionality. See https://certbot.org/renewal-setup for instructions.

- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
If you like Certbot, please consider supporting our work by:
 * Donating to ISRG / Let's Encrypt:   https://letsencrypt.org/donate
 * Donating to EFF:                    https://eff.org/donate-le
```

💡 Notice the "Successfully received certificate", where it's saved at "/etc/letsencrypt/live/node.example.com", the "This certificate expires on 2023-04-25" and any other details you might find interesting.

### Quick health check

The working directory should be the Ursa project source code location, e.g. by default `~/fleek-network/ursa`.

```
cd ~/fleek-network/ursa
```

1) Start the Docker Stack services by running the Docker compose command

```sh
docker compose -f ./docker/full-node/docker-compose.yml up
```

2) Run a health check

As instructed in the [guide](fleek-network-node-health-check-guide), we can do a quick health check by making `cURL` requests to our server and reading the response. There's the option to get the response body that should be text `pong` or get some HTTP Headers.

```sh
curl -w "\n" https://<YOUR DOMAIN NAME>/ping
```

For our example, we have the domain `node.domain.com` and this is how the `cURL` request would look like:

```sh
curl -w "\n" https://node.domain.com/ping
```

A successful response should be `pong`

```sh
pong
```

Use the flag `-I` to get the HTTP Headers. To learn more read the guide [here](fleek-network-node-health-check-guide).

You can do these tests from any remote location that is not your server or local machine and the health check should pass, as the port should be publicly available to any service on the internet.

✨ If everything looks good, you have successfully migrated to the Ursa-proxy from NGINX.

## Native

On earlier versions of our Native setup, an NGINX service was included, as the reverse proxy for the Ursa service. Plus, required during the SSL/TLS certbot certification process to secure the domain name, that the process relied on.

Since the introduction of Ursa-proxy in our Ursa repository, and the related support added from [Ursa-proxy](https://github.com/fleek-network/get.fleek.network/commit/0afa813ab74eaf15d50ad126d0534bbe0a14aed9) configuration in the assisted installer that the Ursa-proxy is now the default reverse proxy in the Native setup.

If you have set up a node before these features, you'll have NGINX declared and stored in your file system.

We'll look into:
- Setup the Ursa-proxy
  - Pull the latest from source repository
  - Remove the NGINX configuration files
  - Create the `.ursa` proxy configuration directory
  - Create the certificates directories
  - Create a systemd service
- Generate the TLS certifications
- Do a health check