"use strict";

var fs          = require("fs");
var querystring = require("querystring");

var nodeStatic  = require("node-static");
var directory   = new nodeStatic.Server("./public");

var util        = require("./util.js");


function serveStaticFiles (req, res) {

    directory.serve(req, res);
}

function getPosts (req, res) {

    util.getFileData(res, function (data) {
        var posts = JSON.parse(data);

        if (util.isEmpty(posts)) {

            util.respondError(res, 204);
        } else {

            res.writeHead(200);
            res.write(data);
            res.end();
        }
    });
}

function createPost (req, res) {

    util.parseData(req, function (data) {

        util.getFileData(res, function (blogData) {

            var existingPosts   = JSON.parse(blogData);
            var newPost         = querystring.parse(data);
            var time            = Date.now();
            existingPosts[time] = newPost.post;

            fs.writeFile("./blog.json", JSON.stringify(existingPosts, null, 4), function (err) {

                if (err) {
                    util.respondError(res, 503);
                }
                res.writeHead(302, {"Location": "/"});
                res.end();
            });
        });
    });
}


module.exports = {
    serveStaticFiles: serveStaticFiles,
    getPosts: getPosts,
    createPost: createPost
};
