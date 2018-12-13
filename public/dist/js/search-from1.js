function load_recipe(){
    var initial_res;
    $.ajax({
        url: "http://13.125.196.191:715/api/refrigerator/getMoreFood",
        dataType: "json",
        type: "post",
        data: {
            userId : 19,                 // 사용자 ID
            //id : $.cookie('id');
        },
        success: function (r) {
            console.log(r);
            initial_res = r;
        },
        error: function (r) {
            console.log(r);
        }
    });
    
    setTimeout(function() {
        console.log(initial_res);
        $('#recipe-list').empty();
        if (Object.keys(initial_res).length > 0) {
            for (i = 0; i < initial_res.length; i++) {
                var ID = initial_res[i].ID
                var NAME = initial_res[i].NAME
                var CATEGORY = initial_res[i].CATEGORY
                var USERID = initial_res[i].USERID
                var IMAGE = initial_res[i].IMAGE
                var DESCRIPTION = initial_res[i].DESCRIPTION.substr(0, 100) + "...";
                
                $('#recipe-list').append('<div class="col-lg-4"><div class="panel panel-primary"><div class="panel-heading">'+ NAME +'</div><div class="panel-body"><p>'+DESCRIPTION+'</p></div><div class="panel-footer"><a href="recipe-details.html?'+ID+'"> 자세히 보기</a></div></div></div>');
            }
        }    
    }, 50);
}
load_recipe();
$('#allsearch').click(function(){
    var findit = $('#allsearch').parent().parent().children("input");
    window.location.href = 'search-recipe.html?'+findit.val();
});