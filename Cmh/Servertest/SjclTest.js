// ##### INCLUDE FILE WITH HASH ALGORITHM #####

require('Serverside/Helper/security').includeStanfordEncryptionLibrary();


// ##### TEST DIFFERENT SECURITY SCENARIOS #####


// @region ENCRYPTION

// ***** Encryption with standard parameter *****
// iv = new random IV for every message; iter = 1000; ks = 128; ts = 64; mode = "ccm", rp = ;
var defaultAesEncryption = sjcl.encrypt("wakcmh", "Das ist die geheime Nachricht");

// ***** AES Encryption with advanced parameters *****
// iv = Initial vector (static oder new random IV for ebery message; iter = Iterationen; ks = Key size (128, 192, 256); ts = Authentication strength (64, 96, 128); mode = Cipher mode ("ccm", "ocb2");
var parameter = {iter: 2000, ks: 256, mode: "ocb2", ts: 128};
var returnedObject = {};
var advancedAesEncryption = sjcl.encrypt("wakcmh", "Das ist die geheime Nachricht", parameter, returnedObject);

// Select default or advanced encryption as example
var encryptedData = defaultAesEncryption;
//var encryptedData = advancedAesEncryption;

//var test = defaultAesEncryption.ct.toString();

// Convert json object in Javascript object with JSON.parse function
var jsObject = JSON.parse(encryptedData);

// ciphertext is the value of the "ct" attribute of this object 
var ciphertext = jsObject.ct;

// @endregion 


// @region DECRYPTION

// ****** AES Decryption with default parameters *****
var defaultAesDecryption = sjcl.decrypt("wakcmh", encryptedData);

// ***** AES Decryption with advanced parameters *****
var advancedAesDecryption = sjcl.decrypt("wakcmh", encryptedData, {}, returnedObject);

// Select default or advanced decryption as example
//var decryptedData = defaultAesDecryption;
var decryptedData = advancedAesDecryption;

// show ciphertext or decrypted data = must be the same as the origin message
//ciphertext;
decryptedData;

// @endregion