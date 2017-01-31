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

  getCommandList: function(){
    var set = new Set();

    set.add("asbstats");
    set.add("asbility");
    set.add("asbKitem");
    set.add("asbHitem");
    set.add("asbTitem");
    set.add("asbnature");
    set.add("calc");
    set.add("asbMove");
    set.add("random");

    return set;
  }

};
