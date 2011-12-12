extend = function (subClass, baseClass) {
    function inheritance() {}
    inheritance.prototype = baseClass.prototype;

    subClass.prototype = new inheritance();
    subClass.prototype.constructor = subClass;
    subClass.baseConstructor = baseClass;
    subClass.superClass = baseClass.prototype;
}

function NodeCompo(xp, yp, w, h, text, bCompo) {

    // call the baseclass constructor
    NodeCompo.baseConstructor.call(this, xp, yp, w, h);

    var curr = this;
    var n = $(".node").last();
    var n = $(".node").last();
    var nodeWidth = n.width();
    var nodeHeight = n.height();
    var bar = $(".node .bar").last();
    var resizer = $(".node .resizer").last();

    this.id = getNodeId();

    resizer.mousedown(function (e) {
        currentNode = curr;
        e.preventDefault();
        startDrag(resizer, {
            left: 100,
            top: 40,
            right: 500,
            bottom: 500
        }, function () {
            var loc = resizer.position();
            var x = loc.left;
            var y = loc.top;
            n.css({
                "width": x + resizer.width() + 1,
                "height": y + resizer.height() + 1
            });

            txt.css({
                "width": n.width() - 1,
                "height": n.height() - bar.height() - textAreaMargin + 4
            });

            positionLeft();
            positionRight();
            positionTop();
            positionBottom();
        });
    });

    var left = $(".node .left").last();
    var top = $(".node .top").last();
    var right = $(".node .right").last();
    var bottom = $(".node .bottom").last();

    function positionLeft() {
        left.css("top", n.height() / 2 - 5);
    }

    function positionRight() {
        right.css("left", n.width() + 1).css("top", n.height() / 2 - 5);
    }

    function positionTop() {
        top.css("left", n.width() / 2 - 5);
    }

    function positionBottom() {
        bottom.css("top", n.height() + 1).css("left", n.width() / 2 - 5);
    }

    function updateConnections() {}

    function startDrag(element, bounds, dragCallback) {
        showOverlay();
        var startX = mouseX - element.position().left;
        var startY = mouseY - element.position().top;
        if (!dragCallback) dragCallback = function () {};
        var id = setInterval(function () {
            var x = mouseX - startX;
            var y = mouseY - startY;
            if (bounds) {
                if (x < bounds.left) x = bounds.left;
                if (x > bounds.right) x = bounds.right;
                if (y < bounds.top) y = bounds.top;
                if (y > bounds.bottom) y = bounds.bottom;
            }
            element.css("left", x).css("top", y);
            dragCallback();
        }, topHeight);
        loops.push(id);
    }

    n.append("<div class='ex'>X<\/div>");
    var ex = $(".node .ex").last();
    ex.css({
        "position": "absolute",
        "padding-right": 2,
        "padding-top": 1,
        "padding-left": 2,
        "color": "white",
        "font-family": "sans-serif",
        "top": 2,
        "left": exMargin,
        "cursor": "pointer",
        "font-size": exSize,
        "background-color": nodeBgColor,
        "z-index": 100
    });
    ex.hover(function () {
        ex.css("color", "black");
    }, function () {
        ex.css("color", "white");
    }).click(function () {

        if (confirm("Are you sure you want to delete this node?")) {
            curr.remove();
        }
    });

    var strId = String(this.id);

    n.append("<div contentEditable='true' class='txtdiv' spellcheck='false' wrap='off' />");
    var txt = $(".node .txtdiv").last();
    txt.attr("id", strId);
    txt.css("position", "absolute");
    var bar = $(".node .bar").last();
    txt.css({
        "width": nodeWidth - 1,
        "height": nodeHeight - bar.height() - textAreaMargin + 4,
        "white-space": "nowrap",
        "font-size": "12px",
        "font-family": "sans-serif",
        "overflow": "scroll",
        "overflow-y": "scroll",
        "overflow-x": "scroll",
        "border": "none",
        "z-index": 4
    });

	if (text) {
        document.getElementById(strId).innerHTML = text;
	}
	var classname = findClassName(document.getElementById(strId).innerHTML);
	
	n.append("<div class='sourcecode'>" + classname);
    var sourcecode = $(".node .sourcecode").last();

    sourcecode.css({
        "position": "absolute",
        "z-index": 10,
        "width": "auto",
        "height": "11px",
        "left": nodeWidth + 15 - n.width(),
        "top": nodeHeight + 2 - n.height(),
        "font-size": "12px",
        "line-height": "12px",
        "color": "white",
        "font-family": "Monospace",
        "text-align": "center",
        "border": "0px",
        "border-radius": "1px",
        "background-color": nodeBgColor
    });

    this.getTxt = function () {
        var str = document.getElementById(strId).innerHTML;
        var strHighlight = fileName;

        if (bCompo == true && str) {
		    var objNames = findObjectName(str, fileName);
		    for (var i in objNames) {
			  str = highlightInit(str, objNames[i]);
			}
        }
		
		str = highlightRef(str, strHighlight);
		

        return str;
    }

    this.highlight = function () {
        document.getElementById(strId).innerHTML = this.getTxt();
    }
	
}

extend(NodeCompo, NodeBase);