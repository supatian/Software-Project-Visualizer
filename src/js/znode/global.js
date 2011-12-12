  var win = $(window);
  var paper;
  var canvas;
  var overlay;
  var mouseX = 0,
      mouseY = 0;
  var loops = [];
  var currentNode;
  var currentConnection = {};
  var connections = {};
  var newNode;
  var nodes = {};
  var topHeight;
  var pathEnd = {};
  var nodeId = 0;
  var comPath = "../files/composition/";
  var inherPath = "../files/inheritance/";
  var varPath = "../files/globvar/";
  var fileName = "";
  var controlHeight = 43;
  var textAreaMargin = 14;
  var nodeBgColor = "#94B8FF";
  var resizerWidth = "10px";
  var exMargin = 5;
  var exSize = "9px";
  var nameMessage = "Enter your class or variable name";

  function showOverlay() {
      overlay.show();
      overlay.css({
          "width": win.width(),
          "height": win.height()
      }); //, "opacity": 0.1});
  }

  function getNodeId() {
      return nodeId++;
  }

  function addSlashes(str) {
      str = str.replace(/\\/g, '\\\\');
      str = str.replace(/\'/g, '\\\'');
      str = str.replace(/\"/g, '\\\\"');
      str = str.replace(/\0/g, '\\0');
      str = str.replace(/\t/g, '    ');
      str = str.replace(/\n/g, '\\\\n');
      return str;
  }

  function addSlashesForHighlight(str) {
      str = str.replace(/\./g, '\\\.');
      str = str.replace(/\[/g, '\\\[');
      str = str.replace(/\{/g, '\\\{');
      str = str.replace(/\(/g, '\\\(');
	  str = str.replace(/\)/g, '\\\)');
      str = str.replace(/\n/g, '\\\\n');
      return str;
  }

  // highlight the creation of an object
  function highlightInit(str)
  {
      var temp = "<span class=\"highlight\">replace</span>";
      var matches, temp2, match;
  
      // also highlight the object creation
      var re = "new\\sClassName\\(";
      re = re.replace("ClassName", fileName);
      matches = str.match(re);
      if (matches) {
          temp2 = temp;
          temp2 = temp2.replace("replace", matches[0]);
		  match = addSlashesForHighlight(matches[0]);
          var regex = new RegExp(match, "g");
          str = str.replace(regex, temp2);
      }
	  
	  return str;
  }
  
  // highlight the references of an object
  function highlightRef(str, keyword) {
          var temp = "<span class=\"highlight\">replace</span>";
          var re = "\\W" + keyword + "\\W";
          var regex = new RegExp(re, "g");
          var matches, temp2, match;
      if (keyword) {
          matches = str.match(regex);
          for (var i in matches) {
              match = matches[i];
              temp2 = temp;			  
              temp2 = temp2.replace("replace", match);			  
              match = addSlashesForHighlight(match);
              regex = new RegExp(match, "g");
              str = str.replace(regex, temp2);
          }
      }

      return str;
  }

  function findObjectName(str, className) {
      var re = "\\w+\\s=\\snew\\sClassName\\(";
      var re = re.replace("ClassName", className);
	  var regex = new RegExp(re, "g");
      var matches = str.match(regex);
	  	  
	  for (var i in matches) {
              matches[i] = matches[i].substring(0, matches[i].indexOf(" "));
      }

      return matches;

  }

  // find the name of the class given the source code
  function findClassName(str) {
      var subnewtext = "";
      if (str) {
          var re = "function\\s\\w+\\(\\)";
          var newtext = str.match(re);
          if (newtext) {
              subnewtext = newtext[0].substring(newtext[0].indexOf(" "), newtext[0].indexOf("()"));
          }
      }

      return subnewtext;

  }