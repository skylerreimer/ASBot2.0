const Discord = require('discord.js');
const config = require("./config.json");

module.exports = {
  getPokemonList: function(worksheet){
    //add the pokemon to the map with their row number
    var pokemonList = new Map();
    for(i = 2; i<= config.numPokemon; i++){
      var cell = 'B'+i;
      var pokemonCell = worksheet[cell];
      var pokemonName = pokemonCell.v.toLowerCase();
      pokemonList.set(pokemonName,i);
    }

    return pokemonList;
  },

  getNatureList: function(worksheet){
    //add the natures to the map with their row number
    var natureList = new Map();
    for(i = 3; i <= config.numNatures; i++){
      var cell = 'A'+i;
      var natureCell = worksheet[cell];
      var natureName = natureCell.v.toLowerCase();
      natureList.set(natureName,i);
    }

    return natureList;
  },

  getAbilityList: function(worksheet){
    //add of the abilities to the map with their row number
    var abilityList = new Map();
    for(i = 2; i<=config.numAbilities; i++){
      var cell = 'A'+i;
      var abilityCell = worksheet[cell];
      var abilityName = abilityCell.v.toLowerCase();
      abilityList.set(abilityName,i);
    }

    return abilityList;
  }

};
