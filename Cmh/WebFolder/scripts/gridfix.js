﻿// ##### WIDGETS WORKAROUND #####// Workaround for grid column widthvar fixGridHeaderWidth = function () {		$(".waf-dataGrid").each(function(index) {			var columnsNumber = waf.widgets[this.id].columns().length;	  		waf.widgets[this.id].$domNode.find("div.waf-dataGrid-cell").slice(0, columnsNumber - 1).each(function(index) {	    		var newWidth = parseInt(this.style.width.split("px")[0]) - 1;	      		this.style.width = newWidth + "px";        });    });};