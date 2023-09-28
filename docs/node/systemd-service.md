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

## Systemd Service

In this section we describe how to enable, disable, start, stop the Systemd Service.

The service is setup by the [assisted installer](#assisted-installer) automatically, or manually as described in the [manual installation](/docs/node/install#manual-installation) and [docker install](/docs/node/install#docker-installation).

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
If you have installed or setup the Service as a Docker Container, prefix the service name with `docker-`.

```sh
sudo systemctl enable docker-lightning
```
:::

:::caution
You shouldn't have prefix the systemctl command with **sudo** when start/stop/status the service. Due to some VPS providers modifying the operating system, we had to present the examples prefixed with sudo for the wider audience. If you'd like to learn more about controlling Systemd services as a `user` check the reference [Systemd user-service](/references/Systemd/user-service).
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
If you have installed or setup the Service as a Docker Container, prefix the service name with `docker-`.

```sh
sudo systemctl start docker-lightning
```
:::

### Stop

Stop the service by:

```sh
sudo systemctl stop lightning
```

:::tip
If you have installed or setup the Service as a Docker Container, prefix the service name with `docker-`.

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
If you have installed or setup the Service as a Docker Container, prefix the service name with `docker-`.

```sh
sudo systemctl restart docker-lightning
```
:::

### Status

Check the service status by:

```sh
sudo systemctl status lightning.service
```

:::tip
If you have installed or setup the Service as a Docker Container, prefix the service name with `docker-`.

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
