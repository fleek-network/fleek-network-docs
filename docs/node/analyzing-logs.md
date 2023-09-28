---
title: Analyzing logs
slug: analyzing-logs
hide_title: true
tags:
  - logs
  - diagnostic
---

import Author from '@site/src/components/Author';

## Analyzing Logs

The service logs provide a timeline of events for the Lightning service that is valuable for troubleshooting when encountering issues. When issues arise, analyzing log files is the first thing a node operator needs to do.

To have the log message files (output.log and diagnostic.log), these have to be set up. If you have installed the Node via the [Assisted installer](/docs/node/install#assisted-installer), the logs are set up for you automatically.

You can watch the Node output by running the command:

```sh
tail -f /var/log/lightning/output.log
```

You can watch the Node diagnostics or errors by running the command:

```sh
tail -f /var/log/lightning/diagnostic.log
```

:::tip
If you are controlling the Docker Container as a Systemd Service (use Systemctl to start, stop or check the status) then the stdout and stderr logs should be available as `/var/log/lightning/*.log` as the example provided in the section [analyzing log messages](/docs/node/analyzing-logs).

In any case, you can use the Docker command to analyze the logs. If you have stick with the default naming conventions it'd look like:

```sh
sudo docker logs -f lightning-cli
```
:::

<Author
    name="Helder Oliveira"
    image="https://github.com/heldrida.png"
    title="Software Developer + DX"
    url="https://github.com/heldrida"
/>
