"use strict";

var test    = require("tape");
var isEmpty = require("../../util.js").isEmpty
var mocks = require("../mocks/fake_data.mock.js");


test("If isEmpty returns true for not-an-object", function (t) {
    var notAnObject = mocks.notAnObject();

    t.ok(isEmpty(notAnObject));
    t.end();
});

test("If isEmpty returns true for an empty object", function (t) {
    var emptyObject = mocks.emptyObject();

    t.ok(isEmpty(emptyObject));
    t.end();
});

test("If isEmpty returns false for an object with keys", function (t) {
    var fakeBlogData = mocks.fakeBlogData();

    t.notOk(isEmpty(fakeBlogData));
    t.end();
});
