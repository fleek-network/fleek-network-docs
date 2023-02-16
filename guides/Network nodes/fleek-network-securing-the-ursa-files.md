---
template: post
draft: false
hide_title: true
title: Securing the Ursa files
slug: securing-the-ursa-files
image: ./assets/fleek-network-securing-the-ursa-files.png?202302151700
date: 2022-11-30T23:00:00.000+00:00
canonical: ''
description: 
category: Tutorial
tags:
- CDN
- Guide
- Getting Started
- Fleek Network
- Security
---

import Author from '@site/src/components/Author';

![Fleek Network: Getting started guide](./assets/fleek-network-securing-the-ursa-files.png?202302151700)

## Introduction


## Pre-requisites

To follow the guide, you will need the following:

- Familiarity with the command-line interface
- A supported Linux Server Operating system
  - Ubuntu (22.04 LTS), or earlier
  - Debian (version 11), or earlier
  - ArchLinux, which has rolling updates.
- Ursa Network Node installed and running correctly

## Securing the Ursa home directory

We'll look into securing access to the `$HOME/.ursa` directory, where sensitive data, such as the identity is stored. Providing control to specific users or groups helps prevent unwanted access to private files. Don't trust, verify!

> "Trust leads to the dark side." - Obi Wan Kenobi

💡 For our example, we are sticking with Ubuntu, do the equivalent for your OS and we're assuming that you are login as `root`. Additionally, we're going to use the Docker Stack but if you have it installed natively, should be very similar, do the required tweaks accordingly.

Before we get started, let's look at how the `Docker` daemon works! Your container runs one single process. The process runs as a `UID:GID` (User:Group), just like any other process on your system. We should set the permissions on the directory we bind mount accordingly!

By default, `Docker` daemon runs as the `root` user, the `root` user has full control of the system and has the power to do some nasty things if not careful. We want to run Docker as a non-administrative user (lower permissions in the system), apps are meant to be run with non-root privileges and ideally, only elevate their privileges to modify the underlying system when authorized.

Before going any further, let's stop the Docker Stack (a must, if you have started the Fleek Network Ursa Docker Stack with `root` user).

Change the directory to the Ursa repository (by default, located in `$HOME/fleek-network/ursa`).

```sh
docker compose -f ./docker/full-node/docker-compose.yml down
```

Afterward, we'll run the Docker Stack as a new user with non-root privileges.

Start by checking if the `docker` group exists in the system by running the following command (if the `docker` group exists, you should get the response "🥳 Docker group exists!").

```sh
cat /etc/group | grep 'docker' > /dev/null  && echo "🥳 Docker group exists!"
```

If not, create the `docker` group.

```sh
sudo groupadd docker
```

Add a new user with the following command:

```sh
sudo adduser <YOUR-USERNAME>
```

For our example, we'll name it `skywalker` but you can choose any other name:

```sh
sudo adduser skywalker
```

Let's add the user `skywalker` to the docker group:

```sh
sudo usermod -aG docker skywalker
```

💡 You may have to restart the Docker daemon (which requires `sudo` if you are not `root`).

Run the `stop` and then `start` commands.

```sh
systemctl stop docker
```

```sh
systemctl start docker
```

From now on, the user `skywalker` will have the ability to `up` or `down` the Docker Stack without `sudo`.

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

Our recommendation is to keep the user `skywalker` from the `sudoers` list, as a proper Jedi, we separate ourselves from the dark forces! 

🥹 Advanced users might customize their system as they wish, here we try to provide knowledge for the inclusivity of all kinds of knowledge users.

Here are a few things to have in mind:
- You should NOT run the Fleek Network Stack with `root` privilege
- `sudo` allows users to execute system commands with `root` privilege
- A user in the `sudoer` list can do whatever he wants in the system
- Do not trust users e.g., anyone might run a script or command that exposes or compromises your private keys located in `$HOME/.ursa/keystore`
- Users who logged in as `root` during the installation, most likely have it installed under `/home/root/fleek-network/ursa`, meaning that when switching users have to move the `fleek-network` directory to `$HOME/fleek-network` or reinstall

Since we are logged in as, installed as, and running as `root`, our Ursa repository is stored in the `$HOME/fleek-network` (by default), which `$HOME` for `root` is `/home/root`. The user `skywalker` won't have permission to read, write or execute in or from the directory. We'll then either, reinstall the ursa using our assisted installer after we switch the user to `skywalker`, or move `mv` the directories beforehand.

We're going to opt to move the directories, as an example but if you have a preference for running the assisted installer, that's fine! Do remember to remove or delete the `/home/root/fleek-network` and `/home/root/.ursa` (⚠️ be careful, the `.ursa` directory has your private keys, so do a backup otherwise you'll lose it and we won't be able to help).

💡 Notice that we are using the default `$HOME/fleek-network/ursa` path, you may have installed it in a different location, so tweak accordingly to your customizations

```sh
mv /home/root/fleek-network /home/skywalker/
```

This is how the directory `/home/skywalker/fleek-network` looks like at the time of writing:

```sh
/home/skywalker/fleek-network/
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

We do the same for `/home/root/.ursa`

```sh
mv /home/root/.ursa /home/skywalker/
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

We haven't yet switched from `root` to `skywalker`, so before we switch from `root` to `skywalker`, we're going to change the owner of the `$HOME/.ursa` directory, where sensitive data is located (in particular the private identity keys).

```sh
chown -R skywalker:skywalker /home/skywalker/.ursa
```

Including, changing permissions for the directory `$HOME/.ursa` and files recursively (the parent and nested child directories and files), granting read, write and execute permissions for the user `skywalker` and group `skywalker`.

```sh
chmod -R u+rwx /home/skywalker/.ursa
```

Following up, we say **g** `group` and **o** `other` should **NOT** have **r**ead, **w**rite and **e**xecute permissions for `/home/skywalker/.ursa`.

```sh
chmod -R go-rwx /home/skywalker/.ursa
```

Alternatively, you can do `chmod -R 700 /home/skywalker/.ursa`, but as we are aiming for clarity in the instructions, we opted for the clearest option to suit more users.

Finally, we switch to the user `skywalker`:

```sh
su skywalker
```

Change the directory to the `skywalker` Ursa's source repository path:

```sh
cd $HOME/fleek-network/ursa
```

Start the Docker Stack by executing the following command that you should be familiar with at this point:

```sh
docker compose -f ./docker/full-node/docker-compose.yml up
```

💡 Use the flag `-d` or `--detach` at the end to start the Docker Stack in detached mode, if you'd like to run the containers in the background (meaning that the process does NOT communicate via the screen and the keyboard, e.g., avoid the log output but can check anytime with `logs -f`)

```sh
docker compose -f ./docker/full-node/docker-compose.yml up --detach
```

Make sure everything's ok by doing a quick health check. If you'd like to learn more about health checks, check our guide [here](./fleek-network-node-healthchecks.md).

```sh
curl https://YOUR-DOMAIN-NAME/ping
```

Should reply with the response `pong`

```sh
pong
```

🫡 That's it skywalker! If you've followed this guide successfully, you've secured the `.ursa` directory, the configuration files and your private keys.

## How to check if the Ursa directory is secured?

It's a good practice to verify the health of your setup from time to time. Doing a permissions checkup on the file system gives you peace of mind that sensitive data is protected.

⚠️ You're required to have followed the steps before to secure the `.ursa` configuration directory and also run the Node as non-root. If you haven't yet, follow the steps provided earlier!

We're using the example username `skywalker`, tweak to the one you've used on your setup accordingly.

Use the `ls` command to list information about the files. For example, we check the parent directory

```sh
ls -l /home/skywalker/.ursa
```

You can keep inspecting the nested directories but it's quite a lot of labor.

```sh
total 12
-rwx------ 1 skywalker skywalker  687 Feb 15 18:24 config.toml
drwx------ 4 skywalker skywalker 4096 Feb 15 18:24 data
drwx------ 2 skywalker skywalker 4096 Feb 15 18:24 keystore
```

You can check all the directories and files recursively if you wish. For example:

```sh
find $HOME/.ursa -printf '%M %u %g %p\n' | less
```

You can exclude certain directories, for example, let's filter out the `.ursa/data` directory:

```sh
find $HOME/.ursa -printf '%M %u %g %p\n' | grep -v "$HOME/.ursa/data" | less
```

Here's what the output looks like at the time of writing:

```sh
drwx------ skywalker skywalker /home/skywalker/.ursa
-rwx------ skywalker skywalker /home/skywalker/.ursa/config.toml
drwx------ skywalker skywalker /home/skywalker/.ursa/keystore
-rwx------ skywalker skywalker /home/skywalker/.ursa/keystore/default.pem
```

In the outputs, we can see the `UID:GID` (user:group) identifiers and also in the left bit the permissions that are set.

***

## Final Thoughts

Discover more about the project by [watching/contributing on Github](https://github.com/fleek-network/ursa), following us on [Twitter](https://twitter.com/fleek_net), and joining [our community Discord](https://discord.gg/fleekxyz) for all the best updates!

<Author
    name="Helder Oliveira"
    image="https://github.com/heldrida.png"
    title="Software Developer + DX"
    url="https://github.com/heldrida"
/>
