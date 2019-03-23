/////////////// Finding number of layers
var layerNum = activeDocument.artLayers.length;

/////////////// Loop through each layers and print out its name
for(var a=0;a< layerNum;a++)
{
	activeDocument.activeLayer = activeDocument.artLayers[a];
	var aa = activeDocument.artLayers[a];
	alert('Layer name ==> ' + aa.name);
}

/////////////// get document height and width
alert(activeDocument.height);
alert(activeDocument.width);

/////////////// duplicate document
activeDocument.duplicate('HeartDup');

/////////////// resize canvas
activeDocument.resizeCanvas(128,128,AnchorPosition.TOPLEFT);


/////////////// rotate each layer
activeDocument.activeLayer = activeDocument.artLayers[1];

for(var a=0;a< layerNum;a++)
{
	activeDocument.activeLayer = activeDocument.artLayers[a];
	var aa = activeDocument.artLayers[a];
	aa.rotate(40);
}

/////////////// duplicate current active layer
var newLyr = app.activeDocument.activeLayer.duplicate();

/////////////// translate or rotate layer
thisLayer.translate(14);
thisLayer.rotate(64);

/////////////// Adding guides to document
var guides = app.activeDocument.guides;
guides.add(Direction.HORIZONTAL, 0);
guides.add(Direction.VERTICAL, 0);
guides.add(Direction.HORIZONTAL, 64);
guides.add(Direction.VERTICAL, 64);