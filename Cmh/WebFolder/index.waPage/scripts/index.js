
WAF.onAfterInit = function onAfterInit() {// @lock
	
	// Translate
	var translateWidgets = function () {
		objTranslation.richTextUserName = translate("index", "richTextUserName");
		objTranslation.richTextPassword = translate("index", "richTextPassword");
		objTranslation.richTextSignUp = translate("index", "richTextSignUp");
		objTranslation.richTextLostUserCredentials = translate("index", "richTextLostUserCredentials");
		objTranslation.richTextIntro = translate("index", "richTextIntro");
		objTranslation.richTextHeadlineGameDescription = translate("index", "richTextHeadlineGameDescription");
		objTranslation.richTextGameDescription = translate("index", "richTextGameDescription");
		objTranslation.richTextHeadlineGameConcept = translate("index", "richTextHeadlineGameConcept");
		objTranslation.richTextGameConcept = translate("index", "richTextGameConcept");
		objTranslation.errorMessageLoginFailed = translate("index", "errorMessageLoginFailed");
		objTranslation.errorMessageRequired = translate("index", "errorMessageRequired");
		objTranslation.buttonLogin = translate("index", "buttonLogin");
				
		// Sync buttons
		$$("buttonLogin").setValue(objTranslation.buttonLogin);
		
		// Sync datasources
		WAF.sources.objTranslation.sync();
		
		// Remove error messages and error divs
		$$("textFieldUserName").removeClass('errorDiv');
		$("#textFieldUserName").attr('placeholder', '');
		$$("textFieldPassword").removeClass('errorDiv');
		$("#textFieldPassword").attr('placeholder', '');
		
	};
	
	// Resize function to show scrollbars
	function windowResizeOverflow () {
		var minW = 990;
		// If the window width is smaller than the minimal width set the window width to the fixed minimal width - scrollbars appear
		if ($(window).width() < minW) {
			$("#containerHeader").css("width", minW + "px");
			$("#containerBar").css("width", minW + "px");
			$("#containerBody").css("width", minW + "px");
		} else {
			$("#containerHeader").css("width", "");
			$("#containerBar").css("width", "");
			$("#containerBody").css("width", "");
		}
	};
	
	// Login
	function signIn() {
		// Hash userName and password
		var hash = CryptoJS.MD5(varUserName + ':Wakanda:' + varPassword).toString();
		
		// Authentication
		if (WAF.directory.loginByKey(varUserName, hash)) { // The authentication was successful
			varCurrentUser = WAF.directory.currentUser(); // The currentUser is stored in the variable
			varUserName = ""; // Empty varUserName
			varPassword = ""; // Empty varPassword
			window.location = "/app/index.html"; // The user is redirected to the app page
		} else { // The authentication was not successful
	
			// Empty the local variables
			varCurrentUser = ""; // Empty varCurrentUser
			varUserName = ""; // Empty varUserName
			varPassword = ""; // Empty varPassword
			
			// Sync the widgets with the empty variables
			WAF.sources.varUserName.sync(); // Clear the txtUserName field
			WAF.sources.varPassword.sync(); // Clear the txtPassword field
			WAF.sources.varCurrentUser.sync();
		
			// Set the error message in the username input placeholder
			$("#textFieldUserName").attr("placeholder", objTranslation.errorMessageLoginFailed);
			
			// Add errorDiv class to inform the user something goes wrong
			$$("textFieldUserName").addClass("errorTextField");
		}
	};

// @region namespaceDeclaration// @startlock
	var buttonLogin = {};	// @button
	var iconAustrian = {};	// @icon
	var iconEnglish = {};	// @icon
	var documentEvent = {};	// @document
	var textFieldPassword = {};	// @textField
	var textFieldUserName = {};	// @textField
// @endregion// @endlock

// eventHandlers// @lock

	buttonLogin.click = function buttonLogin_click (event)// @startlock
	{// @endlock
		// Login to the app
		signIn();
	};// @lock

	iconAustrian.click = function iconAustrian_click (event)// @startlock
	{// @endlock
		// Set session language for this user
		language.setUserLanguageAsync({
        	'onSuccess': function (result) {
        		sessionStorage.setItem("language", result);
				translateWidgets(); // Call the translation function for this page
        	},  
        	'onError': function (error) {
         		console.log(error);
           	},  
            'params': ["de"]
        });
	};// @lock

	iconEnglish.click = function iconEnglish_click (event)// @startlock
	{// @endlock
		// Set session language for this user
		language.setUserLanguageAsync({
        	'onSuccess': function (result) {
        		sessionStorage.setItem("language", result);
				translateWidgets(); // Call the translation function for this page
        	},  
        	'onError': function (error) {
         		console.log(error);
           	},  
            'params': ["en"]
        });
	};// @lock

	documentEvent.onLoad = function documentEvent_onLoad (event)// @startlock
	{// @endlock
		// Initialize window resize function of jqery with the function windowResizeOverlow();
		$(window).resize(function(){
			windowResizeOverflow();
		});
		
		// Call resize event already on page load
		windowResizeOverflow();
		

		// Set session language for this user
		language.setUserLanguageAsync({
        	'onSuccess': function (result) {
        		sessionStorage.setItem("language", result);
				translateWidgets(); // Call the translation function for this page
        	},  
        	'onError': function (error) {
         		console.log(error);
           	},  
            'params': [sessionStorage.getItem("language"),browserLanguage = browserLang = navigator.language || navigator.userLanguage]
        });

		// Redirect to the app page when logged in
		/*if(WAF.directory.currentUser() != null)
			window.location = '/app';*/
	};// @lock

	textFieldPassword.keyup = function textFieldPassword_keyup (event)// @startlock
	{// @endlock
		// Get the event
		event = event.which;
		
		// Use return key to login
		if ( event === 13 ) {
			
			// For IE because IE do not get the value before the keyup event happens
			if (WAF.sources.varPassword === "")
				WAF.sources.varPassword = $$("textFieldPassword").getValue();
		
			// Sign in
			signIn();
		}
	};// @lock

	textFieldPassword.focus = function textFieldPassword_focus (event)// @startlock
	{// @endlock
		// Remove added error class
		this.removeClass("errorTextField");
		$("#textFieldPassword").attr("placeholder", "");
	};// @lock

	textFieldPassword.blur = function textFieldPassword_blur (event)// @startlock
	{// @endlock
		// Error handling
		if (this.getValue() == "") {
			this.addClass("errorTextField"); // Add css class for errorDiv
			$("#textFieldPassword").attr("placeholder", objTranslation.errorMessageRequired);
		}
	};// @lock

	textFieldUserName.keyup = function textFieldUserName_keyup (event)// @startlock
	{// @endlock
		// Get the event
		event = event.which;
		
		// Use return key to login
		if ( event === 13 ) {
			
			// For IE because IE do not get the value before the keyup event happens
			if (WAF.sources.varUserName === "")
				WAF.sources.varUserName = $$("textFieldUserName").getValue();
			
			// Sign in
			signIn();
		}
	};// @lock

	textFieldUserName.focus = function textFieldUserName_focus (event)// @startlock
	{// @endlock
		// Remove added error class
		this.removeClass("errorTextField");
		$("#textFieldUserName").attr("placeholder", "");
	};// @lock

	textFieldUserName.blur = function textFieldUserName_blur (event)// @startlock
	{// @endlock
		// Error handling
		if (this.getValue() == "") {
			this.addClass("errorTextField"); // Add css class for errorDiv
			$("#textFieldUserName").attr("placeholder", objTranslation.errorMessageRequired);
		}
	};// @lock

// @region eventManager// @startlock
	WAF.addListener("buttonLogin", "click", buttonLogin.click, "WAF");
	WAF.addListener("iconAustrian", "click", iconAustrian.click, "WAF");
	WAF.addListener("iconEnglish", "click", iconEnglish.click, "WAF");
	WAF.addListener("textFieldPassword", "keyup", textFieldPassword.keyup, "WAF");
	WAF.addListener("textFieldUserName", "keyup", textFieldUserName.keyup, "WAF");
	WAF.addListener("document", "onLoad", documentEvent.onLoad, "WAF");
	WAF.addListener("textFieldPassword", "focus", textFieldPassword.focus, "WAF");
	WAF.addListener("textFieldPassword", "blur", textFieldPassword.blur, "WAF");
	WAF.addListener("textFieldUserName", "focus", textFieldUserName.focus, "WAF");
	WAF.addListener("textFieldUserName", "blur", textFieldUserName.blur, "WAF");
// @endregion
};// @endlock
