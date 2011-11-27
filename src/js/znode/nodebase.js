 function NodeBase(xp, yp, w, h, noDelete, forceId){
	var zindex = 1;
    this.id = forceId;
    
    var curr = this;
    
    canvas.append("<div class='node'/>");
    var n = $(".node").last();
    n.css({"position" : "absolute",      
           "left" : xp, "top" : yp,
           "width" : w, "height" : h,   
           "border" : "1px solid gray",
           "background-color" : "white"});
    n.css("z-index", zindex++);
           
    this.content = n;
    
    this.width = function(){
      return n.width();
    }
    this.height = function(){
      return n.height();
    }
    this.x = function(){
      return n.position().left;
    }
    this.y = function(){
      return n.position().top;
    }
         
    var nodeWidth = n.width();
    var nodeHeight = n.height();
           
    n.append("<div class='bar'/>");
    var bar = $(".node .bar").last();
    bar.css({"height" : "20px", 
             "background-color" : "gray", 
             "padding" : "0", "margin": "0",
             "font-size" : "9px", "cursor" : "pointer"});
   
    n.append("<textarea class='txt' spellcheck='false' wrap='off' />");
    var txt = $(".node .txt").last();
    txt.css("position","absolute");
   
    txt.css({"width" : nodeWidth - 5,
             "height" : nodeHeight - bar.height() - 5,
             "resize" : "none", "overflow" : "auto",
             "font-size" : "12px" , "font-family" : "sans-serif",
             "border" : "none","z-index":4});
          
    this.txt = txt;
    
    n.append("<div class='resizer' />");
    var resizer = $(".node .resizer").last();
    
    resizer.css({"position" : "absolute" , "z-index" : 10,
                 "width" : "10px", "height" : "10px",
                 "left" : nodeWidth - 11, "top" : nodeHeight - 11,
                 "background-color" : "white", "font-size" : "1px",
                 "border" : "1px solid gray",
                 "cursor" : "pointer"});
    
    n.append("<div class='left'>");
    n.append("<div class='top'>");
    n.append("<div class='right'>");
    n.append("<div class='bottom'>");
    
    var left = $(".node .left").last();
    left.css("left","-11px");
    
    var top = $(".node .top").last();
    top.css("top","-11px");
    
    var right = $(".node .right").last();
    var bottom = $(".node .bottom").last();
    
    positionLeft();
    positionRight();
    positionTop();
    positionBottom();
    
    this.left = left;
    this.right = right;
    this.top = top;
    this.bottom = bottom;
    
    function positionLeft(){
      left.css("top", n.height() / 2 - 5);
    }
    function positionRight(){
      right.css("left",n.width() + 1).css("top", n.height() / 2 - 5);
    }
    function positionTop(){
      top.css("left", n.width() / 2 - 5);
    }
    function positionBottom(){
      bottom.css("top",n.height() + 1).css("left", n.width() / 2 - 5);
    }    
  
   this.remove = function(){
     n.remove();
     delete nodes[this.id];
   }
    
    resizer.mousedown(function(e){
      currentNode = curr;
      e.preventDefault();
      startDrag(resizer, {left : 60, top : 40, right : 500, bottom : 500},
      function(){
        var loc = resizer.position();
        var x = loc.left;
        var y = loc.top;
        n.css({"width" : x + resizer.width() + 1,
               "height" : y + resizer.height() + 1});
        
        txt.css({"width" : n.width() - 5, "height" : n.height() - bar.height() - 5});
        
        positionLeft();
        positionRight();
        positionTop();
        positionBottom();
		updateConnections();
      });
    });

    function updateConnections(){
       for (var i in curr.connections){
         var c = curr.connections[i];
         if (!c.removed){
           var nodeA = c.startNode.connectionPos(c.startConnection);
           var nodeB = c.endNode.connectionPos(c.endConnection);
           c.attr("path","M " + nodeA.x + " " + nodeA.y + " L " + nodeB.x + " " + nodeB.y);
            
         }
       }
    }
	this.updateConnections = updateConnections;
    
    bar.mousedown(function(e){
      currentNode = curr;
      n.css("z-index", zindex++);
      e.preventDefault();
      startDrag(n, {left : 10, top: 40, right : win.width() - n.width() - 10, bottom : win.height() - n.height() - 10},
      updateConnections);
    });
    
    n.mouseenter(function(){
      n.css("z-index", zindex++);
    });
	
	function startDrag(element, bounds, dragCallback){
    showOverlay();	
    var startX = mouseX - element.position().left;
    var startY = mouseY - element.position().top;
    if (!dragCallback) dragCallback = function(){};
      var id = setInterval(function(){
      var x = mouseX - startX;
      var y = mouseY - startY;
      if (bounds){
        if (x < bounds.left) x = bounds.left;
        if (x > bounds.right) x = bounds.right;
        if (y < bounds.top) y = bounds.top;
        if (y > bounds.bottom) y = bounds.bottom;
      }
      element.css("left", x).css("top",y);
      dragCallback();
    },topHeight);
    loops.push(id);
  }

 }
 