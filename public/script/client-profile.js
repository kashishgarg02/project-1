
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
        url:"/check-client-acc",
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

//searching client profile
    $("#btnsearch").click(function () {
        let obj = {
            type: "get",
            url: "/find-client-prof",
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
            $("#cname").val(jsonAry[0].cname);
            $("#contact").val(jsonAry[0].contact);
            $("#address").val(jsonAry[0].address);
            $("#city").val(jsonAry[0].city);
            $("#state").val(jsonAry[0].state);
            
        }).fail(function (err) {
            alert(err.statusText);
        })

    });
});
