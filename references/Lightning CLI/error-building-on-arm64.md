---
title: Error building on ARM64
slug: error-building-on-arm64
hide_title: true
tags:
- references
- help
- fix
---

## Building on the ARM64 (aarch64) 

ARM64 platform has its own specifics, and currently consists of requiring `gcc`:

```bash
sudo apt install gcc
```

On cargo build, the error `error: linking with `cc` failed: exit status: 1` occurs, as demonstrated in the output below:

```sh
error: linking with `cc` failed: exit status: 1
# ... wall of text
# ... the key error is ↴
= note: /usr/bin/ld: /home/ubuntu/fleek-network/lightning/target/release/deps/libblake3-a927e9b36d695ff0.rlib(blake3-a927e9b36d695ff0.blake3.91a53ea05847a7a5-cgu.0.rcgu.o): in function `blake3_compress_in_place_portable':
          /home/ubuntu/.cargo/registry/src/index.crates.io-6f17d22bba15001f/blake3-1.4.1/src/ffi_neon.rs:45: multiple definition of `blake3_compress_in_place_portable'; /home/ubuntu/fleek-network/lightning/target/release/deps/libfleek_blake3-990c4c0cfb4eaa87.rlib(fleek_blake3-990c4c0cfb4eaa87.fleek_blake3.4f11e9370af31773-cgu.0.rcgu.o):/home/ubuntu/.cargo/registry/src/index.crates.io-6f17d22bba15001f/fleek-blake3-1.4.1/src/ffi_neon.rs:45: first defined here
```

As a result of the [research](https://github.com/ryssroad/fleek-aarch64-build) by the community member [ryssroad](https://github.com/ryssroad), the following solution was shared.

Open the `cargo.toml` file in `~/fleek-network/lightning/Cargo.toml` and find the `lto` key.

```sh
lto = true
```

Change the `lto` key value from `true` to `thin`:

```sh
...
[profile.release]
# currently enabled, may increase build time, but runtime faster, can set to `"thin"`.
lto = "thin"
```

Set `RUSTFLAGS` on build, as follows:

```bash
RUSTFLAGS="-Clink-arg=-Wl,--allow-multiple-definition" cargo +stable build --release 
```

Once the build completes, you should find the generated binary `lightning-node` under the directory `~/fleek-network/lightning/target/release/lightning-node`.

As an example, execute:

```sh
~/fleek-network/lightning/target/release/lightning-node help
```

To find the help output:

```sh
Usage: lightning-node [OPTIONS] <COMMAND>

Commands:
  run           Start the node
  keys          Handle keys
  print-config  Print the loaded configuration
  help          Print this message or the help of the given subcommand(s)

Options:
  -c, --config <CONFIG>      Path to the toml configuration file [default: ~/.lightning/config.toml]
      --with-mock-consensus  Determines that we should be using the mock consensus backend
  -v...                      Increases the level of verbosity (the max level is -vvv)
      --log-location         Print code location on console logs
  -h, --help                 Print help
  -V, --version              Print version
```