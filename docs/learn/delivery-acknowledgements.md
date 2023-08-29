---
title: Delivery Acknowledgements
slug: delivery-acknowledgements
hide_title: true
tags:
  - snarks
sidebarCollapsible: false
---

## Overview

A Delivery Acknowledgement is a message that is signed by a client. When a client signs a message, it confirms that a node has delivered computation to the client successfully. A Delivery Acknowledgement is instantly finalized locally, and immutable, meaning that the client cannot reverse or modify it.

:::info
The Narwhal and Bullshark consensus primary transaction is the order of batched Delivery Acknowledgements. Every time a node serves a request, it gathers Delivery Acknowledgments that, upon submission, reward the node at the end of an epoch (which is approximately 24 hours).
:::

A Delivery Acknowledgment includes metadata about the commodities consumed by a node while executing or running a service. Also contains metadata that is used to determine the reward attributed to a Node.

A node can keep adding received Delivery Acknowledgements to a local pool and submit it in batch periodically to consensus. To claim rewards and other fees. In contrast, the client's balance, in stablecoin, is updated accordingly.

The amounts deducted from all clients during an epoch will move to the payout pool to be distributed fairly to nodes based on the work they performed in the epoch.

A payout pool, which holds the amount deducted from clients throughout an epoch, distributes payments fairly to the node [account owners](network.md#identity-on-the-fleek-network) based on the work performed.

## SNARKs (Non-interactive zero-knowledge proofs)

SNARKs is an acronym that stands for Succinct Non-interactive Argument of Knowledge. A SNARK is a cryptographic proof that allows one party to prove to another that it knows a secret without revealing the secret itself. 

It's a product of encryption that makes direct communication between a prover and verifier needless, effectively removing any intermediaries.

:::note
A SNARK is a cryptographic proof that is utilized as an optimization for Delivery Acknowledgements. It's not a requirement to understand Delivery Acknowledgements.
:::

The periodic submission of Delivery Acknowledgements, allows us to leverage SNARK proofs recursively, aggregating many of these Delivery Acknowledgements. By batching, we lower the expenses associated with networking and computing power which would've been much higher when verifying individually.

## Optimization

The Fleek Network uses Narwhal as a DAG-mempool for transaction ordering (as total ordering or linear order) and Bullshark as the consensus engine.

Total ordering is performed by a committee-based approach. The committee is formed from a subset of any valid staked Node at the end of every epoch (about 24 hours). The integrity is met due to the Node rotation that occurs at each period, reducing risks associated with Nodes being compromised and affecting the committee purity.

In summary, a subset of Nodes forms a new committee at each Epoch, that does the transaction ordering of the workload computed and submitted by the remaining Nodes.

Since the number of Delivery Acknowledgements can be considerably high, only a few of these are handled by consensus. It rolls up the head and tail from the batch list and leverages Zero-Knowledge proofs recursively to validate them. By rolling up a smaller footprint, it optimizes data and network performance without compromising the security of the protocol.

## Node vs. Client Process Flow

The process by which Delivery Acknowledgement works is that a node starts by sending an encrypted request to a client and once received, a signed Delivery Acknowledgement attests to it.

Upon Delivery Acknowledgment, the node should transmit an encryption key.

If a node fails to send a key after the client signs the Delivery Acknowledgement, the committee safeguards the user request interest by sending a valid rebuilt key back.

As a consequence of malicious behavior, the committee has the node slashed by the protocol-slashing mechanism penalizing dishonest participation while allowing the request flow to run smoothly for the betterment of the end-user experience.

:::note
The process ensures that nodes get paid for work performed and clients get the requests fulfilled. It helps decentralization as the Node vs. Client process applies to any sort of client, such as Gateways. A node encryption key response has a small impact performance of 300 milliseconds (0.3ms) of latency.
:::

## Request Verifiability

The entire network operates based on content addressing based on Blake3 hashing for efficient content identification and streaming verifiability.

Learn more about it in the [Content Addressing](/docs/learn/network#content-addressing) section.

## Customisation

A Service can have a custom configuration to specify how the Delivery Acknowledgements should work. Patterns and conventions should be expected to emerge from Service developement best practices.