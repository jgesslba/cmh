/*	In order to make the helloWorld() function available client-side, you have to add a reference to the 'menu' module in the GUI Designer.
	The helloWorld() function can be executed from your JS file as follows:
	alert(menu.helloWorld());
	
	For more information, refer to http://doc.wakanda.org/Wakanda0.Beta/help/Title/en/page1516.html
*/


// ##### TOP MENU #####

exports.getTopNavBar = function getTopNavBar (objTranslation) {
	
	// Get user language
	var myUser = currentUser();
	var userStorage = myUser.storage;
	var lang = userStorage["language"];
	
	// Get session
	var session = currentSession();
	
	// Build menu depending on user permission
	if (session.belongsTo('Gamer')) {
		topNavData = [ // Array with menu item objects
			{title: objTranslation.menuGamecenter, componentpath: "/components/gamecenter/gamecenter.waComponent", menucomponentpath: "/components/gamecenter/gamecenterMenu.waComponent", topNavItemImagePath: "/images/Medical_Office.png", topNavItemId: "navGamecenter", topNavItemClass: "topNavItemLi topNavItemSelected"},
			{title: objTranslation.menuGamer, componentpath: "/components/gamer/gamerGame.waComponent", menucomponentpath: "/components/gamer/gamerMenu.waComponent", topNavItemImagePath: "/images/Medical_Office.png", topNavItemId: "navGamer", topNavItemClass: "topNavItemLi"}
		];
	} else if (session.belongsTo('Gamehost')) {
		topNavData = [ // Array with menu item objects
			{title: objTranslation.menuGamecenter, componentpath: "/components/gamecenter/gamecenter.waComponent", menucomponentpath: "/components/gamecenter/gamecenterMenu.waComponent", topNavItemImagePath: "/images/Medical_Office.png", topNavItemId: "navGamecenter", topNavItemClass: "topNavItemLi topNavItemSelected"},
			{title: objTranslation.menuGamer, componentpath: "/components/gamer/gamerGame.waComponent", menucomponentpath: "/components/gamer/gamerMenu.waComponent", topNavItemImagePath: "/images/Medical_Office.png", topNavItemId: "navGamer", topNavItemClass: "topNavItemLi"},
			{title: objTranslation.menuGamehost, componentpath: "/components/gamehost/gamehostHome.waComponent", menucomponentpath: "/components/gamehost/gamehostMenu.waComponent", topNavItemImagePath: "/images/User_Dentist.png", topNavItemId: "navGamehost", topNavItemClass: "topNavItemLi"},
		];
	} else if (session.belongsTo('Gameadmin') || session.belongsTo('Admin')) {
		topNavData = [ // Array with menu item objects
			{title: objTranslation.menuGamecenter, componentpath: "/components/gamecenter/gamecenter.waComponent", menucomponentpath: "/components/gamecenter/gamecenterMenu.waComponent", topNavItemImagePath: "/images/Medical_Office.png", topNavItemId: "navGamecenter", topNavItemClass: "topNavItemLi topNavItemSelected"},
			{title: objTranslation.menuGamer, componentpath: "/components/gamer/gamerGame.waComponent", menucomponentpath: "/components/gamer/gamerMenu.waComponent", topNavItemImagePath: "/images/Medical_Office.png", topNavItemId: "navGamer", topNavItemClass: "topNavItemLi"},
			{title: objTranslation.menuGamehost, componentpath: "/components/gamehost/gamehostHome.waComponent", menucomponentpath: "/components/gamehost/gamehostMenu.waComponent", topNavItemImagePath: "/images/User_Dentist.png", topNavItemId: "navGamehost", topNavItemClass: "topNavItemLi"},
			{title: objTranslation.menuGameadmin, componentpath: "/components/administrator/administratorHome.waComponent", menucomponentpath: "/components/administrator/adminMenu.waComponent", topNavItemImagePath: "/images/User_Dentist.png", topNavItemId: "navGameadmin", topNavItemClass: "topNavItemLi"}
		];
	} else {
		topNavData = [];
	}
		
	// Return array with menu items
	return topNavData;
};


// ##### LEFT MENU DEPENDING ON THE SELECTED TOP MENU ITEM #####

exports.getLeftNavBar = function getLeftNavBar (selectedTopNav, objTranslation) {
	
	switch(selectedTopNav) {
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
		case "navGameadmin":
			leftNavData = [];
			break;
		default:
			leftNavData = [];
	}
	
	// Return array with menu items
	return leftNavData;
	
};
