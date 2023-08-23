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

<!--
  The following import is intentional (see partial <CheckoutCommitWarning />)
-->
import Author from '@site/src/components/Author';

This section describes how to install the Fleek Network Lightning on supported operating systems. The installation can be made quicker by running the [assisted installer](#assisted-installer) or by following the [manual installation](#manual-installation) if you want a bit more control.

## Assisted installer

The assisted installer is a script written in [Bash](https://en.wikipedia.org/wiki/Bash_(Unix_shell)) (Unix shell) that is available as a curl command line.


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
```

Follow the installation wizard to have the Fleek Network Lightning CLI and service installed on the [supported server](/docs/build/requirements).

### About the process

The installation process is open source and transparent. The source is available in the [get.fleek.network](https://get.fleek.network) or the origin repository [here](https://github.com/fleek-network/get.fleek.network).

:::info
"Get Fleek Network" is an attempt to make our software more accessible. By providing scripts to automate the installation process of our software, we believe that it can help improve the onboarding experience of our users.
:::

The installer assists the node operator by automating the Lightning CLI build from the open-source code and setting up the system service. A node operator should use the assisted installer to ease onboarding, reduce repetition,

At a high level, the installer will:
- Install required dependencies, e.g. rust toolchain
- Pull the source code from the origin [repository](https://github.com/fleek-network/lightning)
- Build the binary, e.g. a `lightning CLI` (lgtn) is compiled from source-code
- Setup a [Systemd](https://en.wikipedia.org/wiki/Systemd) service named lightning
- Start the Fleek network via the lightning service

:::tip
Remember that if you use the assisted installer, you won't have to do the [manual installation](#manual-installation) process as described in the next section. On success, the assisted installer should provide the same result as following the manual instructions.
:::

## Manual installation

The following section will walk through the Rust and dependencies installation process for Linux. If you're on Windows, we recommend to setup [Windows Subsystem Linux](https://learn.microsoft.com/en-us/windows/wsl/install) or [Ubuntu tutorial](https://ubuntu.com/tutorials/install-ubuntu-on-wsl2-on-windows-10#1-overview) and picking a popular distro like Ubuntu. The WSL will let you use Linux applications, utilities and bash command tools you'll find in the tutorial.

### Prerequisites

To follow the guide, you will need the following:

- Familiarity with the command-line interface
- Git

You're required to have some experience with the command-line interface and have Git installed; Also, you should be happy to troubleshoot, since versions might differ from the time of writing and reading. Most times, a simple web search provides the best answers.

If you don't have Git installed, learn more about it and the instructions by reading the [Git documentation](https://git-scm.com/book/en/v2).

### Install Rust with Rustup tool

Visit the [Rust website](https://www.rust-lang.org/) getting started guide, to find, copy and run the [Rustup tool](https://rustup.rs/) for installation and version management.

```sh
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

> [curl](https://curl.se/) is an application that is generally available in most OS, if missing install it. Find more [here](https://curl.se/).

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


> Once complete 👍, you'll have to restart your current shell or reload the "PATH" environment variable to include Cargo's bin directory `$HOME/.cargo/bin`. This is required to let you use "cargo" command globally.

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

> Rust compillation are long and compiler caching can help speed things up immensively. The Lightning CLI project can use to reduce the perceived compilation times down.

[Sccache](https://docs.rs/crate/sccache/latest
) is a ccache-like compiler caching tool. It is used as a compiler wrapper and avoids compilation when possible. This is optional, but recommended!

```sh
cargo install sccache
```

### Linux Ubuntu dependencies

On Linux Ubuntu (our choice as the Linux distro example), start by updating the package information in the source list and then upgrade all the installed packages with the latest versions (⚠️ do the equivalent for your Linux distro), as follows:

```sh
sudo apt-get update
sudo apt-get upgrade
```

💡 You can optionally pass the `y` flag to skip any user prompts e.g. `sudo apt-get update -y` to any remaining apt-get commands.

Install the build-essentials packages, necessary for compiling general software and for our use-case Lightning CLI.

```sh
sudo apt-get install build-essential
```

Followed by the required tools required to compile the application ([cmake](https://cmake.org/), [clang](https://clang.llvm.org/), [pkg-config](https://www.freedesktop.org/wiki/Software/pkg-config/) and [libssl-dev ](https://packages.debian.org/sid/libssl-dev)).

```sh
sudo apt-get install build-essential cmake clang pkg-config libssl-dev gcc-multilib
```

Now install the [Protobufer Compiler](https://grpc.io/docs/protoc-installation/).

```sh
sudo apt-get install protobuf-compiler
```

Ensure the compiler version is 3+

```sh
protoc --version
```

## Installing Lightning CLI

If you haven't already 🙄, clone the Fleek Network's Lightning repository to your machine.

<GitCloneOptions />

💡 Optionally, you can pass a directory name at the end of the commands (as the last argument), otherwise defaults to the repository name and for our case the name is `lightning`. Note that you don't have to use `<` or `>` when naming, it's just illustrative.

```sh
git clone https://github.com/fleek-network/lightning.git <DIRECTORY-NAME>
```

When git clone completes 👍, `change directory` to the project directory e.g. we cloned to the default name `lightning`:

```sh
cd lightning
```

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

🙄 If you already had Rust installed, or the project before, and skipped instructions directly here, there might be case where you get errors. So, make sure to clear your work directory:

```sh
cargo clean
cargo update
```

Start the `install` process by running the command:

```sh
cargo +stable build
```

The installation process can take some time 🥱, as it compiles the application binary for us.

🌈 Here's the output when successful!

```sh
    Finished release [optimized] target(s) in 11m 22s
  Installing /root/.cargo/bin/lightning
   Installed package `lightning v0.1.0 (/crates/lightning)` (executable `lightning`)
```

> Once Rust generates the binary you can find it in the Cargo bin directory.
On mac and linux, this is located at `$HOME/.cargo/bin` and on Windows `%USERPROFILE%\.cargo\bin`. If `lightning` is unavailable as a command, it's very likely that you need to add the Cargo bin directory to your operating system `PATH` environment variable. 🤨 There are plenty of articles explaining how to do it in most operating systems, a matter of using a web search engine.

Run the lightning `help` command as a checkup:

```sh
Usage: lgtnn [OPTIONS] <COMMAND>

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

⚠️ Beware that your output might differ a bit, as [Lightning](https://github.com/fleek-network/lightning) is in constant development. Note that you'll have to "re-install" every time you want to pull updates from the source repository, as the update at the time of writing is done manually and not automatically.

Great 👌! You have successfully installed all the required packages, libraries and have compiled and installed lightning.

<!-- TODO: To learn more about Fleek Network and lightning, check our [Getting started guide](fleek-network-getting-started-guide). -->

<Author
    name="Helder Oliveira"
    image="https://github.com/heldrida.png"
    title="Software Developer + DX"
    url="https://github.com/heldrida"
/>