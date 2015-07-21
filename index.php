<?php 
//include($_SERVER["DOCUMENT_ROOT"] . "/groogr/_includes/start.php");
//var_dump(file_get_contents($_POST["image0"]));


//echo $_POST["image0"];

foreach ($_POST AS $key => $value) {
    
    if (preg_match("/image/", $key)){
        file_put_contents($_SERVER["DOCUMENT_ROOT"] . "/test/photo1/" . $key . ".jpg", file_get_contents($value));
         //echo $key;
   }
    
   
    
    
}




  
