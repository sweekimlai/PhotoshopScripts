var win = new Window("dialog{text:'LOD Converter',bounds:[100,50,320,475]}");
var selectTIF = win.add('button', [10,10,210,35], 'Select textures');

var fileDir = win.add('edittext',[10,40,210,60],'file directory',{readonly:true});
var tifList = win.add('listbox', [10,65,210,320],undefined,{multiselect: true});
var useGreyScale =  win.add('checkbox', [10,320,250,340],'Enable greyscale conversion');
var lodA =  win.add('checkbox', [10,340,60,360],'lodA');
var lodB =  win.add('checkbox', [60,340,120,360],'lodB');
var lodC =  win.add('checkbox', [110,340,180,360],'lodC');
var lodP =  win.add('checkbox', [165,340,240,360],'lodP');
var lodConvert = win.add('button', [10,360,210,390], 'Convert LOD now');
var instruct = win.add('button', [10,390,210,420], 'Instructions');

app.preferences.rulerUnits = Units.PIXELS;

lodA.value = 1;
lodB.value = 1;
lodC.value = 1;
lodP.value = 1;

selectTIF.onClick = function() 
{
    tifList.removeAll();
    var tmpFile = openDialog();

    if(tmpFile.length < 1)
    {
        alert("Nothing slected");
    }
    else
    {
        //add file directory
        var dirStr = tmpFile[0].toString();
        var buffer = dirStr.split("/"); 
        fileDir.text  = buffer[1] + ":";        
        for (j=2;j<=buffer.length-2;j++)
        {
            fileDir.text = fileDir.text + "/" + buffer[j];
        }            
            
        //filing the list box with selected files
        for (i=0;i<=tmpFile.length-1;i++)
        {
            var fileStr= tmpFile[i].toString();
            var n=fileStr.split("/"); 
            tifList.add('item',n[n.length-1]);
        }
    }
}

lodConvert.onClick = function() 
{
    var tifItem = tifList.items;
    var sourceDir = fileDir.text;
    var greyTexMode = ['BMP','DRT1','DRT2','DSP','DSP1','DSP2','DSP3','DSP4','DSP5','DSP6',
    'MSK','MSK2','OCC','OCD','OPC','SPC','SPCR','SPCS','SSD','SSS'];
    for (i=0;i<=tifItem.length-1;i++)
    {
        var tifFileName = (tifItem[i].toString());
       
        //open the file in the list
        var fileRef = File(fileDir.text + "/" + (tifItem[i].toString()));        
        var docRef = app.open(fileRef);
        
        //if the file is in the greyscale mode, set it to greyscale
        if(useGreyScale.value == 1)
        {
            for(k=0;k<=greyTexMode.length-1;k++)
            {
                var texMode = tifItem[i].toString().match(greyTexMode[k]);
                if(texMode != null)
                {                
                    docRef.changeMode(ChangeMode.GRAYSCALE);
                }                        
            }
        }            
       
       if(lodA.value == 1)
       {
           docRef.resizeImage("8192 pixels","8192 pixels");
           var splitBufferA = tifFileName.split(".");
           var lodAFile = new File(fileDir.text + "/" + splitBufferA[0] + "-lodA.tif");           
           var zinTifSaveOptions = new TiffSaveOptions()
           docRef.saveAs(new File(lodAFile), zinTifSaveOptions, true, Extension.LOWERCASE)
        } 
    
       if(lodB.value == 1)
       {
           docRef.resizeImage("4096 pixels","4096 pixels");
           var splitBufferB = tifFileName.split(".");
           var lodBFile = new File(fileDir.text + "/" + splitBufferB[0] + "-lodB.tif");           
           var zinTifSaveOptions = new TiffSaveOptions()
           docRef.saveAs(new File(lodBFile), zinTifSaveOptions, true, Extension.LOWERCASE)
        }   

       if(lodC.value == 1)
       {
           docRef.resizeImage("2048 pixels","2048 pixels");
           var splitBufferC = tifFileName.split(".");
           var lodCFile = new File(fileDir.text + "/" + splitBufferC[0] + "-lodC.tif");           
           var zinTifSaveOptions = new TiffSaveOptions()
           docRef.saveAs(new File(lodCFile), zinTifSaveOptions, true, Extension.LOWERCASE)
        } 

       if(lodP.value == 1)
       {
           docRef.resizeImage("1024 pixels","1024 pixels");
           var splitBufferP = tifFileName.split(".");
           var lodPFile = new File(fileDir.text + "/" + splitBufferP[0] + "-lodP.tif");           
           var zinTifSaveOptions = new TiffSaveOptions()
           docRef.saveAs(new File(lodPFile), zinTifSaveOptions, true, Extension.LOWERCASE)
        } 
    docRef.close(SaveOptions.DONOTSAVECHANGES);
    } 
    alert("Job Done!!");
}    

instruct.onClick = function() 
{    
    var winInstruct = new Window("dialog{text:'Instructions',bounds:[100,50,730,400]}");
    winInstruct.add('statictext', [10,10,750,30], '[Select TIF Images]');
    winInstruct.add('statictext', [10,30,750,40], '- Select textures from a file directoty.');
    winInstruct.add('statictext', [10,60,750,70], '[file directory]');
    winInstruct.add('statictext', [10,75,750,85], '- Display path of the texture source directory. Non editable.');
    winInstruct.add('statictext', [10,105,750,115], '[Enable greyscale conversion]');
    winInstruct.add('statictext', [10,120,750,130], '- To allow automatic greyscale conversion, the name of the texture file has to have one of these texture mode');
    winInstruct.add('statictext', [10,135,750,145], '  within file name in capital letter. i.e. xxx-RGB.tif, xxxRGBxxx.tif');
    winInstruct.add('statictext', [10,150,750,160], '- These are the naming used for greyscale conversion:');
    winInstruct.add('statictext', [10,170,750,180], '  BMP DRT1 DRT2 DSP DSP1 DSP2 DSP3 DSP4 DSP5 DSP6 MSK MSK2 OCC OCD OPC SPC SPCR SPCS SSD SSS');
    winInstruct.add('statictext', [10,200,750,210], '[lodA]  [lodB]  [lodC]  [lodP]');
    winInstruct.add('statictext', [10,215,750,225], '- Select which resolution you would like to convert. lodA = 8k, lodB = 4k, lodC = 2k, lodP = 1k');
    winInstruct.add('statictext', [10,245,750,255], '[Convert LOD now]');
    winInstruct.add('statictext', [10,265,750,275], '- Convert all texture files in the list box. All converted textures will be saved in the same directory with.');
    winInstruct.add('statictext', [10,280,750,290], '  lod resolution append to the back of the file name. i.e. xxxRGB-lodA.tif');
    winInstruct.add('statictext', [10,310,750,320], 'Note: Only convert in TIF format and tested only in Photoshop CS5');
    /*
    winInstruct.add('statictext', [10,30,750,40], '- The benefit of turning on [Enable naming convention check] is, it allows the tool to automatically convert');
    winInstruct.add('statictext', [10,45,750,55], '  textures that are meant to be single channel or greyscale if the [Enable greyscale converion] is ON');
    winInstruct.add('statictext', [10,70,750,80], '- Texture files has to be named such as <<XXX-RGB.tif>> in order to pass naming convention check');
    winInstruct.add('statictext', [10,85,750,95], '  Here are the allowed naming attached to the end of the file name:');
    winInstruct.add('statictext', [10,105,750,115], '  BMP DRT1 DRT2 DSP DSP1 DSP2 DSP3 DSP4 DSP5 DSP6 HDR MSK MSK2 OCC OCD');
    winInstruct.add('statictext', [10,120,750,130], '  OPC REF RFLC RGB RGB1 RGB2 SPC SPCR SPCS SSD SSS');
    winInstruct.add('statictext', [10,145,750,155], '- Here are the textures mode naming that gets converted to greyscale or single channel is [Enable greyscale converion] is ON:');
    winInstruct.add('statictext', [10,165,750,175], '  BMP DRT1 DRT2 DSP DSP1 DSP2 DSP3 DSP4 DSP5 DSP6 MSK MSK2 OCC OCD OPC SPC SPCR SPCS SSD SSS');
    winInstruct.add('statictext', [10,195,750,205], '- Users would need to choose at least one from [lodA(8k)]   [lodB(4k)]   [lodC(2k)]   [lodP(1k)] in order to convert the textures');
    winInstruct.add('statictext', [10,220,750,230], '- Converted textures will be placed in the source directory with lod version append to the filename. i.e. XXX-RGB-lodA.tif');
    winInstruct.add('statictext', [10,250,750,260], '- Only convert in TIF format and tested only in Photoshop CS5');
    */

    winInstruct.center();
    winInstruct.show();
}    
win.center();
win.show();