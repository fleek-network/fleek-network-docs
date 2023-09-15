---
title: Backing up the keystore
slug: backing-up-the-keystore
hide_title: true
tags:
- references
- help
- keystore
- backup
- restore
---

<!--
  The following import is intentional (see partial <CheckoutCommitWarning />)
-->
import Author from '@site/src/components/Author';

:::caution
The security of the private key is the responsibility of the user. Unfortunately, the Fleek Network team and any others are unable to help regain access to private key if lost or failed to secure them. The private keys are the user responsibility. The Fleek Network team doesn't endorse any methods of encryption and storage, the methods described here are for educational purposes only.
:::

## Keystore pathname

The default location for the keystore is in the user home. The $HOME or `~` refers to the user home, as such consider the logged in username.

To Check the user you are logged in with:

```sh
whoami
```

The default location for the keystore is:

```sh
$HOME/.lightning/keystore
```

## Configuration file settings

The `config.toml` should have some and more of the following properties and values that are used to locate crucial files, such as the consensus and node keys of the keystore.

Here's an incomplete example of how the `config.toml` looks like:

```sh
[BLANK]
...

[application]
db_path = "~/.lightning/data/app_db"
...

[consensus]
store_path = "~/.lightning/data/narwhal_store"
...

[fsstore]
root = "~/.lightning/blockstore"
...

[resolver]
store_path = "~/.lightning/data/resolver_store"
...

[signer]
consensus_key_path = "~/.lightning/keystore/consensus.pem"
node_key_path = "~/.lightning/keystore/node.pem"
...
```

If you've followed the installation recommendations, it's very likely that you'll have the username path defined at the base of the pathnames declared in the properties, such as the following except instead of `<USERNAME>` you'll have your username:

```sh
[signer]
consensus_key_path = "/home/<USERNAME>/.lightning/keystore/consensus.pem"
node_key_path = "/home/<USERNAME>/.lightning/keystore/node.pem"
```

The `config.toml` if loaded on Lightning node process runtime, will pick the desired paths declared in the file.

## Loading the configuration file on runtime

Use the configuration flag `-c` to pass the configuration `config.toml` path:

```sh
lgtn -c /home/<USERNAME>/.lightning/config.toml run
```

Replace the `<USERNAME>` with the correct username, where the config is located.

Executing the subcommand `run` without the configuration flag `-c`, doesn't mean that it'll locate the desired `config.toml`, as it'll default to `$HOME/.lightning/config.toml`, e.g. if you were logged in with **root**, that'd be `/root/.lightning/config.toml`.

## Low security backup

To zip and encrypto the `$HOME/.lightning/keystore` directory run:

```sh
# It'll prompt for password (remember)
zip --encrypt -r keystore.zip.enc $HOME/.lightning/keystore
```

To unzip and decrypt the `keystore.zip.enc`, you'd run:

```sh
# It'll prompt for password (recall)
unzip keystore.zip.enc -d $HOME/.lightning/keystore
```

## Higher security

Create a `tarbar` by executing:

```sh
tar -cf "keystore.tar" $HOME/.lightning/keystore
```

The encryption command is:

```sh
sudo gpg -a --symmetric --cipher-algo AES256 keystore.tar
```

To decrypt the `keystore.tar.asc` file, enter:

```sh
sudo gpg -a --output keystore.tar --decrypt keystore.tar.asc
```

Create a temporary directory to extract the tar archive with the original full pathname.

```sh
mkdir $HOME/tar_keystore_extract
```

Now, run the command to extract to the target directory, as follows:

```sh
tar -xf keystore.tar -C $HOME/tar_keystore_extract
```

Locate the extracted files in `$HOME/tar_keystore_extract`, which should look like `$HOME/tar_keystore/home/<USERNAME>/.lightning/keystore`

For a more in depth or step-by-step instructions read the guide [managing the keystore](/guides/Node%20Operators/managing-the-key-store).

<Author
    name="Helder Oliveira"
    image="https://github.com/heldrida.png"
    title="Software Developer + DX"
    url="https://github.com/heldrida"
/>
