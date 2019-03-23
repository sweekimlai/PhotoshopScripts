var docName = app.documents

for(var i = 0; i < app.documents.length; i++)
{
	activeDocument = docName[i]
	doAction("SaveMe","Zin")
	//alert(app.activeDocument.name)
}

alert("SaveMe done for all documents")