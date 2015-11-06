"use strict";

var http    = require("http");
var routes  = require("./routes.js");

var server = http.createServer(routes);

server.listen(8000, function () {
    console.log("blog server is running at port 8000!"); //eslint-disable-line no-console
});

