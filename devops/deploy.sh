#!/bin/bash

echo "👷‍♂️ Building Edwin... 🛠"
npm install
npm run build

echo "💌 Sending Edwin... 📭"
rsync -av ./dist/apps/ ironman@happy:~/edwin/ --delete
rsync -av ./devops/.env ironman@happy:~/edwin/api/.env --delete

echo "👔 Setting up Edwin... 👖"
ssh ironman@happy "
  cd edwin/api
  source ~/.nvm/nvm.sh
  NODE_ENV=production npm install
  pm2 restart main.js --update-env
"

echo "🏁 Done! Restarting Edwin... 🚀"
ssh ironman@happy "
  sudo reboot
"