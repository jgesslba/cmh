
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
		objTranslation.menuGamer = translate("app", "menuGamer");
		objTranslation.menuGamecenter = translate("app", "menuGamecenter");
		objTranslation.menuFinancing = translate("app", "menuFinancing");
		objTranslation.menuHospitals = translate("app", "menuHospitals");
		objTranslation.menuEmergencies = translate("app", "menuEmergencies");
		objTranslation.menuPatients = translate("app", "menuPatients");
		objTranslation.menuTargetValues = translate("app", "menuTargetValues");
		objTranslation.menuResultWeighting = translate("app", "menuResultWeighting");
		objTranslation.menuUserAdministration = translate("app", "menuUserAdministration");
		
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
		
		topNavData = [ // Array with menu item objects
			{title: objTranslation.menuGamecenter, componentpath: "/components/gamecenter/gamecenter.waComponent", menucomponentpath: "/components/gamecenter/gamecenterMenu.waComponent", topNavItemImagePath: "/images/Medical_Office.png", topNavItemId: "navGamecenter", topNavItemClass: "topNavItemLi topNavItemSelected"},
			{title: objTranslation.menuGamer, componentpath: "/components/gamer/gamerGame.waComponent", menucomponentpath: "/components/gamer/gamerMenu.waComponent", topNavItemImagePath: "/images/Medical_Office.png", topNavItemId: "navGamer", topNavItemClass: "topNavItemLi"},
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
		if (varSelectedTopNav === 0) {
			topNavData.forEach(function(topNavItem) {
				// Find the selected item
				if (topNavItem.topNavItemClass === "topNavItemLi topNavItemSelected")
					varSelectedTopNav = topNavItem.topNavItemId;
					//debugger;
			});
		}
		
		//debugger;
		var this$ = $("#" + varSelectedTopNav); // jQuery reference to this list item
			this$.addClass("topNavItemSelected");
			this$.siblings().removeClass("topNavItemSelected"); // Add a class for the selected menu item
		
		// Call left menu
		buildLeftNavBar(); // Call the function to build the menu
	};
	
	// Build the left menubar
	function buildLeftNavBar () {
		
		// Build menu depending on the selected leftNavBar item
		switch(varSelectedTopNav) {
			case "navGamecenter":
				leftNavData = [];
				break;
			case "navGamer":
				leftNavData = [ // Array with menu item objects
					{title: objTranslation.menuManagement, componentpath: "/components/gamecenter/gamecenter.waComponent", menucomponentpath: "/components/gamecenter/gamecenterMenu.waComponent", leftNavItemImagePath: "/images/Medical_Office.png", leftNavItemId: "navManagement", leftNavItemClass: "leftNavItemLi leftNavItemSelected"},
					{title: objTranslation.menuNursing, componentpath: "/components/gamer/gamerGame.waComponent", menucomponentpath: "/components/gamer/gamerMenu.waComponent", leftNavItemImagePath: "/images/Medical_Office.png", leftNavItemId: "navNursing", leftNavItemClass: "leftNavItemLi"},
					{title: objTranslation.menuRadiology, componentpath: "/components/gamehost/gamehostHome.waComponent", menucomponentpath: "/components/gamehost/gamehostMenu.waComponent", leftNavItemImagePath: "/images/User_Dentist.png", leftNavItemId: "navRadiology", leftNavItemClass: "leftNavItemLi"},
					{title: objTranslation.menuSurgery, componentpath: "/components/administrator/administratorHome.waComponent", menucomponentpath: "/components/administrator/adminMenu.waComponent", leftNavItemImagePath: "/images/User_Dentist.png", leftNavItemId: "navSurgery", leftNavItemClass: "leftNavItemLi"}
				];
				break;
			case "navGamehost":
				leftNavData = [ // Array with menu item objects
					{title: objTranslation.menuFinancing, componentpath: "/components/gamecenter/gamecenter.waComponent", menucomponentpath: "/components/gamecenter/gamecenterMenu.waComponent", leftNavItemImagePath: "/images/Medical_Office.png", leftNavItemId: "navFinancing", leftNavItemClass: "leftNavItemLi leftNavItemSelected"},
					{title: objTranslation.menuHospitals, componentpath: "/components/gamer/gamerGame.waComponent", menucomponentpath: "/components/gamer/gamerMenu.waComponent", leftNavItemImagePath: "/images/Medical_Office.png", leftNavItemId: "navHospitals", leftNavItemClass: "leftNavItemLi"},
					{title: objTranslation.menuEmergencies, componentpath: "/components/gamehost/gamehostHome.waComponent", menucomponentpath: "/components/gamehost/gamehostMenu.waComponent", leftNavItemImagePath: "/images/User_Dentist.png", leftNavItemId: "navEmergencies", leftNavItemClass: "leftNavItemLi"},
					{title: objTranslation.menuPatients, componentpath: "/components/administrator/administratorHome.waComponent", menucomponentpath: "/components/administrator/adminMenu.waComponent", leftNavItemImagePath: "/images/User_Dentist.png", leftNavItemId: "navPatients", leftNavItemClass: "leftNavItemLi"},
					{title: objTranslation.menuManagement, componentpath: "/components/administrator/administratorHome.waComponent", menucomponentpath: "/components/administrator/adminMenu.waComponent", leftNavItemImagePath: "/images/User_Dentist.png", leftNavItemId: "navManagement", leftNavItemClass: "leftNavItemLi"},
					{title: objTranslation.menuNursing, componentpath: "/components/administrator/administratorHome.waComponent", menucomponentpath: "/components/administrator/adminMenu.waComponent", leftNavItemImagePath: "/images/User_Dentist.png", leftNavItemId: "navNursing", leftNavItemClass: "leftNavItemLi"},
					{title: objTranslation.menuRadiology, componentpath: "/components/administrator/administratorHome.waComponent", menucomponentpath: "/components/administrator/adminMenu.waComponent", leftNavItemImagePath: "/images/User_Dentist.png", leftNavItemId: "navRadiology", leftNavItemClass: "leftNavItemLi"},
					{title: objTranslation.menuSurgery, componentpath: "/components/administrator/administratorHome.waComponent", menucomponentpath: "/components/administrator/adminMenu.waComponent", leftNavItemImagePath: "/images/User_Dentist.png", leftNavItemId: "navSurgery", leftNavItemClass: "leftNavItemLi"},
					{title: objTranslation.menuTargetValues, componentpath: "/components/administrator/administratorHome.waComponent", menucomponentpath: "/components/administrator/adminMenu.waComponent", leftNavItemImagePath: "/images/User_Dentist.png", leftNavItemId: "navTargetValues", leftNavItemClass: "leftNavItemLi"},
					{title: objTranslation.menuResultWeighting, componentpath: "/components/administrator/administratorHome.waComponent", menucomponentpath: "/components/administrator/adminMenu.waComponent", leftNavItemImagePath: "/images/User_Dentist.png", leftNavItemId: "navResultWeighting", leftNavItemClass: "leftNavItemLi"},
					{title: objTranslation.menuUserAdministration, componentpath: "/components/administrator/administratorHome.waComponent", menucomponentpath: "/components/administrator/adminMenu.waComponent", leftNavItemImagePath: "/images/User_Dentist.png", leftNavItemId: "navUserAdmin", leftNavItemClass: "leftNavItemLi"}
				];
				break;
			case "navAdmin":
				leftNavData = [];
				break;
			default:
				leftNavData = [];
		}

		
		// Remove a potentially existing list
		leftNavUL$.children().remove();
		
		// Loop through the array and build leftNavBar
		leftNavData.forEach(function(leftNavItem) {
			// Append each leftNavObject of the array to the unordered list
			leftNavUL$.append(leftNavTemplateFn(leftNavItem));
		});
		
		// The current selected nav item is set as selected
		var this$ = $("#" + varSelectedLeftNav); // jQuery reference to this list item
		this$.addClass("leftNavItemSelected");
		this$.siblings().removeClass("leftNavItemSelected"); // Add a class for the selected menu item
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
			var componentpath = this$.children("span.topNavItemSpan").attr("data-componentpath"); // Get the path of the component
			$$("componentAppParts").loadComponent(componentpath); // Load component
			//var menucomponentpath = this$.children("span.topNavItemSpan").attr("data-menucomponentpath"); // Get the path of the menucomponent
			//$$("componentLeftMenu").loadComponent(menucomponentpath); // Load component
			varSelectedLeftNav = "";
			buildLeftNavBar();
		});
		
		// Set event handler for the topNavBar
		leftNavUL$.on("click",".leftNavItemLi", function (event) {
			var this$ = $(this); // jQuery reference to this list item
			this$.addClass("leftNavItemSelected");
			this$.siblings().removeClass("leftNavItemSelected"); // Add a class for the selected menu item
			varSelectedLeftNav = this$.attr("id");
			var componentpath = this$.children("span.leftNavItemSpan").attr("data-componentpath"); // Get the path of the component
			//$$("componentAppParts").loadComponent(componentpath); // Load component
			//var menucomponentpath = this$.children("span.topNavItemSpan").attr("data-menucomponentpath"); // Get the path of the menucomponent
			//$$("componentLeftMenu").loadComponent(menucomponentpath); // Load component
			//buildLeftNavBar();
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
		
		// Load default components
		$$("componentAppParts").loadComponent();
		//$$("componentLeftMenu").loadComponent();
		
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
