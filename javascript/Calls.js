function Calls() {

    var useFake = false;

    this.makeCall = function (cmd, params, after) {
        if (useFake)
            return this.fakeCall(cmd, params, after);
        $.ajax({
            url: "../php/call.php?cmd=" + cmd + "&params=" + params,
            type: "GET",
            dataType: "json",
            async: true,
            complete: function(ajex) {handleAjex(ajex, after)}
        });

    };

    this.fakeCall = function (cmd, params, after) {
        var file = "";
        switch (cmd) {
            case "GetTopics":
                file = params.substr(5);
                console.log(file);
                break;
        }
        $.ajax({
            url: ("../json/" + file + ".json"),
            dataType: "json",
            async: true,
            complete: function(ajex) {handleAjex(ajex, after)}
        });
    };

    function handleAjex(ajex, after) {
        var json = $.parseJSON(ajex.responseText);
        after(json.DataTables);
    }

}