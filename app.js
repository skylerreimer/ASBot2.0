const Discord = require('discord.js');
const bot = new Discord.Client();
const config = require("./config.json");
const password = require("./password.json");
var setup = require("./setup.js");

//read in your file
if(typeof require !== 'undefined') XLSX = require('xlsx');
var workbook = XLSX.readFile('pokemon.xlsx');
//load the worksheet with the pokemon names
var worksheet = workbook.Sheets[workbook.SheetNames[4]];

//make a set of commands
var commandSet = setup.getCommandList();

//make the map of pokemon and their row numbers
var pokemonList = setup.getPokemonList(workbook.Sheets[workbook.SheetNames[4]]);

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
    if(pokemonList.has(tempName)){
      //get the row of the pokemon
      var row = pokemonList.get(tempName);

      //begin collecting the information
      var messageContent = tempName.charAt(0).toUpperCase() + tempName.slice(1) + " - " + worksheet['C'+row].v + " | " + worksheet['D'+row].v;

      //if the pokemon has hidden ability, print it
      if(worksheet['E'+row].v != 'x'){
        messageContent += "/" + worksheet['E'+row].v;
      }
      console.log(tempName);
      console.log(row);
      //finish collecting information
      messageContent+= " | " + worksheet['F'+row].v + "/" + worksheet['G'+row].v + "/"
      + worksheet['H'+row].v+ "/" + worksheet['I'+row].v+ "/" + worksheet['J'+row].v+ "/" + worksheet['K'+row].v+ "/" + worksheet['L'+row].v
      + " | Size: " + worksheet['M'+row].v + " | Weight: " + worksheet['N'+row].v + " | +Spe nat. Acc Boost: " + worksheet['O'+row].v + "% | CC cost: "
      + worksheet['Q'+row].v + " | CHP: " + worksheet['R'+row].v + " | Sig. Item(s): " + worksheet['S'+row].v + " | Boosted Stats: " + worksheet['T'+row].v;

      //print the message
      message.channel.sendMessage(messageContent);
    }else{
      message.reply("That's not a pokemon! Did you make a typo?");
    }
  }else if(command ==="asbility"){
    message.reply("That doesn't work yet!");
  }else if(command ==="asbKitem"){
    message.reply("That doesn't work yet!");
  }else if(command ==="asbHitem"){
    message.reply("That doesn't work yet!");
  }else if(command ==="asbTitem"){
    message.reply("That doesn't work yet!");
  }else if(command ==="asbnature"){
    message.reply("That doesn't work yet!");
  }else if(command ==="calc"){
    message.reply("That doesn't work yet!");
  }else if(command ==="asbMove"){
    message.reply("That doesn't work yet!");
  }else if(command ==="random"){
    message.reply("That doesn't work yet!");
  }

});
//login info for the bot
bot.login(password.token);
