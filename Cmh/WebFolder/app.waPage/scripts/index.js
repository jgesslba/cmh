
WAF.onAfterInit = function onAfterInit() {// @lock
	
	// Translate
	var translateWidgets = function () {
		// Get translated values
		objTranslation.richTextInformation = translate("app", "richTextInformation");
		objTranslation.richTextLogout = translate("app", "richTextLogout");
		objTranslation.menuGamecenter = translate("app", "menuGamer");
		objTranslation.menuManagement = translate("app", "menuManagement");
		objTranslation.menuNursing = translate("app", "menuNursing");
		objTranslation.menuRadiology = translate("app", "menuRadiology");
		objTranslation.menuSurgery = translate("app", "menuSurgery");
		objTranslation.menuGamehost = translate("app", "menuGamehost");
		objTranslation.menuGameadmin = translate("app", "menuGameadmin");
		objTranslation.menuGamer = translate("app", "menuGamer");
		objTranslation.menuGamecenter = translate("app", "menuGamecenter");
		objTranslation.menuFinancing = translate("app", "menuFinancing");
		objTranslation.menuHospitals = translate("app", "menuHospitals");
		objTranslation.menuEmergencies = translate("app", "menuEmergencies");
		objTranslation.menuPatients = translate("app", "menuPatients");
		objTranslation.menuTargetValues = translate("app", "menuTargetValues");
		objTranslation.menuResultWeighting = translate("app", "menuResultWeighting");
		objTranslation.menuUserAdministration = translate("app", "menuUserAdministration");
		objTranslation.menuDataBackup = translate("app", "menuDataBackup");
		
		// Sync datasources
		WAF.sources.objTranslation.sync();
		WAF.sources.game.all();
	};
	
	
	// Templating top menubar with Handlebars
	var topNavUL$ = $("#topNavUl"), // jQuery reference to the unordered list topNavUL in the containerTopNavBarCentered
		topNavTemplate$ = $("#topNavTemplate").html(), // jQuery reference to the handlebars template for the topNavBar
		topNavTemplateFn = Handlebars.compile(topNavTemplate$); // Function to compile the template with handlebars
		
	// Templating left menubar with Handlebars
	var leftNavUL$ = $("#leftNavUl"), // jQuery reference to the unordered list topNavUL in the containerTopNavBarCentered
		leftNavTemplate$ = $("#leftNavTemplate").html(), // jQuery reference to the handlebars template for the topNavBar
		leftNavTemplateFn = Handlebars.compile(leftNavTemplate$); // Function to compile the template with handlebars
		
	
	// Build the top menubar
	function buildTopNavBar () {
		
		menu.getTopNavBarAsync({
        	'onSuccess': function (topNavData) {

	    		// Remove a potentially existing list
				topNavUL$.children().remove();
				
				if (varSelectedTopNav == "") {
					// Loop through the array and build topNavBar
					topNavData.forEach(function(topNavItem) {
						// Append each topNavObject of the array to the unordered list
						topNavUL$.append(topNavTemplateFn(topNavItem));
						// Find the selected item and read componentpath
						if (topNavItem.topNavItemClass === "topNavItemLi topNavItemSelected") {
							varSelectedTopNav = topNavItem.topNavItemId;
						}
					});
				} else {
					topNavData.forEach(function(topNavItem) {
						// Append each topNavObject of the array to the unordered list
						topNavUL$.append(topNavTemplateFn(topNavItem));
					});
				}
		
				// The current selected nav item is set as selected
				if (varSelectedTopNav != "") {
					var this$ = $("#" + varSelectedTopNav); // jQuery reference to this list item
					this$.addClass("topNavItemSelected");
					this$.siblings().removeClass("topNavItemSelected"); // Add a class for the selected menu item
					buildLeftNavBar(); // Call the function to build the menu
				}
				
        	},  
        	'onError': function (error) {
         		console.log(error);
           	},
           	'params': [objTranslation]
        });
	};
	
	// Build the left menubar
	function buildLeftNavBar () {
		
		// Delete varSelectedLeftNav
		varSelectedLeftNav = "";
		
		// Build menu depending on the selected leftNavBar item
		menu.getLeftNavBarAsync({
        	'onSuccess': function (leftNavData) {
        		
        		// Variable for componentpath
        		var componentpath = "";
    
	    		// Remove a potentially existing list
				leftNavUL$.children().remove();
				
				// Loop through the array and build leftNavBar
				leftNavData.forEach(function(leftNavItem) {
					// Append each leftNavObject of the array to the unordered list
					leftNavUL$.append(leftNavTemplateFn(leftNavItem));
					// Find the selected item and read componentpath
					if (leftNavItem.leftNavItemClass === "leftNavItemLi leftNavItemSelected") {
						varSelectedLeftNav = leftNavItem.leftNavItemId;
						componentpath = leftNavItem.componentpath;
					}
				});

				// The current selected nav item is set as selected
				if (varSelectedLeftNav != "") {
					// The current selected nav item is set as selected
					var this$ = $("#" + varSelectedLeftNav); // jQuery reference to this list item
					this$.addClass("leftNavItemSelected");
					this$.siblings().removeClass("leftNavItemSelected"); // Add a class for the selected menu item
				}
				
				// Load the component
				if (componentpath != "")
					$$("componentAppParts").loadComponent(componentpath); // Load component
        	},  
        	'onError': function (error) {
         		console.log(error);
           	},
           	'params': [varSelectedTopNav, objTranslation]
        });
	};
	
	// Resize function to show scrollbars
	function windowResizeOverflow () {
		var minW = 1120;
		var minH = 800;
		// If the window width is smaller than the minimal width set the window width to the fixed minimal width - scrollbars appear
		if ($(window).width() < minW) {
			$("#containerFullPage").css("width", minW + "px");
		} else {
			$("#containerFullPage").css("width", "");
		}
	
		if ($(window).height() < minH) {
			$("#containerFullPage").css("height", minH + "px");
		} else {
			$("#containerFullPage").css("height", "");
		}
	};
	
// @region namespaceDeclaration// @startlock
	var iconAustria = {};	// @icon
	var iconGreatBritain = {};	// @icon
	var richTextLogout = {};	// @richText
	var documentEvent = {};	// @document
// @endregion// @endlock

// eventHandlers// @lock

	iconAustria.click = function iconAustria_click (event)// @startlock
	{// @endlock
		// Set session language for this user
		language.setSessionLanguageAsync({
        	'onSuccess': function (result) {
        		sessionStorage.setItem("language", result);
				translateWidgets(); // Call the translation function for this page
				buildTopNavBar(); // Call the function to build the menu
        	},  
        	'onError': function (error) {
         		console.log(error);
           	},  
            'params': ["de"]
        });
	};// @lock

	iconGreatBritain.click = function iconGreatBritain_click (event)// @startlock
	{// @endlock
		// Set session language for this user
		language.setSessionLanguageAsync({
        	'onSuccess': function (result) {
        		sessionStorage.setItem("language", result);
				translateWidgets(); // Call the translation function for this page
				buildTopNavBar(); // Call the function to build the menu
        	},  
        	'onError': function (error) {
         		console.log(error);
           	},  
            'params': ["en"]
        });
	};// @lock

	richTextLogout.click = function richTextLogout_click (event)// @startlock
	{// @endlock
		// Logout
		WAF.directory.logout( {
			onSuccess: function (logoutEvent) {
				$$("richTextCurrentUser").setValue("");
				window.location = "/index";
			}
		
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

		
		// Show the current user
		if(WAF.directory.currentUser() != null)
			$$("richTextCurrentUser").setValue(WAF.directory.currentUser().fullName);
		else
			window.location = "/index";
			
		
		// Set event handler for the topNavBar
		topNavUL$.on("click",".topNavItemLi", function (event) {
			var this$ = $(this); // jQuery reference to this list item
			this$.addClass("topNavItemSelected");
			this$.siblings().removeClass("topNavItemSelected"); // Add a class for the selected menu item
			varSelectedTopNav = this$.attr("id");
			buildLeftNavBar();
		});
		
		// Set event handler for the topNavBar
		leftNavUL$.on("click",".leftNavItemLi", function (event) {
			var this$ = $(this); // jQuery reference to this list item
			this$.addClass("leftNavItemSelected");
			this$.siblings().removeClass("leftNavItemSelected"); // Add a class for the selected menu item
			varSelectedLeftNav = this$.attr("id");
			var componentpath = this$.children("span.leftNavItemSpan").attr("data-componentpath"); // Get the path of the component
			$$("componentAppParts").loadComponent(componentpath); // Load component
		});
		
		// Set session language for this user
		language.setSessionLanguageAsync({
        	'onSuccess': function (result) {
        		sessionStorage.setItem("language", result);
				translateWidgets(); // Call the translation function
				buildTopNavBar(); // Call the function to build the menu
        	},  
        	'onError': function (error) {
         		console.log(error);
           	},  
            'params': [sessionStorage.getItem("language"),browserLanguage = browserLang = navigator.language || navigator.userLanguage]
        });
		
		// Call the workaround function to set the right column width for the grid
		fixGridHeaderWidth();
	
	};// @lock

// @region eventManager// @startlock
	WAF.addListener("iconAustria", "click", iconAustria.click, "WAF");
	WAF.addListener("iconGreatBritain", "click", iconGreatBritain.click, "WAF");
	WAF.addListener("richTextLogout", "click", richTextLogout.click, "WAF");
	WAF.addListener("document", "onLoad", documentEvent.onLoad, "WAF");
// @endregion
};// @endlock
