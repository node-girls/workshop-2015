$(document).ready(function() {
    $.ajax({
        url: '/posts',
        dataType: 'json',
        success: function(data) {
            for (var blogPost in data) {
                var postDiv = document.createElement('div');
                postDiv.className = "post";
                var blogText = document.createTextNode(data[blogPost]);
                postDiv.appendChild(blogText);
                var blogPostArea = document.getElementById('posts');
                blogPostArea.appendChild(postDiv);
            }
        },
        error: function(error){
            console.log(error);
        }
    });
});
