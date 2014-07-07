/*	In order to make the helloWorld() function available client-side, you have to add a reference to the 'menu' module in the GUI Designer.
	The helloWorld() function can be executed from your JS file as follows:
	alert(menu.helloWorld());
	
	For more information, refer to http://doc.wakanda.org/Wakanda0.Beta/help/Title/en/page1516.html
*/
exports.buildTopBar = function buildTopBar () {
	
	// Get user permissions
	var myUser = currentUser();
	var userStorage = myUser.storage;
	userStorage["language"] = userLanguage.substr(0,2);
	return userStorage["language"];
	
	topNavData = [ // Array with menu item objects
			{title: objTranslation.menuGamecenter, componentpath: "/components/gamecenter/gamecenter.waComponent", menucomponentpath: "/components/gamecenter/gamecenterMenu.waComponent", topNavItemImagePath: "/images/Medical_Office.png", topNavItemId: "navGamecenter", topNavItemClass: "topNavItemLi topNavItemSelected"},
			{title: objTranslation.menuGamer, componentpath: "/components/gamer/gamerGame.waComponent", menucomponentpath: "/components/gamer/gamerMenu.waComponent", topNavItemImagePath: "/images/Medical_Office.png", topNavItemId: "navGamer", topNavItemClass: "topNavItemLi"},
			{title: objTranslation.menuGamehost, componentpath: "/components/gamehost/gamehostHome.waComponent", menucomponentpath: "/components/gamehost/gamehostMenu.waComponent", topNavItemImagePath: "/images/User_Dentist.png", topNavItemId: "navGamehost", topNavItemClass: "topNavItemLi"},
			{title: objTranslation.menuAdmin, componentpath: "/components/administrator/administratorHome.waComponent", menucomponentpath: "/components/administrator/adminMenu.waComponent", topNavItemImagePath: "/images/User_Dentist.png", topNavItemId: "navAdmin", topNavItemClass: "topNavItemLi"}
		];
		
	return (topNavData);
	
};
