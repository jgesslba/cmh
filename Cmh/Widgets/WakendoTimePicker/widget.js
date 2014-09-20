WAF.define('WakendoTimePicker', ['waf-core/widget', 'wakendoCore'], function(widget, $) {
	'use strict';
		
    var KendoTimePicker = widget.create('WakendoTimePicker', {

    	value: widget.property({
    		type: 'string'
    	}),
    	
        init: function() {
        	var self = this;

        	self.valueChangeSubscriber = self.value.onChange(function(newValue) {
        		self.kendoWidget.value(newValue);
        	});
        	self.render();
        },
        
        render: function() {
        	var self = this;	
        	$(self.node).empty();
			var $el = $('<input />').appendTo(self.node);
			
        	$el.kendoTimePicker({
        		change: function(event) {
        			var value = self.kendoWidget.value();
        			self.valueChangeSubscriber.pause();
        			self.value(value.toString());
        			self.valueChangeSubscriber.resume();
        		}
        	});
        	
        	self.kendoWidget = $el.data("kendoTimePicker");			        	
        },

        open: function() {
        	this.kendoWidget.open();
        },

        close: function() {
        	this.kendoWidget.close();
        },

        enable: function() {
        	this.kendoWidget.enable();
        },

        disable: function() {
        	this.kendoWidget.enable(false);
        }

    });

    return KendoTimePicker;

});
