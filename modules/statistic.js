var fs = require("fs");

var statistic = {
    "grass": {
        "born": 0,
        "dead": 0,
        "current": 0
    },
    "grassEater": {
        "born": 0,
        "dead": 0,
        "current": 0
    },
    "predator": {
        "born": 0,
        "dead": 0,
        "current": 0
    },
    "fly": {
        "born": 0,
        "dead": 0,
        "current": 0
    },
    "frog": {
        "born": 0,
        "dead": 0,
        "current": 0
    }
};



function max(a, b, c, d) {
    if (a > b) {
        y = a;
    }
    else {
        y = b;
    }
    if (c > y) {
        y = c;
    }
    if (d > y) {
        y = d;
    }
    return y;
}



module.exports = statistic;
