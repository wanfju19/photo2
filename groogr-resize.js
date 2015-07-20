
//  Upload file classes, file using string 
var GroogrResizeImage = function(container,imagelist,filebutton) {
    
             //$container1 = $("#"+container);
             //$inputFileButton1 = $("#"+filebutton);
             //$imageArea1 = $( "#" +  imagelist);
             //$images1 = $("#" +  imagelist + " img");
             $("#"+filebutton).on('change',function(){     // upload a file from input file button
                 // var filesToUpload = $(this).prop('files');
                 // var filesToUpload1 = $inputFileButton1.files;
                 filesToUpload1 = $("#"+filebutton).prop('files');
                 //alert(filesToUpload.length);
                 file2= filesToUpload1[0];
                 url2 = URL.createObjectURL(file2);
                 $("#"+filebutton).val("");
                 newCropImageStr(url2);   
             });            
            
             $("#" + container + " .resizeFile").on('click',function(){   // submit  form 
                 subForm1();
             });
             
             $( "#" +  imagelist).on("drop" , function(e){                // drop file on div
                 e.preventDefault();
                 var file2 = e.originalEvent.dataTransfer.files[0]; 
                 url2 = URL.createObjectURL(file2);
                 newCropImageStr(url2);
             });
        
            
             $( "#" +  imagelist).on('dragover', function(e) {          // drop file support
                    e.preventDefault();
                    e.stopPropagation();
                }
             );
    
             $( "#" +  imagelist).on('dragenter',function(e) {         // drop file support
                    e.preventDefault();
                    e.stopPropagation();
                }
             );             
             
            
            // resize a image and write the image to a div
            function newCropImageStr(url1){
                 var imgTemp = new Image(); 
                 imgTemp.src=url1;
                 imgTemp.addEventListener("load", function() {
                     aw = imgTemp.naturalWidth;
                     ah = imgTemp.naturalHeight;
                     var oc = document.createElement('canvas'),
                     octx = oc.getContext('2d');
                     if (aw>500) {
                         photoWidth = 500;
                     } else  {
                         photoWidth = aw;
                     }
                     
                     oc.width = photoWidth;
                     oc.height = photoWidth * ah/aw;
                     octx.drawImage(imgTemp, 0, 0, oc.width, oc.height);
                    
                     var newImg = document.createElement("img");
                     newImg.src = oc.toDataURL("image/png");
                     
                     $( "#" +  imagelist).append(newImg);
                     $( "#" +  imagelist + " img").last().wrap("<div class='onePhoto'></div>");
                     
                 }, false);               
            }
            
            
           function rotateImage(e,angle){
               //a = dataURItoBlob($(e.target).parents(".onePhoto").find("img").attr("src"));
               //url2 = URL.createObjectURL(a);
               //alert(url2);
               var TO_RADIANS = Math.PI/180;
               var imgTemp2 = new Image(); 
               imgTemp2.src=$(e.target).parents(".onePhoto").find("img").attr("src");
               aw = imgTemp2.naturalWidth;
               ah = imgTemp2.naturalHeight;               
               var oc = document.createElement('canvas'),
               octx = oc.getContext('2d');
               oc.width =  Math.max(ah,aw);  // we need use the max value, other wise will crop part of the image
               oc.height = Math.max(ah,aw);  // so after roate it is a square 
     
               octx.save(); 
               octx.translate(oc.width/2, oc.width/2);
               octx.rotate(angle * TO_RADIANS);
               octx.drawImage(imgTemp2, -(aw/2), -(ah/2));
	       octx.restore(); 
              
               var newImg = document.createElement("img");
               newImg.src = oc.toDataURL("image/png");  
               $(e.target).parents(".onePhoto").find("img").remove();
               $(e.target).parent().after(newImg);
               //$( "#" +  imagelist).append(newImg);
               //$( "#" +  imagelist + " img").last().wrap("<div class='onePhoto' style='position:relative;height:200px;width:200px;float:left;padding:6px;'></div>");               
           }
            
   

 

    
            //  Submit form and image
            function subForm1(){
                
                 if (imageNumber() <1 )  {
                    alert("No file");     
                    return;
                }
              
                 var fd = new FormData();
                 fd.append("name", "paul");
                 $("#" +  imagelist + " img").each(function( index,element ) {
                     //alert($(element)[0].src);
                     fd.append("image"+index, $(element)[0].src);
                 });
                 $.ajax({
                     url: 'index.php',
                     data: fd,
                     processData: false,
                     contentType: false,
                     type: 'POST',
                     success: function ( data ) {
                         alert( data );
                     }
                 });
            }   
            
            // return the photo number 
            function imageNumber(){
                return $( "#" +  imagelist + " img").length;
            }
            
            
            // show rotate and delete button when mouse on
            $( document ).delegate( "#" +  imagelist + " .onePhoto", "mouseover", function(e) {
               if ($(this).find(".DeletePhoto").length===0) {
                   a=$(this);
                   $.get("/feed/rotatebutton.html",function(data){
                       a.append(data);
                   });
               }
            }); 
           
            // remove button when mouse leave
            $( document ).delegate( "#" +  imagelist + " .onePhoto", "mouseleave", function(e) {
                 $(".removePhoto").remove();
                 $(".rotatePhoto").remove();
            });        

            // Delete the current photo when click a photo delete
            $( document ).delegate("#" +  imagelist + " .onePhoto .DeletePhoto", "click", function(e) {
               $(this).parent().parent().remove();
            });
            
            // Rotate the current photo when click rotate button
            $( document ).delegate("#" +  imagelist + " .onePhoto .RotateButton", "click", function(e) {
                   direction = $(this).attr("rotate_direction");
                   if (direction === "left") {
                        rotateImage(e,-90);
                   }
                   if (direction === "right") {
                        rotateImage(e,90);
                   }
            });            

}  // end of classs


// upload with blob
var GroogrResizeImage2 = function(container,imagelist,filebutton) {
    
             //$container1 = $("#"+container);
             //$inputFileButton1 = $("#"+filebutton);
             //$imageArea1 = $( "#" +  imagelist);
             //$images1 = $("#" +  imagelist + " img");
             
             var uploadfiles=[];
    
             $("#"+filebutton).on('change',function(){
                 //alert($(this).val());
                 // var filesToUpload = $(this).prop('files');
                 // var filesToUpload1 = $inputFileButton1.files;
                 // read the upload file and then create a 
                 filesToUpload1 = $("#"+filebutton).prop('files');
                 //alert(filesToUpload.length);
                 file2= filesToUpload1[0];
                 url2 = URL.createObjectURL(file2);
                 newCropImageBlob(url2);
            });            
            
             $("#" + container + " .resizeFile").on('click',function(){
                 subForm1();
             });
            
            
             // crop a image and write the image to a div
            function newCropImageBlob(url1){
                 var imgTemp = new Image(); 
                 imgTemp.src=url1;
                 imgTemp.addEventListener("load", function() {
                     aw = imgTemp.naturalWidth;
                     ah = imgTemp.naturalHeight;
                     var oc = document.createElement('canvas'),
                     octx = oc.getContext('2d');
                     oc.width = 500;
                     oc.height = 500 * ah/aw;
                     octx.drawImage(imgTemp, 0, 0, oc.width, oc.height);
                     //document.body.appendChild(oc);
                     oc.toBlob(function(blob) {
                          uploadfiles.push(blob);
                          var newImg = document.createElement("img");
                          url2 = URL.createObjectURL(blob);
                          newImg.onload = function() {
                              URL.revokeObjectURL(url2);
                          };
                         newImg.src = url2;
                         //document.body.appendChild(newImg);
                        $( "#" +  imagelist).append(newImg);
                        $( "#" +  imagelist + " img").last().wrap("<span></span>");
                     }); 
                 }, false);               
            }
            
    
            function subForm1(){
                
                
                 alert(uploadfiles.length);
                 alert(uploadfiles[0].size)
                 return;
                 var fd = new FormData();
                 fd.append("name", "paul");
                 $("#" +  imagelist + " img").each(function( index,element ) {
                     //alert($(element)[0].src);
                     fd.append("image"+index, $(element)[0].src);
                 });
                 $.ajax({
                     url: 'index.php',
                     data: fd,
                     processData: false,
                     contentType: false,
                     type: 'POST',
                     success: function ( data ) {
                            alert( data );
                     }
                 });
            }   
    

}  // end of classs


var a = new GroogrResizeImage("part1","imageList1","fileupload1");

var b = new GroogrResizeImage("part2","imageList2","fileupload2");
//var b = new GroogrResizeImage2("part3","imageList3","fileupload3");



function dataURItoBlob(dataURI) {
    // convert base64/URLEncoded data component to raw binary data held in a string
    var byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0)
        byteString = atob(dataURI.split(',')[1]);
    else
        byteString = unescape(dataURI.split(',')[1]);

    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to a typed array
    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ia], {type:mimeString});
}
