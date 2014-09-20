//helper for getting top
jQuery.fn.cssNumber = function(prop) {
    var v = parseInt($(this).context.style.top, 10);
    return isNaN(v) ? 0 : v;
};



/******************************************************************************************************************
 this is my main object for widget
 *******************************************************************************************************************/
function VRGridView(params) {
    
    
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//OBJECT VARS
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    this.id = params.id;
    this.params = params;
    
    //class stings
    this.html_$WidgetIdString = "#" + this.id;
    this.html_bodyClassString = "vr-widget-grid-body";
    this.html_scrollBodyClassString = "vr-widget-grid-body-scroll";

    //cached divs
    this.$cache_rowDivsArray = [];
    this.$cache_scrollBodyDiv = null;

    //helpers for scroll events
    this.scrollVar_lastScrollTop = 0;
    this.scrollVar_firstRowTop = 0;
    this.scrollVar_lastRowTop = 0;
    this.scrollVar_updateDataTimer = null;
    this.scrollVarArray_setToUpdate = [];
    this.scrollVarArray_oldRowNumber = [];
    
    this.scrollVar_firstRow_LastOnUpdate = 0;
    this.scrollVar_lastRow_LastOnUpdate = 0;
	this.scrollVar_dataLoader = false;
	this.scrollVar_hozScroll = 0;
	
	
    //helpers for click events
    this.clickVar_lastKeyKodeUsed = null;
    this.clickVar_lastRowSelected = null;
    this.clickVar_onClicked = false;
    this.clickVar_clickTimeOut = null;
    this.clickVar_stopRowChange = false;

    //html template for row
    this.templateVar_rowHtml = null;

    //if in wakanda studio or not
    this.isStudio = true;

    //datasource page size
    this.dataSourcePageSize = 40;
    
    //future stuff/do not delete since click passes it atm
    this.userDataSaveHeaderClick = {};

    //vars used to help resizing
    this.resizeVar_resizeStartWidth = null;
    this.resizeVar_resizeMinWidth = null;

	//var for datasource listen id, need this to remove it when "component etc gets removed"
	this.dataSourceListenID = null;


    /**************************************************************************************************
    	What is recived from params, so you know it, it can easly be used without waf, just use the fakedataprovider (might need some updating after .scrollVar_lastRowTopcommits...
     ****************************************************************************************************/
    //				params.id ="string"	//id of DIV grid will be built in
    //				params.headerHeight = number
    //				params.footerHeight = number
    //				params.rowHeight = number
    //				params.source = fakeDataProvider; //datasource if not studio
    //				params.allowClickAndHighlight= //allows user to doubleclick and highlight text
    //				params.readOnly= true/false //sets it to read only, sets back cell value
    //				params.autoSave= true/false //calls autosave on datasource
    //				params.refreshAfterAutoSave= true/false //calls serverRefresh after save
    //				params.missingDataSource = true/false	//set to FALSE , more so I know if user have forgot it
    //		        params.isMultiSelect = true/false	//sets datasource to single/multi
    //				params.colHeaderNames=[];	//this get rebuild during sort of columns
    //				params.colAttributes=[];	//this get rebuild during sort of columns
    //				params.colSize =[];	//this get rebuild during resize of columns
    //				params.getDataScrollDelay = number/millisec		//default should be 100, no need for lower (this is delay for big scrolls)
    //				params.cellDraw = function(columnNo, attributeName, div, data, entity){
    //                	});
    //					};
    //					params.rowDoubleClick = function(){
    //
    //					};
    //					params.rowSingleClick = function(){
    //
    //					};
    //					params.rowRightClick = function(){
    //
    //					};





	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//MAIN HTML FUNCTIONS
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////






    /**************************************************************************************************
     Add html in correct order
     This is called from the init function of grid object
     Will also be called from the rebuild function when that is made
     ****************************************************************************************************/
    this.addHtml = function(that) {
        that.addHtml_Header(that);
        that.addHtml_body(that);
        that.addHtml_Rows(that);
        that.addHtml_Footer(that);
        that.createTemplates(that);
    };



    /**************************************************************************************************
     Adds the header div
     ****************************************************************************************************/
    this.addHtml_Header = function(that) {
        //var output = Mustache.render(that.params.headerTemplate);
        $(that.html_$WidgetIdString).append('<div class="vr-widget-grid-header" style = "width:' + that.utilHtml_calculateColumnMinWidth(that) + 'px; height:' + that.params.headerHeight + 'px"><div class="vr-widget-grid-row-header" style="height:' + that.params.headerHeight + 'px"></div></div>');
    };


    /**************************************************************************************************
     Adds the footer div
     ****************************************************************************************************/
    this.addHtml_Footer = function(that) {
        var output = Mustache.render(that.params.footerTemplate);
        $(that.html_$WidgetIdString).append('<div class="vr-widget-grid-footer" style = "width:' + that.utilHtml_calculateColumnMinWidth(that) + '; height:' + that.params.footerHeight + 'px">' + output + '</div>');
    };



    /**************************************************************************************************
     Add body and scroll body
     Creates basic grid buildup
     ****************************************************************************************************/
    this.addHtml_body = function(that) {
        //get grid height
        var gridHeight = $(that.html_$WidgetIdString).height();
        //calc body height
        var bodyHeight = gridHeight - (that.params.headerHeight + that.params.footerHeight);
        //create body
        var body = $('<div class="vr-widget-grid-body" style = "width:100%; height:' + bodyHeight + 'px">');
        //create scrollbody
        that.$cache_scrollBodyDiv = $('<div class="' + that.html_scrollBodyClassString + '" style = "width:100%; height:' + 0 + 'px">');
        //add body to widget
        $(that.html_$WidgetIdString).append(body);
        //add scrollbody to "body"
        $(body).append(that.$cache_scrollBodyDiv);
        //calc scrollbody height
        that.utilHtml_setScrollBodyHeight(that);
    };




    /**************************************************************************************************
     Add the rows to body that onscroll will adjust top values on when scrolling
     ****************************************************************************************************/
    this.addHtml_Rows = function(that) {
        //get grid height
        var gridHeight = $(that.html_$WidgetIdString).height();
        //calc body height
        var bodyHeight = gridHeight - (that.params.headerHeight + that.params.footerHeight);
        //get rows needed
        var rowsNeeded = Math.round((Math.floor(bodyHeight / that.params.rowHeight)) / 2);
        //make sure its in pair
        if (rowsNeeded % 2 === 1) {
            rowsNeeded = rowsNeeded + 1;
        }
        else {
            rowsNeeded = rowsNeeded + 2;
        }
        //Add rows
        var u = 0;
        var top = 0;
        for (var i = 0; i < rowsNeeded; i++) {
            var rowAlt = $('<div class="vr-widget-grid-row vr-widget-grid-row-alt update row' + u + '" style = "width:' + that.utilHtml_calculateColumnMinWidth(that) + 'px;height:' + that.params.rowHeight + 'px; top:' + top + 'px">' + ' </div>');
            that.$cache_rowDivsArray.push(rowAlt[0]);
            that.scrollVarArray_oldRowNumber.push(-1);

            top = top + that.params.rowHeight;
            $(that.$cache_scrollBodyDiv).append(rowAlt);
            u++;

            var rowEven = $('<div class="vr-widget-grid-row vr-widget-grid-row-even update row' + u + '" style = "width:' + that.utilHtml_calculateColumnMinWidth(that) + 'px;height:' + that.params.rowHeight + 'px; top:' + top + 'px">' + ' </div>');
            that.$cache_rowDivsArray.push(rowEven[0]);
            that.scrollVarArray_oldRowNumber.push(-1);

            top = top + that.params.rowHeight;
            $(that.$cache_scrollBodyDiv).append(rowEven);
            u++
        }
        that.scrollVar_lastRowTop = top - that.params.rowHeight;
    };




    /**************************************************************************************************
     Add header and row cells templates
     ****************************************************************************************************/
    this.createTemplates = function(that) {
        this.createTemplates_Header(that);
        this.createTemplates_Row(that);
    };



    /**************************************************************************************************
     Create header template
     TODO: should maybe add a event here for each column so developer can edit cells?
     ****************************************************************************************************/
    this.createTemplates_Header = function(that) {
        var headerTemplate = "";
        for (var i = 0; i < that.params.colHeaderNames.length; i++) {
            headerTemplate = headerTemplate + '<div class="vr-widget-grid-row-cell-header headerColumn' + i + ' ' + that.params.colHeaderNames[i] + 'Title" dataSourceAttribute="' + that.params.colAttributes[i] + '" style="width:' + that.params.colSize[i] + 'px">' + '<div class="contentHeader">' + that.params.colHeaderNames[i] + '</div><div class="vr-widget-grid-row-cell-header-menubutton"></div></div>';
        }
        $(that.html_$WidgetIdString + " .vr-widget-grid-row-header").html(headerTemplate);
    };


    /**************************************************************************************************
     Create rowTemplate
     Basicly just builds up the template that is realy for mustasje
     ****************************************************************************************************/
    this.createTemplates_Row = function(that) {
        var rowCellsTemplateData = "";
        var singleTemplateData = "";
        //Todo: make option to use object template for more advance templates
        for (var i = 0; i < that.params.colAttributes.length; i++) {
            singleTemplateData = '<div class="vr-widget-grid-row-cell column' + i + '" style="width:' + that.params.colSize[i] + 'px"><div class="content" dataSourceAttribute="' + that.params.colAttributes[i] + '">{{' + that.params.colAttributes[i] + '}}</div></div>';
            rowCellsTemplateData = rowCellsTemplateData + singleTemplateData;
        }
        that.templateVar_rowHtml = rowCellsTemplateData;
    };





	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//EVENT FUNCTIONS
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////




    /**************************************************************************************************
     This adds events needed, some are added again after resize/sortable events
     ****************************************************************************************************/
    this.addEvents = function(that) {
        that.addEvent_RowDoubleClick(that);
        that.addEvent_BodyScroll(that);
        that.addEvent_rowSingleClicks(that);
        that.addEvent_DatasourceListner(that);
        that.addEvent_ResizableColumns(that);
        that.addEvent_SortableColumns(that);
        that.addEvent_HeaderClick(that);
    };




	
    /**************************************************************************************************
     This adds event to onScroll and calls method to handle that
     ****************************************************************************************************/
    this.addEvent_BodyScroll = function(that) {
        $(that.html_$WidgetIdString + " ." + that.html_bodyClassString).scroll(function() {
            that.utilScroll_onScrolling(that);
        });
    };






    /**************************************************************************************************
     This adds event to on row click and calls method to handle that
     ****************************************************************************************************/
    this.addEvent_rowSingleClicks = function(that) {
        $(that.html_$WidgetIdString + " .vr-widget-grid-row").on("mousedown", function(e) {
            // Im I allowed to chnage row, we dont wanto do that before save or serverRefresh is done
            if (that.clickVar_stopRowChange === false) {
                setTimeout(function() {
                    that.utilHighLightRow_onRowClick(e, that);
                }, 150);
                if (e.button === 2) {
                    that.clickVar_clickTimeOut = setTimeout(function() {
                        that.params.rowRightClick();
                        that.clickVar_clickTimeOut = null;
                    }, 300);
                }
                else {
                    if (that.clickVar_clickTimeOut === null) {
                        that.clickVar_clickTimeOut = setTimeout(function() {
                            that.params.rowSingleClick();
                            that.clickVar_clickTimeOut = null;
                        }, 300);
                    }
                }
            }
        });
    };






    /**************************************************************************************************
     Add datasource listner
     ****************************************************************************************************/
    this.addEvent_DatasourceListner = function(that) {
        $(that.html_$WidgetIdString).on("remove", function(){
			that.params.source.removeListener({ID:that.dataSourceListenID});
		});

        that.dataSourceListenID = that.params.source.addListener("all", function(e) {
            switch (e.eventKind) {
            case "onCollectionChange":
                that.utilHtml_setScrollBodyHeight(that);
                if (that.params.source._private.isNewElem === true) {
                    var rowsHeight = that.params.source.length * that.params.rowHeight;
                    var gridHeight = $(that.html_$WidgetIdString).height();
                    var bodyHeight = gridHeight - (that.params.headerHeight + that.params.footerHeight);
                    //we dont want grid to scroll down if it does not haveto
                    if (rowsHeight > bodyHeight) {
                        $(that.html_$WidgetIdString + " ." + that.html_bodyClassString).scrollTop($(that.html_$WidgetIdString + " ." + that.html_scrollBodyClassString).height());
                    }
                    var sel = that.params.source.getSelection();
                    sel.select(that.params.source._private.currentElemPos);
                }
                else {
                    if (that.params.source.length > 0) {
                        var sel = that.params.source.getSelection();
                        sel.select(that.params.source._private.currentElemPos);
                    }
                }
                
                for( var i = 0; i < that.scrollVarArray_setToUpdate.length; i++){
                    that.scrollVarArray_setToUpdate[i] = true;
                }
                that.utilScroll_updateRowData_bigScroll(that, true)
                $(that.html_$WidgetIdString +" .vr-widget-grid-footer").html(that.params.source.length +" items");
                that.clickVar_lastRowSelected =0;
                //    that.utilHtml_setScrollBodyHeight(that);
                //    that.scrollVar_firstRowTop = -1;
                //    that.scrollVar_lastRowTop = -1;
                //    that.utilScroll_onScrolling(that, true);
                //}, 10);
                break;
            case "onCurrentElementChange":

                that.utilHtml_setScrollBodyHeight(that);
                if (that.clickVar_onClicked === false) {
                    sel = that.params.source.getSelection();
                    sel.select(that.params.source._private.currentElemPos);
                    that.utilScroll_setSelectedRow_bigScroll(that);


                    //so grid adjust scroll when datassource next/prev, first/last, create/remove
                    var rowHeight = that.params.source._private.currentElemPos * that.params.rowHeight;
                    var gridHeight = $(that.html_$WidgetIdString).height();
                    var bodyHeight = gridHeight - (that.params.headerHeight + that.params.footerHeight);
                    var scrolltop = $(that.html_$WidgetIdString + " ." + that.html_bodyClassString).scrollTop();
                    //we dont want grid to scroll down if it does not haveto
                    if (rowHeight < scrolltop || rowHeight > scrolltop + bodyHeight) {
                        var newScrolltop = rowHeight;
                        $(that.html_$WidgetIdString + " ." + that.html_bodyClassString).scrollTop(rowHeight);
                    }

                }
                //update all rows
                for( var i = 0; i < that.scrollVarArray_setToUpdate.length; i++){
                    that.scrollVarArray_setToUpdate[i] = true;
                }
				 that.utilScroll_updateRowData_bigScroll(that, true)
                break;
            case "onAttributeChange":
                that.utilHtml_setScrollBodyHeight(that);
                for( var i = 0; i < that.scrollVarArray_setToUpdate.length; i++){
                    that.scrollVarArray_setToUpdate[i] = true;
                }
                that.utilScroll_updateRowData_bigScroll(that, true)
                break;
            case "onBeforeCurrentElementChange":

            	that.utilHtml_setScrollBodyHeight(that);
		
                //we only wanto call save and serverRefresh if serverSource
                if (that.params.source._private.sourceType === "dataClass") {
                    //todo, need to se if I can reomve something here.. shame serverRefresh is bugged
                    if (that.params.source.getCurrentElement().isTouched() === true) {
                        if (that.params.readOnly === false) {
                            if (that.params.autoSave === true) {
                                that.clickVar_stopRowChange = true;
                                //do the save
                                that.params.source.save({
                                    onSuccess: function(e) {
                                        //do the server refresh
                                        if (that.params.refreshAfterAutoSave === true) {
                                            that.params.source.serverRefresh({
                                                onSuccess: function(e) {

                                                    that.clickVar_stopRowChange = false; //open for row change
                                                },
                                                onError: function(err) {
                                                    //todo, this will break use outside waf, better have autoSave as option, maybe add this to fakedataprovider also
                                                    waf.ErrorManager.displayError(err, null, {
                                                        modal: true,
                                                        title: "Save Error"
                                                    });
                                                    that.clickVar_stopRowChange = false; //open for row change
                                                }
                                            }); //end server Refresh()
                                            that.clickVar_stopRowChange = false; //open for row change
                                        }
                                        else {
                                            that.clickVar_stopRowChange = false; //open for row change
                                        }
                                        //nothing
                                    },
                                    onError: function(err) {
                                        //todo, this will break use outside waf, better have autoSave as option, maybe add this to fakedataprovider also
                                        waf.ErrorManager.displayError(err, null, {
                                            modal: true,
                                            title: "Save Error"
                                        });
                                        that.clickVar_stopRowChange = false; //open for row change
                                    }
                                }); //end save
                            }
                        } //end readOnly
                    } //is thouched
                } //end is dataclass
                
                break;
            case "onElementSaved":
                for( var i = 0; i < that.scrollVarArray_setToUpdate.length; i++){
                    that.scrollVarArray_setToUpdate[i] = true;
                }
                that.utilScroll_updateRowData_bigScroll(that, true)
                break;
            }
        });
    };






    /**************************************************************************************************
     Add resize event to columns
     This makes it possible to resize headers in grid
     After rezise we call makeRowTemplate so its corrected to new grid
     ****************************************************************************************************/
    this.addEvent_ResizableColumns = function(that) {
        //debugger;
        for (var i = 0; i < that.params.colHeaderNames.length; i++) {
            $(that.html_$WidgetIdString + " .headerColumn" + i).resizable({
                start: function() {
                    that.resizeVar_resizeStartWidth = $(that.html_$WidgetIdString + " .vr-widget-grid-row").width();
                    that.resizeVar_resizeMinWidth = $(that.html_$WidgetIdString).width();
                },
                alsoResize: that.html_$WidgetIdString + " .column" + i,
                resize: function(event, ui) {
                	try{
                    ui.size.height = ui.originalSize.height;
                    var curWidth = that.resizeVar_resizeStartWidth;
                    var minSize = that.resizeVar_resizeMinWidth;
                    var dif = ui.size.width - ui.originalSize.width;
                    var newWidth = parseInt(curWidth, 10) + parseInt(dif, 10);
                    if (newWidth < minSize) {
                        newWidth = minSize;
                    }
                    $(that.html_$WidgetIdString + " .vr-widget-grid-header").width(newWidth + 20);
                    $(that.html_$WidgetIdString + " .vr-widget-grid-row").width(newWidth + 20);
                	} catch(e){
                		//looks like a jquery bugs out somethimes when resizing far to right, usually wont happend but this way I dont get errors
                	}
                },
                stop: function(e, ui) {
                    //resize all templates
                    that.params.colSize = [];
                    for (var i = 0; i < that.params.colHeaderNames.length; i++) {
                        var width = $(that.html_$WidgetIdString + " .headerColumn" + i).outerWidth();
                        that.params.colSize.push(width);
                    }
                    that.createTemplates_Row(that);
                }
            });
            $(that.html_$WidgetIdString + " ." + that.params.colHeaderNames[i] + "Title" + " .ui-icon").hide();
        }
    };





    /**************************************************************************************************
     Add sortable
     This makes is possible for user to use sortable columns
     After is have been sorted, it recreates all templates again, and trigger "big" scroll event so everything gets updated
     TODO: should maybe have this as a option in studio?
     ****************************************************************************************************/
    this.addEvent_SortableColumns = function(that) {
        $(that.html_$WidgetIdString + " .vr-widget-grid-row-header").disableSelection();
        $(that.html_$WidgetIdString + ' .vr-widget-grid-row-header').sortable({
            axis: 'x',
            start: function(event, ui) {
                that.indexBefore = that.utilSortable_getIndex(ui.item, $(that.html_$WidgetIdString + ' .vr-widget-grid-row-header .vr-widget-grid-row-cell-header'));
            },
            change: function(event, ui) {
                var indexAfter = that.utilSortable_getIndex(ui.helper, $(that.html_$WidgetIdString + " .vr-widget-grid-row-header .vr-widget-grid-row-cell-header"));
            },
            stop: function(event, ui) {
                var indexAfter = that.utilSortable_getIndex(ui.item, $(that.html_$WidgetIdString + " .vr-widget-grid-row-header .vr-widget-grid-row-cell-header"));

                //rebuild the template, and update it
                var x = that.params.colHeaderNames.splice(that.indexBefore, 1)[0];
                that.params.colHeaderNames.splice(indexAfter, 0, x);
                var x = that.params.colAttributes.splice(that.indexBefore, 1)[0];
                that.params.colAttributes.splice(indexAfter, 0, x);
                var x = that.params.colSize.splice(that.indexBefore, 1)[0];
                that.params.colSize.splice(indexAfter, 0, x);
                that.createTemplates_Row(that);
                that.createTemplates_Header(that);
                that.addEvent_ResizableColumns(that);
                that.addEvent_HeaderClick(that); //needed for activationg click event again
                //need to reset there before scrollupdate

 				for( var i = 0; i < that.scrollVarArray_setToUpdate.length; i++){
                    that.scrollVarArray_setToUpdate[i] = true;
                }
                that.utilScroll_updateRowData_bigScroll(that, true)


            }
        });
    };





    /**************************************************************************************************
     adds doubleClick listners for rows
     TODO: maybe return something?
     ****************************************************************************************************/
    this.addEvent_RowDoubleClick = function(that) {
        $(that.html_$WidgetIdString + " .vr-widget-grid-row").dblclick(function() {
            clearTimeout(that.clickVar_clickTimeOut); //so we dont fire single or right click events
            that.clickVar_clickTimeOut = null;
            if(e.ctrlKey === false){
            	that.params.rowDoubleClick();
            }
        });
    };





    /**************************************************************************************************
     Adds headerClick event
     ****************************************************************************************************/
    this.addEvent_HeaderClick = function(that) {
        $(that.html_$WidgetIdString + " .vr-widget-grid-row-cell-header").on("click", function(e) {
            //give something back...
            var headerAttribute = $(this).attr("datasourceattribute");
            //send back
            that.params.headerClick(headerAttribute, that.userDataSaveHeaderClick);

        });



    };






    /**************************************************************************************************
     Makes is possible for user to foxus on cells
     Called from onUpdate and onUpdateNow each time they set row template
     ****************************************************************************************************/
    this.addEvent_cellFocus = function(that, $row) {
        if (that.clickVar_stopRowChange === false) {
            $($row).children().children(" .content").on("dblclick", {
                grid: that
            }, function(e) {
                if (e.data.grid.params.allowClickAndHighlight === true ) {
                	//console.log("highlight")
                    var oldValue = $(this).html();
                    //set editble
                    $(this).attr({
                        "contenteditable": "true"
                    });
                    
                    $(this).addClass("vr-widget-grid-editCell");
                    
                    $(this).focus();
                    
                    $(this).keydown(function(e) {
                    	//console.log("keykodedown")
                    	if(e.keyCode === 13){                 		
                    		e.preventDefault();
                    		$(this).trigger("focusout");
                    		//console.log("try tigger focus");
                    	}
                    });

                    //when loosing focus
                    $(this).focusout(function() {
                    	//console.log("focusout");
                    	$(e.currentTarget).text($(e.currentTarget).text().replace('\n', ''))
                    	$(e.currentTarget).text($(e.currentTarget).text().replace('\r', ''))
                    	
                    	$(this).removeClass("vr-widget-grid-editCell");
                        //only way that remove the auctcorrect in chrome //migth be better ways of doing this
                        if (that.params.readOnly === true) {
                            $(this).html("");
                            $(this).html(oldValue);
                        }
                        else {
                                       	
                            var attribute = $(this).attr("datasourceattribute");
                            if (attribute !== null && attribute !== undefined && attribute !== "") {
                            	 that.params.source[attribute] = $(this).html();

								//that.params.source[attribute] = $(this).html();
                            	that.params.source.autoDispatch();
	                            if (that.params.source.sync !== undefined) { //local source
	                            
	                                attribute = $(this).attr("datasourceattribute");
	                                if (that.params.source.getScope() === "global") {
	                                    window[that.params.source._private.id][that.params.source.getPosition()][attribute] = $(this).html();
	                                }
	                                else {
	                                    //use sourceVar in web component
	                                    var compID = that.params.source.getWebComponentID();
	                                    var theSourceVar = that.params.source._private.id.replace(compID+"_", "");
	                                    $$(compID).sourcesVar[theSourceVar][that.params.source.getPosition()][attribute] = $(this).html();
	                                     }
	                                that.params.source.sync();
	                            }
	                        }
                        }


                    });
                }

            });
        }
    };






	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//UTIL/HELPER FUNCTIONS
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



	


    /**************************************************************************************************
     This handles the scrolling, setting top values on rows, and calls the "update" of data after
     ****************************************************************************************************/
    this.utilScroll_onScrolling = function(that, forceDirectUpdateOfCells) {

        //stop dataUpdate if scrolling
        clearTimeout(that.scrollVar_updateDataTimer);

        //some variables I need later down (still need some cleanup)
        var $bodyClass = $(that.html_$WidgetIdString + " ." + that.html_bodyClassString);
        var scrollTop = $bodyClass.scrollTop();
        var bodyOnlyHeight = $bodyClass.height();
        var scrollBodyHeight = $(that.html_$WidgetIdString + " ." + that.html_scrollBodyClassString).height();

        //get scroll horizontal
        var leftScroll = $bodyClass.scrollLeft();
		
		//check if horizontal scroll, not need to do all this if it isnt
		if(that.scrollVar_hozScroll !==leftScroll){
			that.scrollVar_hozScroll =leftScroll;
	        
			//set header correct to body
	        $(that.html_$WidgetIdString + " .vr-widget-grid-header").css({
	            "position": "relative",
	            "left": "-" + leftScroll + "px",
	            "top": "0px"
	        });


	        //set locked headers:
	        for (var i = 0; i < that.params.lockedColumns; i++) {
	            $(that.html_$WidgetIdString + " > div.vr-widget-grid-header > div > div.vr-widget-grid-row-cell-header.headerColumn" + i).css({
	                "position": "relative",
	                "left": "" + leftScroll + "px",
	                "z-index": "100"
	            });
	        }
	        that.utilLockedColumns_setLocked(that);
		}

        if (that.scrollVar_firstRowTop === -that.params.rowHeight) {
            that.scrollVar_firstRowTop = 0;

        }

        //is scroll down
        var isDownScroll;
        isDownScroll = that.scrollVar_lastScrollTop < scrollTop ? true : false;





        if (that.scrollVar_lastScrollTop < (scrollTop - 300) || that.scrollVar_lastScrollTop > (scrollTop + 300) || forceDirectUpdateOfCells) {
            /************************
             fast scroll that is not within height of body view, need to calc all rows            
             ************************/
            that.scrollVar_dataLoader = true; //stop small scroll
        }
        else {
            if (isDownScroll) {
                if(that.scrollVar_dataLoader === false){
                /************************
                 Down scroll only by a little, just move the rows needed
                 ************************/
                var scrollLimit = scrollTop - (that.params.rowHeight);

                //loop rows and adjust top
                for (var i = 0; i < that.$cache_rowDivsArray.length; i++) {
                    var $row = $(that.$cache_rowDivsArray[0]);
                    var curHeight = $row.cssNumber("top");

                    var adjustIT = false;
                    if (curHeight > that.scrollVar_lastRowTop || curHeight < that.scrollVar_firstRowTop) {
                        adjustIT = true;
                    }

                    //if under scroll then we need to move it
                    if (curHeight < scrollLimit || adjustIT) {

                        //set .scrollVar_lastRowTopfor each row so its correct in the end
                        that.scrollVar_lastRowTop = that.scrollVar_lastRowTop + that.params.rowHeight;

                        //if not below bottom, then we can move it
                        if (that.scrollVar_lastRowTop < scrollBodyHeight) {

                            //$row.context.innerHTML = "";//dont bother, couse only flickering
                            $row.context.style.top = that.scrollVar_lastRowTop + "px";

                            //highlight
                            that.utilScroll_setSelectedRow_smallScroll(that, $row);
                            //move row to bottom
                            that.scrollVarArray_oldRowNumber.shift();
                        	that.scrollVarArray_oldRowNumber.push(that.scrollVar_lastRowTop);
                            //console.log(that.scrollVarArray_oldRowNumber[0]);
                            var row = that.$cache_rowDivsArray.shift();
                            that.$cache_rowDivsArray.push(row);
                       	   that.utilScroll_updateRowData_smallScroll(that, $row, true);
                        	
                        }
                    }
                }
                //set first rows top value in so we know it for later
                var row = that.$cache_rowDivsArray[0];
                that.scrollVar_firstRowTop = that.scrollVarArray_oldRowNumber[0]
            }
            

                

            }
            else {
            	if(that.scrollVar_dataLoader === false){
                /************************
                 Up scroll only bu a little, just move the rows needed
                 ************************/
                //var scrollLimit = scrollTop - (that.params.rowHeight * 0.3);
                var scrollLimit = scrollTop - (that.params.rowHeight);
                scrollLimit = scrollLimit + bodyOnlyHeight;

                //reverse array need to go other way around now
                that.$cache_rowDivsArray.reverse();
                that.scrollVarArray_oldRowNumber.reverse();

                //loop rows and adjust top
                for (var i = 0; i < that.$cache_rowDivsArray.length; i++) {
                    var $row = $(that.$cache_rowDivsArray[0]);
                    var curHeight = $row.cssNumber("top");

                    var adjustIT = false;
                    if (curHeight > that.scrollVar_lastRowTop || curHeight < that.scrollVar_firstRowTop) {
                        adjustIT = true;
                    }

                    //if under scroll then we need to move it
                    if (curHeight > scrollLimit || adjustIT) {

                        // set first for each row, so its correct in the end
                        that.scrollVar_firstRowTop = that.scrollVar_firstRowTop - that.params.rowHeight;

                        //clear row and set top
                        //$row.context.innerHTML = ""; //dont bother, couse only flickering
                        $row.context.style.top = that.scrollVar_firstRowTop + "px";


                        //higlight
                        that.utilScroll_setSelectedRow_smallScroll(that, $row);

                        //move row to last, (this will be first when we reverse array again after)
                        that.scrollVarArray_oldRowNumber.shift();
                        that.scrollVarArray_oldRowNumber.push(that.scrollVar_firstRowTop);
                        var row = that.$cache_rowDivsArray.shift();
                        that.$cache_rowDivsArray.push(row);
                        that.utilScroll_updateRowData_smallScroll(that, $row, false);
                    }
                }
                
                
                //set last
                var row = that.$cache_rowDivsArray[0];
                that.scrollVar_lastRowTop = $(row).cssNumber("top");
                that.scrollVar_lastRowTop = that.scrollVarArray_oldRowNumber[0]

                //reverse array back
                that.$cache_rowDivsArray.reverse();
                that.scrollVarArray_oldRowNumber.reverse();
            }
            }
        }

        //get .scrollVar_lastRowTopscrollTop so we know if next one is down or up
        that.scrollVar_lastScrollTop = scrollTop;

        var getDelay = that.params.getDataScrollDelay;

        if (forceDirectUpdateOfCells === true) {
            getDelay = 0;

        }



        //call update of data for rows
        that.scrollVar_updateDataTimer = setTimeout(function() {

            //adjust it all
        	for (i = 0; i < that.$cache_rowDivsArray.length; i++) {
                var atRow = parseInt(scrollTop / that.params.rowHeight, 10);// - 1;
                var newRow = atRow + i;
                var rowTop = newRow * that.params.rowHeight;
                //if now at top or bottom then set rowTop
                var $row = $(that.$cache_rowDivsArray[i]);
                if (rowTop < scrollBodyHeight && rowTop >= 0) {
                    if(that.scrollVarArray_oldRowNumber[i] !== rowTop){
                    	$row.context.innerHTML = "";
                    	$row.context.style.top = rowTop + "px";
                 	   that.scrollVarArray_setToUpdate[i] = true;
                 	   that.scrollVarArray_oldRowNumber[i] = rowTop;
                 	   
                	}
                    //highlight
                    $row.removeClass("vr-widget-grid-row-selected");
                }

                if ($row.cssNumber("top") >= scrollBodyHeight) {
                    var test = 0;
                    $row.context.style.top = 0 + "px";
                    that.scrollVarArray_setToUpdate[i] = true;
                }

            }
            that.scrollVar_lastRowTop = rowTop;
            that.scrollVar_firstRowTop = rowTop - (that.params.rowHeight * that.$cache_rowDivsArray.length);
            that.scrollVar_firstRowTop = that.scrollVar_firstRowTop + that.params.rowHeight;
            that.utilScroll_updateRowData_bigScroll(that, isDownScroll);
            that.scrollVar_dataLoader = false; //allow small scroll again
        }, getDelay);

    };






    /**************************************************************************************************
     	This handles the row click, so row gets highlighted, so user can user contrl/shift button to highligh many rows
     ****************************************************************************************************/
    this.utilHighLightRow_onRowClick = function(e, that) {
        that.clickVar_onClicked = true;
        var rowHeight, currentRow, sel, thisTop, currentKeyKode, isSel;

        function remove(currentRow) {
            var sel, selectedRows, i;

            function removeNo(array, row) {
                array.splice(row, 1);
            }
            sel = that.params.source.getSelection();
            selectedRows = sel.getSelectedRows();
            for (i = 0; i < selectedRows.length; i++) {
                if (selectedRows[i] === currentRow) {
                    removeNo(selectedRows, i);
                    i--;
                }
            }
            sel.setSelectedRows(selectedRows);
        }

        //get actual row div
        var div = $(e.target);
        for (var i = 0; i < 10; i++) {
            if ($(div).hasClass("vr-widget-grid-row")) {
                thisTop = parseInt(div[0].style.top,10);
                break;
            }
            else {
                div = $(div).parent();
            }
        }


        rowHeight = that.params.rowHeight;
        currentRow = Math.round(thisTop / rowHeight);

        if (currentRow <= (that.params.source.length - 1)) {



            sel = that.params.source.getSelection();
            if (that.params.isMultiSelect === true) {
                currentKeyKode = "";
                if (e.shiftKey) {
                    currentKeyKode = "shift";
                }
                if (e.ctrlKey) {
                    currentKeyKode = "ctrl";
                }
                if (!e.ctrlKey && !e.shiftKey) {
                    currentKeyKode = "none";
                }

                if (currentKeyKode === "none") {
                    sel.select(currentRow);
                }
                else {
                    if (that.clickVar_lastKeyKodeUsed === "shift" && currentKeyKode === "ctrl") {
                        isSel = sel.isSelected(currentRow);
                        if (isSel === true) {
                            remove(currentRow);
                        }
                        else {
                            sel.select(currentRow, true);
                        }
                    }
                    else {
                        if (that.clickVar_lastKeyKodeUsed === "ctrl" && currentKeyKode === "shift") {
                            sel.selectRange(that.clickVar_lastRowSelected, currentRow);
                        }
                        else {
                            if (that.clickVar_lastKeyKodeUsed === "ctrl" && currentKeyKode === "ctrl") {
                                isSel = sel.isSelected(currentRow);
                                if (isSel === true) {
                                    remove(currentRow);
                                }
                                else {
                                    sel.select(currentRow, true);
                                }

                            }
                            else {
                                if (that.clickVar_lastKeyKodeUsed === "none" && currentKeyKode === "ctrl") {
                                    isSel = sel.isSelected(currentRow);
                                    if (isSel === true) {
                                        remove(currentRow);
                                    }
                                    else {
                                        sel.select(currentRow, true);
                                    }
                                }
                                else {
                                    if (that.clickVar_lastKeyKodeUsed === "shift" && currentKeyKode === "shift") {
                                        if (that.clickVar_lastRowSelected > currentRow) {
                                            sel.selectRange(currentRow, that.clickVar_lastRowSelected);
                                        }
                                        else {
                                            sel.selectRange(that.clickVar_lastRowSelected, currentRow);
                                        }
                                    }
                                    else {
                                        if (that.clickVar_lastKeyKodeUsed === "none" && currentKeyKode === "shift") {
                                            if (that.clickVar_lastRowSelected !== null) {
                                                if (that.clickVar_lastRowSelected > currentRow) {
                                                    sel.selectRange(currentRow, that.clickVar_lastRowSelected);
                                                }
                                                else {
                                                    sel.selectRange(that.clickVar_lastRowSelected, currentRow);
                                                }
                                            }
                                            else {
                                                sel.select(currentRow);
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            else {
                sel.select(currentRow);
            }

            //if user selects row 2-5, we haveto allow him to hold shift and click on row 9 and have row 2-9 highlighted
            if (that.clickVar_lastKeyKodeUsed === "none" && currentKeyKode === "shift"){
                //nothing, we wanto keep it where is is, so if user highlighs lower, he can
            } else {
                if (that.clickVar_lastKeyKodeUsed === "shift" && currentKeyKode === "shift") {
                    //nothing, we wanto keep it where is is, so if user highlighs lower, he can
                } else {
                    that.clickVar_lastRowSelected = currentRow;
                }
            }
            that.clickVar_lastKeyKodeUsed = currentKeyKode;


            that.utilScroll_setSelectedRow_bigScroll(that);
            //so current selected entity get changed on click
            that.params.source.select(currentRow, {
                onSuccess: function() {
                    that.clickVar_onClicked = false;

                }
            });

        }
    };





    /**************************************************************************************************
     This handles row click, light highlighing etc for big scrolls
     ****************************************************************************************************/
    this.utilScroll_setSelectedRow_bigScroll = function(that) {
        var thisTop, rowHeight, currentRow, sel, isSel;

        $(that.html_$WidgetIdString + " .vr-widget-grid-row").each(function(e) {
            thisTop = $(this).cssNumber("top");
            rowHeight = that.params.rowHeight;
            currentRow = Math.round(thisTop / rowHeight);
            sel = that.params.source.getSelection();
            isSel = sel.isSelected(currentRow);
            if (isSel === true) {
                $(this).addClass("vr-widget-grid-row-selected");
                $(this).children().addClass("vr-widget-grid-row-selected");
            }
            else {
                $(this).removeClass("vr-widget-grid-row-selected");
                $(this).children().removeClass("vr-widget-grid-row-selected");
            }
        });

    };





    /**************************************************************************************************
     This handles row click, light highlighing etc for small scrolls
     ****************************************************************************************************/

    this.utilScroll_setSelectedRow_smallScroll = function(that, $row) {
        var thisTop, rowHeight, currentRow, sel, isSel;
        thisTop = $row.cssNumber("top");
        rowHeight = that.params.rowHeight;
        currentRow = Math.round(thisTop / rowHeight);
        sel = that.params.source.getSelection();
        isSel = sel.isSelected(currentRow);
        if (isSel === true) {
            $row.addClass("vr-widget-grid-row-selected");
        }
        else {
            $row.removeClass("vr-widget-grid-row-selected");
        }
    };





    /**************************************************************************************************
     	Helper function for sortable event columns
     ****************************************************************************************************/
    this.utilSortable_getIndex = function(itm, list) {
        var i;
        for (i = 0; i < list.length; i++) {
            if (itm[0] === list[i]) break;
        }
        return i >= list.length ? -1 : i;
    };





    /**************************************************************************************************
     This updates rows with data from datasource and rowtemplate on "long scrolls", when user drags to bottom, etc
     ****************************************************************************************************/
    this.utilScroll_updateRowData_bigScroll = function(that, isDownScroll) {
        function normalGet() {
            that.scrollVar_lastRow_LastOnUpdate = 0;
            for (var i = 0; i < that.$cache_rowDivsArray.length; i++) {
                var rowNum = Math.round($(that.$cache_rowDivsArray[i]).cssNumber("top") / that.params.rowHeight);
                if (that.scrollVar_lastRow_LastOnUpdate < rowNum) {
                    that.scrollVar_lastRow_LastOnUpdate = rowNum;
                }
                if (that.scrollVar_firstRow_LastOnUpdate > rowNum) {
                    that.scrollVar_firstRow_LastOnUpdate = rowNum;
                }
                if (that.scrollVarArray_setToUpdate[i] === true) {
                    that.scrollVarArray_setToUpdate[i] = false;
                    that.params.source.getElement(rowNum, {
                        onSuccess: function(result) {
                            //get rowDiv
                            var div = result.userData[0].$cache_rowDivsArray[result.userData[1]];
                            // entity
                            var entity = result.element;

                            div.innerHTML = Mustache.render(that.templateVar_rowHtml, entity);
                            if (entity === null) {
                                that.scrollVarArray_setToUpdate[i] = true
                            }
                            //todo fix this better
                            var length = that.params.colAttributes.length;
                            for (var ii = 0; ii < length; ii++) {
                                var cell = div.getElementsByClassName("column" + ii)[0];
                                var data = cell.getElementsByClassName("content")[0].innerHTML;
                                that.params.cellDraw(ii, that.params.colAttributes[ii], cell, data, entity);
                            }
                            that.addEvent_cellFocus(that, div);
                            that.utilLockedColumns_setLocked(that);

                        },
                        onError: function(result) {
                            var div = result.userData[0].$cache_rowDivsArray[result.userData[1]];
                            div.innerHTML = "";
                        }
                    }, [that, i, rowNum]);
                }
            }
            that.scrollVar_firstRow_LastOnUpdate = that.scrollVar_lastRow_LastOnUpdate - that.$cache_rowDivsArray.length;
            that.utilScroll_setSelectedRow_bigScroll(that);
        }
        //check scroll
        if (isDownScroll) {
            normalGet();
        }
        else {
            //not down scroll then we want to get more before current so it dont request all the time
            var scrolltop = $(that.html_$WidgetIdString + " ." + that.html_bodyClassString).scrollTop();
            var rowNum = parseInt(scrolltop / that.params.rowHeight, 10);
            //TODO need to improve this, my head just isnt working atm
            if (that.scrollVar_firstRow_LastOnUpdate < rowNum) {
                normalGet();
            }
            else {
                //let gets upward also follow pageSize like it would downwards
                rowNum = (Math.round(that.scrollVar_firstRow_LastOnUpdate / that.dataSourcePageSize) * that.dataSourcePageSize) - that.dataSourcePageSize;
                if (rowNum < 0) {
                    rowNum = 0;
                }
                that.params.source.getElement(rowNum, {
                    onSuccess: function(result) {
                        normalGet();
                    }
                });
            }
        }
    };






    /**************************************************************************************************
	     This updates rows with data from datasource and rowtemplate on "short scrolls" <- small scrolls up/down
     ****************************************************************************************************/
    this.utilScroll_updateRowData_smallScroll = function(that, $row, isDownScroll) {

        var normalGet = function() {
            var rowNum = Math.round($row.cssNumber("top") / that.params.rowHeight);
            that.params.source.getElement(rowNum, {
                onSuccess: function(result) {
                    //get rowDiv
                    var $row = result.userData[1];
                    // entity
                    var entity = result.element;


                    $row.context.innerHTML = Mustache.render(that.templateVar_rowHtml, entity);

                    var length = that.params.colAttributes.length;
                    for (var ii = 0; ii < length; ii++) {
                        var cell = $row.context.getElementsByClassName("column" + ii)[0];
                        var data = cell.getElementsByClassName("content")[0].innerHTML;
                        that.params.cellDraw(i, that.params.colAttributes[ii], cell, data, entity);
                    }
                    that.addEvent_cellFocus(that, $row);
                    that.utilLockedColumns_setLocked(that);
                },
                onError: function(result) {
                    var $row = result.userData[1];
                    $row.context.innerHTML = "";
                }
            }, [that, $row, rowNum]);
        };
        //check scroll
        if (isDownScroll) {
            normalGet();
        }
        else {
            //not down scroll then we want to get more before current so it dont request all the time
            var scrolltop = $(that.html_$WidgetIdString + " ." + that.html_bodyClassString).scrollTop();
            var rowNum = parseInt(scrolltop / that.params.rowHeight, 10);
            //TODO need to improve this, my head just isnt working atm
            if (that.scrollVar_firstRow_LastOnUpdate < rowNum) {
                normalGet();
            }
            else {
                //let gets upward also follow pageSize like it would downwards
                rowNum = (Math.round(that.scrollVar_firstRow_LastOnUpdate / that.dataSourcePageSize) * that.dataSourcePageSize) - that.dataSourcePageSize;
                that.scrollVar_firstRow_LastOnUpdate = rowNum;
                if (rowNum < 0) {
                    rowNum = 0;
                }
                that.params.source.getElement(rowNum, {
                    onSuccess: function(result) {
                        //need to call method again, else Ill end up with empty row
                        that.utilScroll_updateRowData_smallScroll(that, $row, true);
                    },
                    onError: function(err) {
                      //  console.log("what");
                    }
                });
            }
        }
    };






    /******************************************************************************************************************
     	Get needed width of columns
     	Helper function for addHeader, addFooter and addRow, so it gets big enough
     *******************************************************************************************************************/
    this.utilHtml_calculateColumnMinWidth = function(that) {
        var x = 0;
        for (var i = 0; i < that.params.colSize.length; i++) {
            x = x + parseInt(that.params.colSize[i], 10);
        }
        var widgetWidth = $(that.html_$WidgetIdString).width();
        if (x < widgetWidth) {
            x = widgetWidth;
        }
        return x;
    };





    /******************************************************************************************************************
     	sets locked headers
     *******************************************************************************************************************/
    this.utilLockedColumns_setLocked = function(that) {

        var $bodyClass = $(that.html_$WidgetIdString + " ." + that.html_bodyClassString);
        var leftScroll = $bodyClass.scrollLeft();
        for (var i = 0; i < that.params.lockedColumns; i++) {
            $(that.html_$WidgetIdString + " > div.vr-widget-grid-body.vr-widget-grid-body-nonStudio").children().children().children(".column" + i).css({
                "position": "relative",
                "left": "" + leftScroll + "px",
                "z-index": "100"
            });
        }


    };





    /**************************************************************************************************
     	Set scroll height
     	this is also called when collection is changed
     ****************************************************************************************************/
    this.utilHtml_setScrollBodyHeight = function(that) {

        var gridHeight = $(that.html_$WidgetIdString).height();
        var bodyHeight = gridHeight - (that.params.headerHeight + that.params.footerHeight);
        //get rows needed
        var rowsNeeded = Math.round((Math.floor(bodyHeight / that.params.rowHeight)));
        //make sure its in pair
        if (rowsNeeded % 2 === 1) {
            rowsNeeded = rowsNeeded + 1;
        }
        else {
            rowsNeeded = rowsNeeded + 2;
        }

        var collectionLengthHeight = that.params.source.length * that.params.rowHeight;

        if (collectionLengthHeight < bodyHeight) {
            collectionLengthHeight = that.params.rowHeight * rowsNeeded;
        }

        $(that.html_$WidgetIdString + " ." + that.html_scrollBodyClassString).css({
            "height": collectionLengthHeight + "px"
        });
    };




    /**************************************************************************************************
     Adds scrollbars class
     Cant use this in studio
     ****************************************************************************************************/
    this.utilHtml_addScrollBars = function(that) {
        //scrollbars really mess up in studio
        $(that.html_$WidgetIdString + " ." + that.html_bodyClassString).addClass("vr-widget-grid-body-nonStudio");


    };




    /**************************************************************************************************
     Checks if in studio or not
     ****************************************************************************************************/
    this.util_CheckIfStudio = function(that) {
        that.isStudio = !window.Designer ? false : true;
    };



    /**************************************************************************************************
     Gets datasource page size
     ****************************************************************************************************/
    this.utilDataSource_pageSize = function(that) {
        try {
            that.dataSourcePageSize = that.params.source._private.minPageSize;
        }
        catch (e) {
            that.dataSourcePageSize = 40;
        }
    };



    /**************************************************************************************************
     Sets selection
     ****************************************************************************************************/
    this.utilDataSource_SetSelectionType = function(that) {
        var sel;
        if (that.params.isMultiSelect === true) {
            sel = new WAF.Selection("multiple");
        }
        else {
            sel = new WAF.Selection("single");
        }
        that.params.source.setSelection(sel);
        //set current element as selected
        sel = that.params.source.getSelection();
        sel.select(that.params.source._private.currentElemPos);
    };





    /**************************************************************************************************
     addes dummy row to grid in studio
     ****************************************************************************************************/
    this.utilStudio_dummyRow = function(that) {
        var tempTimeOut = setTimeout(function() {
            $(that.$cache_rowDivsArray[0]).html(that.templateVar_rowHtml);
            $(that.$cache_rowDivsArray[0]).children().children(" .content").html("text");
        }, 200);
    };





    /******************************************************************************************************************
     	Create the grid
     	This is called when grid is created
     *******************************************************************************************************************/
    this.init = function(that) {

        //set isStudio
        that.util_CheckIfStudio(that);
        //add the html
        that.addHtml(that);

        // not in studio run this code
        if (!that.isStudio) {
            //events
            that.addEvents(that);
            //add scrollbars class
            that.utilHtml_addScrollBars(that);
            //setPageSize.
            that.utilDataSource_pageSize(that);
            //set multiselect
            that.utilDataSource_SetSelectionType (that);
		
	setTimeout(function(){
		for( var i = 0; i < that.scrollVarArray_setToUpdate.length; i++){
            		that.scrollVarArray_setToUpdate[i] = true;
        	}
        	that.utilScroll_onScrolling(that, true)
	},100);
	
        } else {
            //in studio
            //add first row so user can see rowText
            that.utilStudio_dummyRow(that);

        }
    };





    //build the grid;
    this.init(this);


    //dunno if this actually does anything
    Mustache.parse(this.templateVar_rowHtml);

}
