	// @region Translation
	var translateWidgets = function () {
		// Get translated values
		$comp.sourcesVar.objTranslation.richTextWelcome = translate($comp.name, "richTextWelcome");
		
		// Sync datasources
		$comp.sources.objTranslation.sync();
	};
	
	WAF.addListener("iconAustria", "click", function(event) {
		// Translate component widgets on component load
		translateWidgets();
  	});
  	
  	WAF.addListener("iconGreatBritain", "click", function(event) {
		// Translate component widgets on component load
		translateWidgets();
  	});
 	// @endregion

	// Translate component widgets on component load
	translateWidgets();

//// Templating gamelist with Handlebars
//	var gamesUL$ = $("#gamesUl"), // jQuery reference to the unordered list gameUL in the containerGames
//		gameTemplate$ = $("#gameTemplate").html(), // jQuery reference to the handlebars template for the topNavBar
//		gameTemplateFn = Handlebars.compile(gameTemplate$); // Function to compile the template with handlebars
//		
//	// Set event handler for the gameUL
//		gamesUL$.on("click",".gameItemLi", function (event) {
//			var this$ = $(this); // jQuery reference to this list item
//			this$.addClass("gameItemSelected");
//			this$.siblings().removeClass("gameItemSelected"); // Add a class for the selected menu item
//			varSelectedGame = this$.attr("id");
//			//var componentpath = this$.children("span.gameItemSpan").attr("data-componentpath"); // Get the path of the component which should openend via this link
//			//$$("componentAppParts").loadComponent(componentpath); // Load component
//		});
//		
//		// Load topNavBar
//		//buildTopNavBar();
//	function queryGames () {
//	
//		//
//		sources.game.toArray("ID, name, gameInfo, dealineNextDecisions", {
//			orderBy: "deadlineNextDecisions, name",
//			onSuccess: function(event){
//				gameList = event.result;
//				
//				// Loop through the array and build game list
//				gameList.forEach(function(gameItem) {
//					// Append each game object of the array to the unordered list
//					gamesUL$.append(gameTemplateFn(gameItem));
//				});
//			}
//		});
//	}


//<table class="table">
//  		<tr ng-repeat="game in ['Pizza Margherita', 'Pizza Tonno']">
//    		<td>{{game}}</td>
//  		</tr>
//	</table>



// Use return key to login
//if ( event.keyCode == 13 ){
//     signIn(); // Call login function
//}


// Get the language from the user storage of the session
//		if (currentUser().storage[language] === null || currentUser().storage[language] === '') {
//			// Set the current language as default language in the user storage
//			if (currentSession().storage[changedLanguage] === null || currentSession().storage[changedLanguage] === '') { 
//				// Current browser language is taken as default language for this user
//				currentUser().storage[language] === currentSession().storage[language];
//			} else {
//				// Current changedLanguage is taken as default language for this user
//				currentUser().storage[language] === currentSession().storage[changedLanguage];
//			}
//		} else {
//			// Set the currentUser storage language to the value of the changedLanguage
//			if (!currentSession().storage[changedLanguage] === null && !currentSession().storage[changedLanguage] === '') {
//				currentUser().storage[language] === currentSession().storage[changedLanguage];
//			}
//		}


// var theUser = currentUser();
// var theUserStorage = theUser.storage;


//model.User.methods.getUserLanguage = function(lang, update) {

//		// Session variables
//		var theSession = currentSession();
//		var theSessionStorage = theSession.storage;
//		var theUser = currentUser();
//		
//		// Default value in case of a missing declaration of the lang parameter
//		if (lang == null) {
//			return 'en'; 
//		}
//		
//		// Set and take the user language
//		if (theUser.ID == '00000000000000000000000000000000') { // No logged in user
//			return lang;
//		} else { // Logged in user
//			if (update == true) {
//				theSessionStorage['defaultLanguage'] = lang; // The session storage attribute defaultLanguage is set by the parameter lang
//				var theUserEntity = ds.User(theSessionStorage.userID); // The user is queried
//				theUserEntity.defaultLanguage = lang; // The attribute defaultLanguage of this user is set by the parameter lang
//				theUserEntity.save(); // The user entity is saved with the new defaultLanguage value
//				return lang;
//			} else {
//				return theSessionStorage['defaultLanguage']; // The saved default language for this user is returned
//			}
//		}
//};
//model.User.methods.getUserLanguage.scope = "public";



//	// Create an empty entitiyCollection

//	var resultCollection = ds.Game.createEntityCollection();
//	
//	// Current session
//	var currSession = currentSession();
//	
//	// Whole access for admin
//	if (currSession.belongsTo('Admin'))
//		result = ds.Game.all();
//	else {
//		// Get current user
//		var theUserID = sessionStorage.userID;
//		
//		// Query the games
//		if (theUserID != null) {
//			var gamePartizipations = ds.Gamer.query('user.ID == :1', theUserID); // query the Gamer dataclass
//			result = gamePartizipation.game; // query the games by using the game entityCollection of the Gamer dataclass
//		}
//	}
//	
//	// Return the entityCollection
//	return result;





//model.Game.events.onSave = function() {
//	// Get current user
//	var theUserID = sessionStorage.userID;
//	
//	// Create the datetime  - wakanda save it in UTC time
//	var now = new Date();
//	
//	// Set the current user as owner and the current date as creation date by default when the entitiy is created
//	if (this.isNew()) {
//		this.createdAt = now; // Set the date
//		if (theUserID !== null) // Set the user ID
//			this.createdBy = theUserID;
//	}
//	
//	// Set the user and date when the entity is modified
//	if (this.isModified()) {
//		this.modifiedAt = now; // Set the date
//		if (theUserID !== null) // Set the user ID
//			this.modifiedBy = theUserID;
//	}
//	
//	// Set the user and date when the entitiy is viewed
//	if (this.isLoaded()) {
//		this.viewedAt = now; // Set the date
//		if (theUserID !== null) // Set the user ID
//			this.viewedBy = theUserID;
//	}
//};



//model.Game.period.events.onSet = function() {
//	// Set the value for the status attribute
//	var thisPeriod = this.period;
//	
//	if (thisPeriod == 0)
//		this.status = 'in Vorbereitung';
//	else if (thisPeriod > 12)
//		this.status = 'beendet';
//	else
//		this.status = 'wird gespielt';
//};



//model.Game.events.onRestrictingQuery = function() {
//	
//	// Create an empty entitiyCollection
//	var resultCollection = ds.Game.createEntityCollection();
//	
//	// Current session
//	var currSession = currentSession();
//	
//	// Whole access for admin
//	if (currSession.belongsTo('Admin'))
//		result = ds.Game.all();
//	else {
//		// Get current user
//		var theUserID = sessionStorage.userID;
//		
//		// Query the games
//		if (theUserID != null) {
//			var gamePartizipations = ds.Gamer.query('user.ID == :1', theUserID); // query the Gamer dataclass
//			result = gamePartizipations.game; // query the games by using the game entityCollection of the Gamer dataclass
//		}
//	}
//	
//	// Return the entityCollection
//	return result;
//};


//model.Gamer.events.onValidate = function() {

//	// Create an error object
//	var result = {error: 0}; 
//	
//	// Create an error array to take the different errors
//	var theErrors = [];
//	
//	// Create the gamer object which has to be find
//	var userExists = ds.Gamer.find('user.ID == :1 && game.ID == :2', this.user.ID, this.game.ID);
//	
//	// Check if the user already exists in the game
//	if (userExists)
//		theErrors.push('The user already exists in this game');
//		
//	// Put the error array into the error object
//	if (theErrors.length > 0)
//		result = {error: 201, errorMessage: theErrors.join('\t')};
//		
//	// Return the error object
//	return result;
//};


//			var gamePartizipations = ds.Gamer.query('user.ID == :1', theUserID); // query the Gamer dataclass
//			//var gamePartizipationsArray = gamePartizipations.toArray();
//			//var gameOwner = ds.Game.query('user.ID == :1', theUserID);


//var gameGamers = ds.Gamer.query('user.ID == :1', theUserID) // Query the Gamer dataclass to get all game participations of the user
//			var gamerGamers = gameGamers.game; // Query all games via the realtion attribute within the entityCollection gameGamers to get an entityCollection of all games a user has played





// Set the icon of the period
//		var element$ = $(event.htmlObject);
		
		//var widgetType = $(this).attr('data-type'); // Get the data-type of the widget e.g. button, label, ...
		
		//alert(element$.attr('id'));
		
//		$('[data-ref="componentGameModules_imagePeriod"] img').attr('src', '/images/symbols/comingsoon.png')
//		
//		alert($('[data-ref="componentGameModules_imagePeriod"] img').attr('src'));

		//alert(element$.find('[data-ref="componentGameModules_imagePeriod"] img').attr('src'));
//		
//		alert($comp.sources.game.period);
		
//		switch($comp.sources.game.period) {
//			case 1:
//				element$.find('[data-ref="componentGameModules_imagePeriod"] img').attr('src', '/images/numbers/1.png');
//				//$('[data-ref="componentGameModules_imagePeriod"] img').attr('src', '/images/numbers/1.png');
//				//alert($('[data-ref="componentGameModules_imagePeriod"] img').attr('src'));
//				break;
//			case 7:
//				element$.find('[data-ref="componentGameModules_imagePeriod"] img').attr('src', '/images/numbers/7.png');
//				//$('[data-ref="componentGameModules_imagePeriod"] img').attr('src', '/images/numbers/7.png');
//				//alert($('[data-ref="componentGameModules_imagePeriod"] img').attr('src'));
//				break;
//			default:
//				//alert('anderes');
//		}
//		
		
//		var imagePeriod$ = $("image[data-ref='" + getHtmlId() + "']");
		
//		imagePeriod$.html('<img src="/images/countries/at.png" style="width: 100%; height: 100%; display: block;">' );    
				
//		switch ($comp.sources.game.period) {
//			case 0:
//				$(element$ + '[data-ref="componentGameModules_imagePeriod"] img').attr('src', '/images/symbols/comingsoon.png');
//				break;
//			case 1:
//				$(element$ + '[data-ref="componentGameModules_imagePeriod"] img').attr('src', '/images/numbers/1.png');
//				break;
//			case 2:
//				$(element$ + '[data-ref="componentGameModules_imagePeriod"] img').attr('src', '/images/numbers/2.png');
//				break;
//			case 3:
//				$(element$ + '[data-ref="componentGameModules_imagePeriod"] img').attr('src', '/images/numbers/3.png');
//				break;
//			case 4:
//				$(element$ + '[data-ref="componentGameModules_imagePeriod"] img').attr('src', '/images/numbers/4.png');
//				break;
//			case 5:
//				$(element$ + '[data-ref="componentGameModules_imagePeriod"] img').attr('src', '/images/numbers/5.png');
//				break;
//			case 6:
//				$(element$ + '[data-ref="componentGameModules_imagePeriod"] img').attr('src', '/images/numbers/6.png');
//				break;
//			case 7:
//				$(element$ + '[data-ref="componentGameModules_imagePeriod"] img').attr('src', '/images/numbers/7.png');
//				break;
//			case 8:
//				$(element$ + '[data-ref="componentGameModules_imagePeriod"] img').attr('src', '/images/numbers/8.png');
//				break;
//			case 9:
//				$(element$ + '[data-ref="componentGameModules_imagePeriod"] img').attr('src', '/images/numbers/9.png');
//				break;
//			case 10:
//				$(element$ + '[data-ref="componentGameModules_imagePeriod"] img').attr('src', '/images/numbers/10.png');
//				break;
//			case 11:
//				$(element$ + '[data-ref="componentGameModules_imagePeriod"] img').attr('src', '/images/numbers/11.png');
//				break;
//			case 12:
//				$(element$ + '[data-ref="componentGameModules_imagePeriod"] img').attr('src', '/images/numbers/12.png');
//				break;
//			default:
//				$(element$ + '[data-ref="componentGameModules_imagePeriod"] img').attr('src', '/images/symbols/done.png');
//		}


//		ds.Translation.query('pageName == :1', 'app',
//		{
//			onSuccess: function(resultSet)
//			{
//				resultSet.entityCollection.forEach(
//					{
//						onSuccess: function(languageObject)
//						{
//							var value = languageObject.entity[sessionStorage.getItem('language')].getValue();
//							var name = languageObject.entity.element.getValue();
//							switch(languageObject.entity.type.getValue()) {
//								case 'button':
//									$('#' + name + ' span').text(value); // Replace the button span (title) with the new value
//									break;
//								case 'richText':
//									$('#' + name).text(value); // Replace the richText widget with the new value
//									break;
//								case 'link':
//									$('#' + name + ' a').text(value);
//									//$('#' + event.element + ' a').text('href=' + event.url + ' target=' + event.target + '> ' + event[language]);
//								break;
//								default:
//							}
//						}
//					}
//				);
//			}
//		});

// Namespace for language Settings
//var languageSettings = {
//	
//	changeLanguage : function (translationArray, language) {
//		
//		
//		if (language)
//			sessionStorage.setItem('language', language.substr(0,2));
//		else if (!sessionStorage.getItem('language')) {
//			language = browserLang = navigator.language || navigator.userLanguage; // Get browser language
//			sessionStorage.setItem('language', language.substr(0,2));  // Set default language in the client sessionStorage
//		}
//		
//		
//		
//		// Find the first two letters of the browser language
//		//var language = language.substr(0,2);
//		// If the language is different from 'de' or 'en' then the default value 'en' is taken
//		if(sessionStorage.getItem('language') != 'de' && sessionStorage.getItem('language') != 'en')
//			sessionStorage.setItem('language', 'en');
//		
//		// Translate	
//		this.setLanguageOfWidgets(sessionStorage.getItem('language'));
//	
//},
////	
//	// Function to call
//	setLanguageOfWidgets : function(lang) {
//		
//		// Loop through all waf-widgets
//		$('.waf-widget').each(
//			function(){
//				var widgetType = $(this).attr('data-type'); // Get the data-type of the widget e.g. button, label, ...
//				var translatedValue = localization.translations[lang][this.id]; // Get the translation of the widget with this id
//		
//				if (translatedValue) { // If there is a value
//				switch(widgetType){ // Switch through data-type of the widget and get the right jQuery call to set the value
//					case 'button':
//						$('#' + this.id + ' span').text(translatedValue); // Replace the button span (title) with the new value
//						break;
//					case 'richText':
//						var textValue = $('#' + this.id + ' a').text(); // Get the link attribute of the richText widget
//						if (textValue) { // Check if the richtText widget has a link attribute - there must be a textValue if so
//							var linkPart = textValue.slice(3,textValue.indexOf('>') + 1); // Get the given first link part
//							$('#' + this.id + ' a').text(linkPart + translatedValue); // Replace the <a part with the new value
//						} else { // The richText widget has no link attribute
//							$('#' + this.id).text(translatedValue); // Replace the richText widget with the new value
//						}
//						break;
//					default:
//						$('#' + this.id).text(translatedValue); // Replace the widget's text with the new value
//				}
//			}
//		});
//	}
//};

//varRichTextUserName = "Benutzername";
//source.varRichTextUserName.sync();
//var localization = {
//	
//	changeLanguage: function(language) {
//		
//		

//		
//		switch(sessionStorage.getItem("language")) {
//			case "de":
//				objTranslation.richTextUserName = "Benutzername";
//				break;
//			case "en":
//				objTranslation.richTextUserName = "Username";
//				break;
//		}
//		
//		WAF.sources.objTranslation.sync();
//	}

//}




//var localization = {
//	
//	selectedLanguage : "de", //by default we define German as the default language
//	
//	translations : {
//		
//		"en": {
//			"{richTextUserName}": "Username",
//			"{richTextPassword}": "Password"
//		},
//		
//		"de": {
//			"{richTextUserName}": "Benutzername",
//			"{richTextPassword}": "Passwort"
//		}
//	
//	},
//	
//	changeLanguage: function(language) {
//		
//		
//		
//	 	$("[data-type]").each(
//	 		function() {
//	 			var thisWidgetID = $(this).attr("id");
//	 			var thisWidgetType = $(this).attr("data-type");
//	 			
//	 			var caseResult = 0;
//	 			//var translatedValue = localization.translations[language][thisWidgetID];
//	 			var translatedValue = localization.translations["en"][this.id];
//	 			alert(thisWidgetID);
//	 			//alert(translatedValue);
//	 			if (translatedValue) {
//	 				switch (thisWidgetType)
//						{
//							case "button":
//								switch (caseResult)
//								{
//									case 1: // Widget is within a component
//										$("#" + thisComponent + "_" + thisWidgetID + " span").text(thisLocalization); // Replace the richText widget with the new value
//										break;
//									case 2: // Widget is within a matrix widget
//										$body.find("[data-ref=" + thisWidgetID + "] span").text(thisLocalization);
//										break;
//									case 3: // Widget is within a component and a matrix widget
//										$body.find("[data-ref=" + thisComponent + "_" + thisWidgetID + "] span").text(thisLocalization);
//										break;
//									default: // Widget is within a page
//										$("#" + thisWidgetID + " span").text(thisLocalization); // Replace the richText widget with the new value
//										break;
//								}
//								break;
//							case "link":
//								switch (caseResult)
//								{
//									case 1: // Widget is within a component
//										$("#" + thisComponent + "_" + thisWidgetID + " a").text(thisLocalization); // Replace the richText widget with the new value
//										break;
//									case 2: // Widget is within a matrix widget
//										$body.find("[data-ref=" + thisWidgetID + "] a").text(thisLocalization);
//										break;
//									case 3: // Widget is within a component and a matrix widget
//										$body.find("[data-ref=" + thisComponent + "_" + thisWidgetID + "] a").text(thisLocalization);
//										break;
//									default: // Widget is within a page
//										$("#" + thisWidgetID + " a").text(thisLocalization); // Replace the richText widget with the new value
//										break;
//								}
//								break;
//							case "variable":
//								switch (caseResult)
//								{
//									case 1: // Widget is within a component
//										WAF.sources[page + "_" + pageElementId] = translatedValue;
//										break;
//									default: // Widget is within a page
//										WAF.sources[thisWidgetID] = thisLocalization;
//										break;
//								}
//								break;
//							default:
//								switch (caseResult)
//								{
//									case 1: // Widget is within a component
//										$("#" + thisComponent + "_" + thisWidgetID).text(thisLocalization); // Replace the richText widget with the new value
//										break;
//									case 2: // Widget is within a matrix widget
//										$body.find("[data-ref=" + thisWidgetID + "]").text(thisLocalization);
//										break;
//									case 3: // Widget is within a component and a matrix widget
//										$body.find("[data-ref=" + thisComponent + "_" + thisWidgetID + "]").text(thisLocalization);
//										break;
//									default: // Widget is within a page
//										alert(thisWidgetID);
//										$("#" + thisWidgetID).text(thisLocalization); // Replace the richText widget with the new value
//										break;
//								}
//								break;
//						}
//	 			}
//	 		}
//	 	);
//	}
//}

//localization.changeLanguage(localization.selectedLanguage);


//	WAF.addListener("iconAustrian", "click", function(event) {
//			// Translate to Austrian language
//			//localization.setLanguage("gamecenterGamer", "at");
//			
//			// Set session language
//			//setLanguage("de");

//			// Set translation
//			//translate();
//    	});
//    	
//    	WAF.addListener("iconEnglish", "click", function(event) {
//    		// Translate to English language
//    		//localization.setLanguage("gamecenterGamer", "gb");
//    		
//    		// Set session language
//			//setLanguage("en");

//			// Set translation
//			//translate();
//    	});

