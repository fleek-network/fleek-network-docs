---
title: Frequently used commands for Native setup
slug: frequently-used-commands-for-native-setup
hide_title: true
tags:
- commands
- cli
- lightning
---

import Author from '@site/src/components/Author';

## TL;DR

Most assisted processes are available through the `get.fleek.network` command, where you can select to install, do a health check amongst others.

To access the menu options run the command in the shell prompt:

```sh
curl https://get.fleek.network | bash
```

:::tip
For Docker setup users read the corresponding version in the section [Frequently Used Commands for Docker Setup](/references/Docker/frequently-used-commands-for-docker-setup)
:::

## Systemctl Service Management

### Enable

```sh
sudo systemctl enable lightning
```

### Disable

```sh
sudo systemctl enable lightning
```

### Start

```sh
sudo systemctl start lightning
```

### Stop

```sh
sudo systemctl stop lightning
```

### Restart

```sh
sudo systemctl restart lightning
```

### Status

```sh
sudo systemctl status lightning
```

## Lightning CLI

### Show keys for user config

Show the keys by running the sub-commands `keys show` and declaring the configuration file location:

```sh
lgtn -c /home/<USERNAME>/.lightning/config.toml keys show
```

## Diagnostic tools

### Extended verification health check

```sh
curl -sS https://get.fleek.network/healthcheck | bash
```

### Health status

```sh
curl -w "\n" localhost:4230/health
```

### Node details

```sh
curl -sS https://get.fleek.network/node_details | bash
```

## Analyzing Logs

### Standard output

```sh
tail -f /var/log/lightning/output.log
```

### Standard error

```sh
tail -f /var/log/lightning/diagnostic.log
```

<Author
    name="Helder Oliveira"
    image="https://github.com/heldrida.png"
    title="Software Developer + DX"
    url="https://github.com/heldrida"
/>
