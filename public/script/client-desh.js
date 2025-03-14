$(document).ready(function () {

    $('#welcome').toast('show')

    if(localStorage.getItem("active")==null) {
        location.href="index.html";
    }

    let mail = localStorage.getItem("active");
    $("#emailid").val(mail).prop("readonly", true);
    $("#toastbody").html("Hello !!!! "+ mail+", Welcome to Kinect....");
    $("#toastbody").val(mail).css("font-weight","bolder")


    //disable new nd confirm pwd
    $("#oldpwd").keyup(function () {
        var oldpwd = $("#oldpwd").val();
        var newpwd = $("#newpwd").val();
        var confirmpwd = $("#confirmpwd").val();
        if (oldpwd != null) {
            $("#newpwd").prop("disabled", false);
            $("#confirmpwd").prop("disabled", false);
        }
        else {
            $("#newpwd").prop("disabled", true);
            $("#confirmpwd").prop("disabled", true);
        }
    })

    //check email nd old pwd

    $("#oldpwd").keyup(function () {
        let obj = {
            type: "get",
            url: "/chk-oldpwd",
            data: {
                email: $("#email").val(),
                oldpwd: $("#oldpwd").val()
            }
        }
        $.ajax(obj).done(function (resp) {
            if (resp == "Valid") {
                $("#newpwd").prop("disabled", false);
                $("#confirmpwd").prop("disabled", false);
                $("#erroldpwd").html("");
                return;
            }
            else if (resp == "Invalid Email or Password") {
                $("#newpwd").prop("disabled", true);
                $("#confirmpwd").prop("disabled", true);
                $("#erroldpwd").html(" **Invalid Email or Password");
                $("#erroldpwd").css('color', 'red');
                return;
            }
            else if (resp == "U r Blocked!!!") {
                $("#newpwd").prop("disabled", true);
                $("#confirmpwd").prop("disabled", true);
                $("#erroldpwd").html("U r Blocked!!!");
                $("#erroldpwd").css('color', 'red');
                return;
            }
            alert(resp);
        }).fail(function (err) {
            alert(err.statusText);
        })
    })

    //chk new and confirm pwd..
    $("#confirmpwd").keyup(function () {
        var newpwd = $("#newpwd").val();
        var confirmpwd = $("#confirmpwd").val();

        if (confirmpwd != newpwd) {

            $("#errconfirmpwd").html(" ** Password not match");
            $("#errconfirmpwd").css('color', 'red');
            // $("#update").prop("disabled", true);
        }
        else {
            $("#update").prop("disabled", false);
            $("#errconfirmpwd").html('');

        }
    })
});

$(document).ready(function () {

    let mail = localStorage.getItem("active");
    $("#email").val(mail).prop("readonly", true);

    //update setting modal
    $("#update").click(function () {

        let obj = {
            type: "get",
            url: "/update-setting",
            data: {
                email: $("#email").val(),
                oldpwd: $("#oldpwd").val(),
                // newpwd: $("#newpwd").val(),
                confirmpwd: $("#confirmpwd").val()
            }
        }
        $.ajax(obj).done(function (resp) {
            alert(resp);
        }).fail(function (err) {
            alert("failed to connnect");
        })
    })
})