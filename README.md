# ASBot2.0
An anime style battling help bot for discord app based off <a href="https://github.com/hydrabolt/discord.js/">discord.js</a>

# Features:


And much more! Try %help to get a full list of available commands

# Installation

This bot is written to run on top of node.js. Please see https://nodejs.org/en/download/

Once you have node installed running `npm install` from the bot directory should install all the needed packages. If an error happens something went wrong


# Running
Before you run the bot you will need to download the latest spreadsheet. You can manually download it <a href="https://docs.google.com/spreadsheets/d/1RlsjFgpQGSZPGtwaUL33g0zHN888-iveQPKSVgFII-M/edit#gid=0">here</a> and then place it into the res folder as Data.xlsx.

OR

You can run the updater programs in the updater folder. downloadFile.js is a Node.js command line program that will use your google account to authorize the dowloading of the data.
Then you can optionally run errorCheck.java to ensure the file you downloaded isn't corrupted.

Anyways, you need to get the data for the bot into the res folder somehow. I personally use a cron job to redownload the data file every few days so my instance of the bot is updated for my users

To start the bot just run
`node app.js`.
inside of src/bot. I personally use href="https://github.com/Unitech/pm2">pm2</a> to manage my bots. I use the same cron job from earlier to restart the bot and update it using the scripts I gave  you in the scripts folder.

# Updates
If you update the bot, please run `npm update` before starting it again. If you have
issues with this, you can try deleting your node_modules folder and then running
`npm install` again. Please see [Installation](#Installation).

# ToDo:
Make the updater better!
Get a real database setup!
Add some more search features

# Help
Bother me here or on discord. I'm always looking for some good help

If you still need help join us on [discord.](https://discord.gg/SBvnyzf) and do an @comic67 to summon me
