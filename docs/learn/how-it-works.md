---
title: How it works?
slug: how-it-works
tags:
  - how-it-works
sidebarCollapsible: false
---

The core of Fleek Network is a foundational layer that enables developers to build and deploy Edge Services efficiently. Abstracting the complexities of consensus, cryptography, storage and peer-to-peer networking, amongst others. It frees developers and teams to focus on what matters the most to reach their business goals.

## The Edge Network

The community members host and operate the Network Nodes, which form the Edge Platform, and contribute to a decentralized network of Web Services. Some of the resources provided by the Network Nodes are:

- Disk Storage
- Processing power (CPU Units)
- Network bandwidth
- Geographic distribution

## Incentives

The Fleek Network is designed to deliver computation cheaper, faster and more efficiently than existing Cloud providers by allowing anyone to offer computer resources in a fair exchange for FLK tokens. Including, secured information about who requested it on the network.

Fleek Network issues FLK, an ERC-20 fungible token created using the Ethereum Blockchain.

The Fleek Network is a proof-of-stake protocol, that takes advantage of Ethereum for staking, payments, governance and other economic features.

Node operators stake FLK tokens to perform work on the network. In contrast, developers and clients use stablecoins in a fair exchange for the commodities and resources consumed on the network.

A Node is a process that runs on a machine that provides resources to the Network. The resources are packaged as commodities, for instance, availability, bandwidth, and CPU. These commodities are exchanged fairly and pricing is decided by the ecosystem and network governance in USD.

This is achieved by a combination of SNARKs (Succinct Non-interactive Argument of Knowledge), Narwhal and Bullshark consensus, including other cryptographic and economic guarantees to achieve a trustless, decentralized, and long-term sustainable environment.

Service providers are rewarded for fulfilling cache requests per bandwidth and by sharing cached data with other peers – as an incentive for a shared economy – therefore the more bandwidth served, the more tokens received.

When an epoch ends, which is about 24 hours, the rewards from all submitted Delivery Acknowledgements are distributed to the edge nodes.

## Delivery Acknowledgements

A Delivery Acknowledgement is an end-user confirmation and proof that a Node sent a block of content successfully.

Delivery Acknowledgements include metadata about the commodities consumed by a Node while executing a Service.

The metadata contained in the Delivery Acknowledgements is used when determining the reward attributed to a Node.

Delivery Acknowledgements are gathered and batched by Nodes before being submitted to the core protocol.

## Reputation

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

The **Client** is a user that consumes data from the network; for instance:

- A developer interested in using the CDN in an application
- A media publisher wanting to accelerate access to media assets
- A system administrator looking for instructions to troubleshoot the client library
- A Solutions Architect looking for a quick overview of a cheaper service alternative
- Instructions to install and use the client library
- Etc

A client is a paying customer for service computations in the network, e.g. a CDN service customer who pays for bandwidth use, etc.

This type of user can:

- Top up the account
- Check the balance
- Check the cost(s) of the service(s)
- Many others (relative to the service offering that might be of a third-party provider)

The **Developer** is a type of user that applies knowledge that enables the business logic and end-to-end experience to the e**nd-user** through applications. Take, for example:

- Usage of the client library
- Contributions to the client libraries and tools
- The library method and parameters references
- Versions and features support
- Etc

A developer is a knowledge user, often described as a builder who enables the end-to-end experience in the Fleek Network. A builder that can work at the Service provider level, protocol development, core contributor and, amongst others, at a higher level, such as providing support and integrations of services in applications or third-party systems.

An **End-user** is someone to who the data or computation output is ultimately delivered, among others:

- Static assets, such as images on a website
- Image optimization for a very particular size request
- Server-side rendering
- Can get the data through HTTP Gateway or RPC
- Etc

A **Node Operator** is a type of user close to a system administrator who builds, configures, installs or maintains a node(s) in a server. To mention a few use cases:

- Builds the Node binary from source-code
- Updates the Node source-code
- Executes the install wizard
- Installs the Node manually
- Configures the Node
- Secures the server
- Etc

The Fleek Network works as a distributed system of nodes where each node operates and contributes to the system’s overall health and functionality with computational resources by demand.

Nodes are set up to run on servers by operators, who are system administrators who build, configure, install and maintain the nodes in a server. Generally, a node is installed and runs on a computer or virtual private server (VPS) lent by a Cloud Service Provider — a server is where a Node runs and can be located anywhere in the world.

The Node Operator is a critical system actor incentivised to manage one or many nodes, ultimately making the Fleek Network what’s about: a decentralised orchestration layer and infrastructure.

Any individual can become a Node Operator by reading the documentation made available by the network core team and community.