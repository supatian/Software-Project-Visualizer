<?php

if (isset($_POST["data"])){
  $data = stripslashes($_POST["data"]);
  $file = fopen("../files/composition/" . $_POST["name"] . ".json", "w") or die("error");
  fwrite($file, $data);
  fclose($file);
  echo "saved";
}