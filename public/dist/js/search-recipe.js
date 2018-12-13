$(document).ready(function () {
    var keyword = location.href.substr(
        location.href.lastIndexOf('?') + 1
    );
    console.log(keyword);

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

    $('#recipe-list').empty();

    var theurl = 'http://13.125.196.191:715/api/food/search?';
    theurl = theurl + "keyword=" + keyword;
    var client = new HttpClient();

    client.get(theurl, function (response) {
        var initial_res = JSON.parse(response);

        console.log(initial_res);

        client.get(theurl, function (response) {
            var initial_res = JSON.parse(response);

            $('#recipe-list').empty();
            if (Object.keys(initial_res).length > 0) {
                for (i = 0; i < initial_res.length; i++) {
                    var ID = initial_res[i].ID
                    var NAME = initial_res[i].NAME
                    var CATEGORY = initial_res[i].CATEGORY
                    var USERID = initial_res[i].USERID
                    var IMAGE = initial_res[i].IMAGE
                    var DESCRIPTION = initial_res[i].DESCRIPTION.substr(0, 100) + "...";

                    $('#recipe-list').append('<div class="col-lg-4"><div class="panel panel-primary"><div class="panel-heading">' + NAME + '</div><div class="panel-body"><p>' + DESCRIPTION + '</p></div><div class="panel-footer"><a href="recipe-details.html?'+ID+'"> 자세히 보기</a></div></div></div>');
                }
            }
            else{
                $('#recipe-list').append("검색해주세요...");
            }
        });


    });
});

$('#allsearch').click(function () {
    var findit = $('#allsearch').parent().parent().children("input");
    window.location.href = 'search-recipe.html?' + findit.val();
});