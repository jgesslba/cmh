## Grid widget [Wakanda](http://wakanda.org)
* This allows you to display data in a grid
* Also allows you to resize columns, and move columns.

#####This widget uses 3rd party lib:
* Jquery: https://github.com/jquery
* mustasje.js : https://github.com/janl/mustache.js


[![Alt text for your video](http://img.youtube.com/vi/dvEx8fNZzT8/0.jpg)](https://www.youtube.com/watch?v=dvEx8fNZzT8)


#### Properties:

* __Source__: Datasource of grid
* __GridColumns__: This is the grid columns, header label, attribute in datasource and width
* __HeaderHeight__: Height of header
* __RowHeight__: Height of row
* __FooterHeight__: Height of footer
* __GetDataScrollDelay__: How fast you want it to get data after scrollstop
* __gridMultiselect__: Setting this to tru will allow user to select multible rows
* __AllowClickAndHighlight__: allows user to doubleclick on cell, highlight text and copy it
* __ReadOnly__: sets grid to read only, if they chnage the old value will be set inn after focus is lost
* __AutoSave__: saves when user select another entity if entity is touched
* __RefreshAfterAutoSave__: rundServerRefresh after it have saved


-------------
#### Events:

* single click on row
* double click on row (holding contrl key down while doing this will make grid skip this event)
* right click on row
* on cell Draw
* on header click









-------------
### Samples for On Cell Draw:

Info, you will need to add this attribute datasourceattribute="name" to div to make it editable


Changing color of background
```javascript
try{
if(event.data.attributeName === "name3"){
   if(event.data.data.indexOf("3") !==-1){
      event.data.div.style.backgroundColor = 'lightgreen';
      event.data.div.style.color = "Black"; //so text done get color white when highlighted
   }
}
} catch(e){
 
}

```

Custom layout withing a cell
```javascript
try{
  if(event.data.attributeName === "name3"){
    var ID = event.data.entity.ID
    var name = event.data.entity.name3			
    event.data.div.innerHTML = '<div class="content" style= "height:51%; border-bottom: 1px solid rgb(230, 230, 230); padding: 3px 5px;">'+ID+'</div><div class="content" style= "height:49%; padding: 3px 5px;">'+name+'</div>'
}
} catch(e){
 
}

```

Coloring text red when edited but not saved
```javascript
try{
 if(event.data.autoSave === false && event.data.readOnly === false && event.data.entity._private.currentEntity.isTouched() === true){      
    event.data.div.style.color = "red"
}
} catch(e){

}
```


3 cells inside colum, one top, and 2 spilt in 2 under
```javascript
try {
   if (event.data.attributeName === "name3") {
       //values
      var cellTopValue = event.data.entity.ID.toString();
      var cellBottomLeftValue = event.data.entity.name3
      var cellBottomRightValue = event.data.entity.name3
      //colors
      var cellTopColor = "grey"; //for nothing use ""
      var cellBottomLeftColor = "red"
      var cellBottomRightColor = "lightgreen"
      //cells
       var cellTop = '<div class="content" style= "height:51%; position:relative; border-bottom: 1px solid rgb(230, 230, 230); padding: 3px 5px; background-color: ' + cellTopColor + '">' + cellTopValue + '</div>'
        var cellBottomLeft = '<div class="content" style= "height:49%; width:50%;  position:relative; padding: 3px 5px; background-color: ' + cellBottomLeftColor + '">' + cellBottomLeftValue + '</div>'
        var cellBottomRight = '<div class="content" style= "height:49%; width:50%; border-left: 1px solid rgb(230, 230, 230); top: -49%;float: right; position:relative; padding: 3px 5px; background-color: ' + cellBottomRightColor + '">' + cellBottomRightValue + '</div>'
        //add to cell
        event.data.div.innerHTML = cellTop + cellBottomLeft + cellBottomRight
    }
}
catch (e) {
 
}

```






### More Information

While development you can also come with comments under wakanda forum thread : http://forum.wakanda.org/showthread.php?6603-Anyone-wanto-help-me-test-my-grid-widget

For more information on how to install a custom widget, refer to [Installing a Custom Widget](http://doc.wakanda.org/WakandaStudio0/help/Title/en/page3869.html#1027761).

For more information about Custom Widgets, refer to [Custom Widgets](http://doc.wakanda.org/Wakanda0.v5/help/Title/en/page3863.html "Custom Widgets") in the [Architecture of Wakanda Applications](http://doc.wakanda.org/Wakanda0.v5/help/Title/en/page3844.html "Architecture of Wakanda Applications") manual.
