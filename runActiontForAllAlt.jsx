var docName = app.documents

for(var i = 0; i < app.documents.length; i++)
{
	activeDocument = docName[i]
	doAction("SaveMeAlt","Zin")
	//alert(app.activeDocument.name)
}

alert("SaveMeAlt done for all documents")