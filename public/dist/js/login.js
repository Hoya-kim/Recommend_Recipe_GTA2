function checkinfo() {
    //아이디 공백 확인
    if($("#id").val() == ""){
        alert("ID를 입력해주세요.");
        $("#id").focus();
        return false;
    }

    //비밀번호 확인 공백 확인
    if($("#password").val() == ""){
        alert("Password를 입력해주세요.");
        $("#password").focus();
        return false;
    }

    $.ajax({
        url : "http://13.125.196.191:715/api/user/login",
        dataType : "json",
        type : "post",
        data : {
            userId : $("#id").val(),                 // 사용자 ID
            password : $("#password").val()        // 비밀번호
        },
        success : function(r){
            window.location.href = 'index.html';
    
            $.cookie('id',$("#id").val);
        },
        error : function(r){
            alert("ID 또는 Password가 잘못되었습니다.");
            $("#id").val("");
            $("#password").val("");
            $("#id").focus();
        }
    });

    return false;
}