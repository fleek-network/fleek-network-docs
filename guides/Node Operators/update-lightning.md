---
title: Update Lightning
hide_title: true
slug: Update Lightning
date: 2023-09-19T12:00:00.000+00:00
description: A step-by-step guide to update the Lightning CLI from source code and Service setup
category: Tutorial
tags:
- update
- rebuild
- guide
- setup
- configuration
---

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


Make sure that you are checked in to the correct branch. For example, if that'd be the first testnet phase it'd be called `testnet-alpha-0`.

```sh
git checkout <BRANCH-NAME>
```

Here's an example of how the comman would look like for the main default branch with corresponding name `main`.

```sh
git checkout main
```

<CheckoutCommitWarning />

Here's an example of how the comman would look like for the branch name `testnet-alpha-0`.

```sh
git checkout testnet-alpha-0
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

You can check yourself, as follows:

```sh
git remote -v
```

Our output clearly describes what `origin` is tracking.

```sh
origin	git@github.com:fleek-network/lightning.git (fetch)
origin	git@github.com:fleek-network/lightning.git (push)
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

A "already up to date" message means that you have the latest version of the source code and can proceed with compiling the binary process from the source code to override the `Lightning CLI` version you're on. You can also make any other setup changes that might find necessary. Some of the changes might be related to the recommended setup of Systemd Service that helps control the Fleek Network Lightning Node binary process, etc.

### 

## Conclusion

Discover more about the project by [watching/contributing on GitHub](https://github.com/fleek-network/lightning), following us on [Twitter](https://twitter.com/fleek_net), and joining [our community Discord](https://discord.gg/fleekxyz) for any updates.

<Author
    name="Helder Oliveira"
    image="https://github.com/heldrida.png"
    title="Software Developer + DX"
    url="https://github.com/heldrida"
/>