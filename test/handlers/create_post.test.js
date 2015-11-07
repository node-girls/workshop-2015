"use strict";

var fs          = require("fs");
var test        = require("tape");
var Shot        = require("shot");
var createPost    = require("../../handlers.js").createPost

test("createPost sends back correct status code", function (t) {


    var options = {
        method: "POST",
        url: "/create/post",
        payload: "hello node"
    }

    Shot.inject(createPost, options, function (res) {

        t.equal(res.statusCode, 302, "Status code 302 comes back");
        t.end();
    })
});
