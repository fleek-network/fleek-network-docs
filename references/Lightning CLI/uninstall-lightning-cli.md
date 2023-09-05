---
title: Uninstall Lightning CLI
slug: uninstall-lightning-cli
hide_title: true
tags:
- References
- Help
- Uninstall
- Remove
- Delete
- Clear
- Clean
---

<!--
  The following import is intentional (see partial <CheckoutCommitWarning />)
-->
import Author from '@site/src/components/Author';

## Remove symLink

To remove a symbolic link, use either the rm or unlink command followed by the name of the symlink as an argument. Here's an example with `unlink`:

```sh
unlink /usr/local/bin/lgtn
```

## Delete the local source code

Delete the local source code which was copied from the remote [repository](https://github.com/fleek-network/lightning). You can delete it recursively by:

```sh
rm -r ~/fleek-network/lightning
```

💡 Use the flag `f` to force remove by skipping any prompts, e.g. `rm -rf <PATHNAME>`

:::note
The default install location is `$HOME/fleek-network/lightning`. If you have selected a different location to store the repository, change the target path.
:::

## Disable the systemd service

To disable the Fleek Network Lightning Systemd's service, start by stopping the service.

```sh
systemctl stop lightning.service
```

:::tip
You can replace `lightning.service` by `lightning`.
:::

Disable the lightning service

```sh
systemctl disable lightning.service
```

If you have used the recommended procedures in the [install](docs/node/install) documentation you'll have to remove the Systemd unit (file that defines the service).

```sh
rm /etc/systemd/system/lightning.service
```

Reload the Systemd service daemon

```sh
systemctl daemon-reload
```

## Clear the lightning config directory

The Fleek Network lightning config directory is where the configuration, keystore–the location where your private key is hosted–and other system files are stored.

:::caution
Make sure to backup any sensitive data, such as the keystore (private key), as you won't be able to recover the keys by any other means. If you have any funds associated with it, it'll be lost forever. The Fleek Network team or anyone else will not be able to help recover keys. Your keys, your responsibility.
:::

To clear the lightning config directory remove any files recursively by running the following command:

```sh
rm -r ~/.lightning/*
```

💡 Use the flag `f` to force remove by skipping any prompts, e.g. `rm -rf <PATHNAME>/*`

Alternatively, delete the `~/.lightning` directory:

```sh
rm -r ~/.lightning
```

## Uninstall Cargo and Rust

To uninstall rustc, rustup and cargo run the following command:

```sh
rustup self uninstall
```

<Author
    name="Helder Oliveira"
    image="https://github.com/heldrida.png"
    title="Software Developer + DX"
    url="https://github.com/heldrida"
/>
