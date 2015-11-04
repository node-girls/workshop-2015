var fs          = require('fs');
var url         = require('url');
var querystring = require('querystring');

var nodeStatic  = require('node-static');
var directory   = new nodeStatic.Server('./public');


function serveStaticFiles (req, res) {

    directory.serve(req, res);
}

function getPostData (cb) {

	fs.readFile('./blog.json', 'utf-8', function (err, data) {

        cb(data);
    });
}

function getBlogPosts (res) {

	getPostData(function (posts) {
		res.writeHead(200);
        res.write(posts);
        res.end();
	})
}

function makeNewPost (req, res) {
	var data = '';

    req.on('data', function(chunk) {
        data += chunk;
    });

    req.on('end', function() {

    	getPostData( function (blogData) {
    		var posts 		= JSON.parse(blogData);
	        var blogpost 	= querystring.parse(data);
	        var timestamp 	= Date.now();
	        posts[timestamp] = blogpost.post;

	        fs.writeFile('./blog.json', JSON.stringify(posts, null, 4), function (err) {

	            if (err) {
	                console.log(err);
	            }
	            res.writeHead(302, {'Location': '/'});
	            res.end();
	        });
    	})
    });
}


module.exports = {
	serveStaticFiles: serveStaticFiles,
	getBlogPosts: getBlogPosts,
	makeNewPost: makeNewPost
}