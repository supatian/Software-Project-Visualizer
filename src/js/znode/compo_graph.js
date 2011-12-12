function CompoGraph(compoView) {
    var defaultWidth = 200;
    var defaultHeight = 300;

    canvas = $("#canvas");
    overlay = $("#overlay");
    topHeight = $("#controls").height();
    paper = new Raphael("canvas", "100", "100");

    function resizePaper() {
        paper.setSize(win.width(), win.height() - topHeight);
    }
    win.resize(resizePaper);
    resizePaper();

    $(document).mousemove(function (e) {
        mouseX = e.pageX;
        mouseY = e.pageY - topHeight;
    }).mouseup(function (e) {
        overlay.hide();
        var creatingNewNode = newNode;

        for (var i in loops) {
            clearInterval(loops[i]);
        }
        try {
            if (loops.length > 0) document.selection.empty();
        } catch (e) {}
        loops = [];

        if (creatingNewNode) currentNode.txt[0].focus();
    });


    function clear() {
        nodeId = 0;
        for (var i in nodes) {
            if (nodes[i]) {
                nodes[i].remove();
            }
        }
    }

    this.clearAll = function () {
        clear();
        currenNode = null;
    }

    this.addNode = function (xp, yp, w, h, text) {
        var node = new NodeCompo(xp, yp, w, h, text, compoView);
        nodes[node.id] = node;
        return node;
    }

    this.addNodeAtMouse = function () {
        var w = defaultWidth;
        var h = defaultHeight;
        var temp = this.addNode(mouseX, mouseY + 30, defaultWidth, defaultHeight);
        currentNode = temp;
    }

	this.highlight = function(){
 		for (var i in nodes) {
            if (nodes[i]) {
                nodes[i].highlight();
            }
        }
	}
	
    this.fromJSON = function (data) {
        clear();
        for (var i in data.nodes) {
            var n = data.nodes[i];            
            var addreturns = n.txt.replace(/\\n/g, '\n');
			var temp = this.addNode(n.x, n.y, n.width, n.height, addreturns);
        }
    }	

    this.toJSON = function () {
        var json = '{"nodes" : [';
        for (var i in nodes) {
            var n = nodes[i];
            json += '{"id" : ' + n.id + ', ';
            json += '"x" : ' + n.x() + ', ';
            json += '"y" : ' + n.y() + ', ';
            json += '"width" : ' + n.width() + ', ';
            json += '"height" : ' + n.height() + ', ';
            json += '"txt" : "' + addSlashes(n.getTxt()) + '"},';
        }
        json = json.substr(0, json.length - 1);
        json += '], "connections" : [';

        json += ']}';
        return json;
    }
}