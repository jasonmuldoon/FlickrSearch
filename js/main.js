
function ajaxProcess() {

    var searchTerm = $("#term").val();
    var URL2 = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=0add6d8735ce8a222aa2ed59b5615a4f&safe_search=1&per_page=25&page=1';
    var tags = "&tags=" + searchTerm;
    var jsonFormat = "&format=json";
    var ajaxURL = URL2 + tags + jsonFormat;

    $.ajax({
        url: ajaxURL,
        dataType: "jsonp",
        jsonp: "jsoncallback",
        success: function (data) {
            if (data.stat !== "fail") {
                console.log(data);
                $.each(data.photos.photo, function (i, photo) {
                    var photoHTML = "";
                    photoHTML += "<figure> <img src='";
                    photoHTML += "http://farm" + photo.farm + ".static.flickr.com/" + photo.server + "/" + photo.id + "_" + photo.secret + "_n.jpg'";
                    photoHTML += " title='" + photo.title + "'";
                    photoHTML+=  photo.title+"</figure>";
                    $("#gallery").append(photoHTML).fadeIn(200);
                });

            } else {
                $("#gallery").empty();
                console.log("Error code " + data.stat);
                photoHTML = "Error !! Error !! " + data.stat;
                $("#gallery").append(photoHTML).fadeIn(200);

            }

        }
    });


}



$(document).ready(function () {
    $("input#submit").on('click keypress', function (e) {
        var key = e.keyCode || e.which || null;
        var event = e.type;
        console.log($(this).text());
        console.log("e.which " + e.which);
        console.log("e.type " + e.type);

        if (key === 13 || event === 'click') {
            if ($("#term").val() !== "") {
                
                
                ajaxProcess();
                
            } else {
                alert("Please enter a word to search");
            }
        }
    });
    $("input#term").on("keypress", function (e) {
        if (e.which === 13) {
            $("#submit").trigger('click');
        }
    });

    $("input#clear").click(function () {
        $("#gallery").empty();
    });


    
    
});