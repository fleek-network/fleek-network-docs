---
title: Delivery Acknowledgements
slug: delivery-acknowledgements
hide_title: true
description: Dive into Fleek Network's Delivery Acknowledgements, immutable proofs of service delivery, and understand the role of SNARKs in them.
tags:
  - snarks
sidebarCollapsible: false
hide_table_of_contents: true
---

import Author from '@site/src/components/Author';

## Overview

When a client signs a message, it creates a Delivery Acknowledgement that confirms a successful service computation delivery by a node. This [process](#node-vs-client-process-flow) ensures the immutability and integrity of the message (the client cannot change or reverse it) and also includes metadata about the commodities consumed by the node during the service execution. This metadata helps in calculating the reward that the node will receive.

:::info
The Narwhal and Bullshark consensus primary transaction is the order of batched Delivery Acknowledgements. Every time a node serves a request, it gathers Delivery Acknowledgements that, upon submission, reward the node at the end of an epoch (which is approximately 24 hours).
:::

To claim the reward and other fees, nodes can add received Delivery Acknowledgements to a local pool and periodically submit them in batches to reach a consensus. This process also ensures consistent updates to the client's balance in stable coin.

The amounts deducted from all clients during an epoch, move to a payout pool which is distributed fairly to node [account owners](/docs/learn/the-network#identity-on-the-fleek-network) based on the work performed in the epoch.

For a more in-depth dive into Delivery Acknowledgements-related topics, it's advised to read the [whitepaper](/docs/whitepaper). Also, a holistic version of [the Network](/docs/learn/the-network) is available on our documentation site.

## SNARKs (Non-interactive zero-knowledge proofs)

SNARKs is an acronym that stands for Succinct Non-interactive Argument of Knowledge. A SNARK is a cryptographic proof that allows one party to prove to another that it knows a secret without revealing the secret itself. 

It's a product of encryption that makes direct communication between a prover and verifier needless, effectively removing any intermediaries.

:::note
A SNARK is a cryptographic proof that is utilized as an optimization for Delivery Acknowledgements. It's not a requirement to understand Delivery Acknowledgements. However, an important implementation detail for performance and message handling.
:::

The periodic submission of Delivery Acknowledgements, allows us to leverage SNARK proofs recursively, aggregating many of these Delivery Acknowledgements. By batching, we lower the expenses associated with networking and computing power which would've been much higher if verified individually.

## Optimization

The Fleek Network uses Narwhal as a [DAG-mempool](https://arxiv.org/pdf/2105.11827.pdf) for transaction ordering (as total ordering or linear order) and Bullshark as the consensus engine.

:::tip
Read [The Consensus Algorithm](/docs/learn/the-network#consensus) section, to learn more about Narwhal and Bullshark. Alternatively, check the [whitepaper](/docs/whitepaper) for more detailed information.
:::

Total ordering is performed by a committee-based approach. The committee is formed from a subset of any valid staked node at the end of every epoch (about 24 hours). Integrity is met due to the node rotation that occurs at each period, reducing risks associated with nodes being compromised and affecting the committee's purity.

Since the number of Delivery Acknowledgements can be considerably high, only a few of these are handled by consensus. It rolls up the head and tail from the batch list and leverages Zero-Knowledge proofs recursively to validate them. By rolling up a smaller footprint, it optimizes data and network performance without compromising the security of the protocol.

In summary, a subset of Nodes forms a new committee at each Epoch, that does the transaction ordering of the workload computed and submitted by the remaining nodes performantly and securely.

## Node vs. Client Process Flow

The process by which Delivery Acknowledgement works is that a node starts by sending an encrypted request to a client and once received, a signed Delivery Acknowledgement attests to it.

Upon Delivery Acknowledgment, the node should transmit an encryption key.

If a node fails to send a key after the client signs the Delivery Acknowledgement, the committee safeguards the user request interest by sending a valid rebuilt key back.

As a consequence of malicious behavior, the committee has the node slashed by the protocol-slashing mechanism penalizing dishonest participation while allowing the request flow to run smoothly for the betterment of the end-user experience.

:::note
The process ensures that nodes get paid for work performed and clients get the requests fulfilled. It helps achieve decentralization and trustworthiness as the process applies to any sort of client-server communication, such as Gateways. Also, considering the impact this might have on the network, a node encryption key response has a small impact performance of 300 milliseconds (0.3ms) of latency.
:::

## Content and Streaming Verifiability

A Delivery Acknowledgement message signing is deterministic, completely dependent on its inputs and the sequence of the instructions fulfilled which are strictly validated.

Thus, the entire network operates based on content addressing based on Blake3 hashing for efficient content identification and streaming verifiability. This ensures that the hash being requested is the one being served.

Learn more about it in the [Content Addressing](/docs/learn/the-network#content-addressing) section.

## Delivery Acknowledgement Customization

A Service can have a custom configuration to specify how Delivery Acknowledgements should behave or work. Patterns and conventions should be expected to emerge from the Service builder community and best practices.

<Author
    name="Helder Oliveira"
    image="https://github.com/heldrida.png"
    title="Software Developer + DX"
    url="https://github.com/heldrida"
/>
