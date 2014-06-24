// ##### REMOVE All GAMES #####

ds.Game.remove();


// ##### CREATE A NEW TESTGAME AS GAMEADMIN #####

var newGame = new ds.Game();
newGame.name = 'Testspiel ' + newGame.ID;
newGame.period = 1;
var user = ds.User.find("userName == :1", "gameadmin");
newGame.createdBy = user.ID;
newGame.modifiedBy = user.ID;
newGame.viewedBy = user.ID;
newGame.mainGameHost = user.ID;
newGame.save();


// ##### CREATE A NEW TESTGAME AS GAMEHOST #####

var newGame = new ds.Game();
newGame.name = 'Testspiel ' + newGame.ID;
newGame.period = 1;
var user = ds.User.find("userName == :1", "gamehost");
newGame.createdBy = user.ID;
newGame.modifiedBy = user.ID;
newGame.viewedBy = user.ID;
newGame.mainGameHost = user.ID;
newGame.save();


// ##### SHOW ALL GAMES #####

ds.Game.all();


