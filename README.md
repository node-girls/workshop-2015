# Node Girls Basic CMS Example
[Gitter channel](https://gitter.im/node-girls/workshop) for questions comments feedback etc.

[![Join the chat at https://gitter.im/node-girls/workshop](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/node-girls/workshop?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

# Build and Test

### Build & Test

| Command                       | Description                                                           |
| ----------------------------- | --------------------------------------------------------------------- |
| `npm install`                 | Installs all the dependencies in the package.json                     |
| `npm start`                   | Starts the server                                                     |
| `npm run start:dev`           | Starts the server and watches for changes. Restarts on change         |
| `npm run lint`                | Lints JavaScript code making sure project remains consistent          |
| `npm run open`                | Mac only. Opens localhost:8000 in your default browser                |
|-------------------------------|-----------------------------------------------------------------------|




# Hints and tips

## Node.js documentation
* There are lots of useful Node modules and methods that will help you build your server.  `fs` is one, `fs.writeFile` and `fs.readFile` will be useful as well.
* Look at the Node.js documentation for a list of all the different modules, methods and how to use them.  Of course, ask a mentor if you need pointing in the right direction!

## Use the tests!
* Take a look at the tests, and how they are structured. It may give you a hint on what your project should do.


## Refreshing your page
* You might want to refresh the page automatically when you submit a blog post.  One way to do it is to send back to your client a **302 status code**.  A 302 status code basically says "redirect to whatever it says in the HTTP Location Header".

* You might find the `response.writeHead()` method useful - read about it [here](https://nodejs.org/api/http.html#http_response_writehead_statuscode_statusmessage_headers).

* Find out more about status codes [here](https://www.addedbytes.com/articles/for-beginners/http-status-codes/).  By the way, *"status codes"* and *"response codes"* mean the same thing :)

## Querystring
* The blog text box is a form field.  The server will receive the form contents as a [querystring](https://en.wikipedia.org/wiki/Query_string).  There is a core Node module called **querystring** that will help you cleanly extract the contents of your blog post.  Find out about the core querystring module [here](https://nodejs.org/api/querystring.html).

## Http methods
* [Http methods](http://www.w3schools.com/tags/ref_httpmethods.asp) are your friend.

Stuck?  Ask a mentor!





# Tools and Libraries We Recommend Used:

[__eslint__](http://eslint.org/) - Lint tool

---
[__EditorConfig__](http://editorconfig.org/) - Unifying the coding style for different Text Editors

---
[__node-static__](https://www.npmjs.com/package/node-static) - Simple Node Routing Module

---
[__pre-commit__](https://github.com/docdis/learn-pre-commit) - Learn about pre-commit hooks

---
[__istantbul__](https://gotwarlost.github.io/istanbul/) - Istanbul is a JavaScript code coverage tool

---
