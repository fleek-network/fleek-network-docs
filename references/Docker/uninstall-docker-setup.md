---
title: Uninstall Docker Setup
slug: uninstall-docker-setup
hide_title: true
tags:
- references
- help
- docker
- image
- container
---

import Author from '@site/src/components/Author';
import GitCloneOptions from '../../guides/partials/_git-clone-options.mdx';


## Remove the source code locally

For users who build the Docker image from source-code.

Assuming the default installation source-code path `~/fleek-network/lightning`, run the command:

```
rm -rf ~/fleek-network/lightning
```

If you have a custom path, you need to change the pathname to the correct path you have selected during your custom install.

## Stop the Docker service

The Fleek Network recommends systemctl to manage the services, either natively or docker. It's an interface that is easily to translate across the setups, and to communicate to the users in a common manner.

If you have followed the recommendations, you should have the Systemd Unit Service setup.

To stop the service run the command:

```
sudo systemctl stop docker-lightning
```

## Confirm the Docker service status

Check the status by:

```
sudo systemctl status docker-lightning
```

Disable the service by:

```
sudo systemctl disable docker-lightning
```

:::tip
Once stop, you can run the following command to confirm it is not running. If you have used the recommended container name `lightning-node` the command you'd have to execute is:

You can check the Docker container isn't running by running the following command. Notice that we are assuming that your docker container name is the default `lightning-node`. If you have customized the name use the correct selected name:

```
sudo docker container inspect -f '{{.State.Running}}' lightning-node
```
:::

## Reload the daemon

Reload the daemon by:

```
sudo systemctl daemon-reload
```

## Remove the Systemd Service Unit file

If you have followed the recommendations, you should find the Systemd Service Unit file at:

```
/etc/systemd/system/docker-lightning
```

To remove the file, run the command:

```
sudo rm -f /etc/systemd/system/docker-lightning
```

## Delete the Docker image

For our example, we'll assume that the Docker image for Fleek Network is the default `lightning-node`. If you have created the image under a different name, change in accordance to your preference.

Delete the image by running the following command:

```sh
sudo docker rmi $(docker images | grep 'lightning-node')
```

To learn more about the docker image remove command, visit the official documentation [here](https://docs.docker.com/engine/reference/commandline/image_rm/)

## Uninstall Docker

Uninstalling Docker should only be performed if you don't need in your system. If you already had Docker for some purpose, you should not have to uninstall it.

Visit the Docker official documentation site for uninstall instructions [here](https://docs.docker.com/desktop/uninstall/).

## Manage keys

The configuration directory of Fleek Network is in the host machine file system. This is the directory where you can find the `config.toml`, `keystore` for the public keys, amongst others. 

```
/home/<USERNAME>/.lightning
```

For example, for the user `lgtn` the location of these files is:

```
/home/lgtn/.lightning
```

:::caution warning
The directory can be deleted but have in mind that the keystore is located here. If you need to backup the keystore, be careful as this is not possible to recover by anyone. The keys are your responsibility.
:::

To learn more about the keystore read the guide [managing the keystore](/guides/Node%20Operators/managing-the-keystore).

If you are happy to delete the directory, run the following command by replacing the `<USERNAME>` by yours:

```
rm -rf /home/<USERNAME>/.lightning
```

## Remove the logs

The Docker container generates output to stdout and stderr. All the content is stored in the location:

```
/var/log/lightning
```

To completely remove the directory run the command:

```sh
sudo rm -rf /var/log/lightning
```

<Author
    name="Helder Oliveira"
    image="https://github.com/heldrida.png"
    title="Software Developer + DX"
    url="https://github.com/heldrida"
/>
