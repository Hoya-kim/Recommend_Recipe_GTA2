function checkinfo() {

    //이름 공백 확인
    if($("#name").val() == ""){
        alert("이름을 입력해주세요.");
        $("#name").focus();
        return false;
    }
    
    //아이디 공백 확인
    if($("#id").val() == ""){
        alert("ID를 입력해주세요.");
        $("#id").focus();
        return false;
    }

    //E-mail 공백 확인
    if($("#email").val() == ""){
        alert("E-Mail을 입력해주세요.");
        $("#email").focus();
        return false;
    }

    //비밀번호 공백 확인
    if($("#password").val() == ""){
        alert("Password를 입력해주세요.");
        $("#password").focus();
        return false;
    }

    //비밀번호 확인 공백 확인
    if($("#cpass").val() == ""){
        alert("Password 확인란을 입력해주세요.");
        $("#cpass").focus();
        return false;
    }

    //비밀번호 똑같은지
    if($("#password").val() != ($("#cpass").val())){ 
        alert("비밀번호와 비밀번호 확인이 다릅니다.");
        $("#password").val("");
        $("#cpass").val("");
        $("#password").focus();
        return false;
   }

    $.ajax({
        url : "http://13.125.196.191:715/api/user/create",
        dataType : "json",
        type : "post",
        data : {
            userId : $("#id").val(),                 // 사용자 ID
            password : $("#password").val(),        // 비밀번호
            email : $("#email").val(),              // 이메일
            name : $("#name").val()                // 이름
        },
        success : function(r){
            alert("회원가입 완료");
            location.replace("login.html");
        },
        error : function(r){
            alert("다시 입력해주세요.");
            $("#password").val("");
            $("#cpass").val("");
            $("#id").focus();
        }
    });

    return false;
}