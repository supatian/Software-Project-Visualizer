$(function(){ 

    var graph = new SourceGraph();

      $.getJSON("../files/inheritance/sourcecode/SOURCE_CODE.json", {n:Math.random()}, function(data){
         graph.fromJSON(data);         
         filename.val(name);
      });
    
    $("#canvas").mouseup(function(e){
         var children = $(e.target).children();
         if (children.length > 0){
           var type = children[0].tagName;
           if (type == "desc" || type == "SPAN"){
             graph.addNodeAtMouse();
           }
         }
    });    
    
    $("#clear").click(function(){
      graph.clearAll();
    });
    
    $("#save").click(saveFile);
    function saveFile(){
      var name = "/sourcecode/SOURCE_CODE";

      $.post("../json/save_inher.php", {data:graph.toJSON(), name:name}, function(data){
        alert("Your file was saved.");
      });
    }

    var filename = $("#filename").val(nameMessage);

  
});