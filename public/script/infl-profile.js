function doPrev(fileCtrl, imgPrev) {
    let [file] = fileCtrl.files
    if (file) {
        imgPrev.src = URL.createObjectURL(file)
    }
}

function logout () {
    localStorage.removeItem("active");
    // alert("Sure for Logout???" );
    location.href="index.html";
}

$(document).ready(function () {

    if(localStorage.getItem("active")==null) {
        location.href="index.html";
    }


    let mail = localStorage.getItem("active");
    $("#email").val(mail).prop("readonly",true);

    // checking account
    let obj = {
        type:"get",
        url:"/check-acc",
        data:{
            email:mail
        }
    }
    $.ajax(obj).done(function(jsonary){
        if(jsonary.length == 0){
            $("#btnupdate").prop("disabled",true);
            $("#btnsave").prop("disabled",false);
        } else {
            $("#btnupdate").prop("disabled",false);
            $("#btnsave").prop("disabled",true);
        }
    }).fail(function(err){
        alert(err.statusText);
    })

// check contact no.
$("#contact").blur(function chk(){
    var regex = /^(0|91)?[6-9][0-9]{9}$/;;
    let phn = $(this).val();
    if(regex.test(phn)==false){
        $("#mobile").html("Invalid Number!");
        $("#mobile").css("color",'red');
        // $("#mobile").css("border",'1px red solid');
        $("#contact").focus();  
    }
    else{
        $("#mobile").html("");
        $("#contact").blur();   
    }
})

    //spinner loading
    $(document).ajaxStart(function(){
        $("#bg").css("display","block");
        $("#wait").css("display","block");
    })
    $(document).ajaxStop(function(){
        $("#wait").css("display","none");
        $("#bg").css("display","none");
    })

//searching infl profile
    $("#btnsearch").click(function () {
        let obj = {
            type: "get",
            url: "/find-infl-prof",
            data: {
                email: $("#email").val()
            }
        }
        $.ajax(obj).done(function (jsonAry) {
            if (jsonAry.length == 0) {
                alert("Invalid ID");
                return;
            }
            //alert(JSON.stringify(jsonAry));
            $("#fname").val(jsonAry[0].fname);
            $("#gender").val(jsonAry[0].gender);
            $("#contact").val(jsonAry[0].contact);
            $("#dob").val(jsonAry[0].dob);
            $("#address").val(jsonAry[0].address);
            $("#city").val(jsonAry[0].city);
            $("#state").val(jsonAry[0].state);
            $("#field").val(jsonAry[0].field.split(","));
            $("#insta").val(jsonAry[0].insta);
            $("#fb").val(jsonAry[0].fb);
            $("#youtube").val(jsonAry[0].youtube);
            $("#info").val(jsonAry[0].otherinfo);
            $("#prev").prop("src", "uploads/" + jsonAry[0].picpath);
            $("#hdn").val(jsonAry[0].picpath);

        }).fail(function (err) {
            alert(err.statusText);
        })

    });
});





