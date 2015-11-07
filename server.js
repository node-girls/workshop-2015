/* *
 * Start by requiring in the http module,
 * and make your own server!
 */

"use strict";

var http        = require("http");
var fs          = require("fs");
var querystring = require("querystring");

var nodeStatic  = require("node-static");
var directory   = new nodeStatic.Server("./public");

/*
* In JS everything is an event and a stream.
* Data from the client is the same. You first have to
* parse it, and then you can access it as a string
*/

function parseData (req, callback) {
    var data = "";
    // Existing event on the request object
    req.on("data", function (chunk) {
        // data comes as partial "chunks" which are added to the existing string
        data += chunk;
    });

    req.on("end", function() {
        // data is now a complete string
        callback(data);
    });
}

function getFileData (response, callback) {
    // Reads the file where all the data is kept
    fs.readFile("./blog.json", "utf-8", function (err, data) {

        if (err) {
            respondError(response, 500);
        } else {
            // returns the data as a paramater in a callback
            callback(data);
        }
    });
}


var server = http.createServer(function (request, response) {
    if ( request.url === "/posts" ) {

        // handlers.getPosts(request, response);

    } else if ( request.url === "/create/post" ) {
        // userInput is the string version of the form input
        parseData(request, function (userInput) {
            // blogData is the is the information from blog.json
            getFileData(response, function (blogData) {
                // JSON.parse turns the stringified data into a JSON again
                var existingPosts   = JSON.parse(blogData);
                var newPost         = querystring.parse(userInput);
                var time            = Date.now();
                // Adds a new post to the data
                existingPosts[time] = newPost.post;
                // Writes to the blog.json the new data object
                fs.writeFile("./blog.json", JSON.stringify(existingPosts, null, 4), function (err) {

                    if (err) {
                        util.respondError(res, 503);
                    }
                    // Responds with 302 (redirect code) and a location to force client to refresh
                    response.writeHead(302, {"Location": "/"});
                    response.end();
                });
            });
        });
    } else {

        directory.serve(request, response);
    }
});

server.listen(8000, function () {
    console.log("blog server is running at port 8000!"); //eslint-disable-line no-console
});
