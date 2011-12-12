extend = function(subClass, baseClass) {
     function inheritance() {}
     inheritance.prototype = baseClass.prototype;
  
     subClass.prototype = new inheritance();
     subClass.prototype.constructor = subClass;
     subClass.baseConstructor = baseClass;
     subClass.superClass = baseClass.prototype;   
     }
 
 function NodeSrc(xp, yp, w, h, strSrc, className){
 
     // call the baseclass constructor
    NodeSrc.baseConstructor.call(this, xp, yp, w, h); 
	
	var n = $(".node").last();
	n.css("display","none");
	    		
	//this.txt = $(".node .txt").last();	
	this.txt.val(strSrc); 		
	
	this.toggle = function(){	
	   if(n.css("display") == 'block')
          n.css("display","none");
       else
          n.css("display","block");
    }
	
	this.hide = function(){	
          n.css("display","none");
    }
	
    n.append("<div class='sourcecode'>" + className);
    var sourcecode = $(".node .sourcecode").last();
	
    sourcecode.css({
        "position": "absolute",
        "z-index": 10,
        "width": "auto",
        "height": "11px",
        "left": 15,
        "top": 2,
        "font-size": "12px",
        "line-height": "12px",
        "color": "white",
        "font-family": "Monospace",
        "text-align": "center",
        "border": "0px",
        "border-radius": "1px",
        "background-color": nodeBgColor
    });
 }
 
extend(NodeSrc, NodeBase);
 