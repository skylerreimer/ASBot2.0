#! /bin/bash
#Bash Script to (re)start ASBot

declare -A bots
bots=(["ASBot2.0"]='Documents/ASBot2.0')

#loop through all of the bots
for key in ${!bots[@]}; do

    #go to the correct directory
    echo "restarting bot" ${key} "in directory:" ${bots[${key}]}
    cd ${bots[${key}]}
    #stop the bot and then restart it.

	cd src/bot
	pm2 stop ${key}
	cd ..
  echo "updating...."
	cd updater
  set -x
	node downloadFile.js
  set +x
  echo "confirming updating worked...."
	java errorCheck
	cd ..
	cd bot
  echo "turning the bot back on"
	pm2 start app.js --name "${key}"



done
echo "Done"
