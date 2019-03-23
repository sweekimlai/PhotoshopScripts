//var fileRef = new File("E:/Misc/test.jpg")
//var docRef = app.open (fileRef)

//var tmp = "yes"
//alert(tmp.toUpperCase())
/*
var tmp = "apple"

switch(tmp)
{
    case  "apple":
        alert("You chose apple")
        break;
    case  "orange":
        alert("You chose orange")
        break;
}   
*/



//app.activeDocument.save()
//alert(app.activeDocument.path)
//alert(app.activeDocument.fullName)
//alert(app.activeDocument.name)
//alert(app.activeDocument.activeLayer)
//alert(app.activeDocument.activeChannels)
//alert(app.activeDocument.channels)
//alert(app.activeDocument.artLayers)
//alert(app.activeDocument.info.author)
//app.activeDocument.artLayers.add()
//app.activeDocument.layerSets.add()
//var docRef = app.activeDocument
//docRef.activeLayer.allLocked = true
//alert(docRef.activeLayer.name)
//app.activeDocument.artLayers.getByName("Metal").visible = false
//alert(app.activeDocument.artLayers.length)
//alert(app.activeDocument.layerSets.length)
//app.activeDocument.layerSets.getByName("myGrp").visible = false
//alert(app.activeDocument.layerSets.getByName("myGrp").enableChannels)
//var docRef = app.activeDocument
//alert(docRef.layers[5].name)
//alert(docRef.layers.length)

/*
var layernum = 0
var layerinfo = ""
var totallayers = app.activeDocument.layers.length
var layername = ""

function getlayerinfo() {
       
if (layernum >= totallayers) {
    $.writeln ("no more layers");
}
else {
    layerinfo = app.activeDocument.layers[layernum];
    layername = layerinfo.name;
    $.writeln(layernum);
    $.writeln(layerinfo);
    $.writeln(layername);
    return goagain();
}
       
return ("ok");
}
       
function goagain() {
    layernum = layernum+1;
    getlayerinfo();
}
       

getlayerinfo();
*/

var idOpn = charIDToTypeID( "Opn " );
    var desc1 = new ActionDescriptor();
    var idnull = charIDToTypeID( "null" );
    desc1.putPath( idnull, new File( "E:\\SweeKim\\Projects\\tmpLayers.psd" ) );
executeAction( idOpn, desc1, DialogModes.NO );


