$(function(){ 

    var graph = new InherGraph();
	
    
    $("#canvas").mouseup(function(e){
       if (openWin.css("display") == "none"){
         var children = $(e.target).children();
         if (children.length > 0){
           var type = children[0].tagName;
           if (type == "desc" || type == "SPAN"){
             graph.addNodeAtMouse();
           }
         }
       }
    });
    
    // ui code
	var openWin = $("#openWin");
    openWin.hide();  
    
    $("#clear").click(function(){
      graph.clearAll();
    });
    
    $("#save").click(saveFile);
    function saveFile(){
      var name = filename.val();
      if (name == "" || name == nameMessage){
        alert("Please Name Your File");
        filename[0].focus();
        return;
      }
      $.post("../json/save_inher.php", {data:graph.toJSON(), name:name}, function(data){
        alert("Your file was saved.");
      });
    }
    
    $("#canvas").mousedown(function(){
      openWin.fadeOut();
    });
    
    $("#open").click(function(){
      var fileList =  $("#files");
      fileList.html("<div>loading...<\/div>");
      openWin.fadeIn();
      fileList.load("../json/load_inher.php?"+Math.random()*1000000);
    });

    var filename = $("#filename").val(nameMessage);
  
    filename.focus(function(){
      if ($(this).val() == nameMessage){
        $(this).val("");
      }
    }).blur(function(){
      if ($(this).val() == ""){
        $(this).val(nameMessage);
      }
    });
    
    $(".file").live('click', function() {
      var name = $(this).text();
      $.getJSON("../files/inheritance/" + name + ".json", {n:Math.random()}, function(data){
         graph.fromJSON(data);         
         filename.val(name);
      });
    }).live('mouseover', function(){
      $(this).css({"background-color": "#ededed"});
    }).live("mouseout", function(){
      $(this).css({"background-color": "white"});
    });
  
});