#!/bin/bash

echo "add token rotate wrapper"
echo "cp file"

cp valut.js /test
cp vaultClient.js /test

echo "sed dependency"
sed -i '.bak' 's/@google-cloud\/secret-manager/.\/vaultClient/g'  index.js

echo "add new package.json"
sed -i '.bak' 's/^    "@google-cloud\/secret-manager": "^3.1.0"/    "node-vault": "^0.9.22"/g' package.json






