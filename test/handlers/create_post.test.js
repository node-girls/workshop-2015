"use strict";

var fs          = require("fs");
var test        = require("tape");
var Shot        = require("shot");
var createPost    = require("../../handlers.js").createPost

test("createPost creates a post", function (t) {


    var options = {
        method: "POST",
        url: "/create/post",
        payload: "shot"
    }

    Shot.inject(createPost, options, function (res) {

        console.log(options);

        console.log(res);

        t.end();
    })
});
