/*	The helloWorld() function can be executed from any of your project's server-side JavaScript file using the require() method as follows:
	var result = require('securityHelper').helloWorld();

	For more information, refer to http://doc.wakanda.org/Wakanda Studio0.Beta/help/Title/en/page3355.html
*/


// ##### Include the Stanford Encryption Library via the path of the library file #####

exports.includeStanfordEncryptionLibrary = function () {
	// Get the os the server is running on
	var theOs = application.os;
	var path = '';
	
	// Return the filepath
	if (theOs.isMac || theOs.isLinux) {
		path = solution.getFolder('path') + '/Libraries/Security/sjcl.js'; // Mac and Linux path
	} else {
		path = solution.getFolder('path') + 'Libraries/Security/sjcl.js'; // Windows path
	};
	
	// Include the file
	include(path);
}

exports.includeCryptoJSmd5 = function () {
	// Get the os the server is running on
	var theOs = application.os;
	var path = '';
	
	// Return the filepath
	if (theOs.isMac || theOs.isLinux) {
		path = solution.getFolder('path') + '/Libraries/Security/md5.js'; // Mac and Linux path
	} else {
		path = solution.getFolder('path') + 'Libraries/Security/md5.js'; // Windows path
	};
	
	// Include the file
	include(path);
}

exports.includeCryptoJSsha512 = function () {
	// Get the os the server is running on
	var theOs = application.os;
	var path = '';
	
	// Return the filepath
	if (theOs.isMac || theOs.isLinux) {
		path = solution.getFolder('path') + '/Libraries/Security/sha512.js'; // Mac and Linux path
	} else {
		path = solution.getFolder('path') + 'Libraries/Security/sha512.js'; // Windows path
	};
	
	// Include the file
	include(path);
}
