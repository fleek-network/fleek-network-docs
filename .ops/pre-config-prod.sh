#!/bin/bash

prodUrl="uhqta-saaaa-aaaad-qevxa-cai.ic.fleek.co"

if [[ "$OSTYPE" == "darwin"* ]]; then
  sed -i "" "s/\/fleek-network-docs//g" docusaurus.config.js
  sed -i "" "s/\/fleek-network.github.io/$prodUrl/g" docusaurus.config.js

  exit 0
fi

sed -i "s/\/fleek-network-docs//g" docusaurus.config.js
sed -i "s/\/fleek-network.github.io/$prodUrl/g" docusaurus.config.js