$(document).ready(function() {
    $.ajax({
        url: '/posts',
        dataType: 'json',
        success: function(data) {

            for (var blogPost in data) {
                var postDiv         = document.createElement('div');
                var blogText        = document.createTextNode(data[blogPost]);
                var postContainer   = document.getElementsByClassName('post-container')[0];


                postDiv.className = "post";
                postDiv.appendChild(blogText);
                postContainer.appendChild(postDiv);
            }
        },
        error: function(error){
            console.log(error);
        }
    });
});
