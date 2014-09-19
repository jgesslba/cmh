WAF.define('WakendoSlider', ['waf-core/widget', 'wakendoCore'], function(widget, $) {
    'use strict';

    var KendoSlider = widget.create('WakendoSlider', {
    	
    	value: widget.property({
    		type: 'number'
    	}),
    	
    	min: widget.property({
    		type: 'number',
    		defaultValue: 0
    	}),
    	
    	max: widget.property({
    		type: 'number',
    		defaultValue: 100
    	}),
    	
    	smallStep: widget.property({
    		type: 'number',
    		defaultValue: 1
    	}),
    	
    	largeStep: widget.property({
    		type: 'number',
    		defaultValue: 2
    	}),
    	
    	showButtons: widget.property({
    		type: 'boolean',
    		defaultValue: true
    	}),
    	
    	orientation: widget.property({
    		type: 'enum',
    		values: ['horizontal', 'vertical'],
    		defaultValue: 'horizontal'
    	}),
    	
    	_bindListeners: function() {
    		var self = this;
        	self.valueChangeSubscriber = self.value.onChange(function(newValue) {
        		self.kendoWidget.value(newValue);
        	});
        	self.min.onChange(self.render);
        	self.max.onChange(self.render);
        	self.smallStep.onChange(self.render);
        	self.largeStep.onChange(self.render);
        	self.showButtons.onChange(self.render);
        	self.orientation.onChange(self.render);
    	},
    	
        init: function() {
        	var self = this;

			self._bindListeners();
        	self.render();
        },
        
        render: function() {
        	var self = this;
        	$(self.node).empty();
			var $el = $('<input />').appendTo(self.node);
			
    		$el.kendoSlider({
    			min: self.min(),
    			max: self.max(),
    			smallStep: self.smallStep(),
    			largeStep: self.largeStep(),
    			showButtons: self.showButtons(),
    			orientation: self.orientation(),
        		change: function(event) {
        			self.valueChangeSubscriber.pause();
        			self.value(event.value);
        			self.valueChangeSubscriber.resume();
        		}
        	});
			self.kendoWidget = $el.data("kendoSlider");
		      	
        },

        enable: function() {
        	this.kendoWidget.enable();
        },

        disable: function() {
        	this.kendoWidget.enable(false);
        }
        
    });

    return KendoSlider;

});
