const Discord = require('discord.js');
const config = require("./config.json");

module.exports = {
  printAsbstats: function(name, worksheet, pokemonList){

    if(pokemonList.has(name)){

      //get the row of the pokemon
      var row = pokemonList.get(name);

      //begin collecting the information
      var messageContent = name.charAt(0).toUpperCase() + name.slice(1) + " - " + worksheet['C'+row].v + " | " + worksheet['D'+row].v;

      //if the pokemon has hidden ability, print it
      if(worksheet['E'+row].v != 'x'){
        messageContent += "/" + worksheet['E'+row].v;
      }
      //finish collecting information
      messageContent+= " | " + worksheet['F'+row].v + "/" + worksheet['G'+row].v + "/"
      + worksheet['H'+row].v+ "/" + worksheet['I'+row].v+ "/" + worksheet['J'+row].v+ "/" + worksheet['K'+row].v+ "/" + worksheet['L'+row].v
      + " | Size: " + worksheet['M'+row].v + " | Weight: " + worksheet['N'+row].v + " | +Spe nat. Acc Boost: " + worksheet['O'+row].v + "% | CC cost: "
      + worksheet['Q'+row].v + " | CHP: " + worksheet['R'+row].v + " | Sig. Item(s): " + worksheet['S'+row].v + " | Boosted Stats: " + worksheet['T'+row].v;


    }else{
      messageContent = "That's not a pokemon! Did you make a typo?";
    }

    return messageContent;
  },

  printNatures: function(nature, worksheet, natureList){

    if(natureList.has(nature)){
      var row = natureList.get(nature);
      var messageContent = nature.charAt(0).toUpperCase() + nature.slice(1) + " - " + worksheet['B'+row].v + " | Moody: " + worksheet['C'+row].v;
    }else{
      messageContent = "That's not a nature! Did you make a typo?";
    }

    return messageContent;
  },

  printAbilities: function(ability, worksheet, abilityList){

    if(abilityList.has(ability)){
      var row = abilityList.get(ability);
      var messageContent = ability.charAt(0).toUpperCase() + ability.slice(1) + " - Type: " + worksheet['B'+row].v + " | Description: " + worksheet['C'+row].v + " | Mold Breaker: " + worksheet['D'+row].v;
    }else{
      messageContent = "That's not an ability! Did you make a typo?";
    }

    return messageContent;
  },

  printHeldItem: function(item, worksheet, itemList){

    if(itemList.has(item)){
      var row = itemList.get(item);
      var messageContent = item.charAt(0).toUpperCase() + item.slice(1) + " - Item Cost: " + worksheet['C' + row].v + " | Effect: " + worksheet['D' + row].v;
    }else{
      messageContent = "That's not a held item! Did you make a typo?";
    }

    return messageContent;
  },

  printTLRItem: function(item, worksheet, itemList){

    if(itemList.has(item)){
      var row = itemList.get(item);
      var messageContent = item.charAt(0).toUpperCase() + item.slice(1) + " - Item Cost: " + worksheet['C' + row].v + " | Effect: " + worksheet['D' + row].v + " | Trigger: " + worksheet['G' + row].v;
    }else{
      messageContent = "That's not a TLR item! Did you make a typo?";
    }

    return messageContent;
  },

  printMoves: function(move, worksheet, moveList){

    console.log('looking for '+ move);
    if(moveList.has(move)){
      console.log('found '+ move);
      var rows = moveList.get(move);
      var messageContent = move.charAt(0).toUpperCase() + move.slice(1) + " - Type: " + worksheet['B' + rows[0]].v + " | Category: " + worksheet['C' + rows[0]].v
      + " | Target: " + worksheet['D' + rows[0]].v;

      if(worksheet['G' + rows[0]].v != '-'){
        messageContent+= " | BAP: " + worksheet['G' + rows[0]].v;
      }

      messageContent += " | Acc: " + worksheet['I' + rows[0]].v + " | Energy Cost: " + worksheet['J' + rows[0]].v;

      if(worksheet['K' + rows[0]].v != '-'){
        messageContent += " | Effect Chance: " + worksheet['K' + rows[0]].v;
      }

      messageContent += " | Contact: " + worksheet['L' + rows[0]].v + " | Priority: " + worksheet['M' + rows[0]].v
      + " | Combo Type: " + worksheet['N' + rows[0]].v + " | Snatch: " + worksheet['O' + rows[0]].v + " | Magic Coat/Bounce: " + worksheet['P' + rows[0]].v + " | Description: ";

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
    if(low != undefined && high !=undefined && next == undefined){
      messageContent = Math.floor((Math.random() * high) + low);
    }else{
      messageContent = "Invalid parameters try again.";
    }

    return messageContent;
  }



};
