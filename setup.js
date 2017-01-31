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
  }
};
