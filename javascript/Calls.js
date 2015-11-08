function Calls() {

    var useFake = true;

    this.makeCall = function (cmd, params) {
        if (useFake)
            return this.fakeCall(cmd, params);
        var ajex = $.ajax({
            url: "../php/call.php",
            cmd: cmd,
            params: params,
            dataType: "json",
            async: false
        });
        var json = $.parseJSON(ajex.responseText);
        return json.DataTables;
    };

    this.fakeCall = function (cmd, params) {
        var file = "";
        switch (cmd) {
            case "GetTopics":
                file = params.substr(5);
                console.log(file);
                break;
        }
        var ajex = $.ajax({
            url: ("../json/" + file + ".json"),
            dataType: "json",
            async: false
        });
        var json = $.parseJSON(ajex.responseText);
        return json.DataTables;
    }

}