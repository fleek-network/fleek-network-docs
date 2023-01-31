---
template: post
draft: false
hide_title: false
title: Git clone permission denied
slug: git-clone-permission-denied
date: 2023-01-02T31:00:00Z
canonical: ''
description: Fixing the git permission denied when git clone
category: Reference
tags:
- Reference
- Git
- Fleek Network
- permissions
---

When a `git clone` throws an error, it means GitHub is rejecting your connection because GitHub does not trust your computer as it does not have a public key.

```sh
git clone git@github.com:fleek-network/ursa.git
Cloning into 'ursa'...
git@github.com: Permission denied (public key).
fatal: Could not read from remote repository.

Please make sure you have the correct access rights
and the repository exists.
```

Since the repository is public, you can clone it with the `HTTPS` url version of the repository, which does not require authentication with SSH.

```sh
git clone https://github.com/fleek-network/ursa
```

Alternatively, if you'd like to set up SSH, create SSH key pair and add the SSH key to your GitHub account. Find the instructions in the GitHub documents [here](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/about-ssh).

