---
title: Health check
slug: health-check
hide_title: true
tags:
  - healthcheck
  - verification
  - node status
---

## TL;DR: Run the command

A script is available to do and provide a health check overview:

```sh
curl -sS https://get.fleek.network/healthcheck | bash
```

## Overview

In network applications, a health check is a process of verifying the overall health and availability of a service. It usually involves sending a request to a specific endpoint of a service and receiving a response indicating the status. The response includes information about the status of the service, or any errors or warnings if not healthy. This helps developers, node operators, and system administrators identify and resolve issues that may affect the network, node performance and availability.

A Node operator or system administrator can communicate with the node to confirm the status at any time.

:::tip
We're using cURL, for the examples, thus make sure that you have it installed on your operating system.
:::

## What's a node health check?

A Node health check is exactly what it sounds like, a way of checking the health status of a Fleek Network node.

A Node operator can do a health check (as it's common among system operators worth their title) to get feedback and see if the resource is operating successfully. It's a good practice for a Node operator to do it frequently, as otherwise there'd be no way of knowing whether the Node is running. For example, some advanced operators automate this process by using cronjobs and getting reports via email, etc.

Health checks are valuable and a must for all the Node operators, as they are incentivized to participate in the network by making their resources available which the reward mechanism evaluates.

Rewards are only a given for good behavior and thus an unhealthy Node or bad management can cause disappointment. A decentralized and permissionless network, which is beyond anyone's control (us included) requires some education by the users.

A system can be highly customizable and understanding some basics can help you achieve success as a node operator, resource health checking is important.

Fleek Network depends on the Node operator's success, thus we try to keep things simple and try to motivate you to learn for the network's overall health. That's what a Node health check is about, your contribution!

## The host address

When a Fleek Network Node is initialized, the address which is bound to is `0.0.0.0`, meaning that the service is listening to all the host-configured network interfaces, such as `127.0.0.1`.

Any traffic sent to an addressable interface that hits the correct endpoint or port number should have a response by the node. Of course, bear in mind that your system should not have any form of firewall or blockers configured.

:::tip
The `127.0.0.1` is generally the IP address assigned to the **loopback** or local-only interface, which is a mock network adapter that only allows communication within the same host.
:::

## Communication ports

To communicate, the Node uses TCP and UDP (retransmission of lost data packets is only possible with TCP, for example, when we download a file from the internet through our browsers we expect a complete file, no bits should be missing, TCP ensures that the data is received correctly, data is not missing and is in order).

The ports should be available and free in the host for other services to operate via the communication ports. Make sure you don't have blockers, such as a Firewall, or forget to expose them in Docker, or on your custom setup. If that's the case open up your firewall, and if needed a port-forward, if docker doesn't do that for you.

To learn more, read the section [ports](/docs/node/requirements#ports).

:::tip
Remember, the Node won't be able to respond if the ports are blocked. This might be quite difficult to troubleshoot, so make sure you have control over your system permissions to guarantee a successful node operation.
:::

## Quick health check

Run a quick health check by sending a GET request to `/health` endpoint of RPC on [port](/docs/node/requirements#ports) 4230.

```sh
curl -w "\n" localhost:4230/health
```

If successful, you should get the response `running and staked`, as follows:

```sh
running and staked
```

If you get an error, then it means that your node is not healthy.

## JSON-RPC Health check

We'll send a request to the JSON RPC `flk_ping` method. Execute the following command:

```sh
curl -X POST -H "Content-Type: application/json" -d '{
    "jsonrpc": "2.0",
    "method": "flk_ping",
    "params": [],
    "id": 1
  }' localhost:4230/rpc/v0
```

If the request is successful, you should get the result `pong` as follows:

```sh
{
  "jsonrpc": "2.0",
  "result": "pong",
  "id": 1
}
```

Any other response, such as errors determine that the node is not healthy.
