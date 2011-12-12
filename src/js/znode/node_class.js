extend = function(subClass, baseClass) {
     function inheritance() {}
     inheritance.prototype = baseClass.prototype;
  
     subClass.prototype = new inheritance();
     subClass.prototype.constructor = subClass;
     subClass.baseConstructor = baseClass;
     subClass.superClass = baseClass.prototype;  
     }
 
 function NodeClass(xp, yp, w, h, text, srcCode){
 
     // call the baseclass constructor
     NodeClass.baseConstructor.call(this, xp, yp, w, h); 	 
	 
     this.id = getNodeId();
	 var curr = this;
	 var topMargin = 50;
	 var nodeTxtWidth = win.width()/5;
	 var nodeTxtHeight = win.height()/2-topMargin;

   
   	var n = $(".node").last();

      n.append("<div class='ex'>X<\/div>");
      var ex = $(".node .ex").last();
      ex.css({"position":"absolute","padding-right" : 2, "padding-top" : 1, "padding-left" : 2,
              "color" : "white", "font-family" : "sans-serif",
              "top" : 2, "left": exMargin, "cursor": "pointer",
              "font-size" : exSize, "background-color" : nodeBgColor, "z-index" : 100});
      ex.hover(function(){
        ex.css("color","black");
      }, function(){
        ex.css("color","white");
      }).click(function(){
      
        if (confirm("Are you sure you want to delete this node?")){
          curr.remove();
        }
      });
	
	n.append("<div class='sourcecode'>source");		 
	var sourcecode = $(".node .sourcecode").last();
    
    sourcecode.css({"position" : "absolute" , "z-index" : 10,
                 "width" : "50px", "height" : "12px",
                 "left" : 14, "top" : 2,
                 "font-size" : "11px", "line-height": "6px",
				 "font-family": "Verdana", "text-align": "center", "padding-top" : "1px",
                 "border" : "1px solid white",				 
				 "border-radius": "3px",
				 "box-shadow": "inset 0 35px 35px -18px #95B9C7, inset 3px 0 12px #600",
				 "background-color": nodeBgColor,
                 "cursor" : "pointer"});
				 
    sourcecode.hover(function(){
        sourcecode.css("background-color","gray")},
		function(){
        sourcecode.css("background-color","white");
      });

   this.remove = function(){
     n.remove();
     delete nodes[this.id];
	 this.srcNode.hide();;
   }
	
	sourcecode.mousedown(function(e){
	    srcNode.toggle();
        currentNode = srcNode;
    });
	
	this.txt = $(".node .txt").last();
	
	this.txt.val(text); 
	var substr = "";
	if (text) {
	  substr = text.match(/\w+/);
	  }

    var srcNode = new NodeSrc(10, win.height()/2, nodeTxtWidth, win.height()/2-topMargin, srcCode, substr[0]);
	this.srcNode = srcNode;
 }
 
extend(NodeClass, NodeBase);


 