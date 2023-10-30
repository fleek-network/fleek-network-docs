---
title: Updating Lightning
hide_title: true
slug: updating-lightning
date: 2023-09-19T12:00:00.000+00:00
image: ./assets/updating-lightning.png?202309191740
description: A step-by-step guide to update the Lightning CLI from source code and Service setup
category: Tutorial
tags:
- update
- rebuild
- guide
- setup
- configuration
---

![Update Lightning](./assets/updating-lightning.png?202309191740)

import Author from '@site/src/components/Author';
import CheckoutCommitWarning from '../../guides/partials/_checkout-commit-warning.mdx';

## Introduction

Fleek Network's Lightning source code is updated frequently and thus keeping up with changes can be a bit of a chore and especially difficult for users who are trying to have it compiled for the first time, or updating the Lightning CLI binary for their operating systems. While we should have stable releases in the future, at the current phase of development, there's a requirement to follow the contributions directly in the repository: checking in and out, the commits you're interested in running.

In the following guide, we’ll have a simple look into how to pull changes and update Lightning CLI on Linux, which we stick with Ubuntu for simplicity but should be easily transferrable to your [supported OS](/docs/node/requirements#server). 

## Pre-requisites

To follow the guide, you will need the following:

- Familiarity with the command-line interface
- Some experience with Git
- Have installed and set up the Lightning CLI and service

## Pulling the latest changes

Check the latest contributions pushed to the Lightning CLI [main branch](https://github.com/fleek-network/lightning/commits/main), it'll give you clarity on what's been committed into the source code. Therefore, find out about new features, fixes, improvements, etc by looking directly into the repository history.

### Switch to installer username

First, switch to the username you've used to install and setup Fleek Network Lightning.

To switch to the username you've used throughout the installation process do:

```sh
su <USERNAME>
```

For example, if you used the username `lgtn` it'll look like the following command:

```sh
su lgtn
```

### Change directory to the source code

Next, `change directory` to the Lightning directory in your file system. 

:::tip
The tild `~` means user $HOME, thus you have to be logged in with the correct user as requested in the [installer username](#switch-to-installer-username) step.
:::

```sh
cd <PATH-TO-LIGHTNING-SOURCE-CODE>
```

If you have installed it via the recommended instructions, then the default location where the [source code](https://github.com/fleek-network/lightning) is stored should be `~/fleek-network/lightning`. Otherwise, if you opted-in for a custom location then look into your notes before proceeding.

For example, it'd look like the following command:

```sh
cd ~/fleek-network/lightning
```

### Checkout to branch


Make sure that you are checked in to the correct branch. For example, if that'd be the first testnet phase it'd be called `testnet-alpha-1`.

```sh
git checkout <BRANCH-NAME>
```

Here's an example of how the command would look like for the main default branch with corresponding name `main`.

```sh
git checkout main
```

<CheckoutCommitWarning />

Here's an example of how the command would look like for the branch name `testnet-alpha-1`.

```sh
git checkout testnet-alpha-1
```

### Pull the latest changes

The syntax to pull the latest commits is the following:

```sh
git pull <REPOSITORY-NAME> <BRANCH-NAME>
```

The git pull command is used to fetch and merge changes from the remote repository to the local repository. Here we're pulling from remote named `origin` and branch `main`. 

```sh
git pull origin main
```

:::tip
If you've made any changes in the local repository directory, clear them to prevent being blocked. As `git` is a `version control` program that looks for changes and will ask you to do something about it to prevent losing data. Most readers can disregard changes if not contributing to the development by simply [stashing](https://git-scm.com/docs/git-stash) or resetting the changes.

A quick way to clean is to `stash` the changes, for example:

```sh
git stash 
```
:::

You can check yourself, as follows:

```sh
git remote -v
```

Our output clearly describes what `origin` is tracking.

```sh
origin	git@github.com:fleek-network/lightning.git (fetch)
origin	git@github.com:fleek-network/lightning.git (push)
```

Alternatively, you can stash and pull, to reset the repository to the origin.

```sh
git fetch origin <BRANCH-NAME>
git reset --hard origin/<BRANCH-NAME>
git clean -f
```

:::tip
With `git` you can point to any point in the repository history, there might be lots of reasons you'd want to check into a certain commit or branch, e.g. if you encounter bugs and need to revert to a previous commit or version. That being said, we welcome all kinds of contributions, such as simply reporting bugs. To report issues in our repository visit the [issues](https://github.com/fleek-network/lightning/issues) page to help us improve.
:::

Here's the output we got after the git pull:

```sh
remote: Enumerating objects: 437, done.
remote: Counting objects: 100% (437/437), done.
remote: Compressing objects: 100% (205/205), done.
remote: Total 397 (delta 242), reused 334 (delta 181), pack-reused 0
Receiving objects: 100% (397/397), 214.68 KiB | 4.77 MiB/s, done.
Resolving deltas: 100% (242/242), completed with 29 local objects.
From https://github.com/fleek-network/lightning
 * branch            main       -> FETCH_HEAD
   12b2647..998108d  main       -> origin/main
Updating 12b2647..998108d
Fast-forward
 .dockerignore                                     |    6 -
 .gitignore                                        |    2 +
 Cargo.lock                                        |  782 +++++++----------------
 Cargo.toml                                        |    2 +-
 core/application/src/state.rs                     |   12 +-
 core/cli/Cargo.toml                               |   47 ++
 core/cli/readme.md                                |   59 ++
 core/cli/src/args.rs                              |   63 ++
 core/cli/src/cli.rs                               |  136 ++++
 core/cli/src/commands/dev.rs                      |  112 ++++
 core/cli/src/commands/key.rs                      |   92 +++

 ...
```

When your local version of the repository, is up-to-date with the remote repository, you'd get:

```sh
From https://github.com/fleek-network/lightning
 * branch            main       -> FETCH_HEAD
Already up to date.
```

A "already up to date" message means that you have the latest version of the source code and can proceed with compiling the binary process from the source code to override the `Lightning CLI` version you're on. You can also make any other setup changes that might find necessary. Some changes might be related to the recommended setup of Systemd Service that helps control the Fleek Network Lightning Node binary process, etc.

## Build the binary from the source code

We're assuming that your system setup hasn't changed, such as Rust toolchain still being installed and setup correctly in the system and any other required dependencies. If you have made changes to your system and need to revisit the setup instructions, check our install document [here](/docs/node/install).

First, switch the user and change directory to the Lightning directory in your file system as described in [switch to installer username](#switch-to-installer-username) [change directory to the source code](#change-directory-to-the-source-code) sections.

Recall the command from our install document or getting started guide? As you probably guessed, you need to execute the rust cargo build command. But firstly, we are going to clean and update the Rust package manager, as follows:

```sh
cargo clean
cargo update
```

Next, execute the build command to compile the Fleek Network Lightning CLI binary.

```sh
cargo +stable build --release
```

:::tip
The build command uses the Rust compiler, which might take a while depending on how speedy the host machine is capable.
:::

Once the Rust compiler completes, the generated binary will be available in the source code project directory. 

If you have stick with the default recommendation, that'll be at `~/fleek-network/lightning/target/release/lightning-node`.

## Checkup the symlink setup

During the original install and setup process, a symbolic link (symlink) was created linking the generated binary file located in `~/fleek-network/lightning/target/release/lightning-node` to `/usr/local/bin/lgtn`. By placing the symlink in the the default installation location of the user, the executable application is available globally as `lgtn`.


You can see the full absolute path of the symlink and verify if setup correctly by running:

```sh
readlink -f <SYMLINK-NAME>
```

If you have followed the recommended name, the symbolic link should be called `lgtn`, short version for `lightning`.

```sh
readlink -f lgtn
```

Here's an example where we find the symlink `lgtn` pointing to the absolute path where our source code and originated built binary is located, as described in the [build the binary from the source code](#build-the-binary-from-the-source-code) section.

```sh
/home/<USERNAME>/fleek-network/lightning/target/release/lightning-node
```

Alternatively, you can use the `ls` command to identify the symlink.

```sh
ls -la $(which lgtn)
```

If you find an error, it's very likely that a symlink is not setup. You can revisit the [installation](/docs/node/install) to learn, or execute the command to link the build binary to the user default install location:

```sh
sudo ln -s "~/fleek-network/lightning/target/release/lightning-node" /usr/local/bin/lgtn
```

:::tip
Make sure that the paths provided to the command `ln` are correct. If you are using customized pathnames or switched to a different username other than the one used for installation it has to change accordingly.
:::

## Systemd service

It's highly recommended to use systemd to manage the Fleek Network service for node operators. Systemd is a system and service manager for Linux operating systems that provides a consistent way to manage system services across various distributions.

### Verify the setup

The recommended setup is to wrap the Lightning binary process as a Systemd service, as instructed in the [install](/docs/node/install) section.

If you have followed the recommendations, you should have the service file called `ligthning.service` in the path `/etc/systemd/system/lightning.service`.

The content of `lightning.service` should have some or more of the following properties and values:

```
[Unit]
Description=Fleek Network Node lightning service

[Service]
Type=simple
MemoryHigh=32G
RestartSec=15s
Restart=always
ExecStart=lgtn -c /home/lgtn/.lightning/config.toml -vv run
StandardOutput=append:/var/log/lightning/output.log
StandardError=append:/var/log/lightning/diagnostic.log
Environment=TMPDIR=/var/tmp

[Install]
WantedBy=multi-user.target
```

Every time the file is modified, the Systemd process should be reloaded. You can do this by executing:

```sh
sudo systemctl daemon-reload
```

To learn more about how to create a Systemd service read the [manual installation](/docs/node/install#manual-installation) document that illustrates the steps required in greater detail.

### Launching the node as a systemd service

After completing all the steps and checkups mentioned throughout the guide, you should have the Fleek Network Lightning Service ready to go.

To launch the service, execute the following command:

```sh
sudo systemctl start lightning.service
```

To learn more about how to use Systemctl to manage the Lightning service, read the document [here](/docs/node/install#use-systemctl-to-manage-systemd-service).

## Health check

First, complete all the steps and checkups mentioned throught the guide and once the Node process is running perform a health check.

To run a quick health checkup, send a GET request to `/health` endpoint of the RPC on [port](/docs/node/requirements#ports) 4230.

```sh
curl -w "\n" localhost:4230/health
```

If successful, you should get the response `running and staked`, as follows:

```sh
running and staked
```

If you'd like to learn more about health check, visit the section [health check](/docs/node/health-check) of our documentation.

## Conclusion

The Fleek Network's Ursa CLI is in constant development, there are frequent changes that can introduce features, fixes, and performance improvements, but also breaking changes that in some cases require you to add, including new libraries or packages in your operating system.

In the current phase of development, a proper software release cycle for the updates is still in development, thus we pick changes from the source repository to build the Lightning application.

We have looked into how to pull the changes via Git, and discussed that contributions can introduce new requirements to the host operating system that leads to updates or changes in the documentation–mentioning how hard it is to keep in sync. Explained how to look into the contributions to understand the nature of the change and get hints about new features.

To complete, provided a step-by-step walkthrough the installation and setup process for the Fleek Network Lightning CLI and Systemd service.

Discover more about the project by [watching/contributing on GitHub](https://github.com/fleek-network/lightning), following us on [Twitter](https://twitter.com/fleek_net), and joining [our community Discord](https://discord.gg/fleekxyz) for any updates.

<Author
    name="Helder Oliveira"
    image="https://github.com/heldrida.png"
    title="Software Developer + DX"
    url="https://github.com/heldrida"
/>