---
draft: false
title: Roadmap
date: 2023-01-10T09:00:00.000+00:00
description: Fleek Network's high-level roadmap per stage. Devnet, Testnet, and Mainnet.
category: Documentation
keywords: [roadmap]
tags:
- Roadmap
- Fleek Network
hide_table_of_contents: true
---

## Introduction

Instead of restricting our network architecture/capabilities to a CDN service, Fleek Network's core was redesigned to support a fully decentralized edge platform upon which many edge services e.g. CDN, serverless functions, amongst others, can be built. The new architecture separates each aspect of the network (blockchain - edge infrastructure - services) so that anyone can build new edge services on Fleek Network.

Several milestones were completed toward our next early Testnet goal: the whitepaper was launched, and the Github repo was published. 

For a complete description of our road to mainnet, read the following [blog post](https://blog.fleek.network/post/fleek-network-updated-roadmap-milestones).

## Road to Mainnet

### Complete:
- **Phase 0 (Sep23): Initial Node Rollout**
    - Initial Network and Node Testing
        - Performance, hardware specs, clustering, costs, metrics, etc.
- **Phase 1 (Oct23): Initial Performance Test & Node Improvements**
    - Performance metrics gathering & analysis
    - Public node rollout with improvements from Phase 0

### In Progress:
- **Phase 2 (Dec23): Performance Improvements & Long Running Testnet (Internal)**
    - Long-running testnet deployed internally
        - All the nodes will be run by the Foundation and core team initially to ensure high quality of service and reliability
    - “Finish” the following core systems: Consensus, Blockstore, BlockstoreServer, Broadcast, Consensus, DHT, Fetcher, Metrics, Origin-IPFS, Pool, Reputation, Rep-Collector, Resolver, RPC, Signer, and Topology
    - Finish the spec and begin testing first developer-facing services & functionality
- **Phase 3A (Jan24): Initial External Developer Use of the Network**
    - **Decentralized IPFS Pinning + CDN**
        - First externally usable service
    - Decentralized Serverless/Edge Functions
        - Will only be tested internally during this phase
    - “Finish” Handshake, Proof Of Delivery, Service-Executor, and Synchronizer
    - Onboard the first third-party node operators to testnet
        - Will be done in a controlled and gradual way, the details of which will be shared in January
- **Phase 3B (Q124): Expanded Functionality & Use of the Network All the functionality from 3A, plus:**
    - Decentralized Serverless/Edge Functions
        - Externally usable in this phase
    - Introduce Limited Private Compute Powered Capabilities
        - For private key signing and potentially also for environment variable handling
        - This research is still ongoing and subject to change. Current research and testing involves adding SGX chips to node specs, but it would only be for certain limited functionalities that add significant value/usefulness to the network (examples listed in first bullet)
    - Initial Integrations with Data Availability Layers
        - Adding DA layers as origins in Fleek Network adds increased usefulness to the network, especially in the context of rollups and the off-chain and verified compute direction of web3
        - Which specific DA layers we will start with is still TBD
    - More Services Available for External Use
        - Exact new services/features to be determined after Phase 2 & 3A
    - Economic Model & Assumption Testing
        - More realistic testing of some of the economic aspects of the protocol and edge platform
    - Full Node Testing, Onboarding, Reputation & Slashing
        - To provide a very mainnet realistic environment to enable the below
    - Transform testnet into a fully public testnet
        - Will be done as part of the end of this phase/start of the next phase
- **Phase 4 (Q224): Add Supporting Infrastructure & More Services**
    - Working Bridge
        - Between Fleek Network and Ethereum (or an L2)
            - The exact L2 is still TBD, but will be decided for this Phase 4
        - Handles deposits/payments into & withdrawals out of the network, as well as staking
    - Full Economics & Resource Pricing
    - Full Test Version of FLK token
    - Full Testing of Multiple USD-Denominated Stablecoins
    - More Externally Usable Services & Use Cases
    - External Audits
- **Phase 5 (Summer24): Mainnet**
    - If all goes according to plan, the goal would be to launch mainnet sometime during the summer of 2024, however, the exact timing will be determined as we approach and work through the final testnet phases and audits.

As with previous testnet phases, **more specific details regarding each upcoming phase including the timing, how to participate, and what exactly will be included will be shared prior to the start of each one**. As a reminder, all information presented above is not final and is subject to change based on the results/metrics from each testnet phase as well as input from the core team and Fleek Network community.

For a complete description of our road to mainnet, read the following [blog post](https://blog.fleek.network/post/fleek-network-updated-roadmap-milestones).