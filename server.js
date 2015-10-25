var http = require('http');
var fs = require('fs');
var jsonfile = require('jsonfile');
var url = require('url');
var querystring = require('querystring');

var server = http.createServer(function (request, response) {

    if (request.method === 'GET') {
        var path;

        if (request.url === '/posts') {
            path = './blog.json';
        } else if (request.url.match('/public')) {
            path = "." + request.url;
        } else {
            path = './public/index.html';
        }
        fs.readFile(path, 'utf-8', function(err, file) {
            response.write(file);
            response.end();
        });
    }
    if (request.method === 'POST') {
        // add a post
        var collection = '';
        request.on('data', function(data) {
            collection += data;
        });
        request.on('end', function() {
            collection = querystring.parse(collection);
            console.log(collection);
            // write to json
            // redirects
            response.end();
        });



    }

});

server.listen(3000);
console.log("blog server is running!");
