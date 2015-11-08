function Domain(name, json) {

    this.name = name;
    this.topics = {};
    this.health = 500;

    var data = json.Topics.Data;
    for (var i = data.length - 1; i >= 0; i--) {
        this.topics[data[i].Topic.split("/")[0].toUpperCase()] = data[i].TopicalTrustFlow;
    }
    console.log(this.topics);

    this.topicOrder = [];
    var arr = ["NEWS", "SHOPPING", "ARTS", "BUSINESS", "COMPUTERS", "SPORTS", "HEALTH", "SCIENCE"];
    i = 0;
    for (var key in arr) {
        if (typeof(this.topics[arr[key]]) !== "undefined") {
            this.topicOrder[i++] = arr[key];
        }
    }
    var topicsy = this.topics;
    this.topicOrder.sort(function(a, b) {
        return topicsy[b] - topicsy[a];
    });
    console.log(this.topics);
    console.log(this.topicOrder);

}