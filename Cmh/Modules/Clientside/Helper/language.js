/*	In order to make the helloWorld() function available client-side, you have to add a reference to the 'language' module in the GUI Designer.
	The helloWorld() function can be executed from your JS file as follows:
	alert(language.helloWorld());
	
	For more information, refer to http://doc.wakanda.org/Wakanda0.Beta/help/Title/en/page1516.html
*/


// ##### Set and return current user language #####

exports.setUserLanguage = function setSessionLanguage (userLanguage, browserLanguage) {
	// Identify language
	if (!userLanguage)
		userLanguage = browserLanguage;
		
	// Default value in case the browser language is empty
	if (!userLanguage)
		userLanguage = "de";
	
	// Store language in user storage
	var myUser = currentUser();
	var userStorage = myUser.storage;
	userStorage["language"] = userLanguage.substr(0,2);
	return userStorage["language"];
};


// ##### Return current user language #####

exports.getUserLanguage = function getSessionLanguage () {
	var myUser = currentUser();
	var userStorage = myUser.storage;
	return userStorage["language"];
};

