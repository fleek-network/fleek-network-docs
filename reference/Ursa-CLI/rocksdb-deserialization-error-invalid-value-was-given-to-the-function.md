---
template: post
draft: false
hide_title: false
title: Rocksdb, deserialization error, invalid value was given to the function
slug: rocksdb-deserialization-error-invalid-value-was-given-to-the-function
date: 2023-01-02T23:00:00Z
canonical: ''
description: Instructions how to fix the ursa database error that can be caused by the source-code migration
category: Reference
tags:
- Reference
- Fleek Network
- node
- database
- ursa_db
---

This can be caused by database backward compatibility, e.g. if the ursa cli source-code migrates the database or have considerable features introduced by version changes.

```sh
Panic ERROR typed_store::rocks: error: (de)serialization error: Invalid value was given to the function
```

Clear the `ursa_db` directory

```sh
rm -f ~/.ursa/data
```

Restart the Ursa node!