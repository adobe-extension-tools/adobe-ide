#!/bin/bash

export HOME="/Users/koen"
export PATH=$HOME/bin:/usr/local/bin:/usr/bin:$PATH
export NVM_DIR="$HOME/.nvm"
[ -s "/usr/local/opt/nvm/nvm.sh" ] && . "/usr/local/opt/nvm/nvm.sh"  # This loads nvm

nvm use 10

export GH_RELEASE_GITHUB_API_TOKEN=$GITHUB_API_KEY
./node_modules/.bin/gh-release \
  --tag_name $DRONE_TAG \
  --target_commitish $DRONE_BRANCH \
  --name $DRONE_TAG \
  --description "Release of $DRONE_TAG" \
  --assets "./archive/adobe-ide.exe,./archive/adobe-ide.pkg,./archive/adobe-ide.zxp" \
  --owner adobe-extension-tools \
  --repo adobe-ide \
  --yes 