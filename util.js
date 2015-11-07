"use strict";

var fs          = require("fs");

function isEmpty (obj) {
    var hasOwnProperty  = Object.prototype.hasOwnProperty;

    if (obj == null || obj.length === 0) {
        return true;
    } else if (obj.length > 0) {
        return false;
    }

    for (var key in obj) {
        if (hasOwnProperty.call(obj, key)) {
            return false;
        }
    }

    return true;
}

function respondError (response, errorCode) {

    response.writeHead(errorCode);
    response.end();
}

function getFileData (response, callback) {

    fs.readFile("./blog.json", "utf-8", function (err, data) {

        if (err) {
            respondError(response, 500);
        } else {

            callback(data);
        }
    });
}

function parseData (req, callback) {
    var data = "";

    req.on("data", function (chunk) {
        data += chunk;
    });

    req.on("end", function() {

        callback(data);
    });
}


module.exports = {
    isEmpty: isEmpty,
    respondError: respondError,
    getFileData: getFileData,
    parseData: parseData
};
