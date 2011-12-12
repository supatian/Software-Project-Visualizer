$(function () {

    var openWin = $("#openWin");
    openWin.hide();
	
	var compoView;	
	var loadPath;
	var savePath;
	var directory;
    var strView = document.getElementById("view").innerHTML;

	if (strView == "Composition View")
	{
	   compoView = true;
	   loadPath = "../json/load_compo.php?";
	   savePath = "../json/save_comp.php";
	   directory = "../files/composition/";
	}
	else
	{
      compoView = false;
	  loadPath = "../json/load_var.php?";
	  savePath = "../json/save_var.php";
	  directory = "../files/globvar/";
	}
	
    var graph = new CompoGraph(compoView);

    var filename = $("#filename").val(nameMessage);

    filename.focus(function () {
        if ($(this).val() == nameMessage) {
            $(this).val("");
        }
    }).blur(function () {
        if ($(this).val() == "") {
            $(this).val(nameMessage);
        }
    });
	
	$("#save").click(saveFile);

    $("#canvas").mouseup(function (e) {
        if (openWin.css("display") == "none") {
            var children = $(e.target).children();
            if (children.length > 0) {
                var type = children[0].tagName;
                if ((type == "desc" || type == "SPAN") ) {
                    graph.addNodeAtMouse();
                }
            }
        }
    });

    $("#open").click(function () {
        var fileList = $("#files");
        fileList.html("<div>loading...<\/div>");
        openWin.fadeIn();
        fileList.load(loadPath + Math.random() * 1000000);
    });

    $("#canvas").mousedown(function () {
        openWin.fadeOut();
		graph.highlight();
    });
    

    function saveFile() {
        var name = filename.val();
        if (name == "" || name == nameMessage) {
            alert("Please Name Your File");
            filename[0].focus();
            return;
        }
        $.post(savePath, {
            data: graph.toJSON(),
            name: name
        }, function (data) {
            alert("Your file was saved.");
        });
    }


    $(".file").live('click', function () {
        var name = $(this).text();
        $.getJSON(directory + name + ".json", {
            n: Math.random()
        }, function (data) {
		    // set the global variable
			fileName = name;
            graph.fromJSON(data);
            filename.val(name);			
        });
    }).live('mouseover', function () {
        $(this).css({
            "background-color": "#ededed"
        });
    }).live("mouseout", function () {
        $(this).css({
            "background-color": "white"
        });
    });


    $("#clear").click(function () {
        graph.clearAll();
		fileName = "";
    });

});