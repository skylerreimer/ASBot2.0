const Discord = require('discord.js');
const config = require("./config.json");

module.exports = {
  printAsbstats: function(name, worksheet, pokemonList){
    name = name.replace(/\s+/g, '');
    if(pokemonList.has(name)){

      //get the row of the pokemon
      var row = pokemonList.get(name);

      //begin collecting the information
      var messageContent = worksheet['B'+row].v + " - " + worksheet['C'+row].v + " | " + worksheet['D'+row].v;

      //if the pokemon has hidden ability, print it
      if(worksheet['E'+row] != undefined){
        messageContent += "/" + worksheet['E'+row].v;
      }
      //finish collecting information
      messageContent+= " | " + worksheet['F'+row].v + "/" + worksheet['G'+row].v + "/"
      + worksheet['H'+row].v+ "/" + worksheet['I'+row].v+ "/" + worksheet['J'+row].v+ "/" + worksheet['K'+row].v+ "/" + worksheet['L'+row].v
      + " | Size: " + worksheet['M'+row].v + " | Weight: " + worksheet['N'+row].v + " | +Spe nat. Acc Boost: " + worksheet['O'+row].v+ "% ";

      //print addional information for non megas
      if(worksheet['Q' + row] != undefined){
        messageContent += " | CC cost: "+ worksheet['Q'+row].v + " | CHP: " + worksheet['R'+row].v + " | Sig. Item(s): " + worksheet['S'+row].v + " | Boosted Stats: " + worksheet['T'+row].v;
      }


    }else{
      messageContent = "That's not a pokemon! Did you make a typo?";
    }

    return messageContent;
  },

  printNatures: function(nature, worksheet, natureList){
    nature = nature.replace(/\s+/g, '');
    if(natureList.has(nature)){
      var row = natureList.get(nature);
      var messageContent = worksheet['A'+row].v + " - " + worksheet['B'+row].v + " | Moody: " + worksheet['C'+row].v;
    }else{
      messageContent = "That's not a nature! Did you make a typo?";
    }

    return messageContent;
  },

  printAbilities: function(ability, worksheet, abilityList){
    ability = ability.replace(/\s+/g, '');
    if(abilityList.has(ability)){
      var row = abilityList.get(ability);
      var messageContent = worksheet['A'+row].v + " - Type: " + worksheet['B'+row].v + " | Description: " + worksheet['C'+row].v + " | Mold Breaker: " + worksheet['D'+row].v;
    }else{
      messageContent = "That's not an ability! Did you make a typo?";
    }

    return messageContent;
  },

  printItem: function(item, heldWorksheet, heldList, TLRworksheet, TLRlist,  keyWorksheet, keyList, consumableWorksheet, consumableList){
    item = item.replace(/\s+/g, '');

    if(heldList.has(item)){

      var row = heldList.get(item);
      var messageContent = heldWorksheet['A'+row].v + " - Item Cost: " + heldWorksheet['C' + row].v + " | Effect: " + heldWorksheet['D' + row].v;

    }else if(TLRlist.has(item)){

      var row = TLRlist.get(item);
      var messageContent = TLRworksheet['A'+row].v + " - Item Cost: " + TLRworksheet['C' + row].v + " | Effect: " + TLRworksheet['D' + row].v + " | Trigger: " + TLRworksheet['G' + row].v;

    }else if(keyList.has(item)){

      var row = keyList.get(item);
      var messageContent = keyWorksheet['A'+row].v + " - Item Type: " + keyWorksheet['B' + row].v + " | Item Cost: " + keyWorksheet['C' + row].v
      + " | Effect: " + keyWorksheet['D' + row].v + " | Affected Pokemon: " + keyWorksheet['E' + row].v;

    }else if(consumableList.has(item)){

      var row = consumableList.get(item);
      var messageContent = consumableWorksheet['A'+row].v + " - Item Type: " + consumableWorksheet['B'+row].v + " | Item Cost: " + consumableWorksheet['C'+row].v
      + " | Effect: " + consumableWorksheet['D'+row].v + " | Affected Pokemon: " + consumableWorksheet['E'+row].v + " | Activations: " + consumableWorksheet['F'+row].v
      + " | Trigger " + consumableWorksheet['G'+row].v + " | Natural Gift Type: " + consumableWorksheet['H'+row].v + " | Natural Gift BAP: " + consumableWorksheet['I'+row].v;

    }else{

      messageContent = "That's not an item! Did you make a typo?";

    }

    return messageContent;
  },

  printMoves: function(move, worksheet, moveList){
    move = move.replace(/\s+/g, '');

    if(moveList.has(move)){

      var rows = moveList.get(move);
      //format the name nicely
      var name = worksheet['A'+rows[0]].v;
      name = name.replace(" (Move)","");
      name = name.replace(" (Command)","");

      var messageContent = name + " - Type: " + worksheet['B' + rows[0]].v + " | Category: " + worksheet['C' + rows[0]].v
      + " | Target: " + worksheet['D' + rows[0]].v;

      if(worksheet['G' + rows[0]].v != '-'){
        messageContent+= " | BAP: " + worksheet['G' + rows[0]].v;
      }

      messageContent += " | Acc: " + worksheet['I' + rows[0]].v + " | Energy Cost: " + worksheet['J' + rows[0]].v;

      if(worksheet['K' + rows[0]].v != '-'){
        messageContent += " | Effect Chance: " + worksheet['K' + rows[0]].v;
      }

      messageContent += " | Contact: " + worksheet['L' + rows[0]].v + " | Priority: " + worksheet['M' + rows[0]].v
      + " | Combo Type: " + worksheet['N' + rows[0]].v + " | Snatch: " + worksheet['O' + rows[0]].v + " | Magic Coat/Bounce: " + worksheet['P' + rows[0]].v + " \nDescription: ";

      var counter = rows[0] + 1;
      while(counter <= rows[1] ){
        messageContent += " " + worksheet['B' + counter].v;
        counter++;
      }

    }else{
      messageContent = "That's not a move or a command! Did you make a typo?";
    }

    return messageContent;
  },

  rand: function(low,high,next){
    var messageContent;
    if(low == undefined){
      messageContent = Math.floor((Math.random() * 10000) + 1);
    }else if(low != undefined && high !=undefined && next == undefined){
      messageContent = Math.floor((Math.random() * high) + low);
    }else{
      messageContent = "Invalid parameters try again.";
    }

    return messageContent;
  },

  printExpression: function(expression){
    var messageContent = expression + " = " + eval(expression);
    return messageContent;
  },

  printHelp: function(){
    var messageContent = "Made by Skyler Reimer. https://github.com/skylerreimer/ASBot2.0-\n";
    messageContent += "To add this bot to your server: http://bit.ly/2l0H4EB\n";
    messageContent += "Please message me @comic67 or make an issue on the bot's github if you find a bug\n";
    messageContent += "\n"
    messageContent += "Command List:\n";
    messageContent += "%asbstats pokemon name\n";
    messageContent += "%asbility ability nane\n";
    messageContent += "%asbitem item name\n";
    messageContent += "%asbnature nature name\n";
    messageContent += "%asbmove move name\n";
    messageContent += "%calc expression\n";
    messageContent += "%roll lowestNum highestNum (no arguments defaults to 1 to 10000)\n";
    messageContent += "%help\n";

    return messageContent;
  }



};
