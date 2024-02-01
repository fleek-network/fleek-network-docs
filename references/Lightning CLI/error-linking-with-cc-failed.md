---
title: Error linking with cc
slug: error-linking-with-cc-failed-exist-status-1
hide_title: true
tags:
- references
- help
- update
- upgrade
- fix
---

import Author from '@site/src/components/Author';

## Check if CPU is supported

```sh
uname -i
```

:::caution WARNING
Given the [CPU requirements](/docs/node/requirements/#specs), currently we are only supporting `GenuineIntel`, featuring Intel Software Guard Extensions (SGX).
:::

## Linking with cc error

A user who finds the error `linking with cc failed`, will have to install the required dependencies.

```sh
error: linking with `cc` failed: exit status: 1
error: could not compile `fleek-service-ping-example` (lib) due to previous error
```

## Update

```sh
sudo apt-get update
```

## Install `gcc`:

```sh
sudo apt-get install gcc
```

## Remove previous installation files

You can re-run the installation process. If you are using the assisted installer, it'll complain that the source code directory already exists. Since you've probably cloned the source code repository locally, you'll have to remove it manually. If you need help, find the instructions in the [reference](/references/Lightning%20CLI/uninstall-lightning-node).

## Run the installation script

```sh
curl https://get.fleek.network | bash
```

Alternatively, read the [manual installation instructions](/docs/node/install#manual-installation) for more information.


<Author
    name="Helder Oliveira"
    image="https://github.com/heldrida.png"
    title="Software Developer + DX"
    url="https://github.com/heldrida"
/>
