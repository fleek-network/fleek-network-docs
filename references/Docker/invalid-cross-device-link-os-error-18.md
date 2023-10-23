---
title: Invalid cross-device link (os error 18)
slug: invalid-cross-device-link-os-error-18
hide_title: true
tags:
- docker
---

import Author from '@site/src/components/Author';
import FindAndReplaceConfigWithUserPaths from '../../guides/partials/_find-and-replace-config-with-user-paths.mdx';

```sh
Error: Failed to build app db from checkpoint: Invalid cross-device link (os error 18)
```

Mount the `/var/tmp` from host to container to persist between sessions.

Notice the flag `--mount`:

```sh
--mount type=bind,source=/var/tmp,target=/var/tmp
```

The complete `docker run` command should look like:

```sh
sudo docker run \
    -p 4200-4299:4200-4299 \
    -p 4300-4399:4300-4399 \
    --mount type=bind,source=$HOME/.lightning,target=/root/.lightning \
    --mount type=bind,source=/var/tmp,target=/var/tmp \
    --name lightning-node \
    -it ghcr.io/fleek-network/lightning:latest
```

Since it's recommended to use the Systemd service unit to manage the Fleek Network Lightning service, you'll have to open and update it.

Open and edit the file `/etc/systemd/system/docker-lightning.service` in your favorite text editor, making sure the `--mount type=bind,source=/var/tmp,target=/var/tmp` is included in the `ExecStart`.

```sh
[Unit]
Description=Fleek Network Node lightning service
After=docker.service
Requires=docker.service

[Service]
Restart=always
RestartSec=5
TimeoutStartSec=0
ExecStartPre=-/usr/bin/docker kill lightning-node
ExecStartPre=-/usr/bin/docker rm lightning-node
ExecStartPre=/usr/bin/docker pull ghcr.io/fleek-network/lightning:latest
ExecStart=/usr/bin/docker run -p 4200-4299:4200-4299 -p 4300-4399:4300-4399 --mount type=bind,source=/home/skywalker/.lightning,target=/root/.lightning --mount type=bind,source=/var/tmp,target=/var/tmp --name lightning-node ghcr.io/fleek-network/lightning:latest
ExecStop=/usr/bin/docker stop
StandardOutput=append:/var/log/lightning/output.log
StandardError=append:/var/log/lightning/diagnostic.log

[Install]
WantedBy=multi-user.target
```

Save the file before proceeding to restart the daemon as follows:

```sh
sudo systemctl daemon-reload
```

To complete, restart the service:

```sh
sudo systemctl enable docker-lightning.service
``````

<Author
    name="Helder Oliveira"
    image="https://github.com/heldrida.png"
    title="Software Developer + DX"
    url="https://github.com/heldrida"
/>
