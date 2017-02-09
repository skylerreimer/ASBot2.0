const Discord = require('discord.js');
const bot = new Discord.Client();
const config = require("./config.json");
const password = require("./password.json");
var setup = require("./setup.js");
var messagePrinter = require("./printMessages.js")

//read in your file
if(typeof require !== 'undefined') XLSX = require('xlsx');
var workbook = XLSX.readFile('pokemon.xlsx');

//load the worksheet with the pokemon names
var worksheet = workbook.Sheets[workbook.SheetNames[4]];
var worksheetNatures = workbook.Sheets[workbook.SheetNames[5]];

//make the map of pokemon and their row numbers
var pokemonList = setup.getPokemonList(worksheet);
var natureList = setup.getNatureList(worksheetNatures);

//the bot will let you know in console when it is ready
bot.on('ready', () => {
  console.log('Bot is online!');
});


//begin looking for commands
bot.on('message', message => {
  //dont let bot talk to itself
  if (message.author.bot) return;
  //look for the prefix
  if (!message.content.startsWith(config.prefix)) return;
  //simplfy if/else logic for commands
  let command = message.content.split(" ")[0];
  command = command.slice(config.prefix.length);
  command.toLowerCase();
  //grab the arguments
  let args = message.content.split(" ").slice(1);

  if(command === "asbstats"){

    var tempName = args[0].toLowerCase();
    var messageContent = messagePrinter.printAsbstats(tempName, worksheet, pokemonList);
    message.channel.sendMessage(messageContent);

  }else if(command ==="asbility"){
    message.reply("That doesn't work yet!");
  }else if(command ==="asbKitem"){
    message.reply("That doesn't work yet!");
  }else if(command ==="asbHitem"){
    message.reply("That doesn't work yet!");
  }else if(command ==="asbTitem"){
    message.reply("That doesn't work yet!");
  }else if(command ==="asbnature"){

    var natureName = args[0].toLowerCase();
    var messageContent = messagePrinter.printNatures(natureName, worksheetNatures, natureList);
    message.channel.sendMessage(messageContent);

  }else if(command ==="calc"){
    message.reply("That doesn't work yet!");
  }else if(command ==="asbMove"){
    message.reply("That doesn't work yet!");
  }else if(command ==="random"){
    message.reply("That doesn't work yet! :");
  }else if(command ==="poop"){
    message.reply(":poop:");
  }

});
//login info for the bot
bot.login(password.token);
