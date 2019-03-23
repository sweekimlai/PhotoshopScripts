    function selectMask() {
        var desc184 = new ActionDescriptor();
            var ref84 = new ActionReference();
            ref84.putEnumerated( charIDToTypeID('Chnl'), charIDToTypeID('Chnl'), charIDToTypeID('Msk ') );
        desc184.putReference( charIDToTypeID('null'), ref84 );
        desc184.putBoolean( charIDToTypeID('MkVs'), false );
        executeAction( charIDToTypeID('slct'), desc184, DialogModes.NO );
    };

    function disableMask() {
        var desc14 = new ActionDescriptor();
            var ref10 = new ActionReference();
            ref10.putEnumerated( charIDToTypeID('Lyr '), charIDToTypeID('Ordn'), charIDToTypeID('Trgt') );
        desc14.putReference( charIDToTypeID('null'), ref10 );
            var desc15 = new ActionDescriptor();
            desc15.putBoolean( charIDToTypeID('UsrM'), false );
        desc14.putObject( charIDToTypeID('T   '), charIDToTypeID('Lyr '), desc15 );
        executeAction( charIDToTypeID('setd'), desc14, DialogModes.NO );
    };

    function enableMask() {
        var desc22 = new ActionDescriptor();
            var ref16 = new ActionReference();
            ref16.putEnumerated( charIDToTypeID('Lyr '), charIDToTypeID('Ordn'), charIDToTypeID('Trgt') );
        desc22.putReference( charIDToTypeID('null'), ref16 );
            var desc23 = new ActionDescriptor();
            desc23.putBoolean( charIDToTypeID('UsrM'), true );
        desc22.putObject( charIDToTypeID('T   '), charIDToTypeID('Lyr '), desc23 );
        executeAction( charIDToTypeID('setd'), desc22, DialogModes.NO );
    };

/*
    cTID = function(s) { return app.charIDToTypeID(s); };
    sTID = function(s) { return app.stringIDToTypeID(s); };
    Stdlib = {};

    Stdlib.selectLayerMask = function(doc, layer) {
        var desc = new ActionDescriptor();
        var ref = new ActionReference();

        ref.putEnumerated(cTID("Chnl"), cTID("Chnl"), cTID("Msk "));
        desc.putReference(cTID("null"), ref);
        desc.putBoolean(cTID("MkVs"), false );
        executeAction(cTID("slct"), desc, DialogModes.NO );
    };
    Stdlib.selectLayerMaskEdit = function(doc, layer) {
      Stdlib.selectLayerMask(doc, layer);

        var desc11 = new ActionDescriptor();
            var ref8 = new ActionReference();
            ref8.putEnumerated( cTID('Chnl'), cTID('Ordn'), cTID('Trgt') );
        desc11.putReference( cTID('null'), ref8 );
        desc11.putBoolean( cTID('MkVs'), true );
        executeAction( cTID('slct'), desc11, DialogModes.NO );
    };

    var doc = app.activeDocument;
    var layer = doc.activeLayer;
    Stdlib.selectLayerMaskEdit(doc, layer);
    doc.selection.selectAll();
    doc.selection.copy();

    // create a new document of the appropriate size
    // and paste the clipboard contents into it
    */

    function hasLayerMask() {
        var ref = new ActionReference();
        ref.putEnumerated(charIDToTypeID("Lyr "), charIDToTypeID("Ordn"), charIDToTypeID("Trgt"));
        var desc = executeActionGet(ref);
        return desc.hasKey(charIDToTypeID("UsrM"));
    }


disableMask()
