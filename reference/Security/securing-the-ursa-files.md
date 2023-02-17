---
template: post
draft: false
hide_title: false
title: Securing the Ursa files
slug: securing-the-ursa-files
date: 2023-02-16T26:00:00Z
canonical: ''
description: Quick reference to secure the ursa files
category: Reference
tags:
- Reference
- Fleek Network
- identity
- keystore
- security
---

Check if Docker group exists

```sh
cat /etc/group | grep 'docker' > /dev/null  && echo "🥳 Docker group exists!"
```

Create a new group `Docker`

```sh
sudo groupadd docker
```

Create a new user

```sh
sudo adduser <YOUR-USERNAME>
```

Add a user to a group

```sh
sudo usermod -aG docker skywalker
```

Restart the docker daemon

```sh
sudo systemctl stop docker
```

```sh
sudo systemctl start docker
```

Start the Docker Stack with a non-administrative user (e.g. non root)

```sh
# Change directory to where Ursa repository is stored
# by default `$HOME/fleek-network/ursa`
# e.g., if you've installed as user `root` it'll be located
# in `/home/root/fleek-network/ursa` by default
# after switching user you'd have to `mv` or `reinstall`
# to have it in the /home/username/fleek-network/ursa path
cd $HOME/fleek-network/ursa

# The `down` command
docker compose -f ./docker/full-node/docker-compose.yml down

# The `up` command
docker compose -f ./docker/full-node/docker-compose.yml up
```

Start in detached mode

```sh
docker compose -f ./docker/full-node/docker-compose.yml up --detach
```

Move the Ursa project files (replace `<USERNAME>` with targed or desired `username`). The example shows move from `username A` to `username B`

```sh
mv /home/<USERNAME-A>/fleek-network /home/<USERNAME-B>/
```

Here's how the directory should look like at time of writing

```sh
/home/<USERNAME>/fleek-network/
└── ursa
    ├── CODE_OF_CONDUCT.md
    ├── Cargo.toml
    ├── Dockerfile
    ├── Dockerfile-gateway
    ├── LICENSE-APACHE
    ├── LICENSE-MIT
    ├── Makefile
    ├── README.md
    ├── crates
    ├── doc
    ├── docker
    ├── fly.toml
    ├── infra
    ├── rust-toolchain.toml
    ├── sdk
    ├── test-plans
    └── test_files
```

Move the Ursa config files (replace `<USERNAME>` with targed or desired `username`). The example shows move from `username 1` to `username 2`

```sh
mv /home/<USERNAME-A>/.ursa /home/<USERNAME-B>/
```

This is what the directory `/home/skywalker/.ursa` looks like at the time of writing:

```sh
/home/skywalker/.ursa/
├── config.toml
├── data
│   ├── index_provider_db
│   └── ursa_db
└── keystore
    └── default.pem
```

Change ownership recursively

```sh
chown -R <USERNAME>:<GROUP> /home/<USERNAME>/.ursa
```

Change permissions recursively

```sh
chmod -R u+rwx /home/<USERNAME>/.ursa
```

Change permissions

```sh
chmod -R <NUMBER> /home/<USERNAME>/.ursa
```

Switch user

```sh
su <USERNAME>
```

Quick health check to endpoint `/ping`, should have response `pong`

```sh
curl https://YOUR-DOMAIN-NAME/ping
```

List file permissions for the `.ursa` configuration directory

```sh
ls -l /home/<USERNAME>/.ursa
```

Verbose version to check file permissions

```sh
find $HOME/.ursa -printf '%M %u %g %p\n' | less
```

Filter some directory from response, e.g., `.ursa/data`

```sh
find $HOME/.ursa -printf '%M %u %g %p\n' | grep -v "$HOME/.ursa/data" | less
```