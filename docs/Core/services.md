---
draft: false
title: Services
sidebarCollapsible: false
sidebar_position: 2
date: 2023-01-10T09:00:00.000+00:00
description: Welcome to the documentation site for Fleek Network, the decentralized content and application layer built on established decentralized storage protocols combined with high-speed caching and an effective delivery layer.
category: Documentation
keywords: [services, documentation, getting started]
tags:
- Edge Platform
- CDN
- Guide
- Learn
- Fleek Network
---

:::info
This documentation is currently placeholder as the team prepares for an early testnet release around the month of August, where full documentation for node runners and services will release.
:::

Welcome to the services page, a brief overview of the concept of services, with use-case examples.

## Services in Fleek Network
A service on Fleek Network is a modular piece of edge-enabled software that runs on (and utilizes the features of) the edge nodes, delivering unique functionality to its end users. These services could be considered as the user interface of the network.

Services inherit the following capabilities from the edge network:

- Decentralized execution / cryptographic guarantees.
- Geo-awareness of nodes and smart routing of work.
- Edge-optimized latency and performance.

**What can a service be?** Any edge web service known today (CDN, SSR, Edge Compute, etc.) or Web3 service that could benefit from running on a decentralized edge (decentralized IPFS pinning, zkVM’s, EVMs and VMs as a service, sequencers).

Anyone can deploy services on the network, and any user/developer can interact/use services via their SDKs.

**By deploying on Fleek Network** services, protocols and builders can rely on a shared orchestration/performance edge layer, instead of having to either compromise and utilize web2 infrastructure, or complicate their core protocols and attempt to build edge-network-like enhancements individually.

***

## Ideas for Services & Use-cases

These are some concepts that could explore and benefit from being built on a decentralized edge network like Fleek Network.

***

## Web Services

### Edge Functions

Edge compute comes in many flavors, and Fleek Network can support many serverless or edge compute functions. For example, cheap compute for simple JavaScript functions, Lambda, Deno or Cloudflare Workers-like compute. Fleek Network could also perform deterministic computation, consensus-based computation, ZK-computation, EVM computation. The network is non-opinionated to allow developers to define their compute service fully.

### SSR/ISR

One applied edge compute use-case that can be built is Server-side Rendering (SSR) or Incremental Static Regeneration Service (ISR) on top of a container/serverless engine. Given the granularity of the content verification with Fleek Network's hashing, the streaming of particular pieces of data for the purpose aforementioned could be optimized and parallelized across multiple nodes, chunking pages of static sites and regenerating only where needed.

### Hosting

While the backends in web3 apps are more decentralized, the frontends still remain quite centralized. Fleek Network provides a great opportunity to take a big step forward on this issue/topic. For example, a service that could be built is something that leverages the blockstore and IPFS content addressing to keep track of applications that are deployed with additional metadata.

It would essentially be the storage layer for frontends similar to how platforms like S3 or Netlify work. Hosting can further be extended by using the CDN and a compute service to add server-side rendering capabilities. The storage or processing for the hosting or SSR respectively could charge the client for the work performed and distribute rewards to the node operators.

### CDN

A decentralized CDN is a big missing piece in the web3 infra stack. Every web3 protocol, middleware, service, and app needs and/or could benefit from content acceleration. While today most projects use Cloudflare in front of their stacks to optimize performance/latency, once Fleek Network launches, web3 projects could use the decentralized CDN service as a drop-in replacement to gain the web3 benefits without sacrificing on performance or cost.

The CDN service caches content based on usage, at the nodes that make the most sense for geo-based distribution of files (like a traditional CDN). It keeps track of requests serviced and charges the client and rewards the nodes based on the bandwidth served. The reputation system will track good CDN service and the routing will be determined based on that.

### Container Orchestration

A decentralized orchestration service built on a content-addressable edge network can bring benefits in performance and delivery. A service could utilize the native content-addressing and Blake3 hashing/verified-data-streaming to partition large container image files and serve them at scale in a multi-region environment.

Fleek Network would act as a p2p CDN, serving container chunks in a parallelized, verified, and performant way - without sacrificing decentralization. A service similar in concept to Docker.

### CRDT Databases

Database services in a decentralized edge platform with a content addressable core can benefit from the network's data deduplication and integrity characteristics.

Particularly a CRDT database service could be built to converge data from multiple edge locations replicas. Given all data is content addressed, their unique content hashes allow for easy differentiation and verification as the data is replicated.
***

## Web3 Services 

### Blockchain Snapshots

Syncing a full node for other chains is a cpu intensive process and can take hours, days or weeks depending on the chain. Fleek Network’s internal blockchain uses content addressability to store snapshots of the chain head and uses the CDN to accelerate the entire state to the node to allow fast sync. 

A service could be built that does the exact same thing, but for other chains. The service could automate storing the snapshot to always stay up to date to HEAD and deliver the entire state to a node that requests it, drastically reducing sync time.

### Decentralized IPFS Pinning

Given the way Fleek Network works, all files/content on the network are content addressed (given a CID), and a mapping of the CID to origin(s) is stored in perpetuity. Combining that with the built-in (externally powered) file system that allows direct access to decentralized storage protocols (Filecoin, Arweave, etc.), as well as the CDN service , an IPFS pinning service could be built that provides the exact same service/experience as centralized IPFS pinning today, but using only decentralized infrastructure.

Not only that, but this version of IPFS pinning would be just as performant, cheaper (storing on web3 storage protocols is typically cheaper than cloud platforms), and with much better data security/availability guarantees. Even if the file ever fell off IPFS, Fleek Network would be able to retrieve it (so long as it’s still valid on at least 1 origin) since the network stores the IPFS CID to origin(s) mapping in perpetuity.  

### VM's (EVM, zkVM's, etc.)

A service that deploys a VM like one of the many zkVMs or the EVM is also possible. A service could provide compute in the zkVM and provide the zkSnark from the node that proves the correctness of the response.

Since the zkVM would be running on geo-distributed, intelligently routed edge nodes, the network could help ensure the zkVM computation is happening in close geographic proximity to the client to further optimize performance/latency. 

### Ephemeral Rollups

If you wanted a short lived rollup for something like an NFT mint event or a game/event, you could use Fleek Network to build/utilize a service that allows you to spawn ephemeral rollups that users could interact with for a certain amount of time (ex. mint window or game/event duration), and after that time elapses, the service could rollup the results to your smart contract.

This could help users avoid gas wars/high fees while providing instant finality during the duration of the event. And since the rollups would be running on the decentralized edge, they would be fault resistant and highly performant. 

### Proof Generation

With the rise of SNARKs/STARKs and the growing demand for performant and cost efficient proof generation, there could be compelling advantages to generating these proofs on the edge (closer to end users) in a decentralized way. 

As an example, a hypothetical Groth16 service can read the setup parameters as files (using the file system) and generate a proof based on user specified public parameters.  Support for other proving technologies can be built/utilized as separate services.

### Alternative Sequencers

In the era of L2s, most use a centralized sequencer to post transactions to the L1s settlement contracts. These L2 networks cope with this layer of centralization by providing an alternate route around the sequencer by posting the transactions manually to the settlement contracts. The problem is, there is a reduction in block speeds users are accustomed to on an L2 and are then stuck with the L1s finalization times.

In Fleek Network a developer could provide a service that offers a decentralized alternative to an L2s sequencers that batches and posts them to the L1s settlement contract. This could then achieve L2 settlement times while still offering a decentralized path. Another benefit of this service is it could enable the end user to not need the L2 specific gas token to submit these transactions.
