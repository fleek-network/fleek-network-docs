---
title: User service
slug: user-service
hide_title: true
tags:
- references
- help
- user service
- unit
- systemctl
- systemd
---

A user should have the ability to run a Systemd user service unit without having to use `sudo` to control it.

## Check `--user` support

Use the `--user` flag when getting the list of unit files.

```sh
systemctl --user list-unit-files
```

It should return a list of unit files.

## Put the service unit in the user service

Create the Systemd user units directory:

```sh
sudo mkdir -p /etc/systemd/system/user
```

Move the `lightning.service` to the system user unit service directory:

```sh
mv /etc/systemd/system/lightning.service /etc/systemd/system/user/lightning.service
```

Check the **Load path when running in user mode (--user)** in [Systemd unit](https://www.freedesktop.org/software/systemd/man/systemd.unit.html) for other alternative user paths, or to understand how it works to customize your server accordingly.

## Reload daemon

```sh
sudo systemctl daemon-reload
```

## Systemd service control as `--user`

Reload the Systemctl daemon by executing the command:

```sh
systemctl --user daemon-reload
```

Enable the service for starting up on system boot:

```sh
systemctl --user enable lightning.service
```

Start the service by:

```sh
systemctl --user start lightning
```

Stop the service by:

```sh
systemctl --user stop lightning
```

Restart the service by:

```sh
systemctl --user restart lightning
```

Check the service status by:

```sh
systemctl --user status lightning.service
```

## Problem statement


On tests done in a DigitalOcean Ubuntu 22.x, we had set up user-level services which were operated with `--user`. When the commands were executed as `--user` it failed with:

```sh
Failed to connect to bus: Operation not permitted (consider using --machine=<user>@.host --user to connect to bus of other user)
```

The user should be able to operate as user, it shouldn't be required to connect on behalf of other users. This means that even for a simple command, such as to retrieve the list of unit files:

```sh
systemctl --user list-unit-files
```

We'd get the error:

```sh
Failed to connect to bus: Operation not permitted (consider using --machine=<user>@.host --user to connect to bus of other user)
```

For any of the supported user unit locations e.g. $HOME/.config/systemd/user as documented in [Systemd unit documentation](https://www.freedesktop.org/software/systemd/man/systemd.unit.html), the result is the error above.

This is related to the load paths when running in user mode (--user), as described in the discussion [here](https://unix.stackexchange.com/questions/224992/where-do-i-put-my-systemd-unit-file/367237#367237).


**User-dependent**

**$XDG_CONFIG_HOME/systemd/user** User configuration (only used when $XDG_CONFIG_HOME is set)

**$HOME/.config/systemd/user** User configuration (only used when $XDG_CONFIG_HOME is not set)

**$XDG_RUNTIME_DIR/systemd/user** Runtime units (only used when $XDG_RUNTIME_DIR is set)

**$XDG_DATA_HOME/systemd/user** Units of packages that have been installed in the home directory (only used when $XDG_DATA_HOME is set)

**$HOME/.local/share/systemd/user** Units of packages that have been installed in the home directory (only used when $XDG_DATA_HOME is not set)

For example, if we check the `$XDG_RUNTIME_DIR` in a DigitalOcean box, we get the following output:

```sh
/run/user/0
```

For this reason and to provide support for a wider audience of users and systems, we've stuck to sudo to execute the service, but this should not be a requirement and is not recommended.
