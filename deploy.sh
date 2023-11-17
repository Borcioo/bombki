#!/bin/bash

# Check if any command fails and exit the script
set -e


# Install Dep
yarn install

# Build the website
NODE_ENV=production yarn build

# Navigate to the dist directory
cd dist

# Rsync the content to the server
rsync -avzP -e 'ssh -i /home/borek/.ssh/borek_s60 -o StrictHostKeyChecking=no -p 22' ./ foreto-dev@s60.mydevil.net:~/domains/bombki.dev.foreto.com/public_html

cd ../

echo "Deployment successful!"