---
template: post
draft: false
hide_title: true
title: How to migrate to Ursa proxy from NGINX
slug: how-to-migrate-to-ursa-proxy-from-nginx
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

import Author from '@site/src/components/Author';

![](./assets/fleek-network-migrate-to-ursa-proxy-from-nginx.png?202304271224)

## Introduction

Many actors are free to communicate with your server, as Fleek Network encourages participation, but this comes with challenges, in terms of security, network resource availability, etc. To have a bit of control over the connections, a reverse proxy helps prevent users from connecting to the server processes directly, reducing the number of entry points and actions within the system.

On early builds, an NGINX service was included in the stack, fulfilling requirements and integrations simplicity. On the other hand, NGINX is a big project that offers features that are suitable for a wide range of use cases, which are not necessarily important for our goals, or particular use case.

We came up with the Ursa proxy, as a solution to replace NGINX, to provide us with a higher degree of control and customization to fit our service needs, such as mimicking the caching that NGINX does, SSL/TSL Certification, port mapping, etc.

In the following guide, we'll provide instructions to migrate from NGINX to the Ursa proxy.

## Docker stack

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

#### 1) Pull the latest version of the source code

Switch to the main branch

```
git checkout main
```

Run the following command to pull the latest commits from `origin/main`:

```
git pull origin main
```

⚠️ If this fails, due to any of the possible several reasons, e.g. handling staged or local changes, having to discard changes, or saving changes, check the [git documentation](https://git-scm.com/doc) to learn the basics.

#### 2) Update the Docker compose file

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

#### 3) Bind the host directories to the container

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

#### 4) Update the port numbers

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

#### 5) How the ursa-proxy configuration should look like

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

⚠️ Update Docker, you should run version >= 23. Check the version by running `docker version`

If you have changed the way you run Docker and containers, such as we have described in [Securing the Ursa files](./securing-the-ursa-files), then that'll be located at `$HOME/.ursa`.

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
proxy_pass = "full-node-ursa-1:4069"
listen_addr = "0.0.0.0:80"
serve_dir_path = ".well-known"

# Server with TLS
[[server]]
proxy_pass = "full-node-ursa-1:4069"
listen_addr = "0.0.0.0:443"

[server.tls]
cert_path = "/etc/letsencrypt/live/YOUR-DOMAIN/fullchain.pem"
key_path = "/etc/letsencrypt/live/YOUR-DOMAIN/privkey.pem"

# Admin service.
# You can omit this section as this is the default.
[admin]
addr = "0.0.0.0:8881"
```

⚠️ Make sure that you have updated Docker, otherwise the `config.toml` settings above won't work! You should run Docker >= 23

Find and replace `YOUR-DOMAIN` with your domain name. That'll be the values for the property `cert_path` and `key_path`, e.g. let's say that your domain name is `node.domain.com`, you'd replace `YOUR-DOMAIN` to have:

```
[server.tls]
cert_path = "/etc/letsencrypt/live/node.domain.com/fullchain.pem"
key_path = "/etc/letsencrypt/live/node.domain.com/privkey.pem"
```

### Generate the TLS Certificates

Change the directory to where the Ursa project is located, e.g. by default `~/fleek-network/ursa`.

```
cd ~/fleek-network/ursa
```

#### 1) Close any processes running on port 80

Find the PID of processes

```
lsof -i :80
```

If port 80 is in use, you'll get a table similar to:

```
COMMAND PID   USER   FD   TYPE  DEVICE  SIZE/OFF  NODE NAME
foobar  88493 root   11u  IPv4  6545735      0t0  TCP  *:http (LISTEN)
```

Stop the process by name of PID

```
kill -9 <PID>
```

💡 Replace `<PID>` with the numerical value that corresponds to the process

For example, given the table result the PID is 88493

```
kill -9 88493
```

To complete, confirm there aren't any processes running on port 80 by running the command again

```
lsof -i :80
```

The response should be empty!

#### 2) Stop the Docker stack

```
docker compose -f ./docker/full-node/docker-compose.yml down
```

#### 3) Confirm that the domain name is pointing to the server's public IP address

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

#### 4) Create the certificates

Execute the command which will start a standalone web server on port 80 of your host.

💡 Find and replace `<YOUR-VALID-EMAIL-ADDRESS>` and `<YOUR-VALID-DOMAIN-NAME>` with your email address and domain name. The email address is for administration purposes by [Let's Encrypt org](https://letsencrypt.org/), we don't store any of your data.

We're using backslashes "\" to break the lines to make it easier to read, you can ignore them.

```sh
docker compose -f ./docker/full-node/docker-compose.yml run \
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
docker compose -f ./docker/full-node/docker-compose.yml run \
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

### Quick health check

The working directory should be the Ursa project source code location, e.g. by default `~/fleek-network/ursa`.

```
cd ~/fleek-network/ursa
```

#### 1) Start the Docker Stack services by running the Docker compose command

```sh
docker compose -f ./docker/full-node/docker-compose.yml up
```

#### 2) Run a health check

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

On earlier versions of our Native setup, an NGINX service was included, as the reverse proxy for the Ursa service. Plus, required during the SSL/TLS Certbot certification process to secure the domain name, that the process relied on.

Since the introduction of Ursa-proxy in our Ursa repository, and the related support added from [Ursa-proxy](https://github.com/fleek-network/get.fleek.network/commit/0afa813ab74eaf15d50ad126d0534bbe0a14aed9) configuration in the assisted installer that the Ursa-proxy is now the default reverse proxy in the Native setup.

If you have set up a node before these features, you'll have NGINX declared and stored in your file system.

We'll look into:
- Setup the Ursa-proxy
  - Pull the latest from source repository
  - Build from source
  - Create the `.ursa` proxy configuration
  - Create the certificates directories
  - Create a systemd service
- Generate the TLS certifications
- Clean up (remove the NGINX files)
- Do a health check

### Setup the Ursa proxy

Change the working directory to where you have saved the Ursa repository, e.g. by default `~/fleek-network/ursa`.

```
cd ~/fleek-network/ursa
```

#### 1) Pull the latest version of the source code

Switch to the main branch

```
git checkout main
```

Run the following command to pull the latest commits from `origin/main`:

```
git pull origin main
```

⚠️ If this fails, due to any of the possible several reasons, e.g. handling staged or local changes, having to discard changes, or saving changes, check the [git documentation](https://git-scm.com/doc) to learn the basics.

### Build the Ursa proxy from source

The Ursa proxy is available as a [crate](https://github.com/fleek-network/ursa/tree/main/crates/ursa-proxy) in the source repository. You'll have to build from source every time a new update is available to have an executable. Also, create the configuration file, [systemd](https://en.wikipedia.org/wiki/Systemd) service, etc. This can take some time to get right, for this reason, we provide an install script to automate the processes.

You have two options! Either build from the source by running the install script or do it manually by following the instructions.

#### Run the Ursa proxy install script

```
curl https://get.fleek.network/install_ursa_proxy | bash
```

✨ Once completed you can move on to the next step! You are not required to follow the manual setup installation instructions.

#### Manual setup

#### 1) Run the install command

```
cargo install --path crates/ursa-proxy
```

It should install the executable `ursa-proxy` in `.cargo/bin/ursa-proxy`.

💡 Your Rust setup should've included the `~/.cargo/bin/ursa-proxy` in the system PATH environment variable, making the executable available globally. If you haven't or have a preference to keep your binaries in your local bin you can run the following command:

```
ln -s $HOME/.cargo/bin/ursa-proxy /usr/local/bin/ursa-proxy
```

Confirm that is available globally

```
ursa-proxy --version
```

You should get a response similar to

```
ursa-proxy x.x.x
```

#### 2) Create a Systemd service for the Ursa proxy

```
touch /etc/systemd/system/ursa-proxy.service
```

💡 If you don't have permissions, you may have to use `sudo`, e.g. `sudo touch /etc/systemd/system/ursa-proxy.service`

Set the file permissions for `ursa-proxy.service`

```
sudo chmod 644 /etc/systemd/system/ursa-proxy.service
```

Create the directory where the log (STDOUT) and diagnostic (STDERR) files will be saved.

```
mkdir -p /var/log/ursa-proxy
```

Create the file output.log

```
touch /var/log/ursa-proxy/output.log
```

Create the file diagnostic.log

```
touch /var/log/ursa-proxy/diagnostic.log
```

Set the file permissions for the Ursa proxy logs recursively

```
sudo chmod -R 644 /var/log/ursa-proxy
```

💡 If you don't have permissions, you may have to use `sudo`, e.g. `sudo touch /var/log/ursa-proxy/output.log`

Open the file `ursa-proxy.service` in your favorite text editor and put the following content inside

```
[Unit]
Description=Ursa-proxy, for the Decentralized Content Delivery Network (DCDN)

[Service]
Type=simple
MemoryHigh=1G
RestartSec=15s
Restart=always
ExecStart=ursa-proxy daemon
StandardOutput=append:/var/log/ursa-proxy/output.log
StandardError=append:/var/log/ursa-proxy/diagnostic.log

[Install]
WantedBy=multi-user.target
```

⚠️ Warning for property value in `ExecStart`, if you haven't symlink the `~/.cargo/bin/ursa-proxy` -> `/usr/local/bin/ursa-proxy`, use the absolute path to the executable, e.g. `/root/.cargo/bin/ursa-proxy daemon` which would look like `ExecStart=/root/.cargo/bin/ursa-proxy daemon`

Reload the system control daemon

```
sudo systemctl daemon-reload
```

✨ The service was built and set up as a Systemd service!

### Create the Ursa proxy configuration

The Ursa proxy requires a configuration where the certificate's path is declared, among other properties such as the proxy pass and listener address, etc.

⚠️ Warning, we're assuming that you run Ursa with an administrative account such as `sudoer` user, for this reason, `.ursa` is assumed to be in `/root` as follows `/root/.ursa`. If you have changed file permissions and setup, use the correct path.

#### 1) Create the proxy directory where the config file for ursa-proxy will be:

```
mkdir -p /root/.ursa/proxy
```

💡 If you don't have permissions, use `sudo` e.g. `sudo mkdir -p /root/.ursa/proxy`

#### 2) Create the Ursa proxy `config.toml`:

```
touch /root/.ursa/proxy/config.toml
```

Open the `/root/.ursa/proxy/config.toml` in your favorite text editor and put the following content in the `config.toml`:

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

Find and replace `YOUR-DOMAIN` with your domain name. That'll be the values for the property `cert_path` and `key_path`, e.g. let's say that your domain name is `node.domain.com`, you'd replace `YOUR-DOMAIN` to have:

```
[server.tls]
cert_path = "/etc/letsencrypt/live/node.domain.com/fullchain.pem"
key_path = "/etc/letsencrypt/live/node.domain.com/privkey.pem"
```

### Generate the TLS Certificates

Change the directory to where the Ursa project is located, e.g. by default `~/fleek-network/ursa`.

```
cd ~/fleek-network/ursa
```

Then, you have two options! Either run the Lets Encrypt install script we provide to automate the process for you or follow the instructions in the guide.

#### Run the Lets Encrypt install script

```
curl https://get.fleek.network/lets_encrypt | bash
```

⚠️ Update Docker, you should run version >= 23. Check the version by running `docker version`

✨ Once completed you can move on to the next step! You are not required to follow the steps to install the TLS Certificates manually.

#### Manual

#### 1) Close any processes running on port 80

Find the PID of processes

```
lsof -i :80
```

If port 80 is in use, you'll get a table similar to:

```
COMMAND PID   USER   FD   TYPE  DEVICE  SIZE/OFF  NODE NAME
foobar  88493 root   11u  IPv4  6545735      0t0  TCP  *:http (LISTEN)
```

Stop the process by name of PID

```
kill -9 <PID>
```

💡 Replace `<PID>` with the numerical value that corresponds to the process

For example, given the table result the PID is 88493

```
kill -9 88493
```

To complete, confirm there aren't any processes running on port 80 by running the command again

```
lsof -i :80
```

The response should be empty!

#### 2) Confirm that the domain name is pointing to the server's public IP address

We are assuming that you have your domain name pointing to the server public IP address since you are migrating NGINX to Ursa-proxy. But if you're at the same time changing the domain name address that points to your server, or haven't done it, you have to open the domain name registrar dashboard and update the record type A records and set the domain name to respond with the server public IP Address.

For example, let's say that your domain name is `node.example.com` and your server's public IP address is `181.196.118.156`, this is how it'd look hypothetically:

| Type        | Host                 | Answer            | TTL         |
| ----------- | -------------------- | ----------------- | ----------- |
| A           | node.example.com     | 181.196.118.156   | 300         |


Once you have [set up the DNS records](#how-to-set-up-the-dns-settings-for-a-node-server), verify the records are set correctly, for that you can easily run `dig` CLI or a website like [mxtoolbox](https://mxtoolbox.com/)](https://mxtoolbox.com/).

For our example, we're going to use the [dig](https://en.wikipedia.org/wiki/Dig_(command)) CLI.

💡 If you don't have `dig` installed, you can use your operating system package manager to install it, e.g. in Ubuntu, you can run `apt-get install dig`

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

#### 3) Create the certificates

Execute the command which will start a standalone web server on port 80 of your host.

💡 Find and replace `<YOUR-VALID-EMAIL-ADDRESS>` and `<YOUR-VALID-DOMAIN-NAME>` with your email address and domain name. The email address is for administration purposes by [Let's Encrypt org](https://letsencrypt.org/), we don't store any of your data.

We're using backslashes "\" to break the lines to make it easier to read, you can ignore them.

```sh
sudo certbot certonly \
    --standalone \
    --preferred-challenges http \
    --email <YOUR-VALID-EMAIL-ADDRESS> \
    --domain <YOUR-VALID-DOMAIN-NAME> \
    --rsa-key-size 4096 \
    --agree-tos -n
```

For example, let's say that your email is "skywalker@example.com" and  domain "node.domain.com", it'd look like this:

```sh
sudo certbot certonly \
    --standalone \
    --preferred-challenges http \
    --email skywalker@example.com \
    --domain node.domain.com \
    --rsa-key-size 4096 \
    --agree-tos -n
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

#### 4) Start the Ursa proxy

```sh
sudo systemctl start ursa-proxy
```

If the ursa-proxy was already running, you could reload the TLS Configuration only and not have to restar the service, as follows:

```sh
curl -X POST 0.0.0.0:8881/reload-tls-config
```

### Quick health check

The working directory should be the Ursa project source code location, e.g. by default `~/fleek-network/ursa`.

```
cd ~/fleek-network/ursa
```

#### 1) Check Ursa and Ursa Proxy services status

You can check the current status by running the command for `ursa.service`

```sh
sudo systemctl status ursa
```

Or, the command for `ursa-proxy.service`

```sh
sudo systemctl status ursa-proxy
```

The response should be similar to:

```
● ursa-proxy.service - Ursa-proxy, for the Decentralized Content Delivery Network (DCDN)
     Loaded: loaded (/etc/systemd/system/ursa-proxy.service; enabled; vendor preset: enabled)
     Active: active (running) since Fri 2023-04-28 12:38:54 UTC; 5h 22min ago
   Main PID: 88493 (ursa-proxy)
      Tasks: 17 (limit: 19153)
     Memory: 3.8M (high: 1.0G available: 1020.1M)
        CPU: 17.830s
     CGroup: /system.slice/ursa-proxy.service
             └─88493 ursa-proxy daemon
```

Notice that the response status above, says that it's active

```
Active: active (running) since Fri 2023-04-28 12:38:54 UTC; 5h 22min ago
```

#### 2) Start the Ursa and Ursa-proxy services

If the status of the services are not running you start the service(s) by running:

```
sudo systemctl start ursa
```

```
sudo systemctl start ursa-proxy
```

If you run the `status` command from then on, it should be `active (running)`.

#### 3) Run a health check

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

### Clear NGINX

We'll assume that your use case is the Fleek Network node and that the NGINX server only has the node setup and no other services or sites. If that's the case, you'd want to uninstall and purge NGINX.

Clearing NGINX will depend if you're using it for anything else than Ursa setup. If your only use case is ursa, you can go ahead and uninstall and purge NGINX, otherwise for users who have multiple sites or web services then you should disable the Ursa NGINX site configuration.

Here's how you'd uninstall and purge NGINX

Stop the NGINX service

```
sudo systemctl stop nginx
```

Purge everything (including all config files data)

```
sudo apt purge nginx nginx-common nginx-core
```

On the other hand, if you have multiple sites configured, make sure that you take the required cautions to avoid breaking your sites or web services.

Disable the NGINX Ursa site by removing the symlinks for the Ursa configurations.

Delete the HTTP configuration symlink

```
rm /etc/nginx/sites-enabled/ursa-http.conf
```

Delete the HTTPS configuration symlink

```
rm /etc/nginx/sites-enabled/ursa-https.conf
```

Remove the NGINX Ursa configuration files, as you won't need these any longer.

Delete the HTTP configuration

```
rm /etc/nginx/sites-available/ursa-http.conf
```

Delete the HTTPS configuration

```
rm /etc/nginx/sites-available/ursa-https.conf
```

Reload NGINX

```
sudo systemctl reload nginx
```

⚠️ Bear in mind that the Lets Encrypt Certbot process requires port 80 to be free, otherwise it'll fail if you wish to auto-renew or create new certificates

## Conclusion

Fleek Network processes don't have to be fully exposed to the world, to prevent some of the concerns in that regard and networking security, we have a reverse proxy to offer us a bit of control. A reverse proxy helps prevent users from connecting to the server processes directly, reducing the number of entry points and interactions from external actors.

On early builds, the NGINX Service was included as a Docker Service, or as a service in your host operating system. As we build the project, there is a need to provide better control and customization which lead to building our reverse proxy implementation that mimics some of the features offered by NGINX with a smaller footprint.

The guide illustrates the steps required to migrate to Ursa proxy from NGINX in either Docker Stack or Native.

Discover more about the project by [watching/contributing on Github](https://github.com/fleek-network/ursa), following us on [Twitter](https://twitter.com/fleek_net), and joining [our community Discord](https://discord.gg/fleekxyz) for all the best updates!

<Author
    name="Helder Oliveira"
    image="https://github.com/heldrida.png"
    title="Software Developer + DX"
    url="https://github.com/heldrida"
/>
