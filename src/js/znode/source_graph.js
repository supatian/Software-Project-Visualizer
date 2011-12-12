function SourceGraph(){  
  var key = {};
  var defaultWidth = 150;
  var defaultHeight =100;  
  
  canvas = $("#canvas");
  overlay = $("#overlay");
  topHeight = $("#controls").height();
  paper = new Raphael("canvas", "100", "100");
  
  function resizePaper(){
    paper.setSize(win.width(), win.height() - topHeight);
  }
  win.resize(resizePaper);
  resizePaper();
  
   
  $(document).keydown(function(e){
    key[e.keyCode] = true;
  }).keyup(function(e){
    key[e.keyCode] = false;
  });
  
  $(document).mousemove(function(e){
    mouseX = e.pageX;
    mouseY = e.pageY - topHeight;
  }).mouseup(function(e){
    overlay.hide();
    var creatingNewNode = newNode;  

    newNode = false;
    
    for (var i in loops){
      clearInterval(loops[i]);
    }
    try{
      if (loops.length > 0) document.selection.empty();
    }catch(e){}
    loops = [];
    
    if (creatingNewNode) currentNode.txt[0].focus();
  });
  
  
 function clear(){
    nodeId = 0;
    connectionId = 0;
    for (var i in nodes){
	  if(nodes[i]) {
      nodes[i].remove();
	  }
    }
  }
  
  this.clearAll = function(){
    clear();
    currenNode = null;
  }
  
  this.addNode = function(xp, yp, w, h, txt, src){  
    var node = new NodeClass(xp, yp, w, h, txt, src);
	nodes[node.id] = node;
    return node; 
  }
  
  this.addNodeAtMouse = function(){
    var w = defaultWidth;
    var h = defaultHeight;
    var temp = this.addNode(mouseX, mouseY + 30, defaultWidth, defaultHeight);
    currentNode = temp;
  }
 
  this.fromJSON = function(data){
    clear();
    for (var i in data.nodes){
      var n = data.nodes[i];
	  var strTxt = n.txt.replace(/\\n/g,'\n');
	  var strSrc = n.src.replace(/\\n/g,'\n');
	  var temp = this.addNode(n.x, n.y, n.width, n.height, strTxt, strSrc);
    }
  }
  
  this.toJSON = function(){
    var json = '{"nodes" : [';
    for (var i in nodes){
      var n = nodes[i];
      json += '{"id" : ' + n.id + ', ';
      json += '"x" : ' + n.x() + ', ';
      json += '"y" : ' + n.y() + ', ';
      json += '"width" : ' + n.width() + ', ';
      json += '"height" : ' + n.height() + ', ';
      json += '"txt" : "' + addSlashes(n.txt.val()) + '",';
	  json += '"src" : "' + addSlashes(n.srcNode.txt.val()) + '"},';
    }
    json = json.substr(0, json.length - 1);
    json += '], "connections" : [';
    json += ']}';
    return json;
  }

}