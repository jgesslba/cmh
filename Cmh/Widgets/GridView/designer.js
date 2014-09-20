(function(GridView) {

//    /* Default width and height of your widget */
//    GridView.setWidth('200');
//    GridView.setHeight('20');

//    /* Define custom event for your widget */
//    GridView.addEvent('myEvent');

//    /* Customize existing properties */
//    GridView.customizeProperty('test', {
//        sourceTitle: 'Test Source',
//        title: 'Test Static Value',
//        description: 'Add a datasource to this property.'
//    });

//    /* Add a Label property */
    GridView.addLabel({
        'defaultValue': 'GridView',
        'position': 'top'
    });

//    /* Set the Design and Styles panels */
//    GridView.setPanelStyle({
//        'fClass': true,
//        'text': true,
//        'background': true,
//        'border': true,
//        'sizePosition': true,
//        'label': true,
//        'disabled': ['border-radius']
//    });
GridView.addStructure({
	            description: 'header',
	            selector: '.vr-widget-grid-row-header',
	            style: {
	                text: true,
	                textShadow: true,
	                background: true,
	                border: true
	           }
	        });
	        
	        GridView.addStructure({
	            description: 'footer',
	            selector: '.vr-widget-grid-footer',
	            style: {
	                text: true,
	                textShadow: true,
	                background: true,
	                border: true
	           }
	        });
	        
	        GridView.addStructure({
	            description: 'row alt',
	            selector: '.vr-widget-grid-row-alt',
	            style: {
	                text: true,
	                textShadow: true,
	                background: true,
	                border: true
	           }
	        });
	        
	         GridView.addStructure({
	            description: 'row even',
	            selector: '.vr-widget-grid-row-even',
	            style: {
	                text: true,
	                textShadow: true,
	                background: true,
	                border: true
	           }
	        });
	        
	        //events
	        
			GridView.addEvent({
			    'name': 'cellDrawn',
			    'description': 'On Cell Draw',
			    'category': 'draw events'
			});
			GridView.addEvent({
			    'name': 'rowDoubleClick',
			    'description': 'On Row Double Click',
			    'category': 'click events'
			});

			GridView.addEvent({
			    'name': 'rowSingleClick',
			    'description': 'On Row Single Click',
			    'category': 'click events'
			});

			GridView.addEvent({
			    'name': 'rowRightClick',
			    'description': 'On Row Right Click',
			    'category': 'click events'
			});
			
			GridView.addEvent({
			    'name': 'headerClick',
			    'description': 'On Header Click',
			    'category': 'click events'
			});

});

// For more information, refer to http://doc.wakanda.org/Wakanda0.DevBranch/help/Title/en/page3870.html
