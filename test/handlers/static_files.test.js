"use strict";

var test        = require("tape");
var Shot        = require("shot");
var handlers    = require("../../handlers.js");

test("/ serves up index.html", function (t) {

    Shot.inject(handlers.serveStaticFiles, { method: "GET", url: "/" }, function (res) {

        t.equal(res.statusCode, 200, "Congrats, response is okay");
        t.equal(res.headers["Content-Type"] , "text/html", "contains html");
        t.ok(res.payload.indexOf("Node Girls") > -1, "Correct Header Text");
        t.end();
    });
});

test("main.css is accessible by /main.css", function (t) {

    Shot.inject(handlers.serveStaticFiles, { method: "GET", url: "/main.css" }, function (res) {

        t.equal(res.statusCode, 200, "Congrats, file exists!");
        t.equal(res.headers["Content-Type"] , "text/css", "contains css");
        t.end();
    });
});
