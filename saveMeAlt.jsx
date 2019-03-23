var doc = app.activeDocument
var fname = doc.name.split(".")
var fname = fname[0]
var newDoc = doc.duplicate(fname)
activeDocument.flatten()
activeDocument.channels.removeAll()

var docRef = app.activeDocument

var zinTifFile = docRef.info.caption
var zinTifSaveOptions = new TiffSaveOptions()
var zinFileName = new File(zinTifFile)
//alert("Author is: " + zinTifFile)
app.activeDocument.saveAs(zinFileName, zinTifSaveOptions, true, Extension.LOWERCASE)
//app.activeDocument.saveAs(zinTifFile)
