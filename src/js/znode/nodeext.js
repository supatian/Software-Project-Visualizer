extend = function(subClass, baseClass) {
     function inheritance() {}
     inheritance.prototype = baseClass.prototype;
  
     subClass.prototype = new inheritance();
     subClass.prototype.constructor = subClass;
     subClass.baseConstructor = baseClass;
     subClass.superClass = baseClass.prototype;  
     }
 
 function Node(xp, yp, w, h, noDelete, forceId){
 
     // call the baseclass constructor
     Node.baseConstructor.call(this, xp, yp, w, h, noDelete, forceId); 
	 
	  this.connections = {};
     var connectionIndex = 0;
	 var curr = this;
	 var topMargin = 50;
	 var nodeTxtWidth = win.width()/5;
	 var nodeTxtHeight = win.height()/2-topMargin;
    
     this.addConnection = function(c){
      curr.connections[connectionIndex++] = c;
      return c;
    }
   
   	var n = $(".node").last();
	
	if (!noDelete){
      n.append("<div class='ex'>X<\/div>");
      var ex = $(".node .ex").last();
      ex.css({"position":"absolute","padding-right" : 2, "padding-top" : 1, "padding-left" : 2,
              "color" : "white", "font-family" : "sans-serif",
              "top" : 0, "left": 0, "cursor": "pointer",
              "font-size" : "7px", "background-color" : "gray", "z-index" : 100});
      ex.hover(function(){
        ex.css("color","black");
      }, function(){
        ex.css("color","white");
      }).click(function(){
      
        if (confirm("Are you sure you want to delete this node?")){
          curr.remove();
        }
      });
    }
	
	var nodeWidth = n.width();
    var nodeHeight = n.height();
	n.append("<div class='sourcecode'>SRC");		 
	var sourcecode = $(".node .sourcecode").last();
    
    sourcecode.css({"position" : "absolute" , "z-index" : 10,
                 "width" : "28px", "height" : "13px",
                 "left" : nodeWidth + 9 - n.width() , "top" : nodeHeight + 2 - n.height(),
                 "font-size" : "11px",
				 "font-family": "Monospace", "text-align": "center",
                 "border" : "1px solid white",				 
				 "border-radius": "3px",
				 "box-shadow": "inset 0 35px 35px -18px #95B9C7, inset 3px 0 12px #600",
				 "background-color": "white",
                 "cursor" : "pointer"});
				 
    sourcecode.hover(function(){
        sourcecode.css("background-color","gray")},
		function(){
        sourcecode.css("background-color","white");
      });
	  
	n.append("<div class='variable'>VAR");		 
	var variable = $(".node .variable").last();
    
    variable.css({"position" : "absolute" , "z-index" : 10,
                 "width" : "28px", "height" : "13px",
                 "left" : nodeWidth + 40 - n.width() , "top" : nodeHeight + 2 - n.height(),
                 "font-size" : "11px",
				 "font-family": "Monospace", "text-align": "center",
                 "border" : "1px solid white",
				 "border-radius": "3px",
				 "box-shadow": "inset 0 35px 35px -18px #95B9C7, inset 3px 0 12px #600",
				 "background-color": "white",
                 "cursor" : "pointer"});
				 
    variable.hover(function(){
        variable.css("background-color","gray")},
		function(){
        variable.css("background-color","white");
      });  
 
    
	var left = $(".node .left").last();   
    var top = $(".node .top").last();
    var right = $(".node .right").last();
    var bottom = $(".node .bottom").last();
	
    setupConnection(left);
    setupConnection(right);
    setupConnection(top);
    setupConnection(bottom);
    
     
    function setupConnection(div){
      div.css({"position" : "absolute", "width" : "10px", "padding":0,
               "height" : "10px", "background-color" : "#aaaaaa",
               "font-size" : "1px", "cursor" : "pointer"});
    }
    
    this.connectionPos = function(conn){
      var loc = conn.position();
      var nLoc = n.position();
      var point = {};
      point.x = nLoc.left + loc.left + 5;
      point.y = nLoc.top - topHeight + loc.top + 5;
      return point;
    }
        
   function addLink(e){
      currentNode = curr;
      e.preventDefault();
      showOverlay();
      var link = paper.path("M 0 0 L 1 1");
      link.attr({"stroke-width":2});
      currentConnection = link;
      currentConnection.parent = $(this);
      
      curr.addConnection(link);
      var loc = $(this).position();
      var nLoc = n.position();
      var x = loc.left + nLoc.left + 5;
      var y = loc.top + nLoc.top - topHeight + 5;
      newNode = true;
      
      var id = setInterval(function(){
        link.attr("path","M " + x + " " + y + " L " + mouseX + " " + mouseY);
        
        pathEnd.x = mouseX;
        pathEnd.y = mouseY;
      }, 30);
      loops.push(id);
   }
   left.mousedown(addLink);
   right.mousedown(addLink);
   top.mousedown(addLink);
   bottom.mousedown(addLink);
   
   this.remove = function(){
     for (var i in curr.connections){
       var c = curr.connections[i];
       c.remove();
       delete connections[c.id];
       delete curr.connections[i];
     }
     n.remove();
     delete nodes[this.id];
   }
	
	sourcecode.mousedown(function(e){
	    srcNode.toggle();
        currentNode = srcNode;
    });
	
    variable.mousedown(function(e){
       varNode.toggle();
       currentNode = varNode;
    });
	
	this.txt = $(".node .txt").last();
	
    var srcNode = new NodeTxt(10, topMargin, nodeTxtWidth, win.height()/2-topMargin);
	this.srcNode = srcNode;
	//var varNode = new NodeTxt(10, win.height()/2, nodeTxtWidth, win.height()/2-topMargin);
 }
 
extend(Node, NodeBase);


 