#!/bin/bash
echo "Please Wait for build react" 
npm run buildfrontend
git add -A
git commit -m ""$(date +"%D %T buildfront")""
git push origin backend
printf " ____  _       _         ____        ____\n|  _ \(_)_ __ | |_ ___  / ___| ___  / ___| ___\n| |_) | | '_ \| __/ _ \| |  _ / _ \| |  _ / _ \ \n|  __/| | | | | || (_) | |_| | (_) | |_| | (_) | \n|_|   |_|_| |_|\__\___/ \____|\___/ \____|\___/\n"