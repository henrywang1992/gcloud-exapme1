#!/bin/bash

echo "add token rotate wrapper"
echo "cp file"

cp ../example1/dependencies/valut/valut.js ./functions/helloworld/
cp ../example1/dependencies/valut/vaultClient.js ./functions/helloworld/

echo "sed dependency"
sed -i 's/@google-cloud\/secret-manager/.\/vaultClient/g'  ./functions/helloworld/index.js

echo "add new package.json"
sed -i 's/^    "@google-cloud\/secret-manager": "^3.1.0"/    "node-vault": "^0.9.22"/g' ./functions/helloworld/package.json






