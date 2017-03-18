const Discord = require('discord.js');
const config = require("./config.json");
var google = require('googleapis');
var googleAuth = require('google-auth-library');
var fs = require('fs');

// If modifying these scopes, delete your previously saved credentials
// at ~/.credentials/drive-nodejs-quickstart.json
var SCOPES = ['https://www.googleapis.com/auth/drive'];
var TOKEN_DIR = (process.env.HOME || process.env.HOMEPATH ||
    process.env.USERPROFILE) + '/.credentials/';
var TOKEN_PATH = TOKEN_DIR + 'drive-nodejs-quickstart.json';

module.exports = {
  getPokemonList: function(worksheet){
    //add the pokemon to the map with their row number
    var pokemonList = new Map();
    var i = 2;
    while(worksheet['A'+i].v != "HOUSE" ){

      var pokemonName = worksheet['B'+i].v.toLowerCase();
      pokemonName = pokemonName.replace(/\W/g, '');

      //dealing with mega and primal pokemon
      if(worksheet['A'+i].v == "Mega" || worksheet['A'+i].v == "Primal"){
        pokemonName = worksheet['A'+i].v.toLowerCase() + pokemonName;
      }

      pokemonList.set(pokemonName,i);
      i++;

    }

    return pokemonList;
  },

  getNatureList: function(worksheet){
    //someone decided to put spaces between groups of natures. if statement ignores those
    var natureList = new Map();
    for(i = 3; i <= config.numNatures; i++){
      if(worksheet['A'+i] != undefined){
        var cell = 'A'+i;
        var natureCell = worksheet[cell];
        var natureName = natureCell.v.toLowerCase();
        natureName = natureName.replace(/\W/g, '');
        natureList.set(natureName,i);
      }
    }
    return natureList;
  },

  getAbilityList: function(worksheet){
    //add of the abilities to the map with their row number
    var abilityList = new Map();
    var i = 2;
    while(worksheet['A'+ i] != undefined){
      var cell = 'A'+i;
      var abilityCell = worksheet[cell];
      var abilityName = abilityCell.v.toLowerCase();
      abilityName = abilityName.replace(/\W/g, '');
      abilityList.set(abilityName,i);
      i++;
    }

    return abilityList;
  },

  getHeldItemList: function(worksheet){
    var itemHeldList = new Map();

    for(i = 2; i < config.numHeldItems; i++){
      if(worksheet['A'+i] != undefined && worksheet['B'+i] != undefined){
        var itemName = worksheet['A'+i].v.toLowerCase();
        itemName = itemName.replace(/\W/g, '');
        itemHeldList.set(itemName,i);
      }
    }
    return itemHeldList;
  },

  getTlrItemList: function(worksheet){
    var itemTLRList = new Map();
    var i = 2;
    while(worksheet['A'+i] != undefined){
      var itemName = worksheet['A'+i].v.toLowerCase();
      itemName = itemName.replace(/\W/g, '');
      itemTLRList.set(itemName,i);
      i++;
    }
    return itemTLRList;
  },

  getKeyItemList: function(worksheet){
    var keyItemList = new Map();

    for(i = 2; i <= config.numKeyItems; i++){
      if(worksheet['A'+i] != undefined && worksheet['B'+i] != undefined){
        var itemName = worksheet['A'+i].v.toLowerCase();
        itemName = itemName.replace(/\W/g, '');
        keyItemList.set(itemName,i);
      }
    }
    return keyItemList;
  },

  getConsumableList: function(worksheet){
    var consumableList = new Map();

    var i = 2;
    while(worksheet['A'+i] != undefined){
      var itemName = worksheet['A'+i].v.toLowerCase();
      itemName = itemName.replace(/\W/g, '');
      consumableList.set(itemName,i);
      i++;
    }
    return consumableList;
  },

  getTypeList: function(worksheet){
    var typeList = new Map();

    var i = 1;
    while(worksheet['A'+i] != undefined){
      var typeName = worksheet['A'+i].v.toLowerCase();
      typeName.replace(/\W/g, '');
      typeList.set(typeName,i);
      i++;
    }
    return typeList;
  },

  getMoveList: function(worksheet){
    var moveList = new Map();

    //loop through all rows in the move worksheet
    var i = 2;
    var start = i;
    var end = 0;

    for(i = 2; i <= config.numMoves; i++){
      if(worksheet['A' + i] != undefined){
        end = i - 1;
        var arr = [0,0];
        arr[0] = start;
        arr[1] = end;

        var name = worksheet['A'+start].v.toLowerCase();
        name = name.replace(" (move)","");
        name = name.replace(" (command)","");
        name = name.replace(/\W/g, '');

        if(!name.includes("(users)") && name != "-"){
          moveList.set(name , arr);
        }

        start = i;
      }

    }
    return moveList;
  },
  /**
   * Create an OAuth2 client with the given credentials, and then execute the
   * given callback function.
   *
   * @param {Object} credentials The authorization client credentials.
   * @param {function} callback The callback to call with the authorized client.
   */
  authorize: function(credentials, callback){
    var clientSecret = credentials.installed.client_secret;
    var clientId = credentials.installed.client_id;
    var redirectUrl = credentials.installed.redirect_uris[0];
    var auth = new googleAuth();
    var oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl);

    // Check if we have previously stored a token.
    fs.readFile(TOKEN_PATH, function(err, token) {
      if (err) {
        getNewToken(oauth2Client, callback);
      } else {
        oauth2Client.credentials = JSON.parse(token);
        callback(oauth2Client);
      }
    });
  },

  getNewToken: function(oauth2Client, callback){
    var authUrl = oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: SCOPES
    });
    console.log('Authorize this app by visiting this url: ', authUrl);
    var rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    rl.question('Enter the code from that page here: ', function(code) {
      rl.close();
      oauth2Client.getToken(code, function(err, token) {
        if (err) {
          console.log('Error while trying to retrieve access token', err);
          return;
        }
        oauth2Client.credentials = token;
        storeToken(token);
        callback(oauth2Client);
      });
    });
  },

  storeToken: function(token){
    try {
      fs.mkdirSync(TOKEN_DIR);
    } catch (err) {
      if (err.code != 'EEXIST') {
        throw err;
      }
    }
    fs.writeFile(TOKEN_PATH, JSON.stringify(token));
    console.log('Token stored to ' + TOKEN_PATH);
  },

  downloadFile: function(auth){
    var service = google.drive('v3');
    var fileId = '1RlsjFgpQGSZPGtwaUL33g0zHN888-iveQPKSVgFII-M';
    var dest = fs.createWriteStream('./test.xlsx');
    service.files.export({
      auth: auth,
      fileId: fileId,
      mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    })
    .on('end', function() {
    console.log('Done');
    })
    .on('error', function(err) {
    console.log('Error during download', err);
    })
    .pipe(dest);
  }
};
