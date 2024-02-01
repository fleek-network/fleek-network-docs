---
title: Testnet onboarding
slug: testnet-onboarding
hide_title: true
description: Join Fleek's Testnet onboarding, follow Discord instructions to install and verify your node. Check live updates, attend community calls, and ensure node is setup correctly. 
tags:
  - testnet
  - onboarding
  - phases
  - getting started
sidebarCollapsible: false
---

import Author from '@site/src/components/Author';
import InfoNetworkParticipation from '../../guides/partials/_info_network_participation.mdx';

:::warning
The following instructions are intended for onboarding Node Operators into the Testnet and will only be useful for Testnet Phases that are **public** or for Node Operators who have been **contacted** and **selected** by the Fleek Foundation. Please be aware that guidelines or instructions for participation are provided prior to the launch of a Testnet Phase. If you'd like to **participate** in the next **Testnet Phase**, follow us on [Discord](https://discord.gg/fleek), [Twitter](https://twitter.com/fleek_net), and our [Blog](https://blog.fleek.network/).
:::

## Testnet Phase:

Following the successful completion of Fleek Network [first Testnet Phases](https://blog.fleek.network), the core development team has been actively implementing the next set of core protocol functionalities, which include services, the reward's system, the broadcaster/synchronizer, as well as all identified improvements and fixes found during that phase.

### Prerequesites

The Fleek team cares about user experience and provides documentation and tools (whichever's your preference) to onboard easily and quickly. However, the Node operator's server should have the [minimum requirements](/docs/node/requirements) to set up and run a Fleek Network node.

To join, you will have to follow the steps below:

### 1) Install the Fleek Network Lightning CLI latest version

Once Fleek launches the Testnet Phase, you have to install or update the Lightning CLI binary to the latest version. The instructions are available [here](/docs/node/install) where you can use an assisted installer or install it manually by following the documentation. If you already have it installed, use the update reference provided [here](/references/Lightning%20CLI/update-cli-from-source-code) or if you prefer a more step-by-step approach use the provided [guide](/guides/Node%20Operators/updating-lightning).

:::caution Warning
Particular Testnet versions are only available after the Testnet Phase is ready and announced! Since we work transparently (open-source) some users rush to install things on their own assumptions, misaligned, which causes them confusion. The Fleek Network core team is required to provide all the changes, features and tests before announcing publicly that the particular testnet phase is ready. Otherwise, you'll be running the process prematurely, be patient to avoid disappointment please!
:::

### 2) Set up the Metamask browser extension

Open the Metamask `settings`, located in the drop-down (top-right menu options). Set the following property values:

- Network Name: `Fleek Network Testnet`
- RPC URL: `https://rpc.testnet.fleek.network/rpc/v0`
- Chain ID: `59330`
- Currency symbol: `tFLK`

:::note
`Testnet FLK` on testnets are supposed to have no real value. Since you need Testnet `FLK` to actually interact with Fleek Network, users get `Testnet FLK` for free from the faucet. For clarity and simplicity we'll refer to `Testnet FLK` as `tFLK`.
:::

### 3) Visit the faucet website

Before proceeding, make sure to have the Fleek Network selected as the metamask network. Once confirmed, visit the [Faucet website](https://faucet.testnet.fleek.network/)

### 4) Connect wallet

In the [Faucet website](https://faucet.testnet.fleek.network/), you have to click the `Connect Wallet`.

### 5) Mint tFLK

Once `Connect Wallet` is ready, proceed to `Mint tFLK` and wait until the balance of the account in your Metamask increases. You need to have `tFLK` before proceeding. Be patient.

### 6) Stake tFLK

Once `tFLK` balance is available, click in the `Stake` button. You'll be required to provided the following details from your node:

- Node Public Key
- Consensus Public Key
- Server IP Address

You can get the details quickly by running the **node details** script in the terminal connected to your machine or server where the node is set up and running, as follows:

```sh
curl https://get.fleek.network/node_details | bash
```

The response should include the following details:

```
🤖 Your server details are the following

The Node Public Key is <NODE PUBLIC KEY>
The Consensus Public Key is <CONSENSUS PUBLIC KEY>
The Node Server IP address is <SERVER IP ADDRESS>
```

:::caution warning
The output above is an example, you'll not find the actual text `<NODE PUBLIC KEY>`, `<CONSENSUS PUBLIC KEY>` but the text values (string of bits), or `<SERVER IP ADDRESS>` where instead you'll find a numerical ip address.
Make sure that you copy and paste the correct values otherwise the transaction will fail!
:::

### 7) Confirm the transaction on metamask

It is important to note that when transacting through Metamask, a warning message might pop up regarding gas costs, but rest assured that there won't be any deductions from your wallet balance.

You'll have to wait for Metamask to confirm the transaction, which Metamask should take about 10 seconds to confirm. Although, the transaction takes under a second.

:::info
Important to note that in Testnet Phase {1} the Epoch is set to about 30 minutes. This is the average period you'll have to wait to see any meaningful logs.
:::

### 8) Network participation

The Node Operator has to explicitly opt-in to have the Node participate in the Network.

<InfoNetworkParticipation />

The Opt command allows the user to opt into or out of Network participation.

To opt-in, use the subcommand in:

```sh
lgtn opt in
```

Once successful, you will receive a confirmation text message as feedback, notifying you of your inclusion in the next Epoch.

To learn more about network participation visit the [Opt](/docs/node/lightning-cli/#opt) section in the [Lightning CLI](/docs/node/lightning-cli) page.

### 9) Start the Node

Visit the section [Systemd Service](/docs/node/systemd-service) to learn how to enable, disable, start, stop the Systemd Service.

:::note
The Systemd Service is setup automatically by the assisted installer, manually if you have followed the instructions provided, or the docker install. If you have a custom set up, you'll have to do the equivalent to start the node as described in the section [Systemd Service](/docs/node/systemd-service).
:::

Make sure you do a quick healthcheck:

```
curl https://get.fleek.network/healthcheck | bash
```

To learn more about healchecks read the section [here](/docs/node/health-check).

### 10) Confirm Node Stake

To confirm the Node Staked amount, you can run the **node details** script to get the information. The **node details** output will only show staked information if available, if it doesn't show staked information it means that your Node is not properly staked.

Check the Node stake by running the following command in the machine or server where the node is set up:

```sh
curl https://get.fleek.network/node_details | bash
```

Alternatively, the Stake amount can be verified by querying the [RPC-JSON API](/docs/learn/the-network/#json-rpc-interface) method `flk_get_node_info`. 

## Troubleshooting

### The Node fails to run after successfully stake and run? Or the Core team network restart announcement?

The Fleek Network core team might have to restart the network, for any development purposes or required updates during the Testnet Phase. If you've done this process before and is running into issues, you'll have to go into the Metamask advance settings (Metamask → Settings → Advanced) and click `Clear activity and nonce data` or `Clear Local data`. After doing this Metamask will clear the cache.

### Node details don't show staked amount?

If you have staked successfully and the transaction details in the Metamask wallet is confirmed, but the **node details** script or the [RPC-JSON API](/docs/learn/the-network/#json-rpc-interface) method `flk_get_node_info` shows an empty result, do the following:

Metamask:
- Copy the Account address at the very top of your Metamask home
- Copy the Transaction ID by clicking in the tFLK transaction → Copy Transaction ID at the very top
- Copy the Activity log details of the transaction

Server where the Node is set up:
- Copy the Node Public Key
- Copy the Server IP Address

:::tip
You can get the Node Public Key and Server IP Address quick by using the [node details](#6-stake-tflk) script described in the section.
:::

Report to us by sharing the details about via our [discord](https://discord.gg/fleek) troubleshooting channel.

### Can I shut down the node after Testnet completion?

Once the Testnet finishes, it's not necessary to keep the node active. Furthermore, as the Testnet identity (keystore node and consensus pem keys) and its related stake hold no intrinsic value other than for testing purposes, you can delete them.

However, if you wish to learn about key management, you can refer to the [instruction guide](/guides/Node%20Operators/managing-the-keystore) to learn on how to back up or restore keys, etc.

<Author
    name="Helder Oliveira"
    image="https://github.com/heldrida.png"
    title="Software Developer + DX"
    url="https://github.com/heldrida"
/>
