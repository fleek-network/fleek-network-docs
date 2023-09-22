---
title: Token and economics
slug: token-and-economics
hide_title: true
description: Explore the preliminary breakdown of the Fleek Network's FLK token distribution, its integral role in node operations, the balance of economic incentives, and potential adjustments in pre-mainnet phases.
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

## Overview

The Fleek Network runs on an incentivized economy model that rewards node operators who provide resources that form the network. Currently, the economic model is to be considered a first draft, subject to change based on the data and feedback collected throughout all phases of testnet. The purpose of sharing a first draft is to provide clarity to prospective node operators and developers interested in participating in any pre-mainnet activities. You can find the complete breakdown of this information in this [article](https://blog.fleek.network/post/fleek-network-testnet-plans/)


## The Utility Token

Fleek Network has a utility token named FLK, an ERC-20 token issued on Ethereum (L1). The Fleek Network interacts with it as native to the protocol, given that the token intent is user accessibility and familiarity, making the interactions in the system as frictionless as possible. To accomplish this, the network has a Proof-of-Consensus bridge that facilitates entry and exit from Fleek Network—a Zero Knowledge Proof (ZKP) bridge that enables token retrieval.

## Stable token for payments

The primary income for Account Holders is derived from a set of stable cryptocurrencies, which are easily tradable and highly liquid. For example, node operators receive rewards from stable coins (USD rate), ensuring a stable and predictable income stream. Note, that the network employs an inflationary mechanism, providing additional rewards for stakeholders via the minting of FLK tokens.

## Resource Pricing

To start, Fleek Network only plans to charge for bandwidth and CPU cycles consumed. Pricing will be set at the network level, and resources will be priced and paid for in USD-denominated stablecoins. The exact pricing methodology will be determined and finalized throughout the testnet phases based on different factors. Those factors include:

- Cost data the Foundation collects from node operators during testnet
- The final specs of the SDK (which will determine what data the protocol can verifiably collect from nodes and reliably charge for)

**Please be aware, there will be no fees paid during any of the testnet phases, the above is solely for illustrative purposes** to give nodes a better understanding of the current thinking and what the process to finalize resource pricing might look like. We will work collaboratively with node operators throughout testnet to fairly determine resource pricing to ensure appropriate node incentivization while offering competitive pricing to developers.

It’s also important to note that node operators are independent of the Foundation, the network, and each other. They are responsible for managing their own economics, including any taxes payable in any jurisdiction relevant to them due to their participation in the network.

---

## The FLK Token:

FLK is a staking token that is an integral part of the Fleek Network. Nodes running the Fleek Network client software are required to obtain and stake FLK in order to participate in the network and to have the opportunity to earn fees for providing work. Below is some high-level information on the anticipated characteristics of the FLK token:

- Stake amount per node is set/managed at the protocol level, and consistent across all nodes
- Work is allocated based on location (latency) and reputation (performance)
- Resources on the network are priced and paid by users in USD denominated stablecoins
    - Pricing of resources happens at the network level.
- Nodes only receive rewards related to work they perform, based on resources used/consumed (including FLK rewards)
- FLK rewards are paid out per epoch (~24 hours). The FLK reward pool for each epoch is split proportionally between nodes who performed work during that epoch, calculated by the amount of USD revenue each node earned compared to the total revenue earned during that epoch.
- 20% of the total FLK token supply is set aside for staking/rewards. The actual rate of rewards/inflation will be algorithmically controlled and updated based on network usage and other factors such as the market price of FLK.

**DISCLAIMER**: All information in this post about the FLK token and other elements of the Fleek Network is being provided solely for informational purposes and does not constitute an offer to sell FLK tokens, or a request for such offers, in any jurisdiction. There are currently no plans to sell FLK tokens. If FLK tokens do become available, you should not rely on the information in this blog post in making purchasing decisions, as the blog post was not prepared for that purpose and there will be important additional information to consider. In addition, we will likely publish further blog posts with updated information about the platform launch.

<u>ALTHOUGH THERE ARE NO PLANS TO SELL FLK TOKENS AT THIS TIME, FOR THE AVOIDANCE OF DOUBT, IF FLK TOKENS EVER WERE TO BE SOLD, THEY WOULD BE OFFERED FOR SALE ONLY OUTSIDE OF THE UNITED STATES TO NON‐U.S. PERSONS, PURSUANT TO THE PROVISIONS OF REGULATION S OF THE U.S. SECURITIES ACT OF 1933, AS AMENDED (THE “SECURITIES ACT”). THE OFFER AND SALE OF FLK TOKENS WILL NOT BE REGISTERED UNDER THE SECURITIES ACT, AND MAY NOT BE OFFERED OR SOLD IN THE UNITED STATES ABSENT REGISTRATION OR AN APPLICABLE EXEMPTION FROM THE REGISTRATION REQUIREMENTS.</u>

---

## Algorithmic Economic System

The TLDR of the current implementation being discussed is that the network will handle the economic system/inflation algorithmically, using a concept we are calling **NME, which stands for [N]et present value (npv) [M]arket price [E]quillibrium.**

The algorithmic economic system has several goals, listed below in order of priority:

- Provide an opportunity for receiving consistent blended earnings to node operators based on their work in most market conditions
    - “Blended” means taking into account both the USD stablecoin fees that nodes are earning, as well as the FLK rewards they are earning (including factoring in the time-weighted average market price of FLK).
    - This means if network usage/revenue increases, FLK rewards will likely decrease, and vice versa. This also means that if the time-weighted average market price of FLK increases, nodes should reasonably expect that the amount of FLK rewards will decrease, but the value of FLK rewards received (in USD terms) will remain approximately the same.
- Don’t overcompensate nodes, especially in times of market volatility
    - If the market price of FLK deviates from the NPV calculated in-protocol based on time-weighted average protocol-level revenue, nodes should reasonably expect that FLK rewards by number would be reduced.
- Keep the network economy in equilibrium in most market conditions
- Provide better incentives to node operators that are long-term aligned

The algorithm driving the above system will run autonomously in-protocol. However, we anticipate that certain parameters of the algorithm may be treated as parameters that can be adjusted/updated with a network governance proposal, as needed. We currently anticipate that the parameters that can be adjusted will be:

- Maximum FLK inflation/reward rate
- Resource pricing (bandwidth, compute, etc.)
- Average cost of running a node
- Target node margin rate
- Stake amount (# of FLK) per node
- Discount rate
- Time-weighted average market price of FLK
- Maximum stake lock time
- Stake lock multiplier

---

## Protocol-Owned Liquidity

In addition to the in-protocol algorithmic network economic system, the DAO/protocol will also manage 5% of the FLK token supply, which we anticipate will be set aside specifically to allow the community to take certain actions intended to provide long-term benefits to the network’s ecosystem and to help maintain the intended balance in the network economy. It will behave based on predetermined conditions and rules that are publicly auditable. The high level function would be the following:

- Set limit asks to sell tranches of FLK tokens at different price levels in the event of a market price increase that deviates from NPV
- Set limit buys to buy FLK tokens in the event of a price decrease where market price is lower than the current NPV

Benefits:

- Helps keep the economic system in equilibrium by using protocol-owned FLK inventory to absorb volatility
- Generates additional revenue for the protocol by capturing fees related to these activities
- Provides better liquidity for node operators who might want to liquidate a portion of their FLK rewards
- Smooths out volatility/price changes in periods of extreme market fear/greed

---

## FLK Token Distribution

The following is an initial rough draft of the potential FLK token distribution, subject to adjustments or revisions.

### Overall Distribution

| Overall                                 |    Percentage (%)    |
|-----------------------------------------|----------------------|
| Community                               |    66%               |
| Core Contributors (current and future)  |    17%               |
| Backers/Node operators                  |    17%               |
| Total                                   |   100%               |

### Community Distribution

| Community member                        |    Percentage (%)    |
|-----------------------------------------|----------------------|
| Staking and rewards                     |   20%                |
| Ecosystem funds (Airdrop, grants, etc)  |   20%                |
| DAO                                     |   10%                |
| Foundation                              |   10%                |
| Protocol Owned Liquidity                |    5%                |
| Pre-Mainnet Community                   |    1%                |
| Total                                   |   66%                |
