WAF.define('WakendoPaletteColorPicker', ['waf-core/widget', 'wakendoCore'], function(widget, $) {
	'use strict';
	
    var KendoPaletteColorPicker = widget.create('WakendoPaletteColorPicker', {

    	value: widget.property({
    		type: 'string'
    	}),
		
		paletteColors: widget.property({
			type: 'list',
			attributes: ['color']
		}),
    	
        init: function() {
        	var self = this;

        	self.valueChangeSubscriber = self.value.onChange(function(newValue) {
        		self.kendoWidget.value(newValue);
        	});
        	self.paletteColors.onChange(self.render);
        	
        	self.render();
        },
        
        _getPaletteColors: function() {
        	var self = this;
        	var colors = self.paletteColors();
        	if (!colors.length) return undefined;
        	
        	return colors.map(function(color) {
        		return color.color;
        	});
        },
        
        render: function() {
        	var self = this;
        	$(self.node).empty();
        	
			var paletteColors = self._getPaletteColors();
			
			var $el = $(self.node);
    		$el.kendoColorPalette({
    			palette: paletteColors,
        		change: function(event) {
        			self.valueChangeSubscriber.pause();
        			self.value(event.value);
        			self.valueChangeSubscriber.resume();
        		}
        	});     	
			self.kendoWidget = $el.data("kendoColorPalette");
        			        	
        },

        enable: function() {
        	this.kendoWidget.enable();
        },

        disable: function() {
        	this.kendoWidget.enable(false);
        }

    });



    return KendoPaletteColorPicker;

});
