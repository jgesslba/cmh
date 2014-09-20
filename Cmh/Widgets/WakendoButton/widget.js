WAF.define('WakendoButton', ['waf-core/widget', 'wakendoCore'], function(widget, $) {
	'use strict';
		
    var KendoButton = widget.create('WakendoButton', {
    	   	
    	primary: widget.property({
    		type: 'boolean',
    		defaultValue: true
    	}),
    	
    	text: widget.property({
    		type: 'string',
    		defaultValue: 'Button'
    	}),
    	
    	icon: widget.property({
    		type: 'enum',
			values: {
				'_none': 'None',
				'arrow-n': 'Arrow Up',
				'arrow-e': 'Arrow Right',
				'arrow-s': 'Arrow Down',
				'arrow-w': 'Arrow Left',
				'seek-n': 'Seek Up',
				'seek-e': 'Seek Right',
				'seek-s': 'Seek Down',
				'seek-w': 'Seek Left',
				'arrowhead-n': 'Arrow Head Up',
				'arrowhead-e': 'Arrow Head Right',
				'arrowhead-s': 'Arrow Head Down',
				'arrowhead-w': 'Arrow Head Left',
				'expand': 'Expand',
				'expand-w': 'Expand Left',
				'collapse': 'Collapse',
				'collapse-w': 'Collapse Left',
				'plus': 'Plus',
				'tick': 'Tick',
				'close': 'Close',
				'pencil': 'Pencil',
				'cancel': 'Cancel',
				'funnel': 'Funnel',
				'funnel-clear': 'Funnel Clear',
				'calendar': 'Calendar',
				'clock': 'Clock',
				'search': 'Search',
				'refresh': 'Refresh',
				'restore': 'Restore Window',
				'maximize': 'Maximize Window',
				'minimize': 'Minimize Window',
				'custom': 'Customize',
				'insert-n': 'Insert up',
				'insert-m': 'Insert middle',
				'insert-s': 'Insert down',
				'note': 'Note',
				'folder-add': 'Add folder',
				'folder-up': 'Parent folder'
			}
    	}),
    	
    	
        init: function() {
        	var self = this;
			
		self.primary.onChange(self.render);
		self.text.onChange(self.render);
		self.icon.onChange(self.render);
        	
        	self.render();
        },
        
        render: function() {
        	var self = this;
        	$(self.node).empty();
        	
			var $el = $('<button type="button">' + self.text() + '</button>').appendTo(self.node);
			if (self.primary()) {
				$el.addClass('k-primary');
			}
			
			var options = {
				icon: self.icon(),
				click: function() {
					self.fire('click');
				}
			};
			
			if (self.icon() === '_none') {
				delete options.icon;
			}
			
        	var $el = $(self.node);
		$el.kendoButton(options);
        },

        enable: function() {
        	this.kendoWidget.enable();
        },

        disable: function() {
        	this.kendoWidget.enable(false);
        }

    });

    return KendoButton;

});

