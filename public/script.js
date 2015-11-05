var request = new XMLHttpRequest();

request.onload = function (data) {
    var posts = data.target.response;

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
};

request.open("GET", "/posts");
request.responseType = "json";
request.send();
