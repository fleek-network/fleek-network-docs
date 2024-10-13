---
title: Requirements
hide_title: true
description: The requirements for the server specifications on which the Fleek Network Node can be installed and run.
tags:
  - requirements
  - server
sidebarCollapsible: false
hide_table_of_contents: true
---

import Author from '@site/src/components/Author';
import Ports from '../../guides/partials/_ports.mdx';

## Requirements

This section provides the requirements for the server specifications on which the Fleek Network Node can be installed and run.

:::caution warning
Only 64-bits distributions are supported. Do not try to install it on a 32-bits operating system!
:::

## Server
---

The Fleek Network node binary is only supported by a Linux server. Currently, we are only providing support for the following distros:
- Debian (>= 11)
- Ubuntu (>= 22.04 LTS)

:::tip
Support for other OS will be made available soon, e.g. CentOS and Fedora. Feel free to test running on older versions, but we reduce the number of versions to ease support and keep instructions less verbose, which should be easily translatable to your preferred OS Distro and Version. Any contributions to provide support for your favorite distro are welcomed! Feel free to [open a PR](https://github.com/fleek-network) in our repositories.
:::

Because of the use of Linux containerization technology, other operating systems, such as FreeBSD, OpenBSD, MacOS, Windows and others are not supported.

If you don’t have a server or a spare machine, keep reading as we'll give you some hints on how to rent one, although we are not affiliated with any provider.

## Ports

<Ports />

## Specs
---

### CPU Architecture

The Testnet Phase {4} testnet includes additional functionality and improvements, such as enhanced security measures and trusted computing that requires **Intel SGX chips** in the Node specifications. A list of hardware which supports **Intel SGX chips - Software Guard Extensions** is available [here](https://github.com/ayeks/SGX-hardware).

:::info
Intel's Software Guard Extensions (SGX) is a set of
extensions to the Intel architecture that aims to provide integrity and confidentiality guarantees to security sensitive computation performed on a computer where all the privileged software (kernel, hypervisor, etc) is potentially malicious. See the research paper on [Intel SGX Explained](https://eprint.iacr.org/2016/086.pdf).
:::

### Number of CPU cores

The recommended number of CPU cores is a minimum of 4 with a minimum CPU speed of 2.0 GHz. The Fleek Network node binary is only supported on CPUs that adhere to the x86_64 architecture (64-bit).

### Memory

A minimum of 32 GB of memory (RAM) is required and a reasonable amount of disk space for the installation and running processes, which at the minimum should be around 20 GB.

<Author
    name="Helder Oliveira"
    image="https://github.com/heldrida.png"
    title="Software Developer + DX"
    url="https://github.com/heldrida"
/>
