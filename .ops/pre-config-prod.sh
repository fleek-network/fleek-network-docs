#!/bin/bash

prodUrl="wispy-shape-2208.on.fleek.co"

sed -i "" "s/\/fleek-network-docs//g" docusaurus.config.js
sed -i "" "s/\/fleek-network.github.io/$prodUrl/g" docusaurus.config.js
