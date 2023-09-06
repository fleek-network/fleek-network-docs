---
title: "Error: linking with `cc` failed: exit status: 1"
slug: error-linking-with-cc-failed-exist-status-1
hide_title: true
tags:
- references
- help
- update
- upgrade
- fix
---

<!--
  The following import is intentional (see partial <CheckoutCommitWarning />)
-->
import Author from '@site/src/components/Author';


A user who finds the error `linking with cc failed`, will have to install the required dependencies.

```sh
error: linking with `cc` failed: exit status: 1
error: could not compile `fleek-service-ping-example` (lib) due to previous error
```

Install `gcc`:

```sh
sudo apt-get install gcc
```

Run the `apt-get update`, as follows:

```sh
sudo apt-get update
```

You can re-run the installation process. If you are using the assisted installer, it'll complain that the source code directory already exists. Since you've probably cloned the source code repository locally, you'll have to remove it manually. If you need help, find the instructions in the [reference](/references/Lightning%20CLI/uninstall-lightning-cli).

<Author
    name="Helder Oliveira"
    image="https://github.com/heldrida.png"
    title="Software Developer + DX"
    url="https://github.com/heldrida"
/>