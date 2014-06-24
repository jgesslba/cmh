// ##### INCLUDE FILE WITH HASH ALGORITHM #####

require('Serverside/Helper/security').includeStanfordEncryptionLibrary(); // Minified Stanford Javascript Crypto Library

var adminUser = ds.User.find('userName = :1', 'sysadmin');
//if (adminUser === null) {
//	var newUser = new ds.User();
//	newUser.firstName = "System";
//	newUser.lastName = "Admin";
//	newUser.email = "admin@cmh.com";
//	newUser.userName = "sysadmin";
//	newUser.role = "Admin";
//	//newUser.photo = loadImage(ds.getModelFolder().path + "WebFolder/images/foto/joerg.JPG"); // Just necessary if you don't want to use the avatar foto
//	newUser.gender = 0;
//	newUser.country = ds.Country.find("iso == :1", "at");
//	//newUser.phone = '+4369917062429';
//	var pw = sjcl.hash.sha256.hash('a');
//	pw = sjcl.hash.sha256.hash(newUser.ID + pw);
//	pw = sjcl.hash.sha256.hash(pw + 'Wakanda');
//	newUser.password = sjcl.codec.hex.fromBits(pw);
//	newUser.save();
//}

adminUser;





