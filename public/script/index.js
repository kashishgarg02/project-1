function showpwd(pwd) {
  if (pwd.type === "password") {
      pwd.type = "text";
  } else {
      pwd.type = "password";
  }
}


$(document).ready(function () {

  // check valid email
  $("#txtEmail").blur(function () {
    var pattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    let email = $(this).val();
    if (pattern.test(email) == true) {
        $("#txtPwd").prop("disabled", false);
        $("#txtEmail").css("border", "1px green solid");
        return;
    }
    else {
      $("#txtEmail").css("border", "1px red solid");
        $("#txtPwd").prop("disabled", true);
        alert("Invalid email address"); 
    }
});


//disable btn and combo box 
$("#txtEmail").keyup(function () {
  var txtEmail = $("#txtEmail").val();
  var combo = $("#combo").val();
  if (txtEmail != null) {
      $("#combo").prop("disabled", false);
      $("#btn").prop("disabled", false);
  }
  else {
      $("#combo").prop("disabled", true);
      $("#btn").prop("disabled", true);
  }
})


// check strength of the password
$("#txtPwd").keydown(function() {
  let regex =  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{8,}$/;
  let pass = $(this).val();
  if(regex.test(pass)==true){
      $("#errpwd").html("Strong Password....");
      $("#errpwd").css('color', 'green');
  }
  else {
      $("#errpwd").html(" ** Weak Password");
      $("#errpwd").css('color', 'red');
  }
})

//  spinner loading
$(document).ajaxStart(function () {
  $("#spinnerforgotpwd").css("display", "block");
})
$(document).ajaxStop(function () {
  $("#spinnerforgotpwd").css("display", "none");
})

 //save signup data
 $("#btn").click(function () {

    let obj = {
      type: "get",
      url: "/users-signup-process",
      data: {
        txtEmail: $("#txtEmail").val(),
        txtPwd: $("#txtPwd").val(),
        combo: $("#combo").val()
      }
    }
    $.ajax(obj).done(function (resp) {
      //$("#msgEmail").html(resp);
      alert(resp);
    }).fail(function (err) {
      alert("failed to connnect");
    })
  })

//save login data
  $("#btnlogin").click(function () {

    let obj = {
      type: "get",
      url: "/users-login-process",
      data: {
        txtEmaill: $("#txtEmaill").val(),
        txtPwdd: $("#txtPwdd").val()

      }
    }
    $.ajax(obj).done(function (resp) {
     // alert(resp);
     if(resp==="Influencer"){
        location.href=("Infl-desh.html");
    }
    else  if(resp==="Client"){
        location.href=("client-desh.html");
    } else{
        alert(resp);
    }
    localStorage.setItem("active",$("#txtEmaill").val());

    }).fail(function (err) {
      alert("failed to connnect");
    })
  })


// sending email on forgot password
$("#forgotpwd").click(function () {
    $("#spinnerforgotpwd").css("display", "block");
    let obj = {
        type: "get",
        url: "/forgot-password",
        data: {
            txtEmaill: $("#txtEmaill").val()
        }
    }
    $.ajax(obj).done(function (resp) {
        alert(resp);
    }).fail(function (err) {
        alert(err.statusText);
    })
})

})