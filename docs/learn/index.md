---
title: Introduction
slug: introduction
hide_title: true
tags:
  - about
  - learn
  - fleek network
  - whitepaper
---

import Author from '@site/src/components/Author';

## Introduction

The Core of Fleek Network offers a foundational layer to enable developers to build and deploy Edge Services efficiently. It abstracts away the development complexities of consensus, cryptography, storage and peer-to-peer networking, etc, to simplify things conceptually. It frees developers and teams to focus on what matters the most to reach business goals.

In contrast, end users have access to network services on the edge, that provide different kinds of computation and data processing features.

We'll take a brief look into [Why does it exist](#why-does-it-exist), [How does it work](#how-does-it-work), and learn about [services](/docs/learn/services), amongst other topics.

:::tip
For a deep dive into Fleek Network, check the [whitepaper](/docs/whitepaper) section.
:::

## Why does it exist?

Many Web3 products rely on the conventional models of centralized cloud infrastructure, due to the lack of corresponding alternatives.

Some of the most popular Web3 products rely on content delivery and edge computing provided by the monopolized cloud market. Unlike a decentralized system, the opposite is more vulnerable to attacks, as computation and data can be easily manipulated to suit the monopoly's business goals.

Meanwhile, blockchain technology has paved the way for a new era of decentralized cloud computing and data storage, offering a sustainable alternative to traditional centralized architectures.

The Fleek Network provides the alternative, paving the way to a decentralized edge computing future that is secure, transparent and accessible to everybody in the world.

### Motivation

The Fleek Network team was motivated to create a decentralized Edge Platform due to the current infrastructure trends, user concerns and demands. The modern web is shifting from the cloud to the edge, which is a reflection of the internet's growing user base and the need for low latency for users worldwide.

This development is a crucial and necessary step towards significantly enhancing the reliability, efficiency, and decentralization of Web3 applications and platforms, such as the next iteration of the Fleek platform.

## How does it work?

When a client requests a service, the protocol determines the best route to the nodes where the service replicas and workload are allocated.

Once the computation is successful, the data streaming routes to the client. On-client request fulfillment, a proof of delivery is generated containing cryptographically secured metadata about the original request, any parts involved and the resources consumed.

The Delivery Acknowledgements are stored locally in the participating node memory pools, rolled up to the protocol consensus consistently throughout the Epoch. This agreement is formed by a random committee of any healthy Nodes that use the information provided to reward the Nodes fairly.

<Author
    name="Helder Oliveira"
    image="https://github.com/heldrida.png"
    title="Software Developer + DX"
    url="https://github.com/heldrida"
/>
