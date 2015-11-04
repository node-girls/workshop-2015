var http        = require("http");
var handlers    = require("./handlers.js");

var server = http.createServer(function (request, response) {

    if ( request.url === "/posts" ) {

        handlers.getBlogPosts(response);

    } else if ( request.url === "/create/post" ) {

        handlers.makeNewPost(request, response);
    } else {

        handlers.serveStaticFiles(request, response);
    }
});

server.listen(8000, function () {
    console.log("blog server is running at port 8000!"); //eslint-disable-line no-console
});
