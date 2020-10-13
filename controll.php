<?php
if(!empty($_FILES['file'])){
	$file=$_POST['file_name'];
$location='./upload/'.$file;
move_uploaded_file($_FILES['file']['tmp_name'],$location);  
}

?>