---
title: How it works?
slug: how-it-works
hide_title: true
tags:
  - how-it-works
sidebarCollapsible: false
---

## Overview

When a client requests a Service, the protocol determines the best route to the nodes where the service replicas and workload allocates.

Once the computation is successful, the data streaming routes to the client. On-client request fulfillment, a proof of delivery is generated containing cryptographically secured metadata about the original request, any parts involved and the resources consumed. 

The Delivery Acknowledgements are stored locally in the participating node memory pools, rolled-up to the protocol consensus consistently throughout the Epoch. This agreement forms by a random committee of any healthy Nodes that use the information provided to reward the Nodes fairly.

## About the protocol

The Fleek Network is designed to deliver computation cheaper, faster and more efficiently than existing Cloud providers by allowing anyone to offer computer resources for rewards. Including, secured information about who requested it on the network.

The Fleek Network is a proof-of-stake protocol, that takes advantage of Ethereum for staking, payments, governance and other economic features.

This is achieved by a combination of SNARKs (Succinct Non-interactive Argument of Knowledge), Narwhal and Bullshark consensus, including other cryptographic and economic guarantees to achieve a trustless decentralized and long-term sustainable environment.

It's important to keep track of these components to ensure that the system is running fairly. The protocol holds the state for the following:
- Token Balances
- Staking details
- The Node Reputation
- Data on how much work a Node has performed in a given epoch

As a decentralized Network, the state of these is replicated across all of the distributed Nodes in the Network by forming a Blockchain, in which Consensus on transactions transmutes to the final immutable state.

## The Consensus algorithm

[Narwhal](https://arxiv.org/abs/2105.11827) and [Bullshark](https://arxiv.org/abs/2209.05633), are high-performant mempool and consensus engines by [Mysten Labs](https://github.com/MystenLabs). The Fleek Network uses Narwhal as a DAG-mempool for transaction ordering that requires total ordering (linear order) and Bullshark as the consensus engine.

:::note
The primary transactions being ordered by the Consensus algorithm is the batch of Delivery Acknowledgements stored in a local list of transactions before commitment to the blockchain (memory pool).
:::

The Narwhal algorithm is based on the separation between the dissemination and transaction ordering to achieve high throughput in the blockchain system. The protocol achieves reliable dissemination and storage of causal histories of transactions. Narwhal tolerates an asynchronous network and maintains high performance despite
failures.

Bullshark is a zero-message overhead consensus algorithm that handles transactions that require total ordering, and synchronization of the transactions between Nodes and the global Network state.

Where Narwhal ensures data is submitted to consensus, Bullshark sorts out the order of the data.

:::tip Total ordering
Total ordering is performed by a committee-based approach. The committee is formed from a subset of any valid staked Node at the end of every epoch (about 24 hours). The integrity is met due to the Node rotation that occurs at each period, reducing risks associated with Nodes being compromised and affecting the committee purity. In summary, a subset of Nodes forms a new committee at each Epoch, that does the transaction ordering of the workload computed and submitted by the remaining Nodes.
:::

## The Edge Network

Edge computing is about processing data at the closest point of interaction, while cloud computing is about processing data in a data center. 

Instead of resolving requests in the cloud, where roundtrip times are noticeable due to latency, the processing of requests is done at your closest convenience, which means getting you a quicker response and a better user experience.

Fleek Network's Edge computing is computing that's done at the speediest location to the user. Provided by Network Nodes that are favorably dispersed and operated by a diverse community.

The community members host and operate the Network Nodes, which form the Edge Platform, and contribute to an autonomous and decentralized network of Web Services.

Some of the resources provided by the Network Nodes are:

- Disk Storage
- Processing power (CPU Units)
- Network bandwidth
- Availability

## Incentives and rewards

Fleek Network issues FLK, an ERC-20 fungible token created using the Ethereum Blockchain.

Node operators stake FLK tokens to perform work on the network. In contrast, developers and clients use stablecoins in a fair exchange for the commodities and resources consumed on the network.

A Node is a process that runs on a machine that provides resources to the Network. The resources are packaged as commodities, for instance:
- Availability
- Bandwidth
- CPU

These commodities are exchanged fairly and pricing is decided by the ecosystem and network governance in USD.

Service providers are rewarded for fulfilling cache requests per bandwidth and by sharing cached data with other peers – as an incentive for a shared economy – therefore the more bandwidth served, the more tokens received.

When an epoch ends, which is about 24 hours, the rewards from all submitted Delivery Acknowledgements are distributed to the edge nodes.

## Delivery Acknowledgements (SNARKs)

A Delivery Acknowledgement is a signed message by a client attesting that a node has successfully delivered a task to the client. These acknowledgments are instantly finalized locally and irreversible by the client.

The Delivery Acknowledgements are cryptographically secured and tamper-proof, meaning that the transaction contains irrefutable details about all parts involved in the transaction.

A Delivery Acknowledgement includes metadata about the commodities consumed by a Node while executing a Service. Also contains metadata that is used to determine the reward attributed to a Node.

:::tip
A Node provides the computational resources to the Network and keeps track of doings in a list of Delivery Acknowledgements, on which the rewards mechanism is based at the end of each Epoch (about 24 hours).
:::

Finally, Delivery Acknowledgements are gathered and batched by Nodes before being submitted to the core protocol and committee as described in the [Consensus](#consensus) section.

## Reputation system

The Fleek Network has a reputation system where Nodes rate each other. The ratings are collected timely and an aggregation algorithm calculates the overall rate for each Node at the end of every Epoch.

Any reputation system that depends on players attributing rates to each other can be exploited. As critical, a custom version of the EigenTrust algorithm is used to reduce dishonest and incorrect measurements.

Some other procedures where a Node is rated are on the interactions between nodes while servicing. Meaning that a Node earns a rate per service interaction.

This information is replicated across the Network and cannot be tampered with and is a valuable and reliable source of knowledge for optimization tasks.

A few optimization tasks include:

- Optimizing the Network flow
- Assigning services to Nodes
- Determining proximity

The reputation system is used to determine the service routing and work allocation.

## Actors and their roles

The Fleek Network is a system where actors play important roles, namely:

- Client
- Developer
- End-user
- Node Operator

Each of these users has a huge role on contributing and participating in the network. They make it possible and lively by requesting resources, through usage, payments or by simply being a plain member of the community.

### Client

The **Client** is a user that consumes data from the network; for instance:

- A developer interested in using the CDN in an application
- A media publisher wanting to accelerate access to media assets
- A system administrator looking for instructions to troubleshoot the client library
- A Solutions Architect looking for a quick overview of an alternative service for a centralized providers
- Instructions to install and use the client library
- Others

A client is a paying customer for the commodities and resources consumed on the network, e.g. a CDN service customer who pays for bandwidth use, etc.

This type of user can:

- Top up the account to have enough credit to exchange for service
- Check the balance
- Check the cost(s) of the service(s)
- Many others (relative to the service offering that might be of a third-party provider)

### Developer

The **Developer** is a knowledgeable user that enables the business logic and end-to-end experience to the **end-user** through applications or services. Take, for example:

- Protocol development contributor
- Service creator
- Usage of the client library
- Contributions to the client libraries and tools
- The library method and parameters references
- Versions and features support
- Much more

A developer is often described as a builder who enables the end-to-end experience in the Fleek Network. A builder that can work at the Service provider level, protocol development, core contributor and, amongst others, at a higher level, such as providing support and integrations of services in applications or third-party systems.

### End-user

An **End-user** is someone to whom the data or computation output is ultimately delivered, among others:

- Static assets, such as images on a website
- Image optimization for a very particular size request
- Server-side rendering
- Gets data through HTTP Gateway or RPC
- Amongst others

### Node operator

A **Node Operator** is a kind of system administrator who builds, configures, installs or maintains a Node(s) in a server. To mention a few use cases:

- Builds the Node binary from source-code
- Updates the Node source-code
- Runs the installation wizard to setup a Node
- Installs the Node manually
- Configures the Node
- Secures the server
- Other cases

The Fleek Network works as a distributed system of nodes where each node operates and contributes to the system’s overall health and functionality with computational resources by network operation demand.

Nodes are set up to run on servers by operators. Operators are system administrators who build, configure, install and maintain the nodes in a server. Generally, a node is installed and runs on a computer or virtual private server (VPS) lent by a Cloud Service Provider.

A server is a computer machine where a Node runs and can be located anywhere in the world.

The Node Operator is a critical system actor that is incentivized to manage one or many nodes. Ultimately making the Fleek Network what is about, a decentralized orchestration layer and infrastructure.

Any individual who's interested in learning can become a Node Operator by reading the documentation, or content made available by the Network Core team and Community.

## Multi-Service Support

The Fleek Network provides a base layer as the foundation of many Services.

The Core is simple, handling Proof-of-delivery and other Client-Node exchanges, such as user balance and rewards.

Design to allow anyone to create and deploy a custom Service to the Network, without having to get permission. The protocol slashing mechanisms help deter malicious behavior and penalize dishonest participants while allowing the service, a modular unit, to operate at maximum availability and performance.

Within a diverse ecosystem where Node Operators are free to choose which Services to run, e.g. an operator might find popular services more appealing economically. Thus, the network is nonhomogenous, made up of different types of resource servers, requirements and services.

## Abstraction and build blocks

Abstraction is conceptually useful in decentralized and distributed Web Service development because of how incredibly complex it can become and the speed at which developers have to react to the outside world. The core team put most of the complexity into well-defined building blocks.

The building blocks provide you with enough level of detail that the modern Developer Experience demands but with cryptographic, economical and security assurances for confident service development, amongst others.

The Fleek Network implementation is open source and freely available for consultation and contribution when more detail or refinement is required by the community and other observers.

## Modular architecture

[Draco](https://github.com/fleek-network/draco) is the repository name containing the Fleek multi-service Edge Network implementation.

The project aims to provide a higher focus on engineering productivity from the get-go, an improvement over the original [Ursa](https://github.com/fleek-network/ursa) implementation, which was exclusively focused on CDN, one of many services Draco offers support.

Some of the main differences from Ursa’s implementation are:

- The dynamic service loading approach
- Decoupling of the network's core from the service implementation
- Higher-level architecture that makes it easier to maintain and within reach of external contributors.

Draco’s development approach is more open, which allows the community to build services and also helps the core team work on other features or services in parallel.

### Repository

The repository contains the source code for the implementation of the Fleek Network and is located at https://github.com/fleek-network/draco, a private repository that will go public after the whitepaper announcement and roadmap.

### Directory structure

There are three top-level directories, namely `lib` , `core` and `services`.

Lib - These are open-source libraries created to help tackle the project features and packaged with a friendly license in the Rust ecosystem (MIT, Apache).

Core - The primary protocol implementation, where `node` crate contains the essential feature set or base functionality. Includes the `interfaces` crate, where the top-down specification of the project is located.

Services - A Service is a business logic provider built with the SDK (Service Development Kit). A service is decoupled from the core of the network and loaded dynamically [1] during the runtime using FFI (foreigner function interface).

```
draco
├── lib
│   ├── affair
│   ├── atomo
│   └── blake3-tree
├── core
│   ├── node
│   ├── interfaces
│   ├── application
│   ├── blockstore
│   ├── consensus
│   ├── handshake
│   ├── identity
│   ├── origin-arweave
│   ├── origin-filecoin
│   ├── origin-ipfs
│   ├── pod
│   ├── reputation
│   ├── rpc
│   └── sdk
└── services
    └── cdn
```

### Interfaces

The design pattern adopted for this software is highly inspired by the Object-Oriented model described by Alan Kay, which may be a bit different from OOP which grew to fame due to Java.

In a nutshell, this is similar to the same idea, and we represent different units of computation and process as objects that communicate with each other by message passing.

## Identity on the Fleek Network

- Types of accounts
- Public-key cryptography
- Requesting resources