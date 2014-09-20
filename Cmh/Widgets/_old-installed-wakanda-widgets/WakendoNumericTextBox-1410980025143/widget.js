WAF.define('WakendoNumericTextBox', ['waf-core/widget', 'wakendoCore'], function(widget, $) {
	'use strict';
		
    var KendoNumericTextBox = widget.create('WakendoNumericTextBox', {

    	value: widget.property({
    		type: 'number'
    	}),
    	
    	min: widget.property({
    		type: 'number'
    	}),
    	
    	max: widget.property({
    		type: 'number'
    	}),
    	
    	step: widget.property({
    		type: 'number',
    		defaultValue: 1
    	}),
    	
    	format: widget.property({
    		type: 'string',
    		defaultValue: 'n'
    	}),
    	
        init: function() {
        	var self = this;
			self.bindPropsChange();
        	self.render();
        },
        
        bindPropsChange: function() {
        	var self = this;
        	
			self.min.onChange(self.render);
			self.max.onChange(self.render);
			self.step.onChange(self.render);
			self.format.onChange(self.render);
        	self.valueChangeSubscriber = self.value.onChange(function(newValue) {
        		self.kendoWidget.value(newValue);
        	});
        				     	
        },
        
        render: function() {
        	var self = this;	
        	$(self.node).empty();
			var $el = $('<input />').appendTo(self.node);
       	
        	$el.kendoNumericTextBox({
        		min: self.min(),
        		max: self.max(),
        		self: self.step(),
        		format: self.format(),
        		value: self.value(),
        		change: function() {
        			self.valueChangeSubscriber.pause();
        			self.value(self.kendoWidget.value());
        			self.valueChangeSubscriber.resume();
        		}
        	});
        	
        	self.kendoWidget = $el.data("kendoNumericTextBox");
        },

        focus: function() {
        	this.kendoWidget.focus();
        },

        enable: function() {
        	this.kendoWidget.enable();
        },

        disable: function() {
        	this.kendoWidget.enable(false);
        }

    });


    return KendoNumericTextBox;

});

