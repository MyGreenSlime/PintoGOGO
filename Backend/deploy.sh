#!/bin/bash
USERNAME = dondon
HOST = "pintogogo.dondondiary.me"
SCRIPT = "
    echo '${USERNAME} : cd PintoGOGO';
    cd PintoGOGO;
    echo '${USERNAME} : pm2 stop 0';
    pm2 stop 0
    echo '${USERNAME} : git pull';
    git pull;
    echo '${USERNAME} : cd Backend';
    cd Backend;
    echo '${USERNAME} : npm install';
    npm install;
"
echo "you are about to deploy app to ${USERNAME}@${HOSTS}"
ssh -l ${USERNAME} ${HOST} "${SCRIPT}"