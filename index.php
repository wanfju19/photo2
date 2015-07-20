<?php 
//include($_SERVER["DOCUMENT_ROOT"] . "/groogr/_includes/start.php");
//var_dump(file_get_contents($_POST["image0"]));


//echo $_POST["image0"];

foreach ($_POST AS $key => $value) {
    
    if (preg_match("/image/", $key)){
        file_put_contents($_SERVER["DOCUMENT_ROOT"] . "/groogr/test/photo1/" . $key . ".jpg", file_get_contents($value));
         //echo $key;
   }
    
   
    
    
}




 //move_uploaded_file($_SERVER["DOCUMENT_ROOT"] . "/groogr/test/photo1/a1.jpg", $_POST["image0"]);

 //file_put_contents($_SERVER["DOCUMENT_ROOT"] . "/groogr/" . $photodir . $tfilename . ".jpg", file_get_contents($_POST[$key]));

  