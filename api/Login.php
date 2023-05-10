<?php
  header('Content-Type:application/json;charset=UTF-8');
  header('Access-Control-Allow-Origin: *');
  header('Access-Control-Allow-Methods:GET,POST');
  header('Access-Control-Allow-Headers: *');

  if($_SERVER['REQUEST_METHOD'] == 'POST'){
    require "connectDB.php";
    $input = file_get_contents('php://input');
    $input=json_decode($input);

    $email = $input->email;
    $password = $input->password;

    $sql = "SELECT ID,Name FROM hw4_User WHERE Email='$email' and Password='$password'";
    $result = $conn->query($sql);
    $a=array();
    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
          $b=array("ID"=>$row["ID"],"Name"=>$row["Name"]);
          array_push($a,$b);
        }
    }
    echo json_encode($a);
    $conn->close();
  }
?>
