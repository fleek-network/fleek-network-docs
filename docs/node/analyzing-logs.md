---
title: Analyzing logs
slug: analyzing-logs
hide_title: true
tags:
  - logs
  - diagnostic
---


## Analyzing Logs

The service logs provide a timeline of events for the Lightning service that is valuable for troubleshooting when encountering issues–when issues arise, analyzing log files is the first thing a node operator needs to do.

If you've installed the Node via the [assisted installer](/docs/node/install#assisted-installer), the logs are set up for you automatically. Otherwise, you have to follow the instructions provided in the [manual installation](/docs/node/install#manual-installation) section.

## Resource monitoring

The Fleek Network Node is initialized by running the Lightning CLI which creates a process in the operating system. The process responds to requests over an inter-communication mechanism we denominate as the network.

Thus, we call the Fleek Network Node a service, meaning that the node process is a sort of application that runs as a service on a server. In the practical terms, the Lightning CLI initializes a node as a client version used to access the main service provider, the Fleek Network, composed by any number of these nodes.

As Fleek Network is used by getting and serving service requests, the node responds as a resource in the system, providing a certain level of computation to the end-user. Running nodes write to the standard output stream well-defined log messages–some more human friendly than others.

Log messages are well formatted, with an identifier describing the type: INFO, WARN, ERR, DEBUG, TRACE, etc. As Lightning CLI is in constant development, during the current development stage the output from the node is expected to be highly verbose. This helps the development team get feedback. Amongst others, you might see logs of the following types: debug and trace. For a non-developer human, can cause the feeling of reading the most dreadful information, as it should only spark joy when helping troubleshoot or make development decisions. Node operators should not panic when finding warnings, debug or trace messages as these are expected and can be ignored.

## Log messages

Log messages are well formatted and have an associated type, as described in [resource monitoring](#resource-monitoring).

Here are some of the types, a user can encounter:

- ERROR - The error designates very serious errors.
- WARN - The warning designates hazardous situations.
- INFO - The info designates useful information.
- DEBUG - The debug designates lower-priority information.
- TRACE - The trace designates very low-priority, often extremely verbose, information.

Depending on development time and schedule, some Log message types might be present in your output that offer very low-priority information, but that can be of good use for the development team, e.g. the debug and trace are good examples.

:::tip
The log messages can be quite intimidating for some users, but if you've run a [health check](/docs/node/health-check) successfully and no errors are found, you can ignore it. The logs are only meaningful when troubleshooting, monitoring or asserting the response of certain operations.

Some users ask "Is it ok?", a few "Is my Node working?", other's "Is it working?"–in general you shouldn't bother much about warning messages as those are expected through development and can be ignored by most users. 

Thus, it's best to use the [health checkup](/docs/node/health-check) to confirm if your system is running successfully.
:::

## Log types

Standard out and standard error are two data streams created when we launch the Lightning process, on Lightning process activity we redirect the data streams to files as follows:

**Standard output** - The text output from the service process is put in `/var/log/lightning/output.log`

**Standard error** - The error messages from the service process are put in `/var/log/lightning/diagnostic.log`

:::tip
By convention, most of the log files create on Linux are found under the directory `/var/log/`, a standard area where system messages are logged and recorded.
:::

Because normal output and error messages have their own channel, they can be handled independently of one another. Thus, we keep this in separate files that aggregate the output messages emitted by the Lightning process.

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
sudo docker logs -f lightning-node
```
:::
