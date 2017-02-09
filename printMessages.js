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
  }



};
