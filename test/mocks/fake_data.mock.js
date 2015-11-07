"use strict";

function notAnObject() {
    return [];
}

function emptyObject() {
    return {};
}


function fakeBlogData() {
    var data = {
        "1446893855316": "hi mark!",
        "1446893859556": "<3 Mina",
        "1446893865020": "Anita and Rachel are Great",
        "1446893870867": "Node Girls is the best"
    };

    return data;
}


module.exports = {
    notAnObject: notAnObject,
    emptyObject: emptyObject,
    fakeBlogData: fakeBlogData
}
