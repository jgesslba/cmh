// #### LOGIN LISTENER FUNCTION #####

function Login(userName, password, passwordIsKey) {
	// Find the user in the directory or in the project user store and check login credentials
	var theDirectoryUser = directory.internalStore.User({name: userName}); // Query the user from the directory
	// Check if the user is part of the internal user directory
	if (theDirectoryUser != null) { // theDirectoryUser exists in the directory
		return false; // Allow directory authentication
	} else { // theDirectoryUser does not exist in the directory. So use data from the project for login
		result = {error: 1024, errorMessage: 'Invalid login'}; // The result is set to the wakanda default error dialog and a custom error message by default
		var theProjectUser = ds.User({userName: userName}); // The user from the project with the given userName is queried
		
		// Get CryptoJS SHA512 library
		require('Serverside/Helper/security').includeCryptoJSsha512();
	
		// Check if the user exists and the given password is correct
		if (theProjectUser != null) { // theProjectUser exists in the project user store 
			// See if the stored hash value is correct
			var hashValue = '';
			if (passwordIsKey) { // The passwordIsKey is true and therefore a passwordIsKey should be used				
				hashValue = CryptoJS.SHA512(theProjectUser.ID + password).toString();
				
			} else { // The passwordIsKey is false and therefore no passwordIsKey should be used. The HA1 hash of the directory for userName and password is used.
				hashValue = directory.computeHA1(userName, password);
			}
					
			if (theProjectUser.password === hashValue) {
				var theGroups = [theProjectUser.role];
				var putIntoStorage = {userID: theProjectUser.ID, fullName: theProjectUser.fullName};
				result = {
					ID: theProjectUser.ID,
					name: theProjectUser.userName,
					fullName: theProjectUser.fullName,
					belongsTo: theGroups,
					storage: putIntoStorage
				}
			}
		}
		return result; // Either an error or an custom user object is returned
	}
};

