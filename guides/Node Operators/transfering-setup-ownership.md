---
template: post
draft: false
hide_title: true
title: Transfering setup ownership
slug: transfering-setup-ownership
image: ./assets/transfering-setup-ownership.png?202311181223
date: 2023-09-12T23:00:00.000+00:00
description: A step-by-step guide to transfer the ownership of the Fleek Network Lightning CLI and service setup
category: Tutorial
tags:
- transfer
- ownership
- guide
- setup
- configuration
---

![Transfering setup ownership](./assets/transfering-setup-ownership.png?202311181211)

<!--
  The following import is intentional (see partial <CheckoutCommitWarning />)
-->
import CreateAUser from '../../guides/partials/_create-a-user.mdx';
import FindAndReplaceConfigWithUserPaths from '../../guides/partials/_find-and-replace-config-with-user-paths.mdx';

## TL;DR

:::tip
The step-by-step instructions provided in the guide should be simple to follow, but the process is also available as an automated script from our familiar [get.fleek.network](https://github.com/fleek-network/get.fleek.network) tool.

To use the automated script execute the following command in your server terminal and follow the instructions:

```sh
curl -sS https://get.fleek.network/transfer_system_user_setup_ownership | bash
```

We try to make the auomated scripts as useful as possible, but it's impossible to fit every single use-case. So, if you find any isses or have feedback to help us improve [message us through our Discord](https://discord.gg/fleek).
:::

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

Make sure that you have set up a [Systemd unit service](/docs/node/install#systemd-service-setup), as recommended during the installation as this guide assumes you have one setup.

## Stop the service

Before we proceed with any changes required for the migration, you'll have to stop the `lightning.service`.

```sh
systemctl stop lightning
```

:::note
For this guide, we are assuming that you are migrating ownership from **root** to a **sudoer** user. If not, you might be required to elevate privileges as **sudo**** where required. For example, `sudo systemctl stop lightning`.
:::

## Clear the .lightning data

Run the following command to clear the `/root/.lightning/data`, as it can be quite large, and we don't need to move it.

```sh
sudo rm -rf /root/.lightning/data
```

## Create a user

<CreateAUser />

## Move lightning system and source code directory to user's home

A user should've been created, added the user to the sudo group, switched to the user, and changed the directory to the user's home.

Run the command `pwd`:

```sh
pwd
```

The output would look like:

```sh
/home/<USERNAME>
```

Given the username **lgtn**:

```sh
/home/lgtn
```

You'll then move two directories:
- The `/root/.lightning`
- The source code under the parent `/root/fleek-network`

### 1) Move the `/root/.lightning` directory from one user to the other

For our demo, we have assumed **root** user to **sudoer** user named **lgtn**, thus that'll look like this:

```sh
sudo mv /root/.lightning /home/lgtn/
```

### 2) Move the `/root/fleek-network` directory from one user to the other

```sh
sudo mv /root/fleek-network /home/lgtn/
```

### 3) Confirm move by finding both directories

In the user $HOME directory, you should be able to list the content of the directory and find the `.lightning` and `fleek-network` directory.

```sh
ls -la
```

The output should be similar to the following.

```sh
drwxr-x--- 6 lgtn lgtn  4096 Sep 12 13:51 .
drwxr-xr-x 3 root root  4096 Sep 11 12:28 ..
drwxrwxr-x 5 root root  4096 Sep 11 15:25 .lightning
drwxrwxr-x 3 root root  4096 Sep 11 12:28 fleek-network
```

## Change ownership of files

Once the directories and files are moved, they should have the wrong ownership, which should be set to **root:root**. We'll now have to change the ownership of the directories and files recursively.

Change the ownership of `/home/lgtn/.lightning` to the user **lgtn** as follows:

```sh
sudo chown -R lgtn:lgtn .lightning
```

:::tip
Make sure that you use the `-R` flag to have the ownership changes applied to the parent, the child directories and all the files.
:::

Change the ownership of `/home/lgtn/fleek-network` to the user **lgtn** as follows:

```sh
sudo chown -R lgtn:lgtn fleek-network
```

Once completed, if you list the content of the directory the ownership should have changed from `root:root` to `lgtn:lgtn`.

```sh
ls -la
```

The output should be similar to the following.

```sh
drwxr-x--- 6 lgtn lgtn  4096 Sep 12 13:51 .
drwxr-xr-x 3 root root  4096 Sep 11 12:28 ..
drwxrwxr-x 5 lgtn lgtn  4096 Sep 11 15:25 .lightning
drwxrwxr-x 3 lgtn lgtn  4096 Sep 11 12:28 fleek-network
```

:::tip
Remember that we are using **lgtn** for our demo. If you have opted for a different username, make sure you use the correct username. To find the username you are logged in with run the command:

```sh
whoami
```

For our demo, we'll assume that you understand that **lgtn** is the user we opted in for our demo.
:::

## The lgtn symbolic link (symlink)

We have the symbolic link that links the binary built from the source code, to the alias **lgtn** that's set under the `/usr/local/bin/lgtn` pathname.

For example, you can find where that is linked to by running:

```sh
ls -la $(which lgtn)
```

On the output below, we can see that the `/usr/local/bin/lgtn` points to `/root/fleek-network/lightning/target/release/lightning-node`.

```sh
lrwxrwxrwx 1 root root 64 Sep 11 15:48 /usr/local/bin/lgtn -> /root/fleek-network/lightning/target/release/lightning-node
```

The target base path is `/root`, and we know that we've moved the source code directory to the user home `/home/lgtn`. For this reason, we need to create a new symlink with the updated location of the binary file.

Unlink the symlink:

```sh
sudo unlink /usr/local/bin/lgtn
```

Create the symlink:

```sh
sudo ln -s "/home/lgtn/fleek-network/lightning/target/release/lightning-node" /usr/local/bin/lgtn
```

If successful, you should be able to execute the command:

```sh
lgtn help
```

The output should look similar to:

```sh
Usage: lgtn [OPTIONS] <COMMAND>

Commands:
  run           Start the node
  keys          Handle keys
  print-config  Print the loaded configuration
  help          Print this message or the help of the given subcommand(s)

Options:
  -c, --config <CONFIG>      Path to the toml configuration file [default: ~/.lightning/config.toml]
      --with-mock-consensus  Determines that we should be using the mock consensus backend
  -v...                      Increases the level of verbosity (the max level is -vvv)
      --log-location         Print code location on console logs
  -h, --help                 Print help
  -V, --version              Print version
```

## Update the Systemd service unit

Open the file, its settings should be similar to the following:

```sh
[Unit]
Description=Fleek Network Node lightning service

[Service]
Type=simple
MemoryHigh=32G
RestartSec=15s
Restart=always
ExecStart=lgtn -c /home/<USERNAME>/.lightning/config.toml run
ExecStop=killall -9 lgtn
StandardOutput=append:/var/log/lightning/output.log
StandardError=append:/var/log/lightning/diagnostic.log
Environment=TMPDIR=/var/tmp

[Install]
WantedBy=multi-user.target
```

Since we opted in for the username **lgtn** for our demo, replaced `<USERNAME>` with `lgtn`, and it would look like:

```sh
[Unit]
Description=Fleek Network Node lightning service

[Service]
Type=simple
MemoryHigh=32G
RestartSec=15s
Restart=always
ExecStart=lgtn -c /home/lgtn/.lightning/config.toml run
ExecStop=killall -9 lgtn
StandardOutput=append:/var/log/lightning/output.log
StandardError=append:/var/log/lightning/diagnostic.log
Environment=TMPDIR=/var/tmp

[Install]
WantedBy=multi-user.target
```

:::tip
Notice the `ExecStart=` which includes the flag `-c` where the location of the user files is declared. Learn how to [update the config.toml](#update-the-configtoml-with-user-preferred-file-locations) to include the user-preferred file paths, e.g. declare the keystore pathname.
:::

Complete the step by reloading the daemon, to apply the newly created changes. You can do this by executing:

```sh
sudo systemctl daemon-reload
```

## Update the config.toml with user-preferred file locations

Open the `/home/lgtn/.lightning/config.toml` file in your favorite text editor.

Replace every instance of `~` (tilde) with the user's home path. We do this to ensure that every time we control the service via systemctl, the configuration file that tells which keystore to use is declared upfront regardless of running it as user or delegating to root with **sudo**. Learn more about [file permissions and ownership](/references/Lightning%20CLI/file-permissions-and-ownership) by reading the reference document.

<FindAndReplaceConfigWithUserPaths />

## Start the service

At this stage, you should have migrated the essential files to the user   home.

Ideally, you would now manage the service as the `user` (as described in the [user service reference](/references/Systemd/user-service/)). To keep our guide wider to all users, we'll prefix the commands with **sudo**, which elevates the permissions to **root**. But since we have provided the configuration file the `-c` in our [systemd service](#systemd-service), we'll have the user-preferred configuration options ruling. 

Start the service by running the command:

```sh
sudo systemctl start lightning.service
```

:::tip
Find the timeline of events for the Lightning service by checking the log files. Learn about it in the section [Log Messages](/docs/node/analyzing-logs).
:::

To learn more, visit the section [Use Systemctl to manage the Lightning Service](/docs/node/systemd-service)


## Conclusion

We started by giving a brief introduction to ownership of the Lightning CLI files.

Jumped through topics of Systemd service that helps the user manage the service in the Linux environment, which helps keep track of all the processes and threads that are spawned.

We've gone through the step-by-step process to migrate the Fleek Network CLI and Systemd service setup from one user to the other. To keep it short, we decided to go with the use-case of where the migration happens between a **root** user and a **sudoer**.

Discover more about the project by [watching/contributing on GitHub](https://github.com/fleek-network/lightning), following us on [Twitter](https://twitter.com/fleek_net), and joining [our community Discord](https://discord.gg/fleek) for any updates.
