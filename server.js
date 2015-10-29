var http = require('http');
var fs = require('fs');
var jsonfile = require('jsonfile');
var url = require('url');
var querystring = require('querystring');
var blogDataStringified;
var blogData;

var server = http.createServer(function (request, response) {

    if (request.method === 'GET') {

        var path;

        if (request.url === '/posts') {

            // read posts from hard drive
            fs.readFile('./blog.json', 'utf-8', function(err, data) {
                console.log (data);
                // save as a JavaScript object
                blogData = JSON.parse(data);
                console.log("after parsing blogData is a ", typeof blogData);
                // send posts back to client
                response.writeHead(200);
                response.write(data);
                response.end();
            });



        } else if (request.url.match('/public')) {
            path = "." + request.url;
        } else {
            path = './public/index.html';
        }
        if (path){
            fs.readFile(path, 'utf-8', function(err, file) {
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
            fs.writeFile('./blog.json', JSON.stringify(blogData, null, 4), function(err) {

                if (err) {
                    console.log(err);
                }
                response.end();
            });
        });
    }
});

server.listen(8000);
console.log("blog server is running at port 8000!");
