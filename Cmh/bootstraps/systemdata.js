// ##### RESET ALL AUTOSEQUENCES FOR ALL DATACLASSES IN THE MODEL #####

// ----- Cycle through all classes in ds

for (var e in ds.dataClasses) {
	var theClass = ds.dataClasses[e]; // Get a reference to a class
	var maxID = theClass.all().max('ID'); // Find the largest value
	theClass.setAutoSequenceNumber(maxID + 1); // Reset the auto sequence
}




var countries = ds.Country.all();

if (countries.length === 0) {
	
// ##### CREATE DEFAULT COUNTRIES #####

var newCountry = new ds.Country();
newCountry.name = "Austria";
newCountry.iso = "at";
newCountry.flag = "C:/gesslbauer/Wakanda/cmh/cmh/WebFolder/images/countries/at.png" // Windows
newCountry.save();

var newCountry = new ds.Country();
newCountry.name = "United Kingdom";
newCountry.iso = "de";
newCountry.flag = "C:/gesslbauer/Wakanda/cmh/cmh/WebFolder/images/countries/gb.png" // Windows
newCountry.save();
}
