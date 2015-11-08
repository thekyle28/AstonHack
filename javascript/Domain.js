function Domain(name, json) {

    this.name = name;
    this.topics = {};
    this.health = 10;

    var data = json.Topics.Data;
    for (var i = data.length - 1; i >= 0; i--) {
        this.topics[data[i].Topic.split("/")[0]] = data[i].TopicalTrustFlow;
    }
}