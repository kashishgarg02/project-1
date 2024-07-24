var express = require("express");
var mysql2 = require("mysql2");
var fileuploader = require("express-fileupload");
var nodemailer = require("nodemailer");

let app = express();
app.listen(2005, function () {
    console.log("server started ....");
})

//app.use
app.use(express.static("public"));
app.use(express.urlencoded("true"));
app.use(fileuploader());

//link to index.html
app.get("/", function (req, resp) {
    let path = __dirname + "/public/index.html";
    resp.sendFile(path);
})

//************ 
// let config = {
//     host: "127.0.0.10",
//     user: "root",
//     password: "Kashish@1234",
//     database: "project",
//     dateStrings: true
// }

let config = {
    host: "bt8o5vefi6dqrmykzs9e-mysql.services.clever-cloud.com",
    user: "uep3owhgt5dyx0mq",
    password: "a4bKwn5WvK2KFLG5vvwJ",
    database: "bt8o5vefi6dqrmykzs9e",
    dateStrings: true,
    keepAliveInitialyDelay: 10000,
    enableKeepAlive: true
}

var mysql = mysql2.createConnection(config);
mysql.connect(function (err) {
    if (err == null)
        console.log("connect to database succesfully");
    else
        console.log(err.message + "  *****");
})

// define nodemailer
var transporter = nodemailer.createTransport({
    service: "gmail",
    // secure: true,
    // port: 465,
    auth: {
        user: "kkashishggarg123@gmail.com",
        pass: "rsahzzprbrycnlts"
    }

})

//open index html
app.get("/index", function (req, resp) {
    let path = __dirname + "/public/index.html";
    resp.sendFile(path);
})

//save signup data
app.get("/users-signup-process", function (req, resp) {
    mysql.query("insert into users values(?,?,?,1)", [req.query.txtEmail, req.query.txtPwd, req.query.combo], function (err) {
        if (err == null)
            resp.send("congrats........");
        else
            resp.send(err.message);

    })

})

//save login data
app.get("/users-login-process", function (req, resp) {
    mysql.query("select * from users where email=? and pwd=?", [req.query.txtEmaill, req.query.txtPwdd], function (err, result) {
        if (err != null) {
            resp.send(err.message); return;
        }
        if (result.length == 0) {
            resp.send("invalid id or password"); return;
        }
        if (result[0].ustatus == 1) {
            resp.send(result[0].utype); return;
        }
        else {
            resp.send("u r blocked!!!!!"); return;
        }



    })

})

// open influencer desh
app.get("/openinfl", function (req, resp) {
    let path = __dirname + "/public/Infl-desh.html";
    resp.sendFile(path);
})

// open influencer profile
app.get("/open-inf-profile", function (req, resp) {
    let path = __dirname + "/public/Infl-profile.html";
    resp.sendFile(path);
})

// save infl file
app.post("/infl-profile-save", function (req, resp) {
    let fileName = "";
    if (req.files != null) {
        fileName = req.files.picpath.name;
        let path = __dirname + "/public/uploads/" + fileName;
        req.files.picpath.mv(path);
    }
    else
        fileName = "nopic.jpg";
    let ary = req.body.field;
    let str;
    if (Array.isArray(ary)) {
        str = "";
        for (i = 0; i < ary.length; i++) {
            str += ary[i] + ",";
        }
        console.log(str);
    }
    else
        str = ary;

    mysql.query("insert into iprofile values(?,?,?,?,?,?,?,?,?,?,?,?,?,?)", [req.body.email, req.body.fname, req.body.gender, req.body.contact, req.body.dob, req.body.address, req.body.city, req.body.state, str, req.body.insta, req.body.fb, req.body.youtube, req.body.info, fileName], function (err) {
        if (err == null)
            resp.send("Bahut Bahut Badhai.....");
        else
            resp.send(err.message);
    })
})

// update infl profile
app.post("/infl-profile-update", function (req, resp) {

    let fileName = "";
    if (req.files != null) {
        fileName = req.files.picpath.name;
        let path = __dirname + "/public/uploads/" + fileName;
        req.files.picpath.mv(path);
    }
    else {
        fileName = req.body.hdn;
    }


    //plz use Table wale columns ke NAAAMMMM
    mysql.query("update iprofile set  fname=? , gender=? ,contact=? ,dob=?, address=?,city=?, state=?, field=?, insta=?, fb=?, youtube=?, otherinfo=?, picpath=? where email=?", [req.body.fname, req.body.gender, req.body.contact, req.body.dob, req.body.address, req.body.city, req.body.state, req.body.field, req.body.insta, req.body.fb, req.body.youtube, req.body.info, fileName, req.body.email], function (err, result) {
        if (err == null) {
            if (result.affectedRows >= 1)
                resp.send("Updated  Successfulllyyyy....");
            else
                resp.send("Invalid Email ID");
        }
        else
            resp.send(err.message);
    })

})

//Searching infl profile
app.get("/find-infl-prof", function (req, resp) {
    let email = req.query.email;

    mysql.query("select * from iprofile where email=?", [email], function (err, resultJsonAry) {
        if (err != null) {
            resp.send(err.message);
            return;

        }
        // console.log(resultJsonAry);
        resp.send(resultJsonAry);//sending array of json object 0-1
    })

})

 // checking account
 app.get("/check-acc",function(req,resp){
    let email = req.query.email;
    mysql.query("select * from iprofile where email = ?",[email],function(err,result){
        if (err){
            resp.send(err.message);
        } else {
            resp.send(result);
        }
    })
})

// save booking modal
app.get("/open-infl-booking", function (req, resp) {


    mysql.query("insert into eventss values(null,?,?,?,?,?,?)", [req.query.emailid, req.query.ievents, req.query.date, req.query.time, req.query.cityy, req.query.venue], function (err) {
        if (err == null)
            resp.send("Bahut Bahut Badhai.....");
        else
            resp.send(err.message);
    })
})

//check email nd old pwd
app.get("/chk-oldpwd", function (req, resp) {

    mysql.query("select * from users where email=? and pwd=?", [req.query.email, req.query.oldpwd], function (err, result) {
        if (err) {
            resp.send(err.message);
        } else {
            if (result.length == 1) {
                if (result[0].ustatus == 1) {
                    resp.send("Valid");
                    return;
                } else {
                    resp.send("U r Blocked!!!");
                }
            } else {
                resp.send("Invalid Email or Password");
            }
        }
    })

})

// update passsword
app.get("/update-setting", function (req, resp) {

    mysql.query("update users set  pwd=? where email=? and pwd=?", [req.query.confirmpwd, req.query.email, req.query.oldpwd], function (err, result) {
        if (err == null) {
            if (result.affectedRows >= 1)
                resp.send("Updated  Successfulllyyyy....");
            else
                resp.send("Invalid Email ID");
        }
        else
            resp.send(err.message);
    })

})

//sending email on forgot pwd
app.get("/forgot-password", function (req, resp) {
    let nodemailer = req.query.txtEmaill;
    mysql.query("select * from  users where email=? ", [nodemailer], function (err, result) {

        if (err) {
            resp.send(err.message);
        }
        else {
            if (result.length == 0) {
                resp.send("Invalid Email ID");
            }
            else if (result.length == 1) {

                var mailOptions = {
                    from: "kkashishggarg123@gmail.com",
                    to: nodemailer,
                    subject: " node js mail testing",
                    text: result[0].pwd
                };

                transporter.sendMail(mailOptions, function (err, info) {
                    if (err) {
                        console.log(err);
                        resp.send(err.message)

                    } else {

                        console.log('Email sent: ' + info.response);
                        resp.send("email sent");
                    }
                })

            }
        }
    })
})

//Admin desh page
{
    // open Admin desh
    app.get("/open-admin-desh", function (req, resp) {
        let path = __dirname + "/public/Admin-desh.html";
        resp.sendFile(path);
    })

    // open Admin users
    app.get("/open-admin-users", function (req, resp) {
        let path = __dirname + "/public/Admin-users.html";
        resp.sendFile(path);
    })

    // open admin all infl page
    app.get("/open-all-influencer", function (req, resp) {
        let path = __dirname + "/public/Admin-all-infl.html";
        resp.sendFile(path);
    })
}

// Admin users page
{
    //get all data from users
    app.get("/fetch-all", function (req, resp) {
        mysql.query("select * from users", function (err, resultJsonAry) {
            if (err != null) {
                resp.send(err.message);
                return;

            }
            resp.send(resultJsonAry);//sending array of json object 0-1
        })

    })

    //  user type in list box
    app.get("/fill-utype", function (req, resp) {
        mysql.query("select distinct utype from users", function (err, resultJsonAry) {
            if (err) {
                resp.send(err.message);
            } else {
                resp.send(resultJsonAry);
            }
        })
    })

    // selected user type
    app.get("/utype-data", function (req, resp) {
        mysql.query("select * from users where utype = ?", [req.query.utype], function (err, resultJsonAry) {
            if (err) {
                resp.send(err.message);
            } else {
                resp.send(resultJsonAry);
            }
        })
    })

    //delete data through emailid
    app.get("/del-one", function (req, resp) {
        mysql.query("delete from users where email=?", [req.query.email], function (err, resultJsonAry) {
            if (err != null) {
                resp.send(err.message);
                return;

            }
            resp.send("Deleted");

        })

    })

    //block user data 
    app.get("/block-user", function (req, resp) {
        mysql.query("update users set ustatus=? where email=?", [0, req.query.email], function (err, resultJsonAry) {
            if (err != null) {
                resp.send(err.message);
                return;
            }
            resp.send(resultJsonAry);
        })

    })

    //resume user data 
    app.get("/resume-user", function (req, resp) {
        mysql.query("update users set ustatus=? where email=?", [1, req.query.email], function (err, resultJsonAry) {
            if (err != null) {
                resp.send(err.message);
                return;
            }
            resp.send(resultJsonAry);
        })

    })


    //get all data from iprofile
    app.get("/admin-all-infl", function (req, resp) {
        mysql.query("select * from iprofile", function (err, resultJsonAry) {
            if (err != null) {
                resp.send(err.message);
                return;

            }
            resp.send(resultJsonAry);//sending array of json object 0-1
        })

    })
}

// open influ finder page
app.get("/open-influ-finder", function (req, resp) {
    let path = __dirname + "/public/influ-finder.html";
    resp.sendFile(path);
})

// list box for fields

app.get("/find-influ", function (req, resp) {
    mysql.query("select * from iprofile where field like ?", ["%" + req.query.field + "%"], function (err, resultJsonAry) {
        if (err != null) {
            resp.send(err.message);
            return;

        }
        resp.send(resultJsonAry);
    })

})

//find fields
app.get("/do-find", function (req, resp) {


    mysql.query("select * from iprofile where field like ? && city = ? ", ["%" + req.query.field + "%", req.query.city], function (err, resultJsonAry) {
        if (err != null) {
            resp.send(err.message);
            return;

        }
        resp.send(resultJsonAry);
    })

})

// fetch all influencers
app.get("/fetch-all-influ", function (req, resp) {
    mysql.query("select * from iprofile order by fname", function (err, result) {
        if (err) {
            resp.send(err.message);
        } else {
            resp.send(result);
        }
    })
})

//find by name influencer
app.get("/findbyname", function (req, resp) {

    mysql.query("select * from iprofile where fname like ?", ["%" + req.query.fname + "%"], function (err, resultJsonAry) {
        if (err != null) {
            resp.send(err.message);
            return;

        }
        resp.send(resultJsonAry);
    })

})

// get city and field
app.get("/get-influ", function (req, resp) {
    let city = "%" + req.query.city + "%";
    let field = "%" + req.query.field + "%";
    mysql.query("select * from iprofile where city like ? and field like ?", [city, field], function (err, result) {
        if (err) {
            resp.send(err.message);
        } else {
            resp.send(result);
        }
    })
})

// open event manager page
app.get("/open-event-manager", function (req, resp) {
    let path = __dirname + "/public/events-manager.html";
    resp.sendFile(path);
})

//fetch bookings
app.get("/fetch-events", function (req, resp) {

    mysql.query("select * from eventss where emailid like ? and doe>= current_date()", ["%" + req.query.emailid + "%", req.query.doe], function (err, resultJsonAry) {
        if (err != null) {
            resp.send(err.message);
            return;

        }
        resp.send(resultJsonAry);
    })

})

//delete data through emailid
app.get("/del-event", function (req, resp) {
    console.log(req.query);
    mysql.query("delete from eventss where rid=?", [req.query.rid], function (err, resultJsonAry) {
        if (err != null) {
            resp.send(err.message);
            return;

        }
        resp.send("Deleted");

    })

})

// open client profile
app.get("/open-client-profile", function (req, resp) {
    let path = __dirname + "/public/client-profile.html";
    resp.sendFile(path);
})

// save client profile
app.post("/client-profile-save", function (req, resp) {

    mysql.query("insert into cprofile values(?,?,?,?,?,?)", [req.body.email, req.body.cname, req.body.contact, req.body.address, req.body.city, req.body.state], function (err) {
        if (err == null)
            // console.log(done)
            resp.send("Bahut Bahut Badhai.....");
        else
            resp.send(err.message);
    })
})

// update client profile
app.post("/client-profile-update", function (req, resp) {

    mysql.query("update cprofile set cname=?, contact=?, address=?, city=?, state=? where email=?", [req.body.cname, req.body.contact, req.body.address, req.body.city, req.body.state, req.body.email], function (err, result) {
        if (err == null) {
            if (result.affectedRows >= 1) {
                resp.send("Updated  Successfulllyyyy....");
            }
            else {
                resp.send("Invalid Email ID");
            }

        }
        else
            resp.send(err.message);
    })
})

//Searching client profile
app.get("/find-client-prof", function (req, resp) {
    let email = req.query.email;

    mysql.query("select * from cprofile where email=?", [email], function (err, resultJsonAry) {
        if (err != null) {
            resp.send(err.message);
            return;

        }
        // console.log(resultJsonAry);
        resp.send(resultJsonAry);
    })

})

 // checking account
 app.get("/check-client-acc",function(req,resp){
    let email = req.query.email;
    mysql.query("select * from cprofile where email = ?",[email],function(err,result){
        if (err){
            resp.send(err.message);
        } else {
            resp.send(result);
        }
    })
})