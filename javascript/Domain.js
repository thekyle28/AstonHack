function Domain(name, json) {

    this.name = name;
    this.topics = {};
    this.health = 500;

    var data = json.Topics.Data;
    for (var i = data.length - 1; i >= 0; i--) {
        this.topics[data[i].Topic.split("/")[0].toUpperCase()] = data[i].TopicalTrustFlow;
    }

    var topicOrder = [];
    for (var key in ["NEWS", "SHOPPING"]) {

    }
}