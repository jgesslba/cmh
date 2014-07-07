﻿/*	In order to make the helloWorld() function available client-side, you have to add a reference to the 'menu' module in the GUI Designer.
	The helloWorld() function can be executed from your JS file as follows:
	alert(menu.helloWorld());
	
	For more information, refer to http://doc.wakanda.org/Wakanda0.Beta/help/Title/en/page1516.html
*/
exports.getTopNavBar = function getTopNavBar () {
	
	// Get user language
	var myUser = currentUser();
	var userStorage = myUser.storage;
	var lang = userStorage["language"];
	
	// Get session
	var session = currentSession();

	// Build menu depending on user language and permission
	switch(lang) {
		case "de":
			if (session.belongsTo('Gamer')) {
				topNavData = [ // Array with menu item objects
					{title: "Spielzentrum", componentpath: "/components/gamecenter/gamecenter.waComponent", menucomponentpath: "/components/gamecenter/gamecenterMenu.waComponent", topNavItemImagePath: "/images/Medical_Office.png", topNavItemId: "navGamecenter", topNavItemClass: "topNavItemLi topNavItemSelected"},
					{title: "Spieler", componentpath: "/components/gamer/gamerGame.waComponent", menucomponentpath: "/components/gamer/gamerMenu.waComponent", topNavItemImagePath: "/images/Medical_Office.png", topNavItemId: "navGamer", topNavItemClass: "topNavItemLi"}
				];
			} else if (session.belongsTo('Gamehost')) {
				topNavData = [ // Array with menu item objects
					{title: "Spielzentrum", componentpath: "/components/gamecenter/gamecenter.waComponent", menucomponentpath: "/components/gamecenter/gamecenterMenu.waComponent", topNavItemImagePath: "/images/Medical_Office.png", topNavItemId: "navGamecenter", topNavItemClass: "topNavItemLi topNavItemSelected"},
					{title: "Spieler", componentpath: "/components/gamer/gamerGame.waComponent", menucomponentpath: "/components/gamer/gamerMenu.waComponent", topNavItemImagePath: "/images/Medical_Office.png", topNavItemId: "navGamer", topNavItemClass: "topNavItemLi"},
					{title: "Spielleiter", componentpath: "/components/gamehost/gamehostHome.waComponent", menucomponentpath: "/components/gamehost/gamehostMenu.waComponent", topNavItemImagePath: "/images/User_Dentist.png", topNavItemId: "navGamehost", topNavItemClass: "topNavItemLi"},
				];
			} else if (session.belongsTo('Gameadmin') || session.belongsTo('Admin')) {
				topNavData = [ // Array with menu item objects
					{title: "Spielzentrum", componentpath: "/components/gamecenter/gamecenter.waComponent", menucomponentpath: "/components/gamecenter/gamecenterMenu.waComponent", topNavItemImagePath: "/images/Medical_Office.png", topNavItemId: "navGamecenter", topNavItemClass: "topNavItemLi topNavItemSelected"},
					{title: "Spieler", componentpath: "/components/gamer/gamerGame.waComponent", menucomponentpath: "/components/gamer/gamerMenu.waComponent", topNavItemImagePath: "/images/Medical_Office.png", topNavItemId: "navGamer", topNavItemClass: "topNavItemLi"},
					{title: "Spielleiter", componentpath: "/components/gamehost/gamehostHome.waComponent", menucomponentpath: "/components/gamehost/gamehostMenu.waComponent", topNavItemImagePath: "/images/User_Dentist.png", topNavItemId: "navGamehost", topNavItemClass: "topNavItemLi"},
					{title: "Admin", componentpath: "/components/administrator/administratorHome.waComponent", menucomponentpath: "/components/administrator/adminMenu.waComponent", topNavItemImagePath: "/images/User_Dentist.png", topNavItemId: "navAdmin", topNavItemClass: "topNavItemLi"}
				];
			} else {
				topNavData = [];
			}
			break;
		case "en":
			if (session.belongsTo('Gamer')) {
				topNavData = [ // Array with menu item objects
					{title: "Gamecenter", componentpath: "/components/gamecenter/gamecenter.waComponent", menucomponentpath: "/components/gamecenter/gamecenterMenu.waComponent", topNavItemImagePath: "/images/Medical_Office.png", topNavItemId: "navGamecenter", topNavItemClass: "topNavItemLi topNavItemSelected"},
					{title: "Gamer", componentpath: "/components/gamer/gamerGame.waComponent", menucomponentpath: "/components/gamer/gamerMenu.waComponent", topNavItemImagePath: "/images/Medical_Office.png", topNavItemId: "navGamer", topNavItemClass: "topNavItemLi"}
				];
			} else if (session.belongsTo('Gamehost')) {
				topNavData = [ // Array with menu item objects
					{title: "Gamecenter", componentpath: "/components/gamecenter/gamecenter.waComponent", menucomponentpath: "/components/gamecenter/gamecenterMenu.waComponent", topNavItemImagePath: "/images/Medical_Office.png", topNavItemId: "navGamecenter", topNavItemClass: "topNavItemLi topNavItemSelected"},
					{title: "Gamer", componentpath: "/components/gamer/gamerGame.waComponent", menucomponentpath: "/components/gamer/gamerMenu.waComponent", topNavItemImagePath: "/images/Medical_Office.png", topNavItemId: "navGamer", topNavItemClass: "topNavItemLi"},
					{title: "Gamehost", componentpath: "/components/gamehost/gamehostHome.waComponent", menucomponentpath: "/components/gamehost/gamehostMenu.waComponent", topNavItemImagePath: "/images/User_Dentist.png", topNavItemId: "navGamehost", topNavItemClass: "topNavItemLi"},
				];
			} else if (session.belongsTo('Gameadmin') || session.belongsTo('Admin')) {
				topNavData = [ // Array with menu item objects
					{title: "Gamecenter", componentpath: "/components/gamecenter/gamecenter.waComponent", menucomponentpath: "/components/gamecenter/gamecenterMenu.waComponent", topNavItemImagePath: "/images/Medical_Office.png", topNavItemId: "navGamecenter", topNavItemClass: "topNavItemLi topNavItemSelected"},
					{title: "Gamer", componentpath: "/components/gamer/gamerGame.waComponent", menucomponentpath: "/components/gamer/gamerMenu.waComponent", topNavItemImagePath: "/images/Medical_Office.png", topNavItemId: "navGamer", topNavItemClass: "topNavItemLi"},
					{title: "Gamehost", componentpath: "/components/gamehost/gamehostHome.waComponent", menucomponentpath: "/components/gamehost/gamehostMenu.waComponent", topNavItemImagePath: "/images/User_Dentist.png", topNavItemId: "navGamehost", topNavItemClass: "topNavItemLi"},
					{title: "Admin", componentpath: "/components/administrator/administratorHome.waComponent", menucomponentpath: "/components/administrator/adminMenu.waComponent", topNavItemImagePath: "/images/User_Dentist.png", topNavItemId: "navAdmin", topNavItemClass: "topNavItemLi"}
				];
			} else {
				topNavData = [];
			}
			break;
		default:
			if (session.belongsTo('Gamer')) {
				topNavData = [ // Array with menu item objects
					{title: "Spielzentrum", componentpath: "/components/gamecenter/gamecenter.waComponent", menucomponentpath: "/components/gamecenter/gamecenterMenu.waComponent", topNavItemImagePath: "/images/Medical_Office.png", topNavItemId: "navGamecenter", topNavItemClass: "topNavItemLi topNavItemSelected"},
					{title: "Spieler", componentpath: "/components/gamer/gamerGame.waComponent", menucomponentpath: "/components/gamer/gamerMenu.waComponent", topNavItemImagePath: "/images/Medical_Office.png", topNavItemId: "navGamer", topNavItemClass: "topNavItemLi"}
				];
			} else if (session.belongsTo('Gamehost')) {
				topNavData = [ // Array with menu item objects
					{title: "Spielzentrum", componentpath: "/components/gamecenter/gamecenter.waComponent", menucomponentpath: "/components/gamecenter/gamecenterMenu.waComponent", topNavItemImagePath: "/images/Medical_Office.png", topNavItemId: "navGamecenter", topNavItemClass: "topNavItemLi topNavItemSelected"},
					{title: "Spieler", componentpath: "/components/gamer/gamerGame.waComponent", menucomponentpath: "/components/gamer/gamerMenu.waComponent", topNavItemImagePath: "/images/Medical_Office.png", topNavItemId: "navGamer", topNavItemClass: "topNavItemLi"},
					{title: "Spielleiter", componentpath: "/components/gamehost/gamehostHome.waComponent", menucomponentpath: "/components/gamehost/gamehostMenu.waComponent", topNavItemImagePath: "/images/User_Dentist.png", topNavItemId: "navGamehost", topNavItemClass: "topNavItemLi"},
				];
			} else if (session.belongsTo('Gameadmin') || session.belongsTo('Admin')) {
				topNavData = [ // Array with menu item objects
					{title: "Spielzentrum", componentpath: "/components/gamecenter/gamecenter.waComponent", menucomponentpath: "/components/gamecenter/gamecenterMenu.waComponent", topNavItemImagePath: "/images/Medical_Office.png", topNavItemId: "navGamecenter", topNavItemClass: "topNavItemLi topNavItemSelected"},
					{title: "Spieler", componentpath: "/components/gamer/gamerGame.waComponent", menucomponentpath: "/components/gamer/gamerMenu.waComponent", topNavItemImagePath: "/images/Medical_Office.png", topNavItemId: "navGamer", topNavItemClass: "topNavItemLi"},
					{title: "Spielleiter", componentpath: "/components/gamehost/gamehostHome.waComponent", menucomponentpath: "/components/gamehost/gamehostMenu.waComponent", topNavItemImagePath: "/images/User_Dentist.png", topNavItemId: "navGamehost", topNavItemClass: "topNavItemLi"},
					{title: "Admin", componentpath: "/components/administrator/administratorHome.waComponent", menucomponentpath: "/components/administrator/adminMenu.waComponent", topNavItemImagePath: "/images/User_Dentist.png", topNavItemId: "navAdmin", topNavItemClass: "topNavItemLi"}
				];
			} else {
				topNavData = [];
			}
	}

	
	// Return array with menu items
	return topNavData;
	
};
