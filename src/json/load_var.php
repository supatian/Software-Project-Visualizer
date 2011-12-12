<?php

// list all files in the files directory
foreach(glob("../files/globvar/*.json") as $filename){
  $name = preg_split("/\//",$filename);
  // the 3rd array is *.json
  $name = preg_split("/\.json/", $name[3]);
  echo "<div class='file'>" .  $name[0] . "</div>";
}