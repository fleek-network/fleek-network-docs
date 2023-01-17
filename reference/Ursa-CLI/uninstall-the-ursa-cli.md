---
template: post
draft: false
hide_title: false
title: Uninstalling the Ursa CLI
slug: uninstall-the-ursa-cli
date: 2023-01-02T23:00:00Z
canonical: ''
description: Instructions about how to find help for the Ursa command line
category: Tutorial
tags:
- Reference
- Fleek Network
- node
- uninstall
- removal
---

Stop the Fleek Network node for Docker

```sh
docker-compose -f docker/full-node/docker-compose.yml down
```

Stop the Fleek Network node by sending a terminate signal (SIGTERM) to the `ursa` process

```sh
pkill ursa
```

Stop the Fleek Network node in Ubuntu Linux by finding what the process id (PID) of `ursa` cli is by finding which process is listening on the port 6009 or 4069.

```sh
lsof -i tcp:6009
```

The output tell us that the PID of `ursa` cli is 4170

```sh
COMMAND  PID    USER   FD   TYPE             DEVICE SIZE/OFF NODE NAME
ursa    4170 fleek   21u  IPv4 0x51942195f572b377      0t0  TCP *:6009 (LISTEN)
ursa    4170 fleek   22u  IPv4 0x51942195f57f7367      0t0  TCP 192.168.0.48:51450->159.223.211.234:6009 (ESTABLISHED)
ursa    4170 fleek   24u  IPv4 0x51942195f5729e17      0t0  TCP 192.168.0.48:51451->146.190.232.131:6009 (ESTABLISHED)
ursa    4170 fleek   26u  IPv4 0x51942195f599a357      0t0  TCP 192.168.0.48:51452->146.190.232.131:6009 (ESTABLISHED)
ursa    4170 fleek   29u  IPv4 0x51942195f599ee27      0t0  TCP 192.168.0.48:51453->159.223.211.234:6009 (ESTABLISHED)
```

Stop the process by using the `kill` command. Here's an example for macos:

```sh
kill -9 4170
```

Tell where the `ursa` cli in the current shell environment is located (the `ursa` executable).

```sh
which ursa
```

Here's an example of what the output looks like on macos

```sh
/Users/fleek/.cargo/bin/ursa
```

Remove the `ursa` cli

```sh
rm <PATH-OF-URSA-CLI>
```