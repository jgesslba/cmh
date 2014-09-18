
(function Component (id) {// @lock

// Add the code that needs to be shared between components here

function constructor (id) {

	// @region beginComponentDeclaration// @startlock
	var $comp = this;
	this.name = 'administratorUserAdmin';
	// @endregion// @endlock

	this.load = function (data) {// @lock

	// @region namespaceDeclaration// @startlock
	var fileUploadPassPhoto = {};	// @fileUpload
	// @endregion// @endlock

	// eventHandlers// @lock

	fileUploadPassPhoto.filesUploaded = function fileUploadPassPhoto_filesUploaded (event)// @startlock
	{// @endlock
		// Add your code here
		//$comp.sources.user.serverRefresh();
		//var currentPerson = $comp.sources.user.getCurrentElement();
		//console.log(currentPerson.photo);
	};// @lock

	// @region eventManager// @startlock
	WAF.addListener(this.id + "_fileUploadPassPhoto", "filesUploaded", fileUploadPassPhoto.filesUploaded, "WAF");
	// @endregion// @endlock

	};// @lock


}// @startlock
return constructor;
})();// @endlock
