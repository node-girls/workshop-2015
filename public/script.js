(function () {
    "use strict";

    var request = new XMLHttpRequest();

    function displayError (message) {
        var errorElement = document.getElementsByClassName("error")[0];

        errorElement.innerText = message;
    }

    function createPosts (data) {
        var posts = data;

        for (var blogPost in posts) {
            var postDiv         = document.createElement("div");
            var postText        = document.createElement("p");
            var thumbnail       = document.createElement("img");
            var postContainer   = document.getElementsByClassName("post-container")[0];

            thumbnail.src       = "./img/logo2.png";
            thumbnail.className = "thumbnail";
            postText.innerText  = posts[blogPost];
            postDiv.className   = "post";

            postDiv.appendChild(thumbnail);
            postDiv.appendChild(postText);
            postContainer.appendChild(postDiv);
        }
    }

    request.onreadystatechange = function () {

        if (request.readyState === 4 && request.status !== 200) {

            displayError(request.statusText);
        }
    };

    request.onload = function(e) {

        createPosts(e.target.response);
    };

    request.open("GET", "/posts");
    request.responseType = "json";
    request.send();

}());
