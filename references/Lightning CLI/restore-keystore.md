---
title: Restore the keystore
slug: restore-the-keystore
hide_title: true
tags:
- references
- help
- keystore
- backup
- restore
---

import Author from '@site/src/components/Author';
import FindAndReplaceConfigWithUserPaths from '../../guides/partials/_find-and-replace-config-with-user-paths.mdx';
import RestoreKeystore from '../../guides/partials/_restore-keystore.mdx';

:::caution
The security of the private key is the responsibility of the user. Unfortunately, the Fleek Network team and any others are unable to help regain access to private key if lost or failed to secure them. The private keys are the user responsibility. The Fleek Network team doesn't endorse any methods of encryption and storage, the methods described here are for educational purposes only.
:::

## Switch user

Switch to the correct username you have used to install and set up the Fleek Network Lightning. For example, let's say that the username is `lgtn`. The command you'd have to run would be:

```
su lgtn
```

## Change directory to user home

Change directory to the user you have used to install and set up the Fleek Network Lightning. For example, if you have used the username `lgtn` the command would be:

```
cd $HOME
```

In other words:

```
cd /home/lgtn
```

## Clear the config.toml

You should can delete, backup or move the `config.toml` file in order to reset it. 

It might be necessary to, if your configuration, e.g. is corrupted, or you want to reset it for any other reason.

To move or backup, run:

```
mv ~/.lightning/config.toml ~/.lightning/config.toml.backup
```

If you don't have a use-case for the backup, delete the file. To delete, run the command:

```
rm ~/.lightning/config.toml
```

:::caution warning
You should have switched to the correct username. If you haven't done it, when stating `~` that will refer to the current username home, which can be anything other than the correct username! Make sure you have switched to the correct username used during the installation and set up of Fleek Network Lightning to avoid confusion and issues.
:::

## Create a new config.toml

A new configuration file can be created by running the following command:

```
lgtn print-config --default > ~/.lightning/config.toml
```

## Update the config.toml with user home path

<FindAndReplaceConfigWithUserPaths />

## Restoring the keystore

<RestoreKeystore />

For a more in depth or step-by-step instructions read the guide [managing the keystore](/guides/Node%20Operators/managing-the-keystore).

<Author
    name="Helder Oliveira"
    image="https://github.com/heldrida.png"
    title="Software Developer + DX"
    url="https://github.com/heldrida"
/>
