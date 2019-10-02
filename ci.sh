#!/bin/bash

export PATH=$HOME/bin:/usr/local/bin:/usr/bin:$PATH
export NVM_DIR="$HOME/.nvm"
[ -s "/usr/local/opt/nvm/nvm.sh" ] && . "/usr/local/opt/nvm/nvm.sh"  # This loads nvm

nvm use 10
npm install
npm run installer