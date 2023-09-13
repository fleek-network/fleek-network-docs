---
title: Error building on ARM64
slug: error-building-on-arm64
hide_title: true
tags:
- references
- help
- update
- upgrade
- fix
---

Building on the ARM64 (aarch64) platform has its own specifics, and currently consists of the following:

Install prerequisites

```bash
sudo apt install gcc
```

Change `lto` key value in `~/fleek-network/lightning/Cargo.toml` `lto = true` to `lto = "thin"`

`nano Cargo.toml`

```bash
...
 68 [profile.release]
 ...
 71 # currently enabled, may increase build time, but runtime faster, can set to `"thin"`.
 72 lto = "thin"
 ...
```
Set `RUSTFLAGS` on build
```bash
RUSTFLAGS="-Clink-arg=-Wl,--allow-multiple-definition" cargo +stable build --release 
```
