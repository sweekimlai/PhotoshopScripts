var win = new Window("dialog{text:'Sprite Sheet Maker',bounds:[100,200,330,280],\n" + 
	"statictext1:StaticText{bounds:[10,15,120,35] , text:'Column, Row:' ,properties:{scrolling:undefined,multiline:true}}\n" +
	"colText:EditText{bounds:[120,15,160,35] , text:'3' ,properties:{multiline:false,noecho:false,readonly:false}}" +
	"rowText:EditText{bounds:[162,15,200,35] , text:'2' ,properties:{multiline:false,noecho:false,readonly:false}}\n" +
	"button0:Button{bounds:[10,40,200,65] , text:'Make Sprite Sheet'}}");

function makeSpriteSheet(col,row)
{
	///////////////////// Initialization /////////////////////
	var columnNum = parseInt(col);
	var rowNum = parseInt(row);
	var docHeight = activeDocument.height;
	var docWidth = activeDocument.width;
	var layerNum = activeDocument.artLayers.length;

	///////////////////// Duplicate and Resize document /////////////////////
	var dupDoc = activeDocument.duplicate('dupDoc');
	dupDoc.resizeCanvas(docWidth * columnNum,  docHeight * rowNum, AnchorPosition.TOPLEFT);

	///////////////////// Adding Guides /////////////////////
	var guideHPos = 0;
	for(var col = 0; col < columnNum; col++)
	{
		dupDoc.guides.add(Direction.VERTICAL, guideHPos);
		guideHPos += docWidth;
	}
	dupDoc.guides.add(Direction.VERTICAL, docWidth * columnNum);

	var guideVPos = 0;
	for(var row = 0; row < rowNum; row++)
	{
		dupDoc.guides.add(Direction.HORIZONTAL, guideVPos);
		guideVPos += docHeight;
	}
	dupDoc.guides.add(Direction.HORIZONTAL, docHeight * rowNum);

	///////////////////// Moving art layers /////////////////////

	// storing Layer objects in reverse order
	var layerArray = new Array();
	var counter = 0;
	for(var lyr = layerNum -1; lyr >= 0; lyr--)
	{
		layerArray[counter] = dupDoc.artLayers[lyr];
		counter += 1;
	}

	// positioning layer objects
	var layerCounter = 0;

	var rowPos = 0;
	for(var row = 0; row < rowNum; row++)
	{
		var colPos = 0;
		var posArray = new Array();
		for(var col = 0; col < columnNum; col++)
		{		
			if (layerCounter < layerNum)
			{
				posArray[0] = colPos;
				posArray[1] = rowPos;
				layerArray[layerCounter].translate(colPos,rowPos);
				colPos += docWidth;
				layerCounter += 1;
			}

		}
		rowPos += docHeight;
	}
}

win.button0.onClick = function() 
{
	makeSpriteSheet(win.colText.text, win.rowText.text);
}

win.center();
win.show();