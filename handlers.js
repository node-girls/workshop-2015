"use strict";

var fs          = require("fs");
var querystring = require("querystring");

var nodeStatic  = require("node-static");
var directory   = new nodeStatic.Server("./public");


function serveStaticFiles (req, res) {

    directory.serve(req, res);
}

function isEmpty (obj) {
    var hasOwnProperty  = Object.prototype.hasOwnProperty;

    if (obj == null || obj.length === 0) {
        return true;
    } else if (obj.length > 0) {
        return false;
    }

    for (var key in obj) {
        if (hasOwnProperty.call(obj, key)) {
            return false;
        }
    }

    return true;
}

function respondError (response, errorCode) {

    response.writeHead(errorCode);
    response.end();
}

function getFileData (response, callback) {

    fs.readFile("./blog.json", "utf-8", function (err, data) {

        if (err) {
            respondError(response, 500);
        } else {

            callback(data);
        }
    });
}

function getPosts (req, res) {

    getFileData(res, function (data) {
        var posts = JSON.parse(data);

        if (isEmpty(posts)) {

            respondError(res, 204);
        } else {

            res.writeHead(200);
            res.write(data);
            res.end();
        }
    });
}

function parseData (req, callback) {
    var data = "";

    req.on("data", function (chunk) {
        data += chunk;
    });

    req.on("end", function() {

        callback(data);
    });
}

function createPost (req, res) {

    parseData(req, function (data) {

        getFileData(res, function (blogData) {

            var existingPosts   = JSON.parse(blogData);
            var newPost         = querystring.parse(data);
            var time            = Date.now();
            existingPosts[time] = newPost.post;

            fs.writeFile("./blog.json", JSON.stringify(existingPosts, null, 4), function (err) {

                if (err) {
                    respondError(res, 503);
                }
                res.writeHead(200, {"Location": "/"});
                res.end();
            });
        });
    });
}


module.exports = {
    serveStaticFiles: serveStaticFiles,
    getPosts: getPosts,
    getFileData: getFileData,
    createPost: createPost
};
