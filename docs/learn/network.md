---
title: The Network
slug: the-network
hide_title: true
tags:
  - protocol
  - architecture
  - permissionless
  - decentralization
  - consensus
  - algorithms
  - SNARKs
  - rpc
  - reputation
  - ports
sidebarCollapsible: false
---

## Protocol

The Fleek Network is designed to deliver computation cheaper, faster and more efficiently than existing cloud providers by allowing anyone to offer computer resources for rewards. Including, secured information about who requested it on the network.

The Fleek Network is a proof-of-stake protocol, that takes advantage of Ethereum for staking, payments, governance and other economic features.

This is achieved by a combination of SNARKs (Succinct Non-interactive Argument of Knowledge), Narwhal and Bullshark consensus, including other cryptographic and economic guarantees to achieve a trustless decentralized and long-term sustainable environment.

It's important to keep track of these components to ensure that the system is running fairly. The protocol holds the state for the following:
- Token Balances
- Staking details
- The Node Reputation
- Data on how much work a Node has performed in a given epoch

As a decentralized network, the state of these is replicated across all of the distributed nodes in the network by forming a blockchain, in which consensus on transactions transmutes to the final immutable state.

## The Consensus algorithm

[Narwhal](https://arxiv.org/abs/2105.11827) and [Bullshark](https://arxiv.org/abs/2209.05633), are high-performant mempool and consensus engines by [Mysten Labs](https://github.com/MystenLabs). The Fleek Network uses Narwhal as a DAG-mempool for transaction ordering (as total ordering or linear order) and Bullshark as the consensus engine.

:::note
The primary transactions being ordered by the consensus algorithm is the batch of Delivery Acknowledgements stored in a local list of transactions before commitment to the blockchain (memory pool).
:::

The Narwhal algorithm is based on the separation between the dissemination and transaction ordering to achieve high throughput in the blockchain system. The protocol achieves reliable dissemination and storage of causal histories of transactions. Narwhal tolerates an asynchronous network and maintains high performance despite failures.

Bullshark is a zero-message overhead consensus algorithm that handles transactions that require total ordering (linear ordering), and synchronization of the transactions between nodes and the global network state.

To put it simply, where Narwhal ensures data is submitted to consensus, Bullshark sorts out the order of the data.

:::tip Total ordering
Total ordering is performed by a committee-based approach. The committee is formed from a subset of any valid staked Node at the end of every epoch (about 24 hours). The integrity is met due to the Node rotation that occurs at each period, reducing risks associated with Nodes being compromised and affecting the committee purity. In summary, a subset of Nodes forms a new committee at each Epoch, that does the transaction ordering of the workload computed and submitted by the remaining Nodes.
:::

## The Edge Network

Edge computing is about processing data at the closest point of interaction, while cloud computing is about processing data in a data center. 

Instead of resolving requests in the cloud, where roundtrip times are noticeable due to latency, the processing of requests is done at your closest convenience, which means getting you a quicker response and a better user experience.

Fleek Network's Edge computing is computing that's done at the speediest location to the user. Provided by Network Nodes that are favorably dispersed and operated by a diverse community.

The community members host and operate the Network Nodes, which form the Edge Platform, and contribute to an autonomous and decentralized network of web services.

Some of the resources provided by the network nodes are:

- Disk Storage
- Processing power (CPU Units)
- Network bandwidth

The Edge Network aims to provide computational resources where a user most needs them.

## Incentives and rewards

Fleek Network issues FLK–an ERC-20 fungible token created using the Ethereum Blockchain–which Node operators must stake to perform work on the network. On the other hand, developers and clients use stablecoins in a fair exchange for the commodities and resources consumed on the network.

:::caution warning
A Node Operator has to stake FLK to have a node participate in the Network. A node without FLK staken is referred to as a stakeless node. A stakeless node cannot contribute or participate in the network, as there would be no way to punish them for malicious behavior. Thus, all fully operational nodes in the network, without exception, have a stake.
:::

A node is a process that runs on a machine that provides resources to the network. The resources are packaged as commodities. For instance:
- Availability / Up-time
- Bandwidth
- CPU

These commodities are exchanged fairly and pricing is decided by the ecosystem and network governance. To ensure a stable and predictable income stream, the rewards awarded to Node Operators are predetermined at a stable rate (USD).

Service providers are rewarded in many ways, for instance, by fulfilling cache requests per bandwidth, and sharing cached data with other peers–as an incentive for a shared economy, therefore the more bandwidth served, the more tokens received.

When an epoch ends, which is about 24 hours, the rewards from all submitted Delivery Acknowledgements are distributed to the edge nodes.

## Delivery Acknowledgements (SNARKs)

A Delivery Acknowledgement is a signed message by a client attesting that a node has successfully delivered a task to the client. These acknowledgments are instantly finalized locally and irreversible by the client.

The Delivery Acknowledgements are cryptographically secured and tamper-proof, meaning that the transaction contains irrefutable details about all parts involved in the transaction.

A Delivery Acknowledgement includes metadata about the commodities consumed by a node while executing or running a service. Also contains metadata that is used to determine the reward attributed to a Node.

:::tip
A Node provides the computational resources to the network and keeps track of doings in a list of Delivery Acknowledgements, on which the rewards mechanism is based at the end of each Epoch (about 24 hours).
:::

Finally, Delivery Acknowledgements are gathered and batched by nodes before being submitted to the core protocol and committee as described in the [consensus](#consensus) section.

To learn more, visit the section [Delivery Acknowledgements](/docs/learn/delivery-acknowledgements).

## Reputation system

The Fleek Network has a reputation system where nodes rate each other. The ratings are collected timely and an aggregation algorithm calculates the overall rate for each node at the end of every epoch.

Noteworthy, any reputation system that depends on players attributing rates to each other can be exploited. For prevention, a custom version of the EigenTrust algorithm is used to reduce dishonest and incorrect measurements.

Some other procedures where a node is rated are on the interactions between nodes while servicing. Meaning that a node earns a rate per service interaction.

The information is replicated across the network securely and cannot be tampered with and is a valuable and reliable source of knowledge for optimization tasks.

A few optimization tasks include:

- Optimizing the network flow
- Assigning services to nodes
- Determining proximity

The reputation system is used to determine the service routing and work allocation.

## Actors and their roles

The Fleek Network is a system where actors play important roles, namely:

- Client
- Developer
- End-user
- Node Operator

Each of these users has a huge role in contributing and participating in the network. They make it possible and lively by requesting resources, through usage, payments or by simply being a plain member of the community.

### Client

The **Client** is a user that consumes data from the network, for instance:

- A developer interested in using the CDN in an application
- A media publisher wanting to accelerate access to media assets
- A system administrator looking for instructions to troubleshoot the client library
- A Solutions Architect looking for a quick overview of an alternative service for a centralized provider
- Instructions to install and use the client library
- A Web developer looking to decentralize an API service

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
- Client library user
- Contributions to the client libraries and tools
- The library method and parameters references
- Versions and features support

A developer is often described as a builder who enables the end-to-end experience in the Fleek Network. A builder that can work at the Service provider level, protocol development, core contributor and, amongst others, at a higher level, such as providing support and integrations of services in applications or third-party systems.

### End-user

An **End-user** is someone to whom the data or computation output is ultimately delivered, among others:

- Static assets, such as images rendered on a website
- Image optimization output for a very particular size request
- Server-side rendering
- Data response provided via HTTP Gateway or RPC

The service outputs are for the **end-user**, but payment for the service is the responsibility of the **client** that manages the application or service the **end-user** interacts with.

### Node operator

A **Node Operator** is a kind of system administrator who builds, configures, installs or maintains a node(s) in a server. To mention a few use cases:

- Builds the node binary from source-code
- Updates the source-code repository, which node is built on
- Runs the installation wizard to setup a node
- Installs the node manually
- Configures the node
- Secures the server

The Fleek Network works as a distributed system of nodes where each node operates and contributes to the system’s overall health and functionality with computational resources by network operation demand.

Nodes are set up to run on servers by operators. Operators are system administrators who build, configure, install and maintain the nodes in a server. Generally, a node is installed and runs on a computer or virtual private server (VPS) lent by a cloud service provider.

:::info
A server is a computer machine where a Node runs and can be located anywhere in the world.
:::

The Node Operator is a critical system actor that is incentivized to manage one or many nodes. Ultimately making the Fleek Network what is about, a decentralized orchestration layer and infrastructure.

Any individual who's interested in learning can become a Node Operator by reading the documentation, or content made available by the network core team and community.

## Multi-Service Support

The Fleek Network provides a base layer as the foundation of many Services. Simplicity at its core, it handles Proof-of-delivery and other client-node exchanges, such as user balance and rewards.

It's designed to allow anyone to create and deploy a custom service to the network, without the need for anyone's permission. The protocol slashing mechanisms help deter malicious behavior and penalize dishonest participants while allowing the service, a modular unit, to operate at maximum availability and performance.

Within a diverse ecosystem where node operators are free to choose which services to run, e.g. an operator might find popular services more appealing economically. Thus, the network is nonhomogenous, made up of different types of resource servers, requirements and services.

## Abstraction and build blocks

Abstraction is conceptually useful in decentralized and distributed web service development because of how incredibly complex it can become and the speed at which developers have to react to the outside world. The core team put most of the complexity into well-defined building blocks.

The building blocks provide you with enough level of detail that the modern developer experience demands but with cryptographic, economical and security assurances for confident service development, amongst others.

The Fleek Network implementation is open source and freely available for consultation and contribution when more detail or refinement is required by the community and other observers.

## Modular architecture

[Lightning](https://github.com/fleek-network/lightning) is the repository name containing the Fleek multi-service Edge Network implementation.

The project aims to provide a higher focus on engineering productivity from the get-go, an improvement over the original [Ursa](https://github.com/fleek-network/ursa) implementation, which was exclusively focused on CDN, one of many services Lightning offers support.

:::info
Lightning is the open-source Rust implementation of Fleek Network. The repository contains the source code for the implementation of Fleek Network at [https://github.com/fleek-network/lightning](https://github.com/fleek-network/lightning).
:::

Some of the main differences from Ursa’s implementation are:

- The dynamic service loading approach
- Decoupling of the network's core from the service implementation
- Higher-level architecture that makes it easier to maintain and within reach of external contributors.

Lightning’s development approach is more open, which allows the community to build services and also helps the core team work on other features or services in parallel.

### Repository

The repository contains the source code for the implementation of the Fleek Network and is located at https://github.com/fleek-network/lightning, a private repository that will go public after the whitepaper announcement and roadmap.

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

The identity on the Fleek Network is issued and controlled by individuals, which means that there aren't any central entities that issue, manage or control it for you. An identity is created without permission from anyone, and stored securely and privately.

:::caution
Security is achieved by issuing users private cryptographic keys. Only the holder of the private key has access to sensitive information, such as an identity, which relates to reputation, rewards, etc. The security of the private key is the responsibility of the user. Unfortunately, Fleek Network is unable to help you regain access to your private key if you've lost or failed to secure it. The private keys are your responsibility.
:::

The types of Identities found in the Fleek Network are used for:
- Node (for BFT DAG consensus)
- Node Network (for fast communication signatures)
- Account Owner (any actor holding a balance on Fleek Network)

The Public-key cryptography used in the network identities are the following curves:
- BLS12-381 is a pairing-friendly elliptic curve construction from the BLS family
- Ed25519 is the EdDSA signature scheme using SHA-512 (SHA-2) and Curve25519
- Secp256k1 is the Elliptic Curve Digital Signature Algorithm (ECDSA) used by Bitcoin and Ethereum

The identities are associated with the elliptic curves as follows:
- A Node key (ConsensusPublicKey) is BLS12-381 which facilitates the consensus algorithm or persistence of state, resilience and fault tolerance. Has multi-signature support, the ability to aggregate many signatures into one used for consensus committee when signing certificates
- A Node Networking key (NodePublicKey) is Ed25519 used for the speed and performance of the network communications
- Account Owner keys are based on secp256k1, which corresponds to an Ethereum Address

Transactions can be signed by the Account Owner—an Ethereum key (secp256k1) owned by the user on an external wallet and initially required to bridge assets from L2—and Node identities

Node Networking with Narwhal utilizes the Node Network key (Ed25519) is much more efficient when dealing with a single signature instead of aggregated signatures.

## Content addressability and verifiability

The way content is distributed, handled and stored defines how trustworthy's a protocol. Some of the primitives to achieve it has roots in linked data, immutability, verification and the semantic web.

On Fleek Network, you either hint about data packed into a format called a Content Archive (CAR) or an existing CID of a CAR file—which hash addresses are unique and universally addressable. The network never stores data, only a cache layer to existing storage as origins. For example, on `HTTP PUT` we're just telling the network that there's some origin it should care about and cache.

Some of the principles that help us provide guarantees to end-users require a high ability for content verification, as a consequence, the immutability of files is critical to the system.

:::info
To emphasize, immutability means the state of not changing, or being unable to change!
:::

### Immutability

Fleek Network deals with files in a manner where the content determines the address in which the user of the system can locate and verify it unquestionably. This is possible due to cryptography, in which the same data always produces the same hash deterministically.

- A file whose content determines the hash, but is also impossible to invert it
- Unable to reconstruct data from a hash
- It's unique, not two files produce the same file or content
- Any change in the content should always generate a completely different hash

In retrospect, what we have on the web today are files accessible via a URL address and the problem with this approach is that the content is not intrinsically tight to the address e.g. the content can change and the URL remains the same. That is the problematic way we access files on the web today, which we call "Location addressing", and the way we solve it for the web of tomorrow is called "Content addressing".

### Content addressing

Content addressing is where we use a hash to access the content, and it allows us to verify that the content we received is the content we asked for. For this, we use a special hash called CID (Content Identifier), a cryptography hash function that maps input of arbitrary size to the output of a fixed size—the content identifiers are short, regardless of the size of the content, and the address does not tell us where the content is stored.

The entire network operates based on content addressing based on Blake3 hashing for efficient content identification and streaming verifiability.

:::info
The CID is a sort of string-like binary that is human-friendlier in comparison to the underlying binary, which is way longer.
:::

:::info
Caching and deduplication are possible due to the immutability of content e.g. if content changes, let's say that an image has some new detail, the files share many of the same bytes. The amount of data we have to transfer to fetch is minimum, we'd only pull the difference. In today's web, we'd have to transfer both files in full, which is a worse path on resource allocation and performance.
:::

### Hash functions

The hash function for creating CIDs uses sha-256, but there is support for other hashing algorithms, such as sha1 (used by Git), sha2-256, sha3-255, blake2b-160, blake3, etc. Some older algorithms are proven not to be collision-free, so if algorithms can break, we have to switch the hash algorithm we use in the future! The problem with this switching of algorithms is the need to find a future-proof way of identifying the hash functions used to generate the hash, as well as the hash name.

Multihash is a protocol that comes into play to provide us with valuable metadata for future-proofing. In an attempt to summarize it, it's the composition of a hash placed at the end, a prefix, as a number to identify the algorithm used, and a number, to identify the hash name. Therefore, we'd start raising some questions. Without it, how would we get the data back without the ability to identify how it was encoded? Some users could use cbor, protocol buffers, json, etc, and there might be plenty of good reasons why for those choices. Maybe it's a compact binary encoding that is very efficient for storage, easy to work with, etc.

What's important is that it is the user's choice and why IPLD becomes useful for Fleek Network's use cases. A system for understanding and working with data that is made of a data model, codecs, tools for linking, and then a handful of other powerful features that help us develop a decentralized application.

### Interplanetary linked data (IPLD)

Interplanetary linked data (IPLD) provides us with all the metadata prefixes to soothe the system needs, and provides us with the data model of the content-addressable web, as discussed earlier. IPLD is a set of conventions for creating decentralized data structures that are universally addressable and linkable.

A Distributed Hash Table (DHT) enables the network to store an IPLD or flexible mapping from any "immutable data pointer", such as a CID to its corresponding Blake3 hash. As mentioned in the [Content Addressing](#content-addressing) section, the network operates over Blake3 hashing for efficient content handling.

:::info
These addressable and linkable data structures will allow us to do for data what URLs and links did for HTML web pages (Quote from IPLD).
:::

### Content Addressable aRchive (CAR)

The core of Fleek Network understands the IPLD CAR Content Addressable aRchive, which unpacks and traverses to cache individual files. The archive's content is hashed as Blake3, which Fleek Network uses to address all data coming and going into the network, regardless of their origin.

:::caution warning
Despite handling IPLD CAR files, it serves raw archive content to the client. In other words, if a request for a complete CAR came through a gateway, the gateway (as a client) would have to build the file from the streamed data before sending it as a response to the end user.
:::

:::info
The ordering of blocks in a CAR is random, e.g. two different CAR files storing the same content. This causes the need to traverse the archive (DAG-PB/UnixFS) to store the CAR blocks as individual content.
:::

### HTTP PUT Request Origin

An **Origin** is a location where content originates from. In the context of Fleek Network, the origin has to be supported for the data retrieval to function, some examples of what will be supported are Arweave, Filecoin and IPFS. For instance, the first supported storage is IPFS and a user of Fleek Network should have the data pinned for IPFS somewhere to have it cached by the Fleek Network CDN service on an `HTTP PUT` request.

:::info
A Client-side library can provide helpers to upload to some origin, such as IPFS and call the `HTTP PUT` for the origin.
:::

## Binary process

The Fleek Network binary process is the program that's been compiled down to machine code that the computer's processor can understand and execute. The project source code repository from which the binary is compiled is called [Lightning](https://github.com/fleek-network/lightning). Most node operators set up the nodes by running the install wizard, others do it manually. When a node operator runs a node, it means that the binary process is launched in the node operator's computer. It runs as a separate instance in memory, with its own set of resources and permissions. The Fleek Network binary is an essential component that contributes to the network formation, distribution and decentralization. It runs on a supported Linux operating system, enabling users to run a wide variety of computing services and perform complex tasks.

### Ports

Amongst other resources, ports play the role of managing and organizing network traffic. The ports initiate and terminate network connections crucial for the node to operate in the Fleek Network. The operating system should have the ports enabled and open for the node to run successfully. The Node process requires the following ports:

- RPC (port 4069)
- Narwhal
    - Primary (port 8000)
    - Worker (port 8001)
    - Mempool (port 8002)

There’s a single worker at the protocol level. In the future, if a node is allowed to run >1 worker, the ports can look like (worker#X):

- Narwhal
    - Worker (port 80X1)
    - Mempool (or 80X2)

:::caution required
The ports should be freed before launching the node process. Any blockers or firewalls should be configured to enable the ports.
:::

### JSON-RPC Interface

A JSON-RPC (JavaScript Object Notation Remote Procedure Call) is a protocol that enables communication between client and server applications. The [Fleek Network JSON-RPC](https://fleek-network.github.io/lightning/api-documentation/?202308171515) API enables JSON-RPC interaction with Fleek Network Node.

Fleek Network JSON-RPC API reference documentation is available at [https://fleek-network.github.io/lightning/api-documentation](https://fleek-network.github.io/lightning/api-documentation).
