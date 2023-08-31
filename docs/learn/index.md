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

<!--
  The following import is intentional (see partial <CheckoutCommitWarning />)
-->
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

### A decentralized internet

The original vision for the Internet was to build a network where everyone could participate, access and share information. But this was compromised after individuals and organizations found ways to trap and monetize information gathered from users.

Thankfully, the emerging movement to break free from centralization, and privacy concerns, resembles the original vision of the Internet. A decentralized Web, which's often referred to as Web3, where building services are free of central authorities.

A Decentralized Web envisions a world where services are powered and owned by the community.

### Open protocol

On decentralization, we achieve resilience, a service shouldn't die when one company goes out of business. Plus, the process of incremental improvement of a protocol, and transparency of open-source development, can have it refined into something impossible to displace. As achieved by the protocols: POP3/SMTP, TCP/IP, DNS, Bitcoin, etc.

The underlying assumption is that you can't ever be finished with anything. However, as more time passes the more refined the product becomes and the less you need to change it.

An essential part of a decentralized web is that companies, organizations and individuals choose to run applications using open protocols and data formats.

### The next generation of Internet services

Cloud computing has become essential for modern life, thanks to advancements in internet technology that make our lives easier. The demand for content delivery and computation is skyrocketing, and due to the rise of AR/VR, video, gaming, and other media content popularity, demand will keep going up.
Our society is turning obsessively digital, and most of our daily activities are digitally recorded. Technology is meddling with personal data and thoughts, culture and relationship with each other.

In today's day and age, Cloud Providers have a central infrastructure giving immense control to obscure authorities that can influence computations, block access to data, and even manipulate it. On the other hand, depend on costly infrastructure that requires a significant number of resources. Traditionally, these are dispersed geographically but more commonly located in convenient regions for the businesses—a resolver might only find a resourceful node close to you sometimes.

In contrast, it'd be extremely difficult to compete as a provider due to the corporative establishment that dominates the internet. Fairer economic incentives have a growing interest from computer resource providers and related communities.

:::tip
A considerable number of Web3 projects have services hosted and delivered through centralized Cloud Providers, breaking the trust upfront and causing considerable disappointment to the end user.
:::

Since decentralized storage, edge computing and peer-to-peer networking technology are a reality, a decentralized content delivery network or serverless functions, amongst others, are possible—helping achieve the goal of a fully decentralized web experience. 

The next generation of internet services brings tremendous cost benefits, high availability, geographic distribution and betterment of the performance, load times and perceived user experience.

### Motivation

The Fleek Network team was motivated to create a decentralized Edge Platform due to the current infrastructure trends, user concerns and demands. The modern web is shifting from the cloud to the edge, which is a reflection of the internet's growing user base and the need for low latency for users worldwide.

This development is a crucial and necessary step towards significantly enhancing the reliability, efficiency, and decentralization of Web3 applications and platforms, such as the next iteration of the Fleek platform.

## How does it work?

When a client requests a service, the protocol determines the best route to the nodes where the service replicas and workload allocates.

Once the computation is successful, the data streaming routes to the client. On-client request fulfillment, a proof of delivery is generated containing cryptographically secured metadata about the original request, any parts involved and the resources consumed.

The Delivery Acknowledgements are stored locally in the participating node memory pools, rolled-up to the protocol consensus consistently throughout the Epoch. This agreement forms by a random committee of any healthy Nodes that use the information provided to reward the Nodes fairly.

<Author
    name="Helder Oliveira"
    image="https://github.com/heldrida.png"
    title="Software Developer + DX"
    url="https://github.com/heldrida"
/>
