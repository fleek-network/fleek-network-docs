---
template: post
draft: false
hide_title: false
title: Services authentication
slug: services-authentication
date: 2023-02-24T31:00:00Z
canonical: ''
description: Services authentication
category: Reference
tags:
- Reference
- docker-compose
- Fleek Network
- authenticate
- password
- dashboard
- grafana
- prometheus
- admin
---

The Docker compose stack configuration files have some services declared for monitoring and analytics. You might be interested in accessing the dashboard of these services, which you can do by requesting via a hostname and port number where the service is listening to.

Our Docker compose stack configuration is located at `$HOME/fleek-network/ursa/docker/full-node/docker-compose.yml` by default.

There, you can check which services are declared and the port numbers they're accessible from and the access detail settings.

When launching the Docker compose stack, you'll see that the admin user and password details are blank.

```sh
WARNING: The ADMIN_USER variable is not set. Defaulting to a blank string.
WARNING: The ADMIN_PASSWORD variable is not set. Defaulting to a blank string.
WARNING: The UID variable is not set. Defaulting to a blank string.
WARNING: The GID variable is not set. Defaulting to a blank string.
```

💡 If you don't set the authentication details for `Grafana` it defaults to `admin` and `admin` (username/password).

You can have the environment variables declared, here's an example where we have created a file `.env`.

Change the directory to the Ursa repository (we'll use the default `$HOME/fleek-network/ursa`, you may have changed it)

```sh
cd $HOME/fleek-network/ursa
```

Create the dot env file where you'll put the environment variables values

```sh
touch .env
```

Edit the file, where you assign the values

```sh
ADMIN_USER=<username>
ADMIN_PASSWORD=<password>
```

Here's a practical example

```sh
ADMIN_USER=fleek
ADMIN_PASSWORD=oiG!s@s_3Az
```

Launch the Docker compose stack (if running, use `down` and then after `up`).

Our example shows the `up` version.

```sh
docker compose --env-file .env -f ./docker/full-node/docker-compose.yml up
```

👆 The flag `--env-file` is used to declare where the `.env` file is located

💡 The `docker-compose.yml` uses the `ADMIN_USER` and `ADMIN_PASSWORD` for `Grafana`

Open the `Grafana` dashboard in a browser. For our example, we are running in the server `localhost` context. By looking at the `docker-compose.yml`, we know that the exposed port is `3000`.

```sh
open http://localhost:3000
```

You should check the official documentation for more detailed information or instructions, as we only provide support for `Fleek Network` projects.

Learn more:

- Dot env from the Docker documentation [here](https://docs.docker.com/compose/environment-variables/set-environment-variables/).

- Grafana from the Granfana documentation [here](https://grafana.com/docs/grafana/latest/).

- Prometheus from the Prometeus documentation [here](https://prometheus.io/docs/introduction/overview/).