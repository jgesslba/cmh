
(function Component (id) {// @lock

// Add the code that needs to be shared between components here

function constructor (id) {

	// @region beginComponentDeclaration// @startlock
	var $comp = this;
	this.name = 'gamerSurgeryHome';
	// @endregion// @endlock

	// @region Translation
	var translateWidgets = function () {
		// Get translated values
		$comp.sourcesVar.objTranslation.richTextWelcome = translate($comp.name, "richTextWelcome");
		
		// Sync datasources
		$comp.sources.objTranslation.sync();
	};
	
	WAF.addListener("iconAustria", "click", function(event) {
		// Translate component widgets on component load
		language.getUserLanguageAsync({
        	'onSuccess': function (result) {
				translateWidgets(); // Call the translation function for this page
        	},  
        	'onError': function (error) {
         		console.log(error);
           	}
        });
  	});
  	
  	WAF.addListener("iconGreatBritain", "click", function(event) {
		// Translate component widgets on component load
		language.getUserLanguageAsync({
        	'onSuccess': function (result) {
				translateWidgets(); // Call the translation function for this page
        	},  
        	'onError': function (error) {
         		console.log(error);
           	}
        });
  	});
 	// @endregion
 	
	this.load = function (data) {// @lock

	// Translate component widgets on component load
		language.getUserLanguageAsync({
        	'onSuccess': function (result) {
				translateWidgets(); // Call the translation function for this page
        	},  
        	'onError': function (error) {
         		console.log(error);
           	}
        });
	
	// @region namespaceDeclaration// @startlock
	// @endregion// @endlock

	// eventHandlers// @lock

	// @region eventManager// @startlock
	// @endregion// @endlock

	};// @lock


}// @startlock
return constructor;
})();// @endlock
