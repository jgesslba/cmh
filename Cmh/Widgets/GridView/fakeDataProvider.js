
    /******************************************************************************************************************
 Created for simulating waf dataProvider/source, so I dont have to change code when moving into wakanda.
 Also used when I dont have a datasource to stopp errors on functions that does not exsist
 *******************************************************************************************************************/
    var fakeDataProvider = {};

    //array to hold data
    fakeDataProvider.source = {};
    fakeDataProvider.source.collection = [];
    fakeDataProvider.selection = {};
    fakeDataProvider.selection.selection = [];
    fakeDataProvider.cache = [];
    fakeDataProvider.getHtmlDelay = 500;
    fakeDataProvider.getDelay = false;

    var i;

    //fills it with data
    fakeDataProvider.fill = function(num) {
        fakeDataProvider.length = num;
        for (i = 0; i < num; i++) {
            fakeDataProvider.source.collection.push({
                ID: {
                    value: i
                },
                firstName: {
                    value: "firstName" + i
                },
                lastName: {
                    value: "lastName" + i
                },
                postbox: {
                    value: "" + i
                }
            });
        }
    };



    fakeDataProvider.setSelection = function() {};
    fakeDataProvider.select = function() {};

    fakeDataProvider._private = {};
    fakeDataProvider._private.currentElemPos = 0;
	fakeDataProvider.getElement= function(num, callback, params){
						var result = {};
                        result.element = {ID:"nodata"};
                        result.userData = params;
                        callback.onError(result);
	
	};
    //simulates the dataprovider get entity in waf, so I dont haveto chnage code later
    //returns the fake Data provider
    fakeDataProvider.getEntityCollection = function() {
        return fakeDataProvider.source;
    };

    //returns selection
    fakeDataProvider.getSelection = function() {
        return fakeDataProvider.selection;
    };




    //internal
    fakeDataProvider.getEntityFromCache = function(recNum, callback) {

        callback.onSuccess(recNum);

        //Todo was about to create delay for when requesting outside 40 first?
    };


    fakeDataProvider.source.getEntity = function(i, callBack, params) {
        // debugger;
        var result = {};

        fakeDataProvider.getEntityFromCache(i, {
            onSuccess: function(i) {
                result.entity = fakeDataProvider.source.collection[i];
                result.userData = params;
                callBack.onSuccess(result); //},10);
            }
        });

    };

    fakeDataProvider.addListener = function(i, callBack) {
        //do nothing, just for moving easier
    };

    fakeDataProvider.select = function(i, callBack) {
        //do nothing, just for moving easier
    };


    fakeDataProvider.selection.select = function(i, add) {
        if (add === true) {
            fakeDataProvider.selection.selection.push(i);
        }
        else {
            fakeDataProvider.selection.selection = [i];
        }
    };

    fakeDataProvider.selection.selectRange = function(s, e, add) {

        var from, to, i;
        if (s > e) {
            from = e;
            to = s + 1;
        }
        else {
            from = s;
            to = e + 1;
        }
        if (add === true) {
            for (i = from; i < to; i++) {
                fakeDataProvider.selection.selection.push(i);
            }
        }
        else {
            fakeDataProvider.selection.selection = [];
            for (i = from; i < to; i++) {
                fakeDataProvider.selection.selection.push(i);
            }
        }
    };


    fakeDataProvider.selection.isSelected = function(s) {
        var length = fakeDataProvider.selection.selection.length;
        var isIn = false;
        for (var i = 0; i < length; i++) {
            if (fakeDataProvider.selection.selection[i] === s) {
                isIn = true;
            }

        }

        return isIn;
    };


    fakeDataProvider.selection.setSelectedRows = function(x) {
        fakeDataProvider.selection.selection = x;

    };

    fakeDataProvider.selection.getSelectedRows = function() {
        return fakeDataProvider.selection.selection;

    };
    fakeDataProvider.selection.reset = function() {
        //nothing
    };

