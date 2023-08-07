---
title: Token and economics
slug: token-and-economics
tags:
  - tokenomics
  - token
  - economics
  - cryptoeconomics
  - rewards
  - awards
  - incentives
sidebarCollapsible: false
sidebar_position: 1
---

The Fleek Network runs on an incentivized economy model that rewards node operators who provide resources that form the network.

## The genesis block

The token and economy model starts with a fixed inflation rate, which after the adoption phase transitions to a dynamic minting mechanism based on network utility.

## The Utility Token

Fleek Network has a utility token named FLK, an ERC-20 token issued on Ethereum (L1). The Fleek Network interacts with it as native to the protocol, given that the token intent is user accessibility and familiarity, making the interactions in the system as frictionless as possible. To accomplish this, the network has a Proof-of-Consensus bridge that facilitates entry and exit from Fleek Network—a Zero Knowledge Proof (ZKP) bridge that enables token retrieval.

## Stable token for payments

The primary income for Account Holders is derived from a set of stable cryptocurrencies, which are easily tradable and highly liquid. For example, node operators receive rewards from stable coins (USD rate), ensuring a stable and predictable income stream. Note, that the network employs an inflationary mechanism, providing additional rewards for stakeholders via the minting of FLK tokens.

## Multiple equilibrium game and stages of exploration

The Fleek Network engages with a multi-equilibrium game, where there is a stable coin for payments (USD rated) that coexists with a utility token (FLK). Essentially, we are striving for two things. Through the use of the utility token (FLK), we aim to attain equilibrium in the demand and supply of tokens, which is increased by emissions and dynamic inflation. Meanwhile, we also seek to achieve equilibrium for the stable coin by setting the appropriate price for resources, which will be managed by the governance.

The network protocol operates through three determining stages to ensure a sustainable ecosystem. The first stage involves an incentivization effort that aims to encourage early adoption of the network. This is made possible through an inflationary policy that sets a static inflation rate, resulting in the highest block rewards during all stages.

:::info
The token-economics paper describes the stages as exploration or three stages of exploration.
:::

Following the initial phase, a more deliberate strategy is implemented regarding rewards for inflation. It emphasizes the network's utility increase while continuously rewarding node operators through the inflationary minting of new tokens. However, it is important to note that while the inflation rate becomes dynamic, it's ultimately constrained by either the protocol or its governance. This effectively sets a limit on the maximum inflation rate that can be implemented.

Once the network reaches the maximum conditional utility, enters into stage three where payments made by users are significant enough to cover the costs of node operators and also provide a good profit. Indicating that the network's economy has matured and there is less dependence on inflationary rewards.

## A Proof-of-Stake layer

A secure ledger of transactions is maintained for validation, request fulfillment and consensus. At every epoch (about 24 hours), a committee is formed from a subset of any valid staked node.

## Economic Model Sustainability Measures

Node Operators are incentivized to lock the FLK token staked to boost the rewards to counter inflation. As otherwise, the inflationary economic model would pose a sustainability challenge—as node operation exodus would occur based on inflation rate drops. With the opt-in lock feature, committing to the network long-term, results in boosted rewards given the token's longevity.

Node Operators have the option to participate and lock their staked amount for a maximum of four years, maximizing potential rewards.

Time-locking is a way to increase revenue for Node Operators without causing inflation to rise beyond the targeted inflation rate. 
By keeping the token staked at a stable level, operators ensure that the total token staked across the network remains consistent and doesn't fluctuate wildly.

So Node Operators looking to boost revenue should consider time-locking as a viable option to contribute positively to the overall health of the network.

## The Reward distribution

To encourage long-term participation, several reward mechanisms were implemented that impact the way nodes are awarded and distributed.

As described in the [economic model sustainability measures](#economic-model-sustainability-measures), a node operator who chooses to opt-in and lock the tokens staked for a given period boosts the emission of token rewards. The time-lock period plays a role in the total distribution of awards across the network, as the minted token distribution mechanism to entitled nodes is based on.

The total emitted FLK token rewards per epoch are distributed to the stakeholders in the network, such as:

- Fleek Foundation—although it has no percentage of the token inflation at the network launch (due to sufficient tokens in the initial allocation), the protocol distribution percentages can change through governance when deemed necessary.
- Node Operators—critical to the network, is a system actor incentivized to manage one or many nodes, ultimately making form the Fleek Network by sharing resources in exchange for rewards.
- Service builders—due to their valuable contribution to the development of innovative services, are entitled to a portion of emission rewards as royalties and incentives for continuous innovation.

:::info
The Fleek Foundation is a critical component that supports the development and growth of the protocol by participating in on-chain and off-chain governance, providing grants, and engaging with the community.
:::

The distribution of these rewards among the stakeholders is detailed in the following table:

| Stakeholder       |    Percentage (%)    |
|-------------------|----------------------|
| Fleek Foundation  |           0%         |
| Node Operator     |          80%         |
| Service builder   |          20%         |

## Network Fees

Although the Fleek Network does not charge any transaction fees, it is crucial to establish a balanced system that promotes fairness, quality and responsibility among service providers. As a result, a Service Builder is required to pay a one-time deployment fee when deploying a service on the network.

Service Builders are encouraged to optimize their services as much as possible because the cost of deployment is determined by various factors related to the service being introduced, including its size, complexity, and resource consumption on the hosting nodes. This system ensures that the cost associated with deployment promotes efficiency and fairness among service providers.

:::info
Some networks use "gas" as a measurement for fees, which represents the amount of computational work and resources needed to start the service. In the Fleek Network, the fee is indicative of the amount of computational labor and resources necessary to initiate the service, that can help prevent malicious actors and services.
:::

The fee for service updates is typically smaller than the initial deployment fee, as long the service retains the original functionality. On the other hand, ones that alter the service's primary functionality or require significant resource adjustments are considered new service deployments.

## The transaction types

Most of the activities carried out in the protocol are centered around client top-ups, deposits, service deliveries, staking, and rewards. The activities generate the following transaction types in the ledger:

- Deposit
- Stake
- Unstake
- Stake-lock
- Delivery Acknowledgment
- Proof of Misbehaviour

### Deposit

A cryptographic proof is generated every time tokens are deposited to the bridge contract (L1). Then, a user submits a transaction (**deposit** transaction type) specifying the token and amount to be deposited (stable coin or utility token). Once successfully verified by the Fleek Network protocol, the corresponding amount of the token is added to the user account balance.

### Stake

Staking is mandatory to operate. An account holder must transfer utility tokens (FLK) to the node stake record (FLK) to participate. The user submits a transaction (**Stake** transaction type) holding details about the node and token amount. To ensure that the transfer to the node's stake ledger is successful, the account must have sufficient funds. It is crucial to note that the total amount must correspond to the requirement set by the protocol governance, as failure to meet this requirement will cause the node to malfunction.

### Unstake

Un-staking is the operation to withdraw tokens from a node in the Fleek Network protocol. Once a transaction is successfully submitted, the amount is held for a protocol-defined locking period. The account holder does not have access to un-stake funds immediately after the withdrawal request. This mechanism exists to prevent node operators from un-staking preemptively, especially if they anticipate an upcoming slashing penalty. The locking period provides sufficient time for the resolution of any disputes or misbehaviors. Once this period has ended, the node operator may request to withdraw the un-staked amount.

:::caution
It's important to note that if the remaining stake falls below the minimum requirement after un-staking, the node will no longer receive service requests.
:::

### Stake-Lock

By committing to a certain duration (protocol parameter), node operators boost their FLK inflation rewards through the use of a stake lock-up mechanism. The lock-up mechanism is different from the lock-in period that occurs during un-staking.

:::note
This particular action cannot be undone. This implies that a node operator who opts to stake-lock cannot withdraw that amount until the end of the stake-lock-in period.
:::

### Delivery-Acknowledgment

A **Delivery Acknowledgement** is a transaction type that functions as a client receipt for a successful service from an edge node. It's cryptographically secured and tamper-proof, meaning that the transaction contains irrefutable details about all parts involved in the transaction. A Delivery Acknowledgement includes metadata about the commodities consumed by a node while executing or running a service. Also contains metadata that is used to determine the reward attributed to a Node.

The nodes utilize these transaction types to claim rewards by submitting to the consensus in batch form. Upon successful submission, each Delivery Acknowledgment triggers a transfer of rewards from the reward pool to the respective node's balance at the end of each Epoch (about 24 hours). When clients earn stablecoins, they also receive newly minted FLK tokens in proportion to their revenue. Additionally, any reward boosts that apply based on the stake lock period are included in the payout.

### Proof of Misbehavior

A **Proof-of-Misbehavior** occurs when a client receives an inaccurate or faulty response from a node. When the transaction type is submitted by a client, the protocol ensures that any faulty nodes are penalized by reducing the number of tokens staked. In case a node's stake falls below the minimum required by the protocol, it will be suspended and won't be able to receive any service requests until the necessary amount is restored.

## Token distribution

The distribution of the tokens is detailed in the following table:

| Stakeholder          |    Percentage (%)    |
|----------------------|----------------------|
| Community            |    60%               |
| Early supporters     |    20%               |
| Fleek Network team   |    20%               |


The **Early supporters** are stakeholders who contributed to the project's initial funding phases or supported the project through other means.

The **Community** has the largest share of the token allocation, which is further distributed granularly. It includes the **Foundation** 33% share (corresponding to 20% of the total). For **funding and support opportunities** (airdrop, bounties and grants) there's a 40% share (corresponding to 24% of the total). The **DAO** share is 17% (10% of the total) and 10% (6% of the total) is set aside for public sales and liquidity bootstrapping.

The distribution of the token allocation in the community is detailed in the following table:

| Community member                  |    Percentage (%)    |
|-----------------------------------|----------------------|
| Airdrop, bounties and grants      |    40%               |
| DAO                               |    17%               |
| Foundation                        |    33%               |
| Public sales and liquidity        |    17%               |