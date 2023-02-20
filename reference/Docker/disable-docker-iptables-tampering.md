---
template: post
draft: false
hide_title: false
title: Disable docker iptables tampering
slug: disable-docker-iptables-tampering
date: 2023-02-09T31:00:00Z
canonical: ''
description: Learn how to disable Docker iptables tampering
category: Reference
tags:
- Reference
- docker
- Fleek Network
- iptables
- ufw
- firewall
---

Docker tampers with the firewall rules to some extent. By default, Docker will manipulate the iptables, so if you are using `ufw` or `iptables`, you might find that docker overrules it (Docker overrides UFW rules).

If you are using an app like `ufw` be aware that `ufw` will fail to report the actual state of `iptables`.

With `tcpdump`, you can listen to a particular port, and for example, check if requests are coming in to determine the state of your firewall rules:

```sh
tcpdump port 80
```

Disable iptables in Docker may lead to other issues, if you are looking for a quick one-step instruction, which is mostly error-prune, look elsewhere as this is a reference document and you should know what you are doing. Find more about this subject in the official [Docker iptables](https://docs.docker.com/network/iptables/).

The security of your server should be taken care of seriously and playing with firewall rules need proper verification, which responsibility is on you!

```sh
/etc/docker/daemon.json
```

```sh
{
  "iptables": false
}
```

Restart the Docker daemon, e.g., in Linux Ubuntu

```sh
systemctl stop docker
systemctl start docker
```

You may alsos need to reload `ufw`.

Most cloud providers have external firewalls that sit in front of the server. You can leverage cloud-based firewalls to help customize or solve any issue you may encounter.