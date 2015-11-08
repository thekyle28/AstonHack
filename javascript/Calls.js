function Calls() {

    var useFake = true;

    this.makeCall = function (cmd, params) {
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

}