
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
		objTranslation.menuAdmin = translate("app", "menuAdmin");
		
		// Sync datasources
		WAF.sources.objTranslation.sync();
		WAF.sources.game.all();
	};
	
	
	// Templating menubar with Handlebars
	var topNavUL$ = $("#topNavUl"), // jQuery reference to the unordered list topNavUL in the containerTopNavBarCentered
		topNavTemplate$ = $("#topNavTemplate").html(), // jQuery reference to the handlebars template for the topNavBar
		topNavTemplateFn = Handlebars.compile(topNavTemplate$); // Function to compile the template with handlebars
		
	
	// Build the menubar
	function buildTopNavBar () {
		
		topNavData = [ // Array with menu item objects
			{title: objTranslation.menuGamecenter, componentpath: "/components/gamer/gamerGamecenter.waComponent", menucomponentpath: "/components/gamer/gamerMenu.waComponent", topNavItemImagePath: "/images/Medical_Office.png", topNavItemId: "navGamecenter", topNavItemClass: "topNavItemLi topNavItemSelected"},
			{title: objTranslation.menuGame, componentpath: "/components/gamer/gamerGamecenter.waComponent", menucomponentpath: "/components/gamer/gamerMenu.waComponent", topNavItemImagePath: "/images/Medical_Office.png", topNavItemId: "navGamecenter", topNavItemClass: "topNavItemLi topNavItemSelected"},
			{title: objTranslation.menuGamehost, componentpath: "/components/gamehost/gamehostHome.waComponent", menucomponentpath: "/components/gamehost/gamehostMenu.waComponent", topNavItemImagePath: "/images/User_Dentist.png", topNavItemId: "navGamehost", topNavItemClass: "topNavItemLi"},
			{title: objTranslation.menuAdmin, componentpath: "/components/administrator/administratorHome.waComponent", menucomponentpath: "/components/administrator/adminMenu.waComponent", topNavItemImagePath: "/images/User_Dentist.png", topNavItemId: "navAdmin", topNavItemClass: "topNavItemLi"}
		];
		
		// Remove a potentially existing list
		topNavUL$.children().remove();
		
		// Loop through the array and build topNavBar
		topNavData.forEach(function(topNavItem) {
			// Append each topNavObject of the array to the unordered list
			topNavUL$.append(topNavTemplateFn(topNavItem));
		});
		
		// The current selected nav item is set as selected
		var this$ = $("#" + varSelectedNav); // jQuery reference to this list item
		this$.addClass("topNavItemSelected");
		this$.siblings().removeClass("topNavItemSelected"); // Add a class for the selected menu item
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
		language.setUserLanguageAsync({
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
		language.setUserLanguageAsync({
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
			varSelectedNav = this$.attr("id");
			var componentpath = this$.children("span.topNavItemSpan").attr("data-componentpath"); // Get the path of the component
			$$("componentAppParts").loadComponent(componentpath); // Load component
			var menucomponentpath = this$.children("span.topNavItemSpan").attr("data-menucomponentpath"); // Get the path of the menucomponent
			$$("componentLeftMenu").loadComponent(menucomponentpath); // Load component
		});
		
		// Set session language for this user
		language.setUserLanguageAsync({
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
		
		// Load default components
		$$("componentAppParts").loadComponent();
		$$("componentLeftMenu").loadComponent();
		
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
