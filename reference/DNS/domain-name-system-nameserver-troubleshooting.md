---
template: post
draft: false
hide_title: false
title: Domain Name System nameserver troubleshooting
slug: domain-name-system-nameserver-troubleshooting
date: 2023-03-21T23:00:00Z
canonical: ''
description: Troubleshooting domain name issues
category: Reference
tags:
- Reference
- Fleek Network
- DNS
- Dynamic name system
- dig
- nameserver
---

When attempting to secure the server with SSL/TLS some users might be blocked at the Let's Encrypt step because the installer says that it "Doesn't have a DNS record type A pointing to the server". As mentioned, DNS might take some time to propagate but other issues might cause it too...

🙋‍♀️ We've used Ubuntu 22.x, as an example, for this reference. Your operating system version might differ a bit.

Flush Your Local DNS Cache

```sh
sudo resolvectl flush-caches 
```

# Check DNS Nameservers

The DNS nameserver declared in the systemd configuration file is what's used to query when trying to connect to a hostname like your domain name. Some DNS nameservers take longer to have the latest domain name details and cause the installation process to fail.

It's possible to change the DNS nameserver to a DNS nameserver of your liking.

Start by listing the content to locate the Network Name Resolution configuration files.

```sh
ls -la /etc/systemd/resolved.conf.d/
```

If any configuration file is listed, these configuration files control local DNS name resolution. E.g. some VPS providers such as Digital Ocean have a default file:

```sh
/etc/systemd/resolved.conf.d/DigitalOcean.conf
```

Which content looks like

```sh
[Resolve]
DNS=67.207.67.2 67.207.67.3
```

Let's say that you decide to change this information to use a popular DNS provider hypothetically

```sh
[Resolve]
DNS=8.8.8.8 8.8.4.4
```

💡 Use any DNS nameserver of your liking

Remember to restart, for the changes to take effect

```sh
systemctl restart systemd-resolved
```

Flush cache

```sh
sudo resolvectl flush-caches 
```

Verify that the domain name is pointing to the correct IP address

```sh
dig <YOUR-DOMAIN-NAME> +nocomments
```

Should output

```sh
;<YOUR-DOMAIN-NAME>.		IN	A
<YOUR-DOMAIN-NAME>.	199	IN	A	1.2.3.4
```

Example

```sh
;my-node.example.com.		IN	A
my-node.example.com.	199	IN	A	99.20.33.45
```