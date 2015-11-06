"use strict";

var test                = require("tape");
var Shot                = require("shot");
var serveStaticFiles    = require("../../handlers.js").serveStaticFiles;

test("/ serves up index.html", function (t) {

    var options = {
        method: "GET",
        url: "/"
    }

    Shot.inject(serveStaticFiles, options, function (res) {

        t.equal(res.statusCode, 200, "Congrats, response is okay");
        t.equal(res.headers["Content-Type"] , "text/html", "contains html");
        t.ok(res.payload.indexOf("Node Girls") > -1, "Correct Header Text");
        t.end();
    });
});

test("main.css is accessible by /main.css", function (t) {

    var options = {
        method: "GET",
        url: "/main.css"
    }

    Shot.inject(serveStaticFiles, options, function (res) {

        t.equal(res.statusCode, 200, "Congrats, file exists!");
        t.equal(res.headers["Content-Type"] , "text/css", "contains css");
        t.end();
    });
});
