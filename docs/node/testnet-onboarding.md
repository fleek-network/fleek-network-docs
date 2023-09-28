---
title: Testnet onboarding
slug: testnet-onboarding
hide_title: true
description: Join Fleek's Testnet onboarding, follow Discord instructions to install and verify your node. Check live updates, attend community calls, and ensure node whitelist status. 
tags:
  - testnet
  - onboarding
  - phases
  - getting started
sidebarCollapsible: false
---

## Testnet Onboarding

1. Join our [Discord](https://discord.gg/fleekxyz) server
    
  a) To get onboarded, go to the `Fleek Network Nodes` section and follow the instructions in the **#access-guide** channel

2. Learn about the [required server specifications](/docs/node/requirements) on which the Fleek Network Node can be installed and run.

3. Follow the [instructions](/docs/node/install) to install the node via the [assisted installer](/docs/node/install#assisted-installer) (easy) or [manually](/docs/node/install#manual-installation) (advanced).

4. In our [Discord](https://discord.gg/fleekxyz) server, visit **#access-form,** run the node commands, and submit the information in the form.

:::caution Important
Live information should be checked in the Fleek Network 
[node announcements](https://discord.com/channels/965698989464887386/1148719641896693873) Discord channel. Due to the number of requests and to improve the onboarding experience, the channel or forms might have offline periods. Check the [node announcements](https://discord.com/channels/965698989464887386/1148719641896693873) for live updates, please!
:::

5. The team will review your application, allowing/listing your node if approved

:::info
When approved, you will be notified in the **#access-approved** channel on Discord and given the Node Operator role.
:::

## Important [Discord](https://discord.gg/fleekxyz) Notes & Events:

- All announcements for node operators will be sent to **#node-announcements**
- You can ask for help in **#troubleshooting**, or chat with the team in the **#node-operators** channel
- Every Friday at 3 pm EST, we will conduct Node Community Calls in **#node-stage**

## Node whitelist verification

You might find it useful to run the following command to verify the status of the node whitelist status–since a node throws an error if not whitelisted, this can be verified by looking at and monitoring the `diagnostic.log` file manually, otherwise, use the method shared here.

1) Connect to the server terminal where the node is installed

2) Switch to the user account that was used to set up the node as recommended in the [installation guide](/docs/node/install#create-a-user)

3) Execute the following command

```sh
curl -sS https://get.fleek.network/whitelist | bash
```

:::tip
The node whitelist verification will verify the logs output to determine if the node has the "node whitelist" error. You can verify this manually by observing the `diagnostic.log`. To learn how to check the `logs`, read the section [analyzing log messages](/docs/node/analyzing-logs).
:::

:::warning
We are going to be whitlisting in waves at the beginning of every epoch. Epochs are currently 30 mins (as for this period of testnet). If you have [updated the binary](/references/Lightning%20CLI/update-cli-from-source-code), run the node that you applied with. While your not whitelisted your node will be checking every 5 minutes and will start when whitelisted.
:::