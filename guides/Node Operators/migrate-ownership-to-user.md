---
template: post
draft: false
hide_title: true
title: Migrate ownership of node setup to user
slug: migrate-ownership-of-node-setup-to-user
date: 2023-09-12T23:00:00.000+00:00
description: A step-by-step guide to migrate the ownership of the Fleek Network Lightning CLI and service setup
category: Tutorial
tags:
- migration
- migrate
- ownership
- guide
- setup
- configuration
---

<!--
  The following import is intentional (see partial <CheckoutCommitWarning />)
-->
import Author from '@site/src/components/Author';
import GitCloneOptions from '../partials/_git-clone-options.mdx';

## Introduction

Our Lightning CLI and Node process is run by a user, that has some sort of permissions–some users run it as a super user (root) which is questionable as root privileges are not a necessary good. We'll look into how to create a user to manage and control the Fleek Network Lightning CLI and Systemd unit service. Also, presents the concept of file permissions and ownership which is crucial in preventing private or sensitive data from being exposed to dodgy actors.

Let's discuss the topic and open up a few ideas to help us improve the security of our server.

## Pre-requisites

To follow the guide, you will need the following:

- Familiarity with the command-line interface
- Have installed and set up the Lightning CLI and service

## Ownership of Lightning CLI files

The user who installs the Lightning CLI and sets the Service takes an important role that determines the location of the configuration files, the setup, and how the Systemd service is managed or controlled.

Our [install](/docs/node/install) document recommends creating a user and switching to the user to set up the service. You shouldn't want installed applications to run with elevated privileges. Applications are meant to be run with non-administrative privileges. If an application requires higher privileges, the administrator, such as a [sudoer](https://en.wikipedia.org/wiki/Sudo) should be able to elevate it. An application that has full access and control of a system can modify it in harmful ways, e.g. compromise the private keys.

For our guide, we'll illustrate the process of migration from a super user (root) to another user (sudo). The knowledge should be easily appliable for any other user-to-user migration. We stick with root user for simplicity and because that's the most common use case.

:::tip
A reference document about [File permissions and ownership](/references/Lightning%20CLI/file-permissions-and-ownership) is available that explains how it works practically, by showcasing how the process can be started, how the node process locates the Keystore, etc.
:::

## Systemd Service

In systemd, a unit refers to any resource that the system knows how to operate on and manage. This is the primary object that the systemd tools know how to deal with. These resources are defined using configuration files called unit files.

The recommended installation process features a [systemd.service](https://www.freedesktop.org/software/systemd/man/systemd.service.html) which is a resource that the system knows how to operate and manage by an administrator user.

:::tip
When using a Systemd service to run a process, it operates comparably to running it directly. The key difference is that Systemd keeps track of all the processes and threads that are spawned. This means that when a service is stopped using systemctl, such as the Fleek Network Lightning Node service, all the child processes that were started by the service are also terminated. Additionally, by utilizing Systemd, a user can run the process in the background and configure it to start automatically on system startup.
:::

If you have followed the installation recommendations, find the systemd service unit in the location `/etc/systemd/system/lightning.service` (we are using Ubuntu Linux as an example to keep it short).

## Next steps

## Conclusion

Discover more about the project by [watching/contributing on GitHub](https://github.com/fleek-network/lightning), following us on [Twitter](https://twitter.com/fleek_net), and joining [our community Discord](https://discord.gg/fleekxyz) for any updates.

<Author
    name="Helder Oliveira"
    image="https://github.com/heldrida.png"
    title="Software Developer + DX"
    url="https://github.com/heldrida"
/>