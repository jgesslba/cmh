// @region GROUP MANAGEMENT

// ##### GET OR CREATE ORGANIZATIONAL GROUPS IN THE DIRECTORY #####

var Admin = directory.group("Admin"); // creates the group object
if (Admin === null) {
	var Admin = directory.addGroup("Admin" , "Admin group");
	directory.save(); // save the organizational groups in the directory
}

var Internal = directory.group("Internal"); // creates the group object
if (Internal === null) {
	var Internal = directory.addGroup("Internal" , "Internal group");
	directory.save(); // save the organizational groups in the directory
}

var Gameadmin = directory.group("Gameadmin"); // creates the group object
if (Gameadmin === null) {
	var Gameadmin = directory.addGroup("Gameadmin" , "Gameadmin group");
	directory.save(); // save the organizational groups in the directory
}

var Gamehost = directory.group("Gamehost");
if (Gamehost === null) {
	var Gamehost = directory.addGroup("Gamehost" , "Gamehost group");
	directory.save(); // save the organizational groups in the directory
}

var Gamer = directory.group("Gamer"); // creates the group object
if (Gamer === null) {
	var Gamer = directory.addGroup("Gamer" , "Gamer group");
	directory.save(); // save the organizational groups in the directory
}
	

// ##### GET OR CREATE FUNCTIONAL GROUPS IN THE DIRECTORY #####

// USER CLASS

var User_Read = directory.group("User_Read"); // creates the group object
if (User_Read === null) {
	var User_Read = directory.addGroup("User_Read", "User_Read group");
	directory.save(); // save the organizational groups in the directory
}

var User_Create = directory.group("User_Create"); // creates the group object
if (User_Create === null) {
	var User_Create = directory.addGroup("User_Create", "User_Create group");
	directory.save(); // save the organizational groups in the directory
}

var User_Update = directory.group("User_Update"); // creates the group object
if (User_Update === null) {
	var User_Update = directory.addGroup("User_Update", "User_Update group");
	directory.save(); // save the organizational groups in the directory
}

var User_Remove = directory.group("User_Remove"); // creates the group object
if (User_Remove === null) {
	var User_Remove = directory.addGroup("User_Remove", "User_Remove group");
	directory.save(); // save the organizational groups in the directory
}

var User_Describe = directory.group("User_Describe"); // creates the group object
if (User_Describe === null) {
	var User_Describe = directory.addGroup("User_Describe", "User_Describe group");
	directory.save(); // save the organizational groups in the directory
}

var User_Execute = directory.group("User_Execute"); // creates the group object
if (User_Execute === null) {
	var User_Execute = directory.addGroup("User_Execute", "User_Execute group");
	directory.save(); // save the organizational groups in the directory
}

var User_Promote = directory.group("User_Promote"); // creates the group object
if (User_Promote === null) {
	var User_Promote = directory.addGroup("User_Promote", "User_Promote group");
	directory.save(); // save the organizational groups in the directory
}

var Game_Read = directory.group("Game_Read"); // creates the group object
if (Game_Read === null) {
	var Game_Read = directory.addGroup("Game_Read", "Game_Read group");
	directory.save(); // save the organizational groups in the directory
}



// ##### PUT THE ORGANIZATIONAL GROUPS INTO THE FUNCTIONAL GROUPS IN ORDER TO SET PERMISSIONS #####


// USER CLASS

Admin.putInto(User_Read); // put the organizational Gameadmin group into the functional User_Read group
Admin.putInto(User_Create); // put the organizational Gameadmin group into the functional User_Create group
Admin.putInto(User_Update); // put the organizational Gameadmin group into the functional User_Update group
Admin.putInto(User_Remove); // put the organizational Gameadmin group into the functional User_Remove group
Admin.putInto(User_Describe); // put the organizational Gameadmin group into the functional User_Describe group
Admin.putInto(User_Execute); // put the organizational Gameadmin group into the functional User_Execute group
Admin.putInto(User_Promote); // put the organizational Gameadmin group into the functional User_Promote group

Internal.putInto(User_Read); // put the organizational Gameadmin group into the functional User_Read group
Internal.putInto(User_Create); // put the organizational Gameadmin group into the functional User_Create group
Internal.putInto(User_Update); // put the organizational Gameadmin group into the functional User_Update group
Internal.putInto(User_Remove); // put the organizational Gameadmin group into the functional User_Remove group
Internal.putInto(User_Describe); // put the organizational Gameadmin group into the functional User_Describe group
Internal.putInto(User_Execute); // put the organizational Gameadmin group into the functional User_Execute group
Internal.putInto(User_Promote); // put the organizational Gameadmin group into the functional User_Promote group

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