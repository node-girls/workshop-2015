var http = require('http');
var fs = require('fs');
var url = require('url');
var querystring = require('querystring');
var blogData;

var server = http.createServer(function (request, response) {

    if (request.method === 'GET') {

        var pathFromRequest;

        if (request.url === '/posts') {

            // read posts from hard drive
            fs.readFile('./blog.json', 'utf-8', function(err, data) {
                // save as a JavaScript object
                blogData = JSON.parse(data);
                // send posts back to client
                response.writeHead(200);
                response.write(data);
                response.end();
            });

        } else if (request.url.match('/public')) {
            pathFromRequest = "." + request.url;
        } else {
            pathFromRequest = './public/index.html';
        }
        if (pathFromRequest){
            fs.readFile(pathFromRequest, 'utf-8', function(err, file) {
                // put in your response to send back to client
                response.write(file);
                response.end();
            });
        }

    }
    if (request.method === 'POST') {
        // add a post
        var data = '';
        var blogpost;

        request.on('data', function(chunk) {
            data += chunk;
        });

        request.on('end', function() {
            // extract relevant info from the request
            blogpost = querystring.parse(data);
            var timestamp = Date.now();
            blogData[timestamp] = blogpost.entry;
            console.log("after adding", blogData);
            fs.writeFile('./blog.json', JSON.stringify(blogData, null, 4), function(err) {

                if (err) {
                    console.log(err);
                }
                response.writeHead(302, {'Location': '/'});
                response.end();
            });
        });
    }
});

server.listen(8000);
console.log("blog server is running at port 8000!");
