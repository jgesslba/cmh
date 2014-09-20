WAF.define('WakendoDateTimePicker', ['waf-core/widget', 'wakendoCore', 'kendoHelpers'], function(widget, $, helpers) {
	'use strict';
	
    var KendoDateTimePicker = widget.create('WakendoDateTimePicker', {
    	value: widget.property({
    		type: 'string'
    	}),
    	
        init: function() {
        	var self = this;

        	self.valueChangeSubscriber = self.value.onChange(function(newValue) {
        		newValue = helpers.toDate(newValue);
        		self.kendoWidget.value(newValue);
        	});
        	self.render();
        },
        
        render: function() {
        	var self = this;	
        	$(self.node).empty();
			var $el = $('<input />').appendTo(self.node);
			
        	$el.kendoDateTimePicker({
        		change: function(event) {
        			self.valueChangeSubscriber.pause();
        			self.value(self.kendoWidget.value().toString());
        			self.valueChangeSubscriber.resume();
        		}
        	});
        	
        	self.kendoWidget = $el.data("kendoDateTimePicker");			        	
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


    return KendoDateTimePicker;

});
