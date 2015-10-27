var http = require('http');
var fs = require('fs');
var jsonfile = require('jsonfile');
var url = require('url');
var querystring = require('querystring');
var blogDataStringified = fs.readFileSync('./blog.json', 'utf-8');
var blogData = JSON.parse(blogDataStringified);

var server = http.createServer(function (request, response) {
    console.log(blogData);

    if (request.method === 'GET') {
        var path;

        if (request.url === '/posts') {
            // get posts
        } else if (request.url.match('/public')) {
            path = "." + request.url;
        } else {
            path = './public/index.html';
        }
        // read your file from hard drive
        console.log(">>>>", path);
        fs.readFile(path, 'utf-8', function(err, file) {
            // put in your response to send back to client
            response.write(file);
            response.end();
        });
    }
    if (request.method === 'POST') {
        // add a post
        var collection = '';
        var blogpost;
        request.on('data', function(data) {
            collection += data;

        });

        request.on('end', function() {
            blogpost = querystring.parse(collection);
            console.log(blogpost);
            blogData[Date.now()] = blogpost.entry;
            fs.writeFile('./blog.json', JSON.stringify(blogpost), function(err) {
                if (err) {
                    console.log(err);
                }
                response.end();
            });

        });

    }

});

server.listen(8000);
console.log("blog server is running!");
