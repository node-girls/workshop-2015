var fs          = require("fs");
var querystring = require("querystring");

var nodeStatic  = require("node-static");
var directory   = new nodeStatic.Server("./public");


function serveStaticFiles (req, res) {

    directory.serve(req, res);
}

function getPostData (cb) {

    fs.readFile("./blog.json", "utf-8", function (err, data) {

        if (err) {
            // TODO: handle error
        }

        cb(data);
    });
}

function getBlogPosts (res) {

    getPostData(function (posts) {
        res.writeHead(200);
        res.write(posts);
        res.end();
    });
}

function makeNewPost (req, res) {
    var data = "";

    req.on("data", function (chunk) {
        data += chunk;
    });

    req.on("end", function() {

        getPostData( function (blogData) {
            var existingPosts   = JSON.parse(blogData);
            var newPost         = querystring.parse(data);
            var time            = Date.now();
            existingPosts[time] = newPost.post;

            fs.writeFile("./blog.json", JSON.stringify(existingPosts, null, 4), function (err) {

                if (err) {
                    // TODO: handle error
                }
                res.writeHead(302, {"Location": "/"});
                res.end();
            });
        });
    });
}


module.exports = {
    serveStaticFiles: serveStaticFiles,
    getBlogPosts: getBlogPosts,
    getPostData: getPostData,
    makeNewPost: makeNewPost
};
