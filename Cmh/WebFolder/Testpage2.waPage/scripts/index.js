
WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
	var bla = {};	// @htmlTag
	var a = {};	// @htmlTag
// @endregion// @endlock

// eventHandlers// @lock

	bla.click = function bla_click (event)// @startlock
	{// @endlock
		// Add your code here
		console.log("test");
	};// @lock

	a.click = function a_click (event)// @startlock
	{// @endlock
		alert("Hallo");
	};// @lock

// @region eventManager// @startlock
	WAF.addListener("bla", "click", bla.click, "html");
	WAF.addListener("a", "click", a.click, "html");
// @endregion
};// @endlock
