#!/bin/bash
echo "Please Wait for build react" 
rm package-lock.json
npm install
npm run buildfrontend
echo "git add" 
git add -A
echo "git commit" 
git commit -am "deploy $date '+%Y-%m-%d %H:%M:%S'"
echo "git push" 
git push origin backend
bash deploy.sh
printf " ____  _       _         ____        ____\n|  _ \(_)_ __ | |_ ___  / ___| ___  / ___| ___\n| |_) | | '_ \| __/ _ \| |  _ / _ \| |  _ / _ \ \n|  __/| | | | | || (_) | |_| | (_) | |_| | (_) | \n|_|   |_|_| |_|\__\___/ \____|\___/ \____|\___/\n"
