(function(ModalDialog) {

    /* Default width and height of your widget */
    ModalDialog.setWidth('400');
    ModalDialog.setHeight('250');

    /* Set the Design and Styles panels 
     * Only drop shadow is activate
     * I wait for the Wakanda V9 where we can have 
	 * more complex structure for our custom widget
    */
    ModalDialog.setPanelStyle({
        'fClass': false,
        'text': false,
        'background': false,
        'border': false,
        'sizePosition': false,
        'label': false,
        'textShadow': false,
        'dropShadow': true,
        'innerShadow': false,
    });
    
    /* Add the title for the 2 property */
    
    ModalDialog.customizeProperty('title', {
	    title: 'Title'
	});
	
	ModalDialog.customizeProperty('text', {
	    title: 'Text'
	});
	
	ModalDialog.customizeProperty('validButtonText', {
	    title: 'Validation Button Text'
	});
	
	/* Add the onClick event for the validation button in the GUI event panel*/
	ModalDialog.addEvent({
	    'name':'onValidClick',
	    'description':'On Click',
	    'category':'Validation Button'
	});
	
	/* remove the change event added by default when we add a property */
	ModalDialog.removeEvent('change');

    /* Override widget's initialization
     * Create the html tag to have the same look in the GUI Designer.
     *
     */
    ModalDialog.prototype.init = function() {
  		
		this.node.innerHTML = '<div id="'+this.id+'-header" class="modalDialogHeader"><div id="'+this.id+'-title" class="modalDialogTitle"></div><button id="'+this.id+'-closeDialogButton" class="modalDialogCloseButton"></button></div>'+
			'<div id="'+this.id+'-main" class="modalDialogMain"></div>'+
			'<div id="'+this.id+'-footer" class="modalDialogFooter"><button id="'+this.id+'-cancelDialogButton" class="modalDialogCancelButton">Cancel</button><button id="'+this.id+'-validDialogButton" class="modalDialogValidButton">Valid</button></div>';
		
		/*
		* This is to set the title and the text for the initialization in the GUI Designer
		*/
		$('#'+this.id+'-main').text(this.text());
		$('#'+this.id+'-title').text(this.title());
		$('#'+this.id+'-validDialogButton').text(this.validButtonText());
	}

});

// For more information, refer to http://doc.wakanda.org/Wakanda0.DevBranch/help/Title/en/page3870.html