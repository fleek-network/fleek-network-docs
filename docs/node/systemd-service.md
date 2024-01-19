---
title: Systemd Service
slug: systemd-service
hide_title: true
tags:
  - systemd
  - systemctl
  - control
  - manage
---

import Author from '@site/src/components/Author';
import WarningPreventPrematureShutdown from '../../guides/partials/_warning_prevent_premature_shutdown.mdx';
import TipShutdownGracefully from '../../guides/partials/_tip_shutdown_gracefully.mdx';

## Systemd Service

In this section we describe how to enable, disable, start, stop the Systemd Service.

The service is set up by the [assisted installer](#assisted-installer) automatically, or manually as described in the [manual installation](/docs/node/install#manual-installation) and [docker install](/docs/node/install#docker-installation).

:::info
While the Lightning-CLI Node process can operate independently, it is recommended to utilize Systemd for service management of the Lightning Node process in Linux. It's important to note that any network-related settings, such as opting-in or opting-out of network participation, should be managed separately by the Node Operator via the [CLI](/docs/node/lightning-cli).
:::

### Reload the daemon

Reload the Systemctl daemon by executing the command:

```sh
sudo systemctl daemon-reload
```

### Enable

Enable the service for starting up on system boot:

```sh
sudo systemctl enable lightning.service
```

:::tip
If you have installed or set up the Service as a Docker Container, prefix the service name with `docker-`.

```sh
sudo systemctl enable docker-lightning
```
:::

:::caution
You shouldn't have prefixed the systemctl command with **sudo** when start/stop/status the service. Due to some VPS providers modifying the operating system, we had to present the examples prefixed with sudo for the wider audience. If you'd like to learn more about controlling Systemd services as a `user` check the reference [Systemd user-service](/references/Systemd/user-service).
:::

### Disable

Disable the service for starting up on system boot:

```sh
sudo systemctl disable lightning.service
```

:::tip
If you have installed or setup the Service as a Docker Container, prefix the service name with `docker-`.

```sh
sudo systemctl disable docker-lightning
```
:::

### Start

:::info
Before starting the service, make sure to opt-in or opt-out of network participation, through the available subcommand **opt** in the CLI.

The quickest way to find help is to run the help subcommand as follows:

```sh
lgtn opt help
```

To learn more, read the [Lightning-CLI](/docs/node/lightning-cli) section for command [opt](/docs/node/lightning-cli#opt).
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


:::tip
If you have installed or set up the Service as a Docker Container, prefix the service name with `docker-`.

```sh
sudo systemctl start docker-lightning
```
:::

### Stop

<WarningPreventPrematureShutdown />

<TipShutdownGracefully />

Stop the service by:

```sh
sudo systemctl stop lightning
```

:::tip
If you have installed or set up the Service as a Docker Container, prefix the service name with `docker-`.

```sh
sudo systemctl stop docker-lightning
```
:::

### Restart

Restart the service by:

```sh
sudo systemctl restart lightning
```

:::tip
If you have installed or set up the Service as a Docker Container, prefix the service name with `docker-`.

```sh
sudo systemctl restart docker-lightning
```
:::

### Status

Check the service status by:

```sh
sudo systemctl status lightning.service
```

:::warning
Network participation is solely managed by the Node Operator, who decides to opt-in or opt-out of node network participation.

It' s important for Node Operators to regularly monitor the status of their active nodes and ensure that they are actively participating in the network.

Any node that has opted-in but remains inactive will be subjected to reputation penalties.

To learn more read the [Lightning-CLI Opt](/docs/node/lightning-cli#opt) command section and [health-checkups](/docs/node/health-check).
:::

:::tip
If you have installed or set up the Service as a Docker Container, prefix the service name with `docker-`.

```sh
sudo systemctl status docker-lightning
```
:::

<Author
    name="Helder Oliveira"
    image="https://github.com/heldrida.png"
    title="Software Developer + DX"
    url="https://github.com/heldrida"
/>
