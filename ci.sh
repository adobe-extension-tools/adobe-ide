#!/bin/bash

export HOME="/Users/koen"
export PATH=$HOME/bin:/usr/local/bin:/usr/bin:$PATH
echo $PATH
export NVM_DIR="$HOME/.nvm"
[ -s "/usr/local/opt/nvm/nvm.sh" ] && . "/usr/local/opt/nvm/nvm.sh"  # This loads nvm

nvm use 10
npm install
npm run installer

eval $(docker-machine env default)
docker run --rm \
  -e DRONE_BUILD_EVENT=tag \
  -e DRONE_REPO_OWNER=adobe-extension-tools \
  -e DRONE_REPO_NAME=adobe-ide \
  -e DRONE_COMMIT_REF=refs/heads/master \
  -e PLUGIN_API_KEY=${GITHUB_API_KEY} \
  -e PLUGIN_FILES=master \
  -v ./archive:/data \
  -w /data \
  plugins/github-release