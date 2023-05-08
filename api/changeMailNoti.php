<?php
  header('Content-Type:application/json;charset=UTF-8');
  header('Access-Control-Allow-Origin: *');
  header('Access-Control-Allow-Methods:GET,POST,PUT');
  header('Access-Control-Allow-Headers: *');

  if($_SERVER['REQUEST_METHOD'] == 'PUT'){
    require "connectDB.php";
    $input = file_get_contents('php://input');
    $input=json_decode($input);

    $name = $input->name;
    $ID = $input->ID;

    $sql = "UPDATE hw4_User SET getMail = IF (getMail = 1,0,1) WHERE Name='$name' and ID = $ID";
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
