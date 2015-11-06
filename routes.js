var handlers = require("./handlers.js");
// TODO: remove node-static in favour of single file serving?

function routes (request, response) {
    if ( request.url === "/posts" ) {

        handlers.getBlogPosts(response);

    } else if ( request.url === "/create/post" ) {

        handlers.makeNewPost(request, response);
    } else {

        handlers.serveStaticFiles(request, response);
    }
}

module.exports = routes;
