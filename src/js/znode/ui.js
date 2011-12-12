$(function () {

    $(".btn").mouseenter(function () {
        $(this).animate({
            "backgroundColor": "white"
        }, 200);
    }).mouseleave(function () {
        $(this).animate({
            "backgroundColor": "#efefef"
        });
    });

    $("#logo").click(function () {
        window.history.back();
    });

    $("#nameForm").submit(function (e) {
        e.preventDefault();
        saveFile();
    });
	
});

	