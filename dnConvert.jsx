var win = new Window("dialog{text:'LOD Converter',bounds:[100,50,320,670]}");
var selectTIF = win.add('button', [10,10,210,35], 'Select TIF Images');
var fileDir = win.add('edittext',[10,40,210,63],'file directory',{readonly:true});
var tifList = win.add('listbox', [10,70,210,520],{scrolling:true});
var lodA =  win.add('checkbox', [10,520,60,540],'lodA');
var lodB =  win.add('checkbox', [60,520,120,540],'lodB');
var lodC =  win.add('checkbox', [110,520,180,540],'lodC');
var lodP =  win.add('checkbox', [165,520,240,540],'lodP');
var lodConvert = win.add('button', [10,550,210,580], 'Convert LOD now');
var instruct = win.add('button', [10,580,210,610], 'Instruction');

app.preferences.rulerUnits = Units.PIXELS;

selectTIF.onClick = function() 
{
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
        var spliBufferA = tifFileName.split("-"); 
        if (spliBufferA[1] == undefined)
        {
            alert("One of the file in the list has wrong naming convention. OH NO!!");
        }            
        //finding the texture mode i.e. RGB, BMP
        var texMode = (spliBufferA[1].toString()).split(".");
        
        //open the file in the list
        var fileRef = File(fileDir.text + "/" + (tifItem[i].toString()));        
        var docRef = app.open(fileRef);
        
        //if the file is in the greyscale mode, set it to greyscale
        for(k=0;k<=greyTexMode.length-1;k++)
        {                   
            if(texMode[0] == greyTexMode[k])
            {                
                docRef.changeMode(ChangeMode.GRAYSCALE);
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
    var winInstruct = new Window("dialog{text:'Instruction',bounds:[100,50,750,370]}");
    winInstruct.add('statictext', [10,10,750,30], '**Important**');
    winInstruct.add('statictext', [10,30,750,40], '- In order for this tool to work, the texture naming has to be as follow:');
    winInstruct.add('statictext', [10,45,750,55], '   XXXXX-RGB.tif');
    winInstruct.add('statictext', [10,70,750,80], '- Following texture mode in the naming convention will get automatically convert into greyscale:');
    winInstruct.add('statictext', [10,85,750,95], '  BMP DRT1 DRT2 DSP DSP1 DSP2 DSP3 DSP4 DSP5 DSP6 MSK MSK2 OCC OCD OPC SPC SPCR SPCS SSD SSS');
    winInstruct.add('statictext', [10,110,750,120], '- lodA(8k)   lodB(4k)   lodC(2k)   lodP(1k)');
    winInstruct.center();
    winInstruct.show();
}    
win.center();
win.show();