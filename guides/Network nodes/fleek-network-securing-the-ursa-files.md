---
template: post
draft: false
hide_title: true
title: Securing the Ursa files
slug: securing-the-ursa-files
image: ./assets/fleek-network-securing-the-ursa-files.png?202302161437
date: 2023-02-16T23:00:00.000+00:00
canonical: ''
description: The concept of file permissions and ownership is crucial in preventing private or sensitive data from being exposed to dodgy actors. In this guide, we will explain Linux file permissions and ownership to help us improve the security of our Network Node server.
category: Tutorial
tags:
- CDN
- Guide
- Getting Started
- Fleek Network
- Security
---

import Author from '@site/src/components/Author';
import YoutubePlayer from '@site/src/components/YoutubePlayer';

![Fleek Network: Getting started guide](./assets/fleek-network-securing-the-ursa-files.png?202302161437)

## Introduction

The concept of file permissions and ownership is crucial in preventing private or [sensitive data](https://en.wikipedia.org/wiki/Information_sensitivity) from being exposed to dodgy actors. In this guide, we will explain Linux file permissions and ownership to help us improve the security of our Network Node server.

Our Ursa CLI process is run by a `user`, that has some sort of permissions, some users run it as `root` which should be considered, as `root privileges` are not a necessary good.

Let's discuss the topic and open up a few ideas to help us improve the security of our server!

## Pre-requisites

To follow the guide, you will need the following:

- Familiarity with the command-line interface
- A supported Linux Server Operating system
  - Ubuntu (22.04 LTS), or earlier
  - Debian (version 11), or earlier
  - ArchLinux, which has rolling updates.
- Ursa Network Node installed and running correctly

## Quick Video

A walkthrough video is provided as a quick reference for the users, we try to keep it simple and would suggest the text guide version to get more detailed information. 

The video content is stored in our Fleek Network [playlist](https://www.youtube.com/watch?v=uAFIDu3UBvw&list=PL3v9ZaTBrN9GEQ2NmS5xc6YH0E2df5VTn) on the Fleek XYZ [Youtube channel](https://www.youtube.com/@fleekxyz).

<YoutubePlayer
  title="How to Secure Ursa Files on Fleek Network Nodes"
  videoId="55SH6KQf3cs"
/>

How do you find the video content? Help us improve by sending feedback in our Discord channel [here](https://discord.gg/fleekxyz).

## Why should I care?

You should be interested in securing the server, to prevent unwanted access to sensitive data, for instance, your identity (private keys) to which the rewards are sent!

This can happen in many ways, but if you follow good practices you can reduce some of the risks managing the server where the Ursa Network Node is run.

A Linux server is a multi-user system that uses permissions and ownership has security. By allowing multiple users into a system, trust has to be thought out! There should be a way to control file permissions, naming who's allowed to access what, and in which locations.

Ideally, you should be the only actor who can read or modify the private keys. The processes or programs installed should not be able to read your private files without permission. For example, if you run a random script from the internet, as `root`, and if the script is maliciously targeting Fleek Network node operators, your identity and private data can be compromised. There'll be no one to help you or blame than yourself!

As the [Wu-Tang](https://en.wikipedia.org/wiki/Wu-Tang_Clan) once rapped about ["Protect ya neck"](https://www.youtube.com/watch?v=1_-3Bh1VFI8).

## How do I know if my system is vulnerable?

If you are running the Docker Stack, or the Ursa CLI, as the `root` user, your file permissions are likely in need of good care.

On the other hand, if you have questions, or are curious, about where your identity (private keys) is kept and don't know how to improve the security of the files, then this is a good start! You'll also find our guide about [Managing the key store](./fleek-network-managing-the-key-store.md) a good read.

There's also a section in this about [How to check if the Ursa directories are secured](#how-to-check-if-the-ursa-directories-are-secured)

## Securing the Ursa home directory

We'll look into securing access to the `$HOME/.ursa` directory, where sensitive data, such as the identity is stored. Providing control to specific users or groups helps prevent unwanted access to private files. Don't trust, verify!

> "Trust leads to the dark side." - Obi Wan Kenobi

💡 For our example, we are sticking with Ubuntu, do the equivalent for your OS. We'll assume that you are login as `root`, to emphasize our goal. Additionally, we're going to use the Docker Stack, but it should be similar even if you have Ursa installed natively, but you'll have to do the required tweaks accordingly.

### What's the relation with running the node?

Before we get started, let's look at how the `Docker` daemon works! Your container runs one single process. The process runs as a `UID:GID` (User:Group), just like any other process on your system. We should set the permissions on the directory we bind mount accordingly! 

This means that the same principle is applied if running the Node natively! In other words, there is nothing special about this process running in the container - treat it as if it wasn't!

By default, `Docker` daemon runs as the `root` user, the `root` user has full control of the system and has the power to do some nasty things if not careful. You can run Docker daemon without root (Rootless mode) and docker provides [documentation](https://docs.docker.com/engine/security/rootless/) about it. 

For our use-case, we want to run the Docker Stack as a non-administrative user (lower permissions in the system), as our service is meant to be run with non-root privileges, and ideally, only elevate their privileges to modify the underlying system when authorized. In any case, be aware that even if you can start the docker daemon without root, you'd still have the ability to start our Docker Stack with root, which is something we want you to avoid doing, as it's not necessary.

### Stopping the Network Node

Before going any further, let's stop the Docker Stack (a must, if you have started the Fleek Network Ursa Docker Stack with `root` user). If you're following while running in a native setup, you need to stop the `ursa cli` process, as mentioned earlier we'll stick with the Docker stack as an example, so apply the required tweaks where needed.

Change the directory to the Ursa repository (by default, located in `$HOME/fleek-network/ursa`).

```sh
docker compose -f ./docker/full-node/docker-compose.yml down
```

Afterward, we'll run the Docker Stack as a new user with non-root privileges.

### Group existence checkups

Start by checking if the `docker` group exists in the system by running the following command (if the `docker` group exists, you should get the response "🥳 Docker group exists!").

💡 If you are following this guide while running a native build, you don't need a `docker` group, but you might consider creating a group meant to manage and run the Ursa process, you can name it whatever is more meaningful to you. We'll stick with the Docker Stack setup as an example, and apply the required tweaks where necessary.

```sh
cat /etc/group | grep 'docker' > /dev/null  && echo "🥳 Docker group exists!"
```

If not, create the `docker` group.

```sh
sudo groupadd docker
```

## Create a new user for running the node

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

⚠️ If you are following this guide on a native setup, you won't need a `docker` group, but another group of your liking might apply. Make the required tweaks as necessary, as we'll stick with Docker Stack as an example.

💡 You may have to restart the Docker daemon (which requires `sudo` if you are not `root`).

### Restart the docker daemon

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

### Things to have in mind

Here are a few things to have in mind - there are more -, but these are the ones that came to mind at the time of writing (feel free to contribute or provide feedback):

- Our recommendation is to keep the user `skywalker` from the `sudoers` list, as a proper Jedi, we separate ourselves from the dark forces
- Advanced users might customize their system as they wish, here we try to provide knowledge for the inclusivity of all kinds of knowledge users
- You should NOT run the Fleek Network Stack with `root` privilege
- `sudo` allows users to execute system commands with `root` privilege
- A user in the `sudoer` list can do whatever he wants in the system
- Do not trust users e.g., anyone might run a script or command that exposes or compromises your private keys located in `$HOME/.ursa/keystore`
- Users who logged in as `root` during the installation, most likely have it installed under `/home/root/fleek-network/ursa`, meaning that when switching users have to move the `fleek-network` directory to `$HOME/fleek-network` or reinstall

### Move the Ursa source to the new user's home

Since we are logged in as, installed as, and running as `root`, our Ursa repository is stored in the `$HOME/fleek-network` by default, which `$HOME` for `root` is `/home/root`. The user `skywalker` won't have permission to read, write or execute in or from the directory. We'll then either, reinstall the Ursa using our assisted installer after we switch the user to `skywalker`, or move `mv` the directories beforehand.

We're going to opt to move the directories, as an example but if you have a preference for running the assisted installer, that's fine! Do remember to remove or delete the `/home/root/fleek-network` and `/home/root/.ursa` (⚠️ be careful, the `.ursa` directory has your private keys, so do a backup otherwise you'll lose it and we won't be able to help).

💡 Notice that we are using the default `$HOME/fleek-network/ursa` path, you may have installed it in a different location, so tweak it accordingly to your customizations

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

### Changing Ursa files ownership

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

### Switching to the non-administrative user

Finally, we switch to the user `skywalker`:

```sh
su skywalker
```

Change the directory to the `skywalker` Ursa's source repository path:

```sh
cd $HOME/fleek-network/ursa
```

### Start Ursa as the non-administrative user

Start the Docker Stack as `skywalker` by executing the following command that you should be familiar with at this point:

```sh
docker compose -f ./docker/full-node/docker-compose.yml up
```

💡 Use the flag `-d` or `--detach` at the end to start the Docker Stack in [detached mode](https://docs.docker.com/engine/reference/commandline/compose_up/) if you'd like to run the containers in the background (meaning that the process does NOT communicate via the screen and the keyboard, e.g., avoid displaying the log output which can be enabled at any time with `logs -f`)

```sh
docker compose -f ./docker/full-node/docker-compose.yml up --detach
```

### Quick health-check

Make sure everything's ok by doing a quick health check. If you'd like to learn more about health checks, check our guide [here](./fleek-network-node-health-check-guide).

You can do this check in any location, but ideally from outside the server network to ensure you're making a remote call

```sh
curl -w "\n" https://YOUR-DOMAIN-NAME/ping
```

Should reply with the response `pong`

```sh
pong
```

🫡 That's it skywalker! If you've followed this guide successfully, you've secured the `.ursa` directory, the configuration files and your private keys.

## How to check if the Ursa directories are secured?

It's a good practice to verify the health of your setup from time to time. Doing a permissions checkup on the file system gives you peace of mind and helps ensure that sensitive data is protected.

⚠️ You're required to have followed the steps before to secure the `.ursa` configuration directory and also run the Node as non-root. If you haven't yet, follow the steps provided [here](#securing-the-ursa-home-directory).

We're using the example username `skywalker`, change to the one you've used on your setup accordingly.

Use the [ls](https://en.wikipedia.org/wiki/Ls) command to list information about the files. For example, we can check the parent directory with `ls` and the `l` flag.

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

🤔 Try to read it this way, the first character is the file type while the remaining is the access permissions.

For `drwx------`, the `d` represents a directory, when not `-` means `file`, we then have `rwx` for read, write and execute for section `user`.

Notice that after, `------` there's nothing set for `group` and `other`. In short (file type)(user permissions)(group permissions)(other permissions). 

Also, remember that the group may have permissions, and when a user is added to the group it'll inherit those permissions.


## Final Thoughts

We started by declaring that is crucial to learn about Linux file permissions and ownership, to improve the security of our server, also protect sensitive data from being captured by malicious actors.

Used the Docker Stack for guidance, where we instruct how to start it without `sudo`, learned how to create a new user and groups, and change ownership and permissions in the file system, including the `.ursa` configuration files where the identity or private keys are stored.

Finally, completed our guide by demonstrating how to check if the Ursa directories are secured by providing some command examples and a description to help understand the attributes that describe the file types and permissions.

The guide serves as a getting started in the subject and in any way tries to fulfill the role of granting the ultimate security of the server. For advanced topics in securing a Linux server, it's best to invest time and better resources which is not possible in the scope of this short guide: the knowledge of Linux security is applicable in the context of running a Fleek Network node.

If you'd like to contribute and share your knowledge you are free to do so by providing us a PR in our repository [here](https://github.com/fleek-network/fleek-network-docs).

Discover more about the project by [watching/contributing on Github](https://github.com/fleek-network/ursa), following us on [Twitter](https://twitter.com/fleek_net), and joining [our community Discord](https://discord.gg/fleekxyz) for all the best updates!

<Author
    name="Helder Oliveira"
    image="https://github.com/heldrida.png"
    title="Software Developer + DX"
    url="https://github.com/heldrida"
/>
