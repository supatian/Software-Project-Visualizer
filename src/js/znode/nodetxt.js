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
	 
	var txt = $(".node .txt").last();
    txt.css("position","absolute");
   
    txt.css({"width" : nodeWidth - 5,
             "height" : nodeHeight - bar.height() - 5,
             "resize" : "none", "overflow" : "hidden",
             "font-size" : "12px" , "font-family" : "sans-serif",
             "border" : "none","z-index":4});
          
    this.txt = txt;
 }
 
extend(Node, NodeBase);



 