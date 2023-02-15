---
draft: false
title: Roadmap
date: 2023-01-10T09:00:00.000+00:00
description: Fleek Network's high level roadmap per stage. Devnet, Testnet, and Mainnet.
category: Documentation
keywords: [roadmap]
tags:
- Roadmap
- Fleek Network
---

![Fleek Network: Roadmap](./images/fleek-network-roadmap-feb-2023.png?202301101924)

## Introduction

This is a high-level roadmap overview of Fleek Network's development, updated on `February 2023`. The roadmap is divided into three phases:

- **Devnet**: Focused on the building of the Network's core features and architecture.
- **Testnet**: Focused on the testing of the Network's individual components.
- **Mainnet**: Stable and production release of the protocol, fully featured and tested.

## Devnet
During Devnet, the current stage, the team will set the foundational components needed to build Fleek Network's decentralized edge, including the following:

- The network actors
    - Cache and Gateway Nodes
        - Full chain nodes, validators, and light nodes
            - Full Chain nodes: maintain history but are not necceseraily validators in the network.
            - Validators: don’t have to maintain the full network history.
            - Light nodes: act as light verification nodes. 
- Content Routing and Replication
- Reputation System
- Modular Consensus Algorithm
    - Narwhal and Bullshark
- Network Governance and Economics
- EVM Compatiable application layer
- L1 <> L2 <> Fleek Network Bridge
- SDK Libraries (Rust / Typescript)


## Testnet
During Testnet, the focus is twofold:

- Stress-test and iterate Fleek Network
- Maximize number of operators, nodes, and geographical distribution.

The team will develop different testnet versions, **test-specific**, to individually test, stress, and validate the network's performance and design. These are some of the items we intend to test:

- Consensus
- Performance
- Incentives

We also intend to **integrate IPFS/Filecoin** to allow direct file-fetching from IPFS an Filecoin nodes through Fleek Network (aside from the network's direct HTTPs capabilities).

## Mainnet

The mainnet release of Fleek Network will come with the arrival to a stable and end-to-end tested version of the protocol. The transition to mainnet depends on u
