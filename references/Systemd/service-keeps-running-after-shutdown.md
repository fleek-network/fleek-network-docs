---
title: Service keeps running after shutdown
slug: service-keeps-running-after-shutdown
hide_title: true
tags:
- reference
- shutdown
- systemctl
- systemd
- pkill
- process
---

import Author from '@site/src/components/Author';

## Stop the service

The [Systemd service](/docs/node/systemd-service) section tells how to stop the service, as follows:

```sh
sudo systemctl stop lightning
```

Although, the service is set to restart on failure after a few seconds.

## Kill the process by name

Force stop a process by name with the command `pkill`.

```sh
pkill -f <PROCESS NAME>
```

If you've followed the recommended settings, or used the assisted installer the process should be called `lgtn`.

A Systemd service is managed by [Systemctl](/docs/node/systemd-service), to start, stop, to get status or restart. The service controls the Lightning CLI service, that for our convenience named as `lgtn`–short for lightning. If you haven't followed the recommended settings and have a custom set up, you need to use the custom details you have defined.

To force stop the service `lgtn` execute the command:

```sh
sudo killall -9 lgtn
```

<Author
    name="Helder Oliveira"
    image="https://github.com/heldrida.png"
    title="Software Developer + DX"
    url="https://github.com/heldrida"
/>
