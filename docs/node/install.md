---
title: Install
hide_title: true
slug: Install
date: 2023-08-21T23:00:00Z
canonical: ''
description: The Fleek Network Lightning CLI installation walkthrough
category: Tutorial
tags:
- CDN
- Guide
- Getting Started
- Fleek Network
- Rust dependencies
- compile
- build
- wizard
- manual
---

import Author from '@site/src/components/Author';
import GitCloneOptions from '../../guides/partials/_git-clone-options.mdx';
import CreateAUser from '../../guides/partials/_create-a-user.mdx';
import SetUserPathInConfigToml from '../../guides/partials/_set-user-path-config-toml.mdx';
import NoteExecStartFlagCConfigPath from '../../guides/partials/_note_execstart-flag-c-config-path.mdx';

This section describes how to install the Fleek Network Lightning on supported operating systems. The installation can be made quicker by running the [assisted installer](#assisted-installer) or by following the [manual installation](#manual-installation) if you want a bit more control.

:::caution Warning
If you'd like to participate in the [alpha Testnet](/docs/roadmap), you have to go through the onboarding process. Check the [requirements](/docs/node/requirements) and find the [onboarding instructions](/docs/node/testnet-onboarding) to enable you to proceed and [install](/docs/node/install) a network node successfully.
:::

## Assisted installer

The assisted installer is a script written in [Bash](https://en.wikipedia.org/wiki/Bash_(Unix_shell)) (Unix shell) that is available as a curl command line.

### Prerequesites

- A basic knowledge of command line interface (CLI)
- A [supported](/docs/node/requirements#server) Linux server

### Connect to your server

Connect to the Linux server where the Node's going to be installed via SSH by opening a shell session there.

If you have set up a public SSH key for the machine, connecting to the server should be as simple as:

```sh
ssh <USERNAME>@<REMOTE_HOST>
```

:::info
Check the cloud provider for instructions to understand how to setup an ssh connection and connect to it remotely. Some other users might have local access to a [supported](/docs/node/requirements#server) Linux server. To keep this guide short, we'll assume you've rented a VPS from a cloud provider.
:::

### Create a user

<CreateAUser />

### Run the script for a quick install

Copy and paste it to the server host terminal and execute it to launch the assisted installation process, as follows:

```sh
curl https://get.fleek.network | bash
```

On success, you should be greeted by the following welcome screen:

```sh
⭐️ Fleek Network Lightning CLI installer ⭐️

            zeeeeee-
            z$$$$$$"
          d$$$$$$"
          d$$$$$P
        d$$$$$P
        $$$$$$"
      .$$$$$$"
    .$$$$$$"
    4$$$$$$$$$$$$$"
  z$$$$$$$$$$$$$"
  """""""3$$$$$"
        z$$$$P
        d$$$$"
      .$$$$$"
    z$$$$$"
    z$$$$P
  d$$$$$$$$$$"
  *******$$$"
      .$$$"
      .$$"
    4$P"
    z$"
  zP
  z"
/

★★★★★★★★★ 🌍 Website https://fleek.network
★★★★★★★★★ 📚 Documentation https://docs.fleek.network
★★★★★★★★★ 💾 Git repository https://github.com/fleek-network/lightning
★★★★★★★★★ 🤖 Discord https://discord.gg/fleekxyz
★★★★★★★★★ 🐤 Twitter https://twitter.com/fleek_net
★★★★★★★★★ 🎨 Ascii art by https://www.asciiart.eu

...

Remaining output omitted for brevity, you'll not see this text line
```

Follow the installation wizard to have the Fleek Network Lightning CLI and service installed on the [supported server](/docs/node/requirements).

After creating the service file, you should reload the Systemd process, to apply the newly created service. You can do this by executing:


After creating the service, launch the service by executing the following command:

```sh
sudo systemctl start lightning.service
```

:::tip
To learn more about Systemctl commands, visit the section [Use Systemctl to manage the Lightning Service](#use-systemctl-to-manage-systemd-service)
:::

:::tip
Find the timeline of events for the Lightning service by checking the log files. Learn about it in the section [Log Messages](#analyzing-log-messages).
:::

Once the installation is complete, do a health check! Check the section [Health Check](#health-check) to learn how to do a node health checkup.

### About the process

The installation process is open source and transparent. The source is available in the [get.fleek.network](https://get.fleek.network) or the origin repository [here](https://github.com/fleek-network/get.fleek.network).

:::info
"Get Fleek Network" is an attempt to make our software more accessible. By providing scripts to automate the installation process of our software, we believe that it can help improve the onboarding experience of our users.
:::

The installer assists the node operator by automating the Lightning CLI build from the open-source code and setting up the system service. A node operator should use the assisted installer to ease onboarding, reduce repetition,

At a high level, the installer will:
- Install required dependencies, e.g. rust toolchain
- Pull the source code from the origin [repository](https://github.com/fleek-network/lightning)
- Build the binary, e.g. a `lightning CLI` (lgtn) is compiled from source code
- Setup a [Systemd](https://en.wikipedia.org/wiki/Systemd) service named lightning
- Provide instructions to launch, stop the Fleek network via the Systemd lightning service

:::tip
Remember that if you use the assisted installer, you won't have to do the [manual installation](#manual-installation) process as described in the next section. On success, the assisted installer should provide the same result as following the manual instructions.
:::

## Manual installation

The following section will walk through the dependencies and Rust installation process for Linux. If you're on Windows, we recommend to setup [Windows Subsystem Linux](https://learn.microsoft.com/en-us/windows/wsl/install), reading the [Ubuntu tutorial](https://ubuntu.com/tutorials/install-ubuntu-on-wsl2-on-windows-10#1-overview) or picking another [supported distro](/docs/node/requirements#server). The WSL will let you use Linux applications, utilities and bash command tools you'll find in the tutorial.

:::tip
We're only supporting Linux operating system (server edition). Find the list of supported OS [here](/docs/node/requirements#server).
:::

### Prerequisites

To follow the guide, you will need the following:

- Familiarity with the command-line interface
- Git

You're required to have some experience with the command-line interface and have Git installed; Also, you should be happy to troubleshoot, since versions might differ from the time of writing and reading. Most times, a simple web search provides the best answers.

If you don't have Git installed, learn more about it and the instructions by reading the [Git documentation](https://git-scm.com/book/en/v2).

### Create a user

<CreateAUser />

### Install Rust with Rustup tool

Visit the [Rust website](https://www.rust-lang.org/) getting started guide, to find, copy and run the [Rustup tool](https://rustup.rs/) for installation and version management.

```sh
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

:::tip
[curl](https://curl.se/) is an application that is generally available in most OS, if missing install it. Find more [here](https://curl.se/).
:::

Alternatively, if you have installed Rust in the past, you may want to update it 👌.

```sh
rustup update
```

During the installation process, if asked about preferences, select the default option!

```sh
You can uninstall at any time with rustup self uninstall and
these changes will be reverted.

Current installation options:


   default host triple: x86_64-unknown-linux-gnu
     default toolchain: stable (default)
               profile: default
  modify PATH variable: yes

1) Proceed with installation (default)
2) Customize installation
3) Cancel installation
```

:::tip
Once complete, you'll have to restart your current shell or reload the "PATH" environment variable to include Cargo's bin directory `$HOME/.cargo/bin`. This is required to let you use "cargo" command globally.
:::

To configure your current shell, run:

```sh
source "$HOME/.cargo/env"
```

From then on, the latest version of Cargo (Rust's build and package manager tool) should be installed. Learn more about Cargo, [here](https://doc.rust-lang.org/cargo/index.html).

Check the `version` to confirm's working correctly:

```sh
cargo --version
```

Here's the output we got (beware that our version might differ to yours, it's expected 😅).

```sh
cargo 1.65.0 (4bc8f24d3 2022-10-20)
```

### Lightning installer rust dependencies

Rustup subcommands deal with [toolchains](https://rust-lang.github.io/rustup/concepts/toolchains.html), a collection of programs required to compile a Rust application.

```sh
rustup toolchain list
```

For example, on Linux Ubuntu we generally have it set to the default:

```sh
stable-x86_64-unknown-linux-gnu (default)
```

While on macOS:

```sh
stable-x86_64-apple-darwin (default)
```

Make sure you have Rustup set to the desired toolchain as default if required 💁‍♀️!

```sh
rustup default <TOOLCHAIN-LIST-NAME>
```

:::tip
Rust compilation is long and compiler caching can help speed things up immensely. The Lightning CLI project can be used to reduce the perceived compilation times.
:::

### Linux dependencies

On Linux (we'll stick with Ubuntu as the Linux distro example), start by updating the package information in the source list and then upgrade all the installed packages with the latest versions (do the equivalent for your Linux distro), as follows:

```sh
sudo apt-get update
sudo apt-get upgrade
```

:::tip
You can optionally pass the `y` flag to skip any user prompts e.g. `sudo apt-get update -y` to any remaining apt-get commands.
:::

Install the build-essentials packages, necessary for compiling general software and for our use-case Lightning CLI.

```sh
sudo apt-get install build-essential
```

Followed by the required tools to compile the application ([cmake](https://cmake.org/), [clang](https://clang.llvm.org/), [pkg-config](https://www.freedesktop.org/wiki/Software/pkg-config/) and [libssl-dev ](https://packages.debian.org/sid/libssl-dev)).

```sh
sudo apt-get install cmake clang pkg-config libssl-dev gcc-multilib
```

:::tip
For Debian, you should install `gcc`, as follows:

```sh
sudo apt-get update
sudo apt-get install gcc
```
:::

Now install the [Protobufer Compiler](https://grpc.io/docs/protoc-installation/).

```sh
sudo apt-get install protobuf-compiler
```

Ensure the compiler version is 3+

```sh
protoc --version
```

### Installing Lightning CLI

If you haven't already, clone the Fleek Network's Lightning repository to your machine.

<GitCloneOptions />

When git clone completes 👍, `change directory` to the project directory e.g. we cloned to the default name `~/fleek-network/lightning`:

```sh
cd ~/fleek-network/lightning
```

:::note
The `~/fleek-network/lightning` or `$HOME/fleek-network/lightning` directory is the default or recommended location to store the repository. If you like to follow conventions, then is best to stick with the recommendation, to avoid confusion and make it easier to follow our documentation.
:::

If you list (`ls`) the files in the directory, it should be similar to:

```sh
.
├── CODE_OF_CONDUCT.md
├── CONTRIBUTING.md
├── Cargo.lock
├── Cargo.toml
├── LICENSE
├── README.md
├── codecov.yml
├── core
├── docs
├── lib
├── lightning.toml
├── rust-toolchain
├── rustfmt.toml
├── services
└── target
```

At this point, you should be able to run the `install` command successfully.

:::caution
If you already had Rust installed, or the project before, and skipped instructions directly here, there might be case where you get errors. So, make sure to clear your work directory:
:::

```sh
cargo clean
cargo update
```

Start the `install` process by running the command:

```sh
cargo +stable build --release
```

The installation process is long, as it compiles the application binary for us from the source code.

🌈 Here's the output when successful! Note, that the output might differ slightly from time of writting.

```sh
    Finished release [optimized] target(s) in 11m 22s
  Installing /root/.cargo/bin/lightning
   Installed package `lightning v0.1.0 (/crates/lightning)` (executable `lightning`)
```

:::tip
Once Rust generates the binary `lightning-node`, you can find it in the project root `target` directory. Depending on the usage of `+stable` flag, the binary should be located at `~/fleek-network/lightning/target/debug/lightning-node` or `~/fleek-network/lightning/target/release/lightning-node`.
:::

You can create an `lgtn` symbolic link to `/usr/local/bin` to make it available globally.

```sh
sudo ln -s "$HOME/fleek-network/lightning/target/release/lightning-node" /usr/local/bin/lgtn
```

After completing, you'll have the ability to type `lgtn` to execute the binary anywhere for your user account. Other users might find it better to copy or create an `alias` instead.

Run the `lgtn help` sub-command as a checkup:

```sh
Usage: lightning-node [OPTIONS] <COMMAND>

Commands:
  run           Start the node
  keys          Handle keys
  print-config  Print the loaded configuration
  help          Print this message or the help of the given subcommand(s)

Options:
  -c, --config <CONFIG>      Path to the toml configuration file [default: lightning.toml]
      --with-mock-consensus  Determines that we should be using the mock consensus backend
  -v...                      Increases the level of verbosity (the max level is -vvv)
      --log-location         Print code location on console logs
  -h, --help                 Print help
  -V, --version              Print version
```

:::caution
Beware that your output might differ a bit, as [Lightning](https://github.com/fleek-network/lightning) is in constant development. Note that you'll have to "re-install" every time you want to pull updates from the source repository, as the update at the time of writing is done manually and not automatically.
:::

### Key generator

Before starting the node, you should generate a public and private key.

```sh
lgtn keys generate
```

The keys will be generated and placed under the system directory `~/.lightning/keystore`. The `private` key is the user's responsibility and no one else can generate or recover it for you, including Fleek Network or any team member. Your keys, your responsibility!

### Set user path in config.toml

<SetUserPathInConfigToml />

### Set testnet in config.toml

Set the testnet attribute to `true` in the `config.toml` lcated in the path `~/.lightning/config.toml`.

```sh
[application]
db_path = "~/.lightning/data/app_data"
mode = "Prod"
storage = "RocksDb"
testnet = true

...
```

:::tip
The configuration file should have more content, which was omitted here to keep it short and to the point. You're interested in the `testnet` property name only.
:::

### Start the node

:::caution Warning
To participate in the [alpha Testnet](/docs/roadmap), you have to through the onboarding process. Make sure you request access by following the [onboarding instructions](/docs/node/testnet-onboarding). If you fail to enable your node for testnet, it'll not run!
:::

To start the node, you should execute the sub-command `run`. Noteworthy that while it launches the node, you're recommended to setup a systemd service to run it for a long period.

```sh
lgtn run
```

:::caution WARNING
We recommend setting up the process as a systemd service, as it's a long-running process. Instructions to setup a systemd service are available in the section [Systemd Service Setup](#systemd-service-setup).
:::

Great! You have successfully installed all the required packages, and libraries and have compiled and installed lightning. Check the section [Health Check](#health-check) to learn how to do a node health checkup.

### Systemd Service Setup

Create a new Systemd service file:

```sh
sudo touch /etc/systemd/system/lightning.service
```

Open the file and put the following content:

```sh
[Unit]
Description=Fleek Network Node lightning service

[Service]
Type=simple
MemoryHigh=32G
RestartSec=15s
Restart=always
ExecStart=lgtn -c /home/lgtn/.lightning/config.toml run
StandardOutput=append:/var/log/lightning/output.log
StandardError=append:/var/log/lightning/diagnostic.log
Environment=TMPDIR=/var/tmp

[Install]
WantedBy=multi-user.target
```

:::caution
Notice that we're using `lgnt` as the username. If you have a different custom username change it accordingly. Beware that we've recommended using a `non-root` user, as described in the section [create a user](#create-a-user-1).
:::

<NoteExecStartFlagCConfigPath />

Change the file permissions for the service:

```sh
sudo chmod 644 /etc/systemd/system/lightning.service
```

After creating the service file, you should reload the Systemd process, to apply the newly created service. You can do this by executing:

```sh
sudo systemctl daemon-reload
```

To start the service at boot, use the enable command:

```sh
sudo systemctl enable lightning.service
```

Create the directory where the log message will be stored, as follows:

```sh
sudo mkdir -p /var/log/lightning
```

You may want to create empty placeholders for the stdout and stderr log files:

```sh
sudo touch /var/log/lightning/output.log
sudo touch /var/log/lightning/diagnostic.log
```

:::caution WARNING
We're assuming that you've [created a new user](#create-a-user-1) and can start the service operating without **sudo**.
:::

Start the service by:

```sh
sudo systemctl start lightning.service
```

:::tip
Find the timeline of events for the Lightning service by checking the log files. Learn about it in the section [Log Messages](#analyzing-log-messages).
:::

To learn more, visit the section [Use Systemctl to manage the Lightning Service](#use-systemctl-to-manage-systemd-service)

## Health Check

A health check is a special API endpoint that's used to validate the status of a service. To do a health check of a Fleek Network node use the JSON RPC interface via the command line.

:::tip
We're going to use cURL, make sure that you have it installed otherwise install it in your operating system.
:::

We'll send a request to the JSON RPC `flk_ping` method. Execute the following command:

```sh
$ curl -X POST -H "Content-Type: application/json" -d '{
      "jsonrpc": "2.0",
      "method": "flk_ping",
      "params": [],
      "id": 1
    }' http://127.0.0.1:4069/rpc/v0
```

If the request is successful, you should get the result `pong` as follows:

```sh
{
  "jsonrpc": "2.0",
  "result": "pong",
  "id": 1
}
```

To learn more about health checkups, read the section [Health-check](/docs/node/health-check)

## Use Systemctl to manage Systemd Service

Learn how to enable, disable, start, stop the Systemd Service for Fleek Network. The service is set up by the [Assisted installer](#assisted-installer) (automatically), or manually (optional) as described in [Manual installation](#manual-installation).

Reload the Systemctl daemon by executing the command:

```sh
sudo systemctl daemon-reload
```

Enable the service for starting up on system boot:

```sh
sudo systemctl enable lightning.service
```

:::caution
You shouldn't have prefix the systemctl command with **sudo** when start/stop/status the service. Due to some VPS providers modifying the operating system, we had to present the examples prefixed with sudo for the wider audience. If you'd like to learn more about controlling Systemd services as a `user` check the reference [Systemd user-service](/references/Systemd/user-service).
:::

Start the service by:

```sh
sudo systemctl start lightning.service
```

:::tip
When naming the service, the *.service can be omitted. For this reason the command can be typed as follows:

```sh
sudo systemctl start lightning
```
:::

Stop the service by:

```sh
sudo systemctl stop lightning
```

Restart the service by:

```sh
sudo systemctl restart lightning
```

Check the service status by:

```sh
sudo systemctl status lightning.service
```

## Analyzing Log Messages

The service logs provide a timeline of events for the Lightning service that is valuable for troubleshooting when encountering issues. When issues arise, analyzing log files is the first thing a node operator needs to do.

To have the log message files (output.log and diagnostic.log), these have to be set up. If you have installed the Node via the [Assisted installer](#assisted-installer), the logs are set up for you automatically.

You can watch the Node output by running the command:

```sh
tail -f /var/log/lightning/output.log
```

You can watch the Node diagnostics or errors by running the command:

```sh
tail -f /var/log/lightning/diagnostic.log
```

<!-- TODO: To learn more about Fleek Network and lightning, check our [Getting started guide](fleek-network-getting-started-guide). -->

<Author
    name="Helder Oliveira"
    image="https://github.com/heldrida.png"
    title="Software Developer + DX"
    url="https://github.com/heldrida"
/>
