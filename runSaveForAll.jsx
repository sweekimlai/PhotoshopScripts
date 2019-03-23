var docName = app.documents

for(var i = 0; i < app.documents.length; i++)
{
	activeDocument = docName[i]
	activeDocument.save()
}

alert("All document saved")