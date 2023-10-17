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

Following the successful completion of Fleek Network Testnet Phase {0}, the core development team has been actively implementing the next set of core protocol functionalities, which include services, the rewards system, the broadcaster/synchronizer, as well as all identified improvements and fixes found during that phase.


The Testnet Phase {1} is open to everybody. To join, you will have to follow the steps below:

1) Install the Fleek Network Lightning CLI latest version. Find the instructions to installer [here](/docs/node/install), if you already have it installed use the update instructions [here](/references/Lightning%20CLI/update-cli-from-source-code)

Once Fleek launches the Testnet Phase {1}, you have to install or update the Lightning CLI binary to the latest version. The instructions are available [here](/docs/node/install) where you can use an assisted installer or install it manually by following the documentation. If you already have it installed, use the update instructions provided [here](/references/Lightning%20CLI/update-cli-from-source-code).

:::caution Warning
The Testnet Phase {1} version should only be available after the Testnet Phase {1} is ready and announced. Since we work transparently (open-source) some users rush to install things on their own and misaligned which causes issues. The Fleek Network core team is required to provide all the changes, features and tests before announcing publicy that the testnet phase is ready. Otherwise, you'll be running the process prematurely, be patient please!
:::

2) Setup the Metamask browser extention

Open the Metamask `settings`, located in the drop-down (top-right menu options).

- Network Name: `Fleek Network Testnet`
- RPC URL: `https://rpc.testnet.fleek.network/rpc/v0`
- Chain ID: `1337`
- Currency symbol: `FLK`

3) Visit the faucet website

Before proceeding, make sure to have the Fleek Network selected as the metamask network. Once confirmed, visit the [Faucet website](https://TODO:add-faucet-url)

4) Connect wallet

In the [Faucet website](https://TODO:add-faucet-url), you have to `Connect Wallet`.

5) Mint FLK

Once `Connect Wallet` is ready, proceed to `Mint FLK` and wait until the balance of the account in your Metamask increases. You need to have `FLK` before proceeding. Be patient.

6) Stake FLK

Once `FLK` balance is available, click in the `Stake` button. You'll be required to provided the following details from your node:

- Node Public Key
- Consensus Public Key
- Server IP Address or domain name (pointing to the server IP)

You can get the details by running the **server details** script in your terminal connected to your machine or server, as follows:

```sh
curl https://get.fleek.network/server_details | bash
```


:::tip
The Fleek Network core team might have to restart the network, for any development purposes or required updates during the Testnet Phase {1}. If you've done this process before and is running into issues, you'll have to go into the Metamask advance settings (Metamask → Settings → Advanced) and click `Clear Local data`. After doing this Metamask will clear the cache.
:::