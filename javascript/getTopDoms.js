$( initialise );

function initialise() {
    var ajex = $.ajax({
        url: ("../csv/million.csv"),
        dataType: "csv",
        async: false
    });

    var allTextLines = ajex.responseText.split(/\r\n|\n/);
    var headers = allTextLines[0].split(',');
    var lines = [];

    for (var i=1; i<allTextLines.length; i++) {
        var data = allTextLines[i].split(',');
        if (data.length == headers.length) {

            var tarr = [];
            for (var j=0; j<headers.length; j++) {
                tarr[headers[j]]=getData(data[j]);
            }
            lines.push(tarr);
        }
    }
    console.log(lines);
}

function getData(data) {
    var inD = $.parseJSON("{ \"att\": " + data +  "}");
    return inD.att;
}