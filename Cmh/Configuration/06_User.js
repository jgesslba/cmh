// ##### DELETE ALL USERS #####

//ds.User.remove();


// ##### INCLUDE FILE WITH HASH ALGORITHM #####

//require('Serverside/Helper/security').includeStanfordEncryptionLibrary(); // Minified Stanford Javascript Crypto Library
//require('Serverside/Helper/security').includeCryptoJSmd5();
//require('Serverside/Helper/security').includeCryptoJSsha512();


// ##### CREATE DEFAULT ADMIN USER #####

//var newUser = new ds.User();
//newUser.firstName = "Jörg";
//newUser.lastName = "Gameadmin";
//newUser.email = "joerg.gesslbauer@me.com";
//newUser.userName = "gameadmin";
//newUser.role = "Gameadmin";
//newUser.photo = loadImage(ds.getModelFolder().path + "WebFolder/images/foto/joerg.JPG"); // Just necessary if you don't want to use the avatar foto
//newUser.gender = 0;
//newUser.country = ds.Country.find("iso == :1", "at");
//newUser.phone = '+4369917062429';
//var pw = CryptoJS.MD5(newUser.userName + ':Wakanda:' + 'a').toString();
//pw = CryptoJS.SHA512(newUser.ID + pw).toString();
//newUser.password = pw;
//newUser.password = "Hallo";
//newUser.save();


// ##### CREATE DEFAULT GAMEHOST USER #####

//var newUser = new ds.User();
//newUser.firstName = "Jörg";
//newUser.lastName = "Gamehost";
//newUser.email = "joerg.gesslbauer@gmail.com";
//newUser.userName = "gamehost";
//newUser.role = "Gamehost";
//newUser.photo = loadImage(ds.getModelFolder().path + "WebFolder/images/foto/joerg.JPG"); // Just necessary if you don't want to use the avatar foto
//newUser.gender = 0;
//newUser.country = ds.Country.find("iso == :1", "at");
//newUser.phone = '+4369917062429';
//var pw = CryptoJS.MD5(newUser.userName + ':Wakanda:' + 'a').toString();
//pw = CryptoJS.SHA512(newUser.ID + pw).toString();
//newUser.password = pw;
//newUser.save();


// ##### CREATE DEFAULT GAMEHOST USER #####

//var newUser = new ds.User();
//newUser.firstName = "Jörg";
//newUser.lastName = "Gamer";
//newUser.email = "joerg.gesslbauer@fhwn.ac.at";
//newUser.userName = "gamer";
//newUser.role = "Gamer";
//newUser.photo = loadImage(ds.getModelFolder().path + "WebFolder/images/foto/joerg.JPG"); // Just necessary if you don't want to use the avatar foto
//newUser.gender = 0;
//newUser.country = ds.Country.find("iso == :1", "at");
//newUser.phone = '+4369917062429';
//var pw = CryptoJS.MD5(newUser.userName + ':Wakanda:' + 'a').toString();
//pw = CryptoJS.SHA512(newUser.ID + pw).toString();
//newUser.password = pw;
//newUser.save();


// ##### SHOW ALL USER #####

//ds.User.all();
ds.User.all();
