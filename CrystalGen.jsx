var win = new Window("dialog{text:'Crystal map builder',bounds:[100,100,330,300],\n" +
"panel0:Panel{bounds:[10,10,220,190] , text:'Settings:' ,properties:{borderStyle:'etched',su1PanelCoordinates:true}\n" +
"button0:Button{bounds:[10,140,200,165] , text:'Build' }\n" +
"crystalNumText:EditText{bounds:[120,19,200,39] , text:'5' ,properties:{multiline:false,noecho:false,readonly:false}}\n" +
"rotMinText:EditText{bounds:[120,41,160,59] , text:'0' ,properties:{multiline:false,noecho:false,readonly:false}}" +
"rotMaxText:EditText{bounds:[162,41,200,59] , text:'360' ,properties:{multiline:false,noecho:false,readonly:false}}\n" +
"sizeMinText:EditText{bounds:[120,61,160,81] , text:'50' ,properties:{multiline:false,noecho:false,readonly:false}}" +
"sizeMaxText:EditText{bounds:[162,61,200,81] , text:'200' ,properties:{multiline:false,noecho:false,readonly:false}}\n" +
"posMinText:EditText{bounds:[120,85,160,103] , text:'-800' ,properties:{multiline:false,noecho:false,readonly:false}}" +
"posMaxText:EditText{bounds:[162,85,200,103] , text:'800' ,properties:{multiline:false,noecho:false,readonly:false}}\n" +
"statictext1:StaticText{bounds:[10,21,120,38] , text:'Crystal Num:' ,properties:{scrolling:undefined,multiline:true}}\n" +
"statictext1:StaticText{bounds:[10,45,120,65] , text:'Rot(min/max):' ,properties:{scrolling:undefined,multiline:true}}\n" +
"statictext2:StaticText{bounds:[10,65,120,81] , text:'Size(min/max):' ,properties:{scrolling:undefined,multiline:true}}\n" +
"statictext2:StaticText{bounds:[10,85,120,103] , text:'Pos(min/max):' ,properties:{scrolling:undefined,multiline:true}}\n" +
"flipXCheckBox:Checkbox{bounds:[10,105,120,125] , text:'FlipX' ,properties:{multiline:false,noecho:false,readonly:false}}}};");

var originalRulerUnits = app.preferences.rulerUnits;
app.preferences.rulerUnits = Units.PIXELS;

function crystalMap(obj,crystalNum,rotMinNum,rotMaxNum,sizeMinNum,sizeMaxNum,posMinNum,posMaxNum,flipStatus)
{
    var minLevel = 5;
    var maxLevel = 255;
    var flipX = 1;        
    
    app.activeDocument.activeLayer.name="crystalBase";
    app.activeDocument.activeLayer.duplicate();    
    app.activeDocument.activeLayer = app.activeDocument.layers[0];
                
    for (i=0;i<=crystalNum;i++)
    {        
        var newLyr =app.activeDocument.activeLayer.duplicate();
       
        var offsetX = Math.random() * (parseInt(posMaxNum) - parseInt(posMinNum)) + parseInt(posMinNum);
        var offsetY = Math.random() * (parseInt(posMaxNum) - parseInt(posMinNum)) + parseInt(posMinNum);
        newLyr.translate(offsetX,offsetY);

        var newSize = Math.random() * (parseInt(sizeMaxNum) - parseInt(sizeMinNum)) + parseInt(sizeMinNum); 
        
        if(flipStatus ==true)
        {
            var tmp = Math.random();
            if(tmp >0.5)
            {
                flipX = flipX*-1;
            }
        }
        newLyr.resize(newSize*flipX,newSize);
        
        var sizeRange = sizeMaxNum - sizeMinNum;
        var sizePercent = ((newSize-sizeMinNum)*100)/sizeRange;
        var levelRange = maxLevel - minLevel;
        var levelPercent = (levelRange * sizePercent)/100;
        var levelValue = minLevel + levelPercent;
        newLyr.adjustLevels(0,255,1,0,levelValue);
        
        var rotRange = Math.random() * (parseInt(rotMaxNum) - parseInt(rotMinNum)) + parseInt(rotMinNum);
        newLyr.rotate(rotRange);
        
        app.activeDocument.activeLayer = app.activeDocument.layers[0];
        app.activeDocument.activeLayer.merge();
        app.activeDocument.activeLayer = app.activeDocument.artLayers.getByName("crystalBase");
        
    }

    app.activeDocument.artLayers.getByName("crystalBase").visible = false;
    app.activeDocument.activeLayer = app.activeDocument.layers[0];
    app.activeDocument.layers[0].name = "Done";
}

win.panel0.button0.onClick = function() {
    crystalMap(activeDocument,win.panel0.crystalNumText.text,win.panel0.rotMinText.text,win.panel0.rotMaxText.text,win.panel0.sizeMinText.text,win.panel0.sizeMaxText.text,win.panel0.posMinText.text,win.panel0.posMaxText.text,win.panel0.flipXCheckBox.value);
    alert("Done!!");
}
    
win.center();
win.show();