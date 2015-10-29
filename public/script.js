console.log("hey");
$(document).ready(function() {
    $.ajax({
        url: '/posts',
        dataType: 'json',
        success: function(data) {
            console.log(data);
        },
        error: function(error){
            console.log(error);
        }
    });
});
