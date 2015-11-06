"use strict";

var handlers = require("./handlers.js");

function routes (request, response) {
    if ( request.url === "/posts" ) {

        handlers.getPosts(request, response);

    } else if ( request.url === "/create/post" ) {

        handlers.createPost(request, response);
    } else {

        handlers.serveStaticFiles(request, response);
    }
}

module.exports = routes;
