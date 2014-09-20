WAF.define('GridView', ['waf-core/widget'], function(widget) {
	
    var GridView = widget.create('GridView', {
    	
    	
    	gridColumns : widget.property({
			type: 'list',
			attributes: ['label', 'attribute', 'colSize'],
			onInsert : function(x){
				this.build();
			}, onModify : function (x){
				this.build();
				
			}, onRemove : function (x){
				this.build();
				
			}
			
			
		}),	
		gridDataSource: widget.property({
			type: 'datasource',
			onChange : function(x){
				this.build();
			}
		}),
		allowClickAndHighlight: widget.property({
			type : "boolean",
    		defaultValue:true,
    		bindable: false,
			onChange : function(x){
				this.build();
			}
		}),
		readOnly: widget.property({
			type : "boolean",
    		defaultValue:true,
    		bindable: false,
			onChange : function(x){
				this.build();
			}
		}),
		autoSave: widget.property({
			type : "boolean",
    		defaultValue:false,
    		bindable: false,
			onChange : function(x){
				this.build();
			}
		}),
		refreshAfterAutoSave: widget.property({
			type : "boolean",
    		defaultValue:false,
    		bindable: false,
			onChange : function(x){
				this.build();
			}
		}),
		headerHeight: widget.property({
			type : "integer",
    		defaultValue: 30,
    		bindable: false,
			onChange : function(x){
				this.build();
			}
		}),
		getDataScrollDelay: widget.property({
			type : "integer",
    		defaultValue: 100,
    		bindable: false
		}),
		gridMultiselect: widget.property({
			type : "boolean",
    		defaultValue: true,
    		bindable: false,
			onChange : function(x){
				this.build();
			}
		}),
		rowHeight: widget.property({
			type : "integer",
    		defaultValue: 25,
    		bindable: false,
			onChange : function(x){
				this.build();
			}
		}),
		footerHeight: widget.property({
			type : "integer",
    		defaultValue: 30,
    		bindable: false,
			onChange : function(x){
				this.build();
			}
		}),
		lockedColumns: widget.property({
			type : "integer",
    		defaultValue: 0,
    		bindable: false,
			onChange : function(x){
				this.build();
			}
		}),
    	build : function(){
 			var that = this;
   		
    		$("#"+this.id).html("");
    		
    			//params object set to my object
				var params = {};
				
				//get ID
				params.id = this.id;
				
				
				
				//row header and footer heighs
				params.headerHeight = this.headerHeight();
				params.footerHeight = this.footerHeight();
				params.rowHeight = this.rowHeight();
				params.lockedColumns = this.lockedColumns();
				
				
				
				//set datasource and selection
				params.isMultiSelect = this.gridMultiselect();
				params.allowClickAndHighlight = this.allowClickAndHighlight();
				params.readOnly = this.readOnly();
				params.autoSave = this.autoSave();
				params.refreshAfterAutoSave = this.refreshAfterAutoSave();
				
				//if in studio use fake dataprovider
				if (window.Designer) {
					params.source = fakeDataProvider;				
				} else {
					//during runtime, we wanto know if datasource is set
					if(this.gridDataSource() === null || this.gridDataSource() === undefined){
						params.source = fakeDataProvider;
						params.missingDataSource = true;
					} else {
						params.source = this.gridDataSource();
						params.missingDataSource = false;
					}
				}
				
				//column cells/headers and data get delay    
				params.colHeaderNames=[];
				params.colAttributes=[];
				params.colSize =[];
				params.getDataScrollDelay = this.getDataScrollDelay();
				
				//fill arrays
				for(var i = 0; i < this.gridColumns().length; i++){
					if(this.gridColumns(i) !== undefined){
						params.colHeaderNames.push(this.gridColumns(i).label);
							
							if(parseInt(this.gridColumns(i).colSize).toString() !== "NaN"){
								params.colSize.push(this.gridColumns(i).colSize)
							} else {
								params.colSize.push(100)
							}
							params.colAttributes.push(this.gridColumns(i).attribute)
					}	
				}
				
				
				
				//events
				
				//need this for passing it back to studio
				params.widget = this;
								
				params.cellDraw = function(columnNo, attributeName, div, data, entity){
					 that.fire('cellDrawn', {
                    	columnNo: columnNo, attributeName : attributeName, div : div, data:data, entity: entity, readOnly:that.readOnly(), autoSave:that.autoSave()
                	});		
				};		
				params.rowDoubleClick = function(){
					 that.fire('rowDoubleClick');		
				};
				params.rowSingleClick = function(){
					 that.fire('rowSingleClick');		
				};
				params.rowRightClick = function(){
					 that.fire('rowRightClick');		
				};
				params.headerClick = function(headerAttribute){
					 that.fire('headerClick', {
					 	headerAttribute: headerAttribute, dataSource: that.gridDataSource()});		
				};
				

				
		
				//create it
				var grid = new VRGridView(params);
    		
    		
    	},
    	
    	
        init: function() {
			this.build();
        }
    });

    return GridView;
    
    
   

});

/* For more information, refer to http://doc.wakanda.org/Wakanda0.DevBranch/help/Title/en/page3871.html */
