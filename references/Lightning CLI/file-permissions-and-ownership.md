---
title: File permissions and Ownership
slug: file-permissions-and-ownership
hide_title: true
tags:
- ownership
- file permissions
- sudoer
- root
---

import Author from '@site/src/components/Author';
import FindAndReplaceConfigWithUserPaths from '../../guides/partials/_find-and-replace-config-with-user-paths.mdx';

## Ownership

The user who installs the Fleek Network Lightning CLI matters, as it can own or delegate ownership of the dependencies and applications being installed.

For example, if you have followed the install document recommendations and have:
- Created a user **lgtn**
- Switched to the user **lgtn**
- Executed the installation process as **lgtn** 

You'll find that it owns the following directories under the user home (/home/lgtn):

```sh
drwxr-x--- 6 lgtn lgtn  4096 Sep 12 10:27 .
drwxr-xr-x 3 root root  4096 Sep 11 12:28 ..
drwxrwxr-x 5 lgtn lgtn  4096 Sep 11 12:29 .cargo
drwxrwxr-x 5 lgtn lgtn  4096 Sep 11 15:25 .lightning
drwxrwxr-x 6 lgtn lgtn  4096 Sep 11 12:29 .rustup
drwxrwxr-x 3 lgtn lgtn  4096 Sep 11 12:28 fleek-network
```

Above, we have the listing properties set as **drwxrwxr-x** and the ownership  **lgtn:lgtn**.

On the other hand, if you have done the installation process as **root** superuser, you'll find that:
- The location of the directories and files goes under the `/root` pathname
- The ownership is set to **root:root**

Learn more about [file permissions](https://www.linuxfoundation.org/blog/blog/classic-sysadmin-understanding-linux-file-permissions) from the [Linux Foundation](https://www.linuxfoundation.org/).

To learn more about file permission on Linux, read the [Understanding Linux File Permissions](https://www.linuxfoundation.org/blog/blog/classic-sysadmin-understanding-linux-file-permissions).

## Using sudo to delegate permissions

Consider file ownership and permissions to understand where the keystore is located. Take close attention when executing commands as an admin–with or without **super user** (root) or **sudo**.

If a command is executed without **sudo** then the generated output goes onto the **user** home.

```sh
lgtn keys generate
```

Resulting in having the **keystore** saved onto `/home/username/.lightning/keystore`.

On the other hand, if a command is executed with **sudo** then the generated output is delegated to **root** directory.

```sh
sudo lgtn keys generate
```

Resulting in having the **keystore** saved onto `/root/.lightning/keystore`.

## User $HOME directory

The home directory is a directory that contains the personal files of a particular user of the system. On Linux, the `$HOME` environment variable is set by the login program, which sets the user `$HOME`` accordingly. A user's home goes by the username, the user who's logged in.

For this reason, a user can change to the home directory by executing:

```sh
cd $HOME
```

A shorthand allows a user to refer to their home directory simply as `~` (tilde), as follows:

```sh
cd ~
```

:::tip
We can find that the HOME or ~ (tilde) is highly dependent on the user who's logged in. Since we know that the user might delegate to **root** by the usage of **sudo**, this can help troubleshoot and explain the location of our files e.g. the keystore. In the section [Set the locations of the user paths](#set-the-locations-of-the-user-paths), we learn how to define the location of our user configuration paths to avoid confusion. By doing it we ensure that when running the service, the service picks the correct configuration paths for our user.
:::

To learn more about the user $HOME directory read the wikipedia [Home directory](https://en.wikipedia.org/wiki/Home_directory) document.

## Set the locations of the user paths

<FindAndReplaceConfigWithUserPaths />

## Set the configuration flag -c on the service unit file

The following section assumes that a System service unit has been declared and you're using systemctl to control the service, as described in our [Systemd Service Setup](/docs/node/install#systemd-service-setup) install section.

Open and edit the **/etc/systemd/system/lightning.service** file.

1) Replace `<USERNAME>` with YOUR username. For example, in the documentation we use the username **lgtn**, which means we'd replace `User=<USERNAME>` with `User=lgtn`.

2) Make sure that the ExecStart is set correctly, including the `-c`

```sh
[Unit]
Description=Fleek Network Node lightning service

[Service]
User=<USERNAME>
Type=simple
MemoryHigh=32G
RestartSec=15s
Restart=always
ExecStart=lgtn -c /home/<USERNAME>/.lightning/config.toml run
StandardOutput=append:/var/log/lightning/output.log
StandardError=append:/var/log/lightning/diagnostic.log
Environment=TMPDIR=/var/tmp

[Install]
WantedBy=multi-user.target
```

For our example, as the username **lgtn** it would look like:

```sh
[Unit]
Description=Fleek Network Node lightning service

[Service]
User=lgtn
Type=simple
MemoryHigh=32G
RestartSec=15s
Restart=always
ExecStart=lgtn -c /home/lgtn/.lightning/config.toml run
StandardOutput=append:/var/log/lightning/output.log
StandardError=append:/var/log/lightning/diagnostic.log
Environment=/var/tmp

[Install]
WantedBy=multi-user.target
```

When complete make sure the file is saved and the systemctl daemon is reloaded, as follows:

```sh
sudo systemctl daemon-reload
```

Consequently, when a user manages the service via the systemctl, the Lightning CLI process will read the configuration file settings provided above. It includes the location of the user preferences, such as the keystore location amongst others, preventing confusion regardless of **root** delegation.

<Author
    name="Helder Oliveira"
    image="https://github.com/heldrida.png"
    title="Software Developer + DX"
    url="https://github.com/heldrida"
/>
