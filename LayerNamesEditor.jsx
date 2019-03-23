    //
    //  Layer Names Editor
    // 
    //  Find & Replace
    //  Add Prefix/Suffix
    //  Remove <copy n>
    // 
    //

    var prefixesAdded = 0;
    var suffixesAdded = 0;

    var namesModified = 0;
    var layerCopyNremoved = 0;

    // ensure that there is at least one document open
    function docCheck() {
        if (!documents.length) {
            alert('There are no documents open.');
            return; // quit
        }
    }

    docCheck();
       
    function prefixSuffixLayer(obj, layerNamePrefix, layerNameSuffix)
       {
                if(obj.artLayers.length>0){
                for(var z = 0;z<obj.artLayers.length;z++){
                      var layer = obj.artLayers[z];
                      layer.name = layerNamePrefix + layer.name + layerNameSuffix ;
                  //prefixesAdded++;
                  //suffixesAdded++;
                  }
               }
            }

    function prefixSuffixLayerSet(obj, layerNamePrefix, layerNameSuffix){
                if(obj.layerSets.length > 0){
                      for(var l=0;l<obj.layerSets.length;l++){
                      obj.layerSets[l].name= layerNamePrefix + obj.layerSets[l].name + layerNameSuffix;
                      }
                  }
             }


    function main()
    {
       try
       {
           
          function findReplaceLayerName(obj,Find,Replace){
          var regFind = new RegExp(Find,"gi");
                if(obj.artLayers.length>0){
                for(var z = 0;z<obj.artLayers.length;z++){
                      var layer = obj.artLayers[z];
                      layer.name = layer.name.replace(regFind,Replace);
                  //namesModified++;
                }
                if(obj.layerSets.length > 0){
                      for(var l=0;l<obj.layerSets.length;l++){
                      var lname = obj.layerSets[l].name.replace(regFind,Replace);
                      obj.layerSets[l].name=lname;
                            findReplaceLayerName(obj.layerSets[l],Find,Replace);
                      //namesModified++;
                            }
                      }
                }
             }

          // build dialog box
          var win = new Window("dialog{text:'Layer Names Editor',bounds:[100,100,510,370],\n" +
    "panel0:Panel{bounds:[10,20,200,130] , text:'Find & Replace' ,properties:{borderStyle:'etched',su1PanelCoordinates:true}\n" +
    "button0:Button{bounds:[110,70,180,90] , text:'Replace' }\n" +
    "statictext1:StaticText{bounds:[10,21,80,38] , text:'Find:' ,properties:{scrolling:undefined,multiline:true}}\n" +
    "statictext2:StaticText{bounds:[10,42,80,59] , text:'Replace:' ,properties:{scrolling:undefined,multiline:true}}\n" +
    "edittext0:EditText{bounds:[80,19,170,39] , text:'' ,properties:{multiline:false,noecho:false,readonly:false}}\n" +
    "edittext1:EditText{bounds:[80,41,170,61] , text:'' ,properties:{multiline:false,noecho:false,readonly:false}}}\n" +
    "panel1:Panel{bounds:[210,20,400,190] , text:'Remove <copy n>' ,properties:{borderStyle:'etched',su1PanelCoordinates:true}\n" +
    "button1:Button{bounds:[110,130,180,150] , text:'Remove' }\n" +
    "statictext7:StaticText{bounds:[10,20,180,130] , text:'This command scans the layers / layersets names array for instances of <copy n> and removes them (i.e: Layer 1 copy 2 simply becomes Layer 1)' ,properties:{scrolling:undefined,multiline:true}}}\n" +
    "button2:Button{bounds:[310,220,390,250] , text:'OK' }\n" +
    "panel2:Panel{bounds:[10,140,200,250] , text:'Add Prefix / Suffix' ,properties:{borderStyle:'etched',su1PanelCoordinates:true}\n" +
    "button3:Button{bounds:[110,70,180,90] , text:'Add' }\n" +
    "statictext4:StaticText{bounds:[10,21,80,38] , text:'Prefix:' ,properties:{scrolling:undefined,multiline:true}}\n" +
    "statictext5:StaticText{bounds:[10,44,80,61] , text:'Suffix:' ,properties:{scrolling:undefined,multiline:true}}\n" +
    "edittext2:EditText{bounds:[80,19,170,39] , text:'' ,properties:{multiline:false,noecho:false,readonly:false}}\n" +
    "edittext3:EditText{bounds:[80,41,170,61] , text:'' ,properties:{multiline:false,noecho:false,readonly:false}}}};");

          // set dialog button to execute our function
          win.panel0.button0.onClick = function() {
             findReplaceLayerName(activeDocument,win.panel0.edittext0.text,win.panel0.edittext1.text);
             alert("Find & Replace operation complete!");
          }
     
          win.panel1.button1.onClick = function() {
          findReplaceLayerName(activeDocument, " copy( \\d+)?$", '')
          alert("Remove operation complete!");
          }
       
           win.panel2.button3.onClick = function() {
          prefixSuffixLayer(activeDocument, win.panel2.edittext2.text, win.panel2.edittext3.text);
          prefixSuffixLayerSet(activeDocument, win.panel2.edittext2.text, win.panel2.edittext3.text);
          alert("Add Prefix/Suffix operation complete!");
          }   

          // show user the dialog
          win.center();
          win.show();

       } catch(e) {
          // if the script fails, give the user a reason
          alert("Script failed with the following error: \n\n"+ e);
       }
    }

    // run script
    main(); 