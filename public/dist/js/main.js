function load_initial() {
    var initial_res;
    $.ajax({
        url: "http://13.125.196.191:715/api/refrigerator/open",
        dataType: "json",
        type: "post",
        data: {
            id: 19
            //id : $.cookie('id');
        },
        success: function (r) {
            console.log(r);
            initial_res = r;
            //initial_res = JSON.parse(r);
        },
        error: function (r) {
            console.log(r);
        }
    });
    
    setTimeout(function() {
        console.log(initial_res);
        $('#my-refrigerator > tbody').empty();
        if (Object.keys(initial_res).length > 0) {
            for (i = 0; i < initial_res.length; i++) {
                var ID = initial_res[i].ID
                var NAME = initial_res[i].NAME
                var CATEGORY = initial_res[i].CATEGORY
                $('#my-refrigerator > tbody').append('<tr><td>' + CATEGORY + '</td><td id=' + ID + '>' + NAME + '</td><td type="button" class="btn-outline btn-danger" onclick="consumeitem(this)">소모</td></tr>');
            }
        }    
    }, 500);
}
load_initial();

function additem(item) {
    //get parent & child tag
    var parent = item.parentNode;
    var findtd = parent.childNodes;

    $("#my-refrigerator > tbody").append('<tr><td>' + findtd[0].textContent + '</td><td>' + findtd[1].textContent + '</td><td type="button" class="btn-outline btn-danger" onclick="consumeitem(this)">소모</td></tr>');

    //POST로 내 냉장고에 추가
    $.ajax({
        url: "http://13.125.196.191:715/api/refrigerator/insert",
        dataType: "json",
        type: "post",
        data: {
            id : 19,                 // 사용자 ID
            //id : $.cookie('id');
            ic: findtd[1].getAttribute('id')    // 이름
        },
        success: function (r) {
            console.log(r);
        },
        error: function (r) {
            console.log(r);
        }
    });
}

function consumeitem(item) {
    var parent = item.parentNode;
    var findtd = parent.childNodes;
    parent.remove();

    //POST로 내 냉장고에서 삭제
    $.ajax({
        url: "http://13.125.196.191:715/api/refrigerator/takeout",
        dataType: "json",
        type: "post",
        data: {
            id : 19,                 // 사용자 ID
            //id : $.cookie('id');
            ic: findtd[1].getAttribute('ID')    // 이름
        },
        success: function (r) {
            console.log(r);
        },
        error: function (r) {
            console.log(r);
        }
    });
}

$(function () {

    $('#search-item').click(function () {
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

        $('#ingredient-search').empty();
        $('#ingredient-search').append('<thead><tr><th style="text-align: center">카테고리</th><th style="text-align: center">식재료</th><th style="text-align: center">추가</th></tr></thead>')

        var theurl = 'http://13.125.196.191:715/api/ingredient/search?';
        var keyword = String($('#item-input').val());
        theurl = theurl + "keyword=" + keyword;
        var client = new HttpClient();
        client.get(theurl, function (response) {
            var response1 = JSON.parse(response);
            $('#ingredient-search').append('<tbody>');
            for (i = 0; i < response1.length; i++) {
                var ID = response1[i].ID
                var NAME = response1[i].NAME
                var CATEGORY = response1[i].CATEGORY
                $('#ingredient-search').append('<tr><td>' + CATEGORY + '</td><td id=' + ID + '>' + NAME + '</td><td type="button" class="btn-outline btn-success" onclick=additem(this)>추가</td></tr>');
            }
            $('#ingredient-search').append('</tbody>');
        });
    });
    /*
    $('#search-recipe').click(function () {
        window.location.href = 'search-recipe.html';
    });
    */

    $('#allsearch').click(function(){
        var findit = $('#allsearch').parent().parent().children("input");
        window.location.href = 'search-recipe.html?'+findit.val();
    });

});