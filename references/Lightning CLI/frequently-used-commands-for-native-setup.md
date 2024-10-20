---
title: Frequently used commands for Native setup
slug: frequently-used-commands-for-native-setup
hide_title: true
tags:
- commands
- cli
- lightning
---

import TipShutdownGracefully from '../../guides/partials/_tip_shutdown_gracefully.mdx';
import WarningPreventPrematureShutdown from '../../guides/partials/_warning_prevent_premature_shutdown.mdx';

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

<WarningPreventPrematureShutdown />

<TipShutdownGracefully  />

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

### Network Participation management


Show help for opt into or opt out of network participation by:

```sh
lgtn opt help
```

The options are available should be made available to you as follows:

```sh
Opt into or opt out of network participation

Usage: lgtn opt [OPTIONS] <COMMAND>

Commands:
  in      Opt into network participation
  out     Opt out of network participation. Run this command before shutting down your node
  status  Query the participation status of your node
```

For example, to opt-in you'd run:

```sh
lgtn opt in
```

<WarningPreventPrematureShutdown />

<TipShutdownGracefully  />

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
