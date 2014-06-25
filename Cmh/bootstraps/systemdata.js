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
