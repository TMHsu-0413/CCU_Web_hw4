<?php
  header('Content-Type:application/json;charset=UTF-8');
  header('Access-Control-Allow-Origin: *');
  header('Access-Control-Allow-Methods:GET,POST');
  header('Access-Control-Allow-Headers: *');

  if($_SERVER['REQUEST_METHOD'] == 'POST'){
    require "connectDB.php";
    $input = file_get_contents('php://input');
    $input=json_decode($input);

    $name = $input->name;
    $password = $input->password;
    $email = $input->email;

    $sql = "INSERT INTO hw4_User (Name,Email,Password) VALUES ('$name','$email','$password')";
    $result = $conn->query($sql);
    $conn->close();
  }
?>
