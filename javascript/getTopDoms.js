$( initialise );

var csv = [];

function initialise() {
    var ajex = $.ajax({
        url: ("../csv/million.csv"),
        dataType: "csv",
        async: false
    });

    var allTextLines = ajex.responseText.split(/\r\n|\n/);
    var headers = allTextLines[0].split(',');

    for (var i=1; i<allTextLines.length; i++) {
        var data = allTextLines[i].split(',');
        if (data.length == headers.length) {

            var tarr = {};
            for (var j=0; j<headers.length; j++) {
                tarr[getData(headers[j])]=getData(data[j]);
            }
            csv.push(tarr);
        }
    }
}

function getData(data) {
    var inD = $.parseJSON("{ \"att\": " + data +  "}");
    return inD.att;
}

function getRandomDom() {
    var loc = Math.round(Math.random() * 100);
    return csv[loc];
}

function getRandomSite(after) {
    var domain = getRandomDom();
    var domainName = domain["Domain"];
    new Calls().makeCall("GetTopics", "Item=" + domainName, function(out) {
        after(new Domain(domainName, out));
    });
}