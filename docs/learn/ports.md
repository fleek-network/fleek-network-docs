---
title: Ports
hide_title: true
tags:
  - Ports
sidebarCollapsible: false
---

import Author from '@site/src/components/Author';

The Node process requires the following ports:

- RPC (port 4069)
- Narwhal
    - Primary (port 8000)
    - Worker (port 8001)
    - Mempool (port 8002)

There’s a single worker at the protocol level. In the future, if a node is allowed to run >1 worker, the ports can look like (worker#X):

- Narwhal
    - Worker (port 80X1)
    - Mempool (or 80X2)


:::caution required
The ports should be freed before launching the node process. Any blockers or firewalls should be configured to enable the ports.
:::

<Author
    name="Helder Oliveira"
    image="https://github.com/heldrida.png"
    title="Software Developer + DX"
    url="https://github.com/heldrida"
/>
