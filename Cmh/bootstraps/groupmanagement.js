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


// MODEL

var Model_Read = directory.group("Model_Read"); // creates the group object
if (Model_Read === null) {
	var Model_Read = directory.addGroup("Model_Read", "Model_Read group");
	directory.save(); // save the organizational groups in the directory
}

var Model_Create = directory.group("Model_Create"); // creates the group object
if (Model_Create === null) {
	var Model_Create = directory.addGroup("Model_Create", "Model_Create group");
	directory.save(); // save the organizational groups in the directory
}

var Model_Update = directory.group("Model_Update"); // creates the group object
if (Model_Update === null) {
	var Model_Update = directory.addGroup("Model_Update", "Model_Update group");
	directory.save(); // save the organizational groups in the directory
}

var Model_Remove = directory.group("Model_Remove"); // creates the group object
if (Model_Remove === null) {
	var Model_Remove = directory.addGroup("Model_Remove", "Model_Remove group");
	directory.save(); // save the organizational groups in the directory
}

var Model_Describe = directory.group("Model_Describe"); // creates the group object
if (Model_Describe === null) {
	var Model_Describe = directory.addGroup("Model_Describe", "Model_Describe group");
	directory.save(); // save the organizational groups in the directory
}

var Model_Execute = directory.group("Model_Execute"); // creates the group object
if (Model_Execute === null) {
	var Model_Execute = directory.addGroup("Model_Execute", "Model_Execute group");
	directory.save(); // save the organizational groups in the directory
}

var Model_Promote = directory.group("Model_Promote"); // creates the group object
if (Model_Promote === null) {
	var Model_Promote = directory.addGroup("Model_Promote", "Model_Promote group");
	directory.save(); // save the organizational groups in the directory
}


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


// GAME CLASS

var Game_Read = directory.group("Game_Read"); // creates the group object
if (Game_Read === null) {
	var Game_Read = directory.addGroup("Game_Read", "Game_Read group");
	directory.save(); // save the organizational groups in the directory
}



// ##### PUT THE ORGANIZATIONAL GROUPS INTO THE FUNCTIONAL GROUPS IN ORDER TO SET PERMISSIONS #####


// MODEL

Admin.putInto(Model_Read); // put the organizational Admin group into the functional Model_Read group
Admin.putInto(Model_Create); // put the organizational Admin group into the functional Model_Create group
Admin.putInto(Model_Update); // put the organizational Admin group into the functional Model_Update group
Admin.putInto(Model_Remove); // put the organizational Admin group into the functional Model_Remove group
Admin.putInto(Model_Describe); // put the organizational Admin group into the functional Model_Describe group
Admin.putInto(Model_Execute); // put the organizational Admin group into the functional Model_Execute group
Admin.putInto(Model_Promote); // put the organizational Admin group into the functional Model_Promote group


// USER CLASS

Admin.putInto(User_Read); // put the organizational Admin group into the functional User_Read group
Admin.putInto(User_Create); // put the organizational Admin group into the functional User_Create group
Admin.putInto(User_Update); // put the organizational Admin group into the functional User_Update group
Admin.putInto(User_Remove); // put the organizational Admin group into the functional User_Remove group
Admin.putInto(User_Describe); // put the organizational Admin group into the functional User_Describe group
Admin.putInto(User_Execute); // put the organizational Admin group into the functional User_Execute group
Admin.putInto(User_Promote); // put the organizational Admin group into the functional User_Promote group

Internal.putInto(User_Read); // put the organizational Internal group into the functional User_Read group
Internal.putInto(User_Create); // put the organizational Internal group into the functional User_Create group
Internal.putInto(User_Update); // put the organizational Internal group into the functional User_Update group
Internal.putInto(User_Remove); // put the organizational Internal group into the functional User_Remove group
Internal.putInto(User_Describe); // put the organizational Internal group into the functional User_Describe group
Internal.putInto(User_Execute); // put the organizational Internal group into the functional User_Execute group
Internal.putInto(User_Promote); // put the organizational Internal group into the functional User_Promote group

Gameadmin.putInto(User_Read); // put the organizational Gameadmin group into the functional User_Read group
Gameadmin.putInto(User_Create); // put the organizational Gameadmin group into the functional User_Create group
Gameadmin.putInto(User_Update); // put the organizational Gameadmin group into the functional User_Update group
Gameadmin.putInto(User_Remove); // put the organizational Gameadmin group into the functional User_Remove group
Gameadmin.putInto(User_Describe); // put the organizational Gameadmin group into the functional User_Describe group
Gameadmin.putInto(User_Execute); // put the organizational Gameadmin group into the functional User_Execute group
Gameadmin.putInto(User_Promote); // put the organizational Gameadmin group into the functional User_Promote group

Gamehost.putInto(User_Read); // put the organizational Gamehost group into the functional User_Read group
Gamehost.putInto(User_Create); // put the organizational Gamehost group into the functional User_Create group
Gamehost.putInto(User_Update); // put the organizational Gamehost group into the functional User_Update group
Gamehost.putInto(User_Remove); // put the organizational Gamehost group into the functional User_Remove group
Gamehost.putInto(User_Describe); // put the organizational Gamehost group into the functional User_Describe group
Gamehost.putInto(User_Execute); // put the organizational Gamehost group into the functional User_Execute group
Gamehost.putInto(User_Promote); // put the organizational Gamehost group into the functional User_Promote group


// GAME CLASS

Gamehost.putInto(Game_Read); // put the organizational Gamehost group into the functional Game_Read group 
Gameadmin.putInto(Game_Read); // put the organizational Gameadmin group into the functional Game_Read group




// @endregion