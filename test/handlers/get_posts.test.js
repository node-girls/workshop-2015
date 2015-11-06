"use strict";

var test        = require("tape");
var Shot        = require("shot");
var getPosts    = require("../../handlers.js").getPosts

test("/ serves up index.html", function (t) {

    var options = {
        method: "GET",
        url: "/posts"
    }

    Shot.inject(getPosts, options, function (res) {
        // payload is always a string in the response, needs to be parsed
        var payload = res.payload.length === 0
                    ? {} // empty objects in the payload just come back as an empty string
                    : JSON.parse(res.payload)

        t.equal(typeof payload, "object", "Parsed payload comes back as an object");
        t.end();
    });
});
