// @region GROUP MANAGEMENT

// ##### GET OR CREATE ORGANIZATIONAL GROUPS IN THE DIRECTORY #####

var Gamehost = directory.group("Gamehost");
if (Gamehost === null) {
	var Gamehost = directory.addGroup("Gamehost" , "Gamehost group");
	directory.save(); // save the organizational groups in the directory
}
		
var Gameadmin = directory.group("Gameadmin"); // creates the group object
if (Gameadmin === null) {
	var Gameadmin = directory.addGroup("Gameadmin" , "Gameadmin group");
	directory.save(); // save the organizational groups in the directory
}

var Gamer = directory.group("Gamer"); // creates the group object
if (Gamer === null) {
	var Gamer = directory.addGroup("Gamer" , "Gamer group");
	directory.save(); // save the organizational groups in the directory
}
	

// ##### GET OR CREATE FUNCTIONAL GROUPS IN THE DIRECTORY #####

var Game_Read = directory.group("Game_Read"); // creates the group object
if (Game_Read === null) {
	var Game_Read = directory.addGroup("Game_Read", "Game_Read group");
	directory.save(); // save the organizational groups in the directory
}



// ##### PUT THE ORGANIZATIONAL GROUPS INTO THE FUNCTIONAL GROUPS IN ORDER TO SET PERMISSIONS #####


// USER CLASS

Gameadmin.putInto(User_Read); // put the organizational Gameadmin group into the functional User_Read group
Gameadmin.putInto(User_Create); // put the organizational Gameadmin group into the functional User_Create group
Gameadmin.putInto(User_Update); // put the organizational Gameadmin group into the functional User_Update group
Gameadmin.putInto(User_Remove); // put the organizational Gameadmin group into the functional User_Remove group
Gameadmin.putInto(User_Describe); // put the organizational Gameadmin group into the functional User_Describe group
Gameadmin.putInto(User_Execute); // put the organizational Gameadmin group into the functional User_Execute group
Gameadmin.putInto(User_Promote); // put the organizational Gameadmin group into the functional User_Promote group

Gamehost.putInto(User_Read); // put the organizational Gameadmin group into the functional User_Read group
Gamehost.putInto(User_Create); // put the organizational Gameadmin group into the functional User_Create group
Gamehost.putInto(User_Update); // put the organizational Gameadmin group into the functional User_Update group
Gamehost.putInto(User_Remove); // put the organizational Gameadmin group into the functional User_Remove group
Gamehost.putInto(User_Describe); // put the organizational Gameadmin group into the functional User_Describe group
Gamehost.putInto(User_Execute); // put the organizational Gameadmin group into the functional User_Execute group
Gamehost.putInto(User_Promote); // put the organizational Gameadmin group into the functional User_Promote group


// GAME CLASS

Gamehost.putInto(Game_Read); // put the organizational Gamehost group into the functional Game_Read group 
Gameadmin.putInto(Game_Read); // put the organizational Gameadmin group into the functional Game_Read group




// @endregion