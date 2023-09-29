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

The service logs provide a timeline of events for the Lightning service that is valuable for troubleshooting when encountering issues–when issues arise, analyzing log files is the first thing a node operator needs to do.

If you've installed the Node via the [assisted installer](/docs/node/install#assisted-installer), the logs are set up for you automatically. Otherwise, you have to follow the instructions provided in the [manual installation](/docs/node/install#manual-installation) section.

## Log types

Standard out and standard error are two data streams created when we launch the Lightning process, on Lightning process activity we redirect the data streams to files as follows:

**Standard output** - The text output from the service process is put in `/var/log/lightning/output.log`

**Standard error** - The error messages from the service process are put in `/var/log/lightning/diagnostic.log`

:::tip
By convention, most of the log files create on Linux are found under the directory `/var/log/`, a standard area where system messages are logged and recorded.
:::

Because normal output and error messages have their own channel, they can be handled independently of one another. Thus, we keep this in separate files that aggregate the output messages emited by the Lightning process.

## Watch logs

The log files can be monitored in real-time for diagnosis and troubleshooting purposes and the tail command is the most basic way for this purpose.

You can watch the node standard output (stdout) by running the command:

```sh
tail -f /var/log/lightning/output.log
```

Or, watch the standard error (stderr) for node diagnostics by running the command:

```sh
tail -f /var/log/lightning/diagnostic.log
```

:::tip
If you are controlling the Docker Container as a Systemd Service (Systemctl to start, stop or check the status) then the standard out (stdout) and standard error (stderr) logs are available as `/var/log/lightning/*.log`.

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
