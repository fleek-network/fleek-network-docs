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
sudo systemctl stop lightning.service
```

:::tip
You can replace `lightning.service` by `lightning`.
:::

Disable the lightning service

```sh
sudo systemctl disable lightning.service
```

If you have used the recommended procedures in the [install](/docs/node/install) documentation you'll have to remove the Systemd unit (file that defines the service).

```sh
rm /etc/systemd/system/lightning.service
```

Reload the Systemd service daemon

```sh
sudo systemctl daemon-reload
```

## Clear the lightning config directory

The Fleek Network lightning config directory is where the configuration, keystore–the location where your private key is hosted–and other system files are stored.

:::caution WARNING
Make sure to backup any sensitive data, such as the keystore (private keys), as you won't be able to recover the keys by any other means. If you have any funds associated with it, it'll be lost forever. The Fleek Network team or anyone else will not be able to help recover keys. Your keys, your responsibility.
:::

Alternatively, instead of deleting you can move the files to a custom directory name such as`.lightning.backupDATESTAMP`, e.g. the example below we've used the date `2023-09-06-1205` as that was the time this text was written:

```sh
mv ~/.lightning ~/.lightning.backup202309061205
```

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
