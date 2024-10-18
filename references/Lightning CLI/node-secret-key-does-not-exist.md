---
title: Node secret key does not exist
slug: node-secret-key-does-not-exist
hide_title: true
tags:
- keystore
- lost keys
- ownership
- file permissions
---

## Node secret key does not exist

When watching the Fleek Network Lightning service log output, you find the "Node secret key does not exist" message as follows:

```sh
Error: Could not start the node.

Caused by:
    Node Initialization failed: InitializationFailed(Tag<lightning_signer::Signer<lightning_node::FinalTypes> as SignerInterface>, Node secret key does not exist. Use the CLI to generate keys.)
```

Edit the `~/.lightning/config.toml` to include the full location for the PEM files. For example, let's say that it's located under `/home/skywalker` that'd look like:

```
[signer]
consensus_key_path = "/home/skywalker/.lightning/keystore/consensus.pem"
node_key_path = "/home/skywalker/.lightning/keystore/node.pem"
```

To learn more about how file permissions and ownership work, you're advised to read the reference document [here](/references/Lightning%20CLI/file-permissions-and-ownership.md).
