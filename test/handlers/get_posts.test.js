"use strict";

var fs          = require("fs");
var test        = require("tape");
var Shot        = require("shot");
var getPosts    = require("../../handlers.js").getPosts

function writeFakeData (callback) {
    var time    = Date.now();
    var posts   = {};
    posts[time] = "something here";

    fs.writeFile("./blog.json", JSON.stringify(posts, null, 4), function (err) {

        if (err) {
            return err
        }

        callback;
    });
}

function emptyData () {
    fs.writeFile("./blog.json", JSON.stringify({}, null, 4), function (err) {
        if (err) {
            return err;
        }
    });
}

test("/ serves up index.html", function (t) {

    var options = {
        method: "GET",
        url: "/posts"
    }
    writeFakeData(
        Shot.inject(getPosts, options, function (res) {
            // payload is always a string in the response, needs to be parsed
            var payload = JSON.parse(res.payload)

            t.equal(res.statusCode, 200, "Congrats, response is okay");
            t.equal(typeof payload, "object", "Parsed payload comes back as an object");
            t.end();
            emptyData();
        })
    )
});
