
$(document).ready(function () {
    var foodId = location.href.substr(
        location.href.lastIndexOf('?') + 1
    );
    console.log(foodId);

    var HttpClient = function () {
        this.get = function (aUrl, aCallback) {
            var anHttpRequest = new XMLHttpRequest();
            anHttpRequest.onreadystatechange = function () {
                if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200)
                    aCallback(anHttpRequest.responseText);
            }
            anHttpRequest.open("GET", aUrl, true);
            anHttpRequest.send(null);
        }
    }

    $('#menu-name').empty();

    var theurl = 'http://13.125.196.191:715/api/food/lookup?';
    theurl = theurl + "foodId=" + foodId;
    var client = new HttpClient();

    client.get(theurl, function (response) {
        var response1 = JSON.parse(response);

        console.log(response1);
        try{
            var USERID = String(response1[0].USERID)
        }
        catch{
            var USERID = "Admin"
        }
        try{
            var NAME = String(response1[0].NAME)
        }
        catch{
            var NAME = "Admin"
        }
        try{
            var EMAIL = String(response1[0].EMAIL)
        }
        catch{
            var EMAIL = "Admin"
        }
        try{
            var CATEGORY = String(response1[0].CATEGORY)
        }
        catch{
            var CATEGORY = "Admin"
        }
        
        
        var IMAGE = String(response1[0].IMAGE)
        var DESCRIPTION = String(response1[0].DESCRIPTION)

        $('#menu-name').empty();
        $('#menu-name').append(NAME);

        $('#category').empty();
        $('#category').append(CATEGORY);

        $('#recipe').append('<img src="' + IMAGE + '" style="height:250px;">');

        $('#userid').empty();
        $('#userid').append(USERID);

        $('#description').empty();
        $('#description').append(DESCRIPTION);


    });
});
$('#allsearch').click(function () {
    var findit = $('#allsearch').parent().parent().children("input");
    window.location.href = 'search-recipe.html?' + findit.val();
});