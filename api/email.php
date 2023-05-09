<?php
header('Content-Type:application/json;charset=UTF-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods:GET,POST,PUT');
header('Access-Control-Allow-Headers: *');
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require './PHPMailer/src/Exception.php';
require './PHPMailer/src/PHPMailer.php';
require './PHPMailer/src/SMTP.php';

if($_SERVER['REQUEST_METHOD'] == 'POST'){

    $mail = new PHPMailer();

    //Server settings
    $mail->isSMTP();
    $mail->Host  	= 'wwwdmplus.csie.io';
    $mail->SMTPAuth	= false;
    $mail->SMTPAutoTLS 	= false;
    $mail->Port	= 25;
    $mail->CharSet = 'UTF-8';

    require "connectDB.php";
    $input = file_get_contents('php://input');
    $input=json_decode($input);

    $name = $input->name;
    $id = $input->ID;
    $content = $input->content;

    $sql = "SELECT Email FROM hw4_User WHERE Name='$name' and ID=$id";
    $result = $conn->query($sql);
    $a=array();
    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
          $b=array("Email"=>$row["Email"]);
          array_push($a,$b);
        }
    }

    //Recipients
    $mail->setFrom('dmplus@wwwdmplus.csie.io', 'Weather Forecast');
    $mail->addAddress($a[0]["Email"], 'User '.$name);
     
    //Content
    $mail->isHTML(true); //Set email format to HTML
    $mail->Subject	= 'Weather forecast for next 5 days';
    $mail->AddEmbeddedImage('./Header.png','web_image');
    $mail->Body = "<img src='cid:web_image' />" . $content;


    $mail->send();
}
