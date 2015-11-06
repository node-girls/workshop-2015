var http        = require('http');
var handlers    = require('./handlers.js');

var routes = function (request, response) {

    if ( request.url === "/posts" ) {

        handlers.publishBlogPosts(response);

    } else if ( request.url === "/create/post" ) {

        handlers.makeNewPost(request, response);
    } else {

        handlers.serveStaticFiles(request, response);
    }
};

http.createServer(routes);

server.listen(8000, function () {
    console.log("blog server is running at port 8000!");
});

module.exports = routes;
