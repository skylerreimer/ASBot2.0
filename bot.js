const Discord = require('discord.js');
const config = require("./res/config.json");
const password = require("./res/password.json");
const setup = require("./setup.js");
const messagePrinter = require("./printMessages.js")
const bot = new Discord.Client();

//read in
if(typeof require !== 'undefined') XLSX = require('xlsx');
var workbook = XLSX.readFile('./res/data.xlsx');

//load the worksheet with the pokemon names
var worksheet = workbook.Sheets[workbook.SheetNames[4]];
var worksheetNatures = workbook.Sheets[workbook.SheetNames[5]];
var worksheetAbilities = workbook.Sheets[workbook.SheetNames[6]];
var worksheetTypes = workbook.Sheets[workbook.SheetNames[7]];
var worksheetMoves = workbook.Sheets[workbook.SheetNames[8]];
var worksheetHeldItems = workbook.Sheets[workbook.SheetNames[9]];
var worksheetKeyItems = workbook.Sheets[workbook.SheetNames[10]];
var worksheetConsumable = workbook.Sheets[workbook.SheetNames[11]];
var worksheetTLRItems = workbook.Sheets[workbook.SheetNames[12]];

//make the map of pokemon and their row numbers
var pokemonList = setup.getPokemonList(worksheet);
var natureList = setup.getNatureList(worksheetNatures);
var abilityList = setup.getAbilityList(worksheetAbilities);
var heldItemList = setup.getHeldItemList(worksheetHeldItems);
var tlrItemList = setup.getTlrItemList(worksheetTLRItems);
var keyItemList = setup.getKeyItemList(worksheetKeyItems);
var consumableList = setup.getConsumableList(worksheetConsumable);
var moveList = setup.getMoveList(worksheetMoves);
var typeList = setup.getTypeList(worksheetTypes);

//command list
var commands = {

    "ping": {
        description: "responds pong, useful for checking if bot is alive",
        process: function(args){
          return messagePrinter.pong();
        }
    },

    "pong":{
      description: "responds pong, useful for checking if bot is alive",
      process: function(args){
        return messagePrinter.ping();
      }
    },

    "asbstats":{
      description: "returns stats of a given pokemon",
      process: function(args){
        var name = args[0].toLowerCase();
        var i = 1;
        while(args[i] != undefined){
          name += " " + args[i].toLowerCase();
          i++;
        }
        return messagePrinter.printAsbstats(name, worksheet, pokemonList);
      }
    },

    "asbility":{
      description: "returns information about a given ability",
      process: function(args){
        var abilityName = args[0].toLowerCase();
        var i = 1;
        while(args[i] != undefined){
          abilityName += " " + args[i].toLowerCase();
          i++;
        }
        return messageContent = messagePrinter.printAbilities(abilityName, worksheetAbilities, abilityList);
      }
    },

    "asbitem":{
      description: "returns information about a given item",
      process: function(args){
        var itemName = args[0].toLowerCase();
        var i = 1;
        while(args[i] != undefined){
          itemName += " " + args[i].toLowerCase();
          i++;
        }
        return messageContent = messagePrinter.printItem(itemName, worksheetHeldItems, heldItemList,
          worksheetTLRItems, tlrItemList, worksheetKeyItems, keyItemList,
          worksheetConsumable, consumableList);
      }
    },

    "asbnature":{
      description: "returns information about a given nature",
      process: function(args){
        var natureName = args[0].toLowerCase();
        return messageContent = messagePrinter.printNatures(natureName, worksheetNatures, natureList);
      }
    },

    "asbmove":{
      description: "returns information about a given move",
      process: function(args){
        var moveName = args[0].toLowerCase();
        var i = 1;
        while(args[i] != undefined){
          moveName += " " + args[i].toLowerCase();
          i++;
        }
        return messageContent = messagePrinter.printMoves(moveName, worksheetMoves, moveList);
      }
    },

    "asbtype":{
      description: "returns information about a given type",
      process: function(args){
        var typeName = args[0].toLowerCase();
        var i = 1;
        while(args[i] != undefined){
          typeName += " " + args[i].toLowerCase();
          i++;
        }
        return messageContent = messagePrinter.printTypes(typeName,worksheetTypes,typeList);
      }
    },

    "calc":{
      description: "evaluates an expression",
      process: function(args){
        var expression = args[0];
        var i = 1;
        while(args[i] != undefined){
          expression += args[i];
          i++;
        }
        return messageContent = messagePrinter.printExpression(expression);
      }
    },

    "roll":{
      description: "gives a random number",
      process: function(args){
        return messageContent = messagePrinter.rand(args[0],args[1],args[2]);
      }
    }

};


//the bot will let you know in console when it is ready
bot.on('ready', () => {
  console.log("Logged in! Serving in " + bot.guilds.array().length + " servers:");
  for(i = 0; i < bot.guilds.array().length; i++){
    console.log(bot.guilds.array()[i] + " ");
  }
  bot.user.setStatus('online', '%help for commands');

});


//begin looking for commands
bot.on('message', message => {
  //dont let bot talk to itself
  if (message.author.bot) return;
  //look for the prefix
  if (!message.content.startsWith(config.prefix)) return;
  //simplfy if/else logic for commands
  let commandText = message.content.split(" ")[0];
  commandText = commandText.slice(config.prefix.length).toLowerCase();
  //grab the arguments and split them by spaces
  let args = message.content.split(" ").slice(1);
  //help command is a special case that prints a list of other commands
  var cmd = commands[commandText];
  if(commandText === "help"){
    var messageContent = messagePrinter.printHelp(commands);
    message.channel.sendMessage(messageContent);
  }else if(cmd){
    var messageContent = cmd.process(args);
    message.channel.send(messageContent);
  }

});
//login info for the bot
bot.login(password.token);
