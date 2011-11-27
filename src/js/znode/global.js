  var win = $(window);
  var paper;
  var canvas;
  var overlay;
  var mouseX = 0, mouseY = 0;
  var loops = [];    
  var currentNode;  
  var currentConnection = {};
  var connections = {};  
  var newNode;  
  var nodes = {};
  var topHeight;  
  var pathEnd = {};  
  
  function showOverlay(){
    overlay.show();
    overlay.css({"width" : win.width(), "height" : win.height()}); //, "opacity": 0.1});
  }