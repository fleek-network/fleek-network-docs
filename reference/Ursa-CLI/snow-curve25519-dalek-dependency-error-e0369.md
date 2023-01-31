---
template: post
draft: false
hide_title: false
title: Snow's curve25519-dalek dependency error E0369
slug: snow-curve25519-dalek-dependency-error-e0369
date: 2023-01-02T31:00:00Z
canonical: ''
description: Fixing the Snow's curve25519-dalek dependency error E0369
category: Reference
tags:
- Reference
- Git
- Fleek Network
- E0369
---

The latest version of curve25519-dalek v4.0.0-rc.0 is causing the issue:

```sh
error[E0369]: cannot multiply `&&EdwardsBasepointTable` by `&Scalar`
   --> /root/.cargo/registry/src/github.com-1ecc6299db9ec823/snow-0.9.0/src/resolvers/default.rs:132:47
    |
132 |         let point = (&ED25519_BASEPOINT_TABLE * &self.privkey).to_montgomery();
    |                      ------------------------ ^ ------------- &Scalar
    |                      |
    |                      &&EdwardsBasepointTable
    |
help: `*` can be used on `&EdwardsBasepointTable` if you dereference the left-hand side
    |
132 |         let point = (*&ED25519_BASEPOINT_TABLE * &self.privkey).to_montgomery();
    |                      +

For more information about this error, try `rustc --explain E0369`.
error: could not compile `snow` due to previous error
```

Downgrade manually as originally [reported](https://github.com/mcginty/snow/issues/146) in the `snow` package repository, which `Ursa` depends:

```sh
cargo update -p curve25519-dalek@4.0.0-rc.0 --precise 4.0.0-pre.5
```