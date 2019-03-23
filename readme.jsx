var b = new File("E:\\cache\\mShaderList.txt")
b.open('r')
var fileLoc = "E:\\cache\\"
var counter = 0
var fileList = new Array()
var fileDetails = new Array()
var subFileDetails = new Array()
var fileRef
var docRef 
var tmpStr
var blendStr
var tmpLayerSet

while(!b.eof)
{
    fileList[counter] = b.readln()
    counter+=1
 }

b.close()

for(i = 0; i < fileList.length; i++)
{
    if(fileList[i]=="newPatch")
    {        
        app.documents.add(4096, 4096, 72, "Patch")
        //alert("Creat a new document")
     }
    else
    {
        //alert("Create new layer")
        fileDetails = fileList[i].split("-")
        subFileDetails = fileDetails[4].split(".")         
        fileRef = new File(fileLoc+fileList[i])
        docRef = app.open (fileRef)

        app.activeDocument.selection.selectAll()
        app.activeDocument.selection.copy()
        app.activeDocument.close(SaveOptions.DONOTSAVECHANGES)
        
        tmpLayerSet = app.activeDocument.layerSets.add()
        tmpLayerSet.name = fileList[i]
        blendStr = "BlendMode." + fileDetails[2].toUpperCase()
        tmpLayerSet.blendMode = eval(blendStr)
        tmpLayerSet.opacity = fileDetails[3] * 100;
        app.activeDocument.paste()
        app.activeDocument.activeLayer.name = fileDetails[1]

        //alert("Object name is " + fileDetails[0])
        //alert("Object texture is " + fileDetails[1])
        //alert("Object Blend mode is is " + fileDetails[2])
        //alert("Object Blend Amount is " + fileDetails[3])        
        //alert("Object Texture Tile is " + subFileDetails[0])
    }
}
