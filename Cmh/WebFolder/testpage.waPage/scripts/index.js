
WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
	var loadComponent3 = {};	// @button
	var loadComponent2 = {};	// @button
	var loadComponent1 = {};	// @button
	var documentEvent = {};	// @document
// @endregion// @endlock

// eventHandlers// @lock

	loadComponent3.click = function loadComponent3_click (event)// @startlock
	{// @endlock
		$$("component1").loadComponent("/components/gamer/management/gamerManagementHome.waComponent");
	};// @lock

	loadComponent2.click = function loadComponent2_click (event)// @startlock
	{// @endlock
		$$("component1").loadComponent("/components/gamer/nursing/gamerNursingHome.waComponent");
	};// @lock

	loadComponent1.click = function loadComponent1_click (event)// @startlock
	{// @endlock
		$$("component1").loadComponent("/components/gamer/radiology/gamerRadiologyHome.waComponent");
	};// @lock

	documentEvent.onLoad = function documentEvent_onLoad (event)// @startlock
	{// @endlock
		$$("component1").loadComponent();
	};// @lock

// @region eventManager// @startlock
	WAF.addListener("loadComponent3", "click", loadComponent3.click, "WAF");
	WAF.addListener("loadComponent2", "click", loadComponent2.click, "WAF");
	WAF.addListener("loadComponent1", "click", loadComponent1.click, "WAF");
	WAF.addListener("document", "onLoad", documentEvent.onLoad, "WAF");
// @endregion
};// @endlock
