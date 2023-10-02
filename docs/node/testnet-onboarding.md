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

## Testnet Phase {1}:

Following the successful completion of Fleek Network Testnet **Phase {0}**, the core development team has been actively implementing the next set of core protocol functionalities which include services, the rewards system, the broadcaster/synchronizer, as well as all identified improvements and fixes found during that phase.

Applications for node operators will open on Fleek’s Discord Wednesday 20th at 12pm EST. This is a rolling application form in [preparation](https://blog.fleek.network/post/fleek-network-testnet-phase1-early-brief) for the release of Phase {1} in October.

:::tip
The application is **open to everyone** interested regardless if have participated in any previews phases. As we are building, the application process help us manage expectations and gather feedback. In the future, the Fleek Network is aiming to allow anyone to have the ability to set up a node without need of applying via forms or requesting permissions.
:::

1) Follow the instructions in the **#access-guide** channel and submit your application.

2) The team will provide updates in [discord](https://discord.gg/fleekxyz) to all applicants and might reach out for further information.

3) Stay tuned to updates in the **#node-announcements** channel regarding node hardware requirements, or preparations for Phase {1}.

Visit the blog [Fleek Network Testnet Phase {1}: Preview](https://blog.fleek.network/post/fleek-network-testnet-phase1-early-brief/) to learn more about the Testnet Phase {1} and find answers to frequently asked questions.

:::caution Important
Live information should be checked in the Fleek Network 
[node announcements](https://discord.com/channels/965698989464887386/1148719641896693873) Discord channel. Due to the number of requests and to improve the onboarding experience, the channel or forms might have offline periods. Check the [node announcements](https://discord.com/channels/965698989464887386/1148719641896693873) for live updates, please!
:::

## Node whitelist verification

You might find it useful to run the following command to verify the status of the node whitelist status–since a node throws an error if not whitelisted, this can be verified by looking at and monitoring the `diagnostic.log` file manually, otherwise, use the method shared here.

1) Connect to the server terminal where the node is installed

2) Switch to the user account that was used to set up the node as recommended in the [installation guide](/docs/node/install#create-a-user)

3) Execute the following command

```sh
curl -sS https://get.fleek.network/whitelist | bash
```

## News and Announcements

- All announcements for node operators will be sent to **#node-announcements**
- You can ask for help in **#troubleshooting**, or chat with the team in the **#node-operators** channel


:::tip
The node whitelist verification will verify the logs output to determine if the node has the "node whitelist" error. You can verify this manually by observing the `diagnostic.log`. To learn how to check the `logs`, read the section [analyzing log messages](/docs/node/analyzing-logs).
:::
