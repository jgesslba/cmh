// ##### CONFIG COUNTRY CLASS #####

var countries = ds.Country.all(); // Query country class

if (countries.length === 0) { // If there are no entities, create the default countries

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
