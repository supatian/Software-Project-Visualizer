extend = function(subClass, baseClass) {
     function inheritance() {}
     inheritance.prototype = baseClass.prototype;
  
     subClass.prototype = new inheritance();
     subClass.prototype.constructor = subClass;
     subClass.baseConstructor = baseClass;
     subClass.superClass = baseClass.prototype;   
     }
 
 function NodeTxt(xp, yp, w, h, noDelete, forceId){
 
     // call the baseclass constructor
    Node.baseConstructor.call(this, xp, yp, w, h, noDelete, forceId); 
	
	var n = $(".node").last();
	n.css("display","none");
	 
	var txt = this.txt;
   
    txt.css({"white-space" : "nowrap",
	         "overflow" : "scroll",
             "overflow-y": "scroll",
             "overflow-x": "scroll"});
          
    this.txt = txt;
	
	this.toggle = function(){	
	   if(n.css("display") == 'block')
          n.css("display","none");
       else
          n.css("display","block");
    }
 }
 
extend(Node, NodeBase);
 