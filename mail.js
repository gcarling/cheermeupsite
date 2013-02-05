var email = require("mailer");
var sgusername = 'cheermeup';
var sgpassword = 'happynotsad';
var api_key = "b5ecba77a307419baeb643a207e92aa2";


function sendMail(toEmail, fromEmail, fromName, toName, message, urlJSON, dateString) {
    email.send({
        host : "smtp.sendgrid.net",
        port : "587",
        domain : "cheer-me-up.org",
        to : toEmail,
        from : "youvebeencheeredup@gmail.com",
        replyto: fromEmail,
        subject : fromName + " sent you a cheer-me-up!",

        html: bodyGenerator(toName, fromName, message, urlJSON, dateString),

        authentication : api_key, //WHAT IS THIS?
        username : sgusername,
        password : sgpassword
    },
    function(err, result){
     if(err){
         console.log(err);
        } else {
            console.log('EMAIL SUCCESS');
        }
    });
};


function bodyGenerator(toName, fromName, message, urlJSON, dateString) {
    var parsed = JSON.parse(urlJSON); 

     return "<html style=' background-color: #BCD0F5;'> <head>" +
            "</head> <body style='font-family: Helvetica,sans-serif; color: #6495ED;'>" +
            "<div id='master' style='border-radius: 10px; width: 550; margin: auto; display: block; background-color: white; border: 3px solid #6495ED;'>" + 
            "<div class='c' id='logoBox' style=' background-color: #6495ED; width: 535px; height:70px; padding-top: 15px; padding-left: 15px;'><img src='http://guarded-bayou-7081.herokuapp.com/css/cmu_w.png' id='logo' style='margin: auto; height: 50px;'/><span id='header' style='color:white; text-align:right; float:right; padding-right: 15px; padding-top: 10px;'><strong>Hey, " + toName + "<span id='name'></span>!<br><span id='sender'>" + fromName + "</span> wanted to brighten up your day!"+
            "</strong></span> </div>" + 
            "<div class='c' style='padding-left:10px'><p id='intro'>" + 
            "<strong>&quot;" + message + "&quot;<br>-" + fromName + "</strong></br></div>" + 
            "<div> <i> ordered with love on " + dateString + " </i> </div><br>" + 
            "<div id='content1' class='c'><img src='" + parsed[0] + "' class='content' style='border-radius: 20px; max-width: 500px; margin: auto; display: block;' /></div>" +
            "<div class='spacer' style='width: 550px; height: 12px; background-color: white;'></div><div class='spacer'></div>" +
            "<div id='content2' class='c'><img class='content' class='content' style='border-radius: 20px; max-width: 500px; margin: auto; display: block;' src='" + parsed[1] + "'/></div>" +
            "<div class='spacer' style='width: 550px; height: 12px; background-color: white;'></div><div class='spacer'></div>" +
            "<div id='content3' class='c'><img class='content' class='content' style='border-radius: 20px; max-width: 500px; margin: auto; display: block;' src='" + parsed[2] + "'/></div>" +
            "<div class='spacer' style='width: 550px; height: 12px; background-color: white;'></div><div class='spacer'></div>" +
            "<div id='content4' class='c'><img class='content' class='content' style='border-radius: 20px; max-width: 500px; margin: auto; display: block;' src='" + parsed[3] + "'/></div>" +
            "<div class='spacer' style='width: 550px; height: 12px; background-color: white;'></div><div class='spacer'></div>" +
            "<div id='content5' class='c'><img class='content' class='content' style='border-radius: 20px; max-width: 500px; margin: auto; display: block;' src='" + parsed[4] + "'/></div>" +
            "<div class='spacer' style='width: 550px; height: 12px; background-color: white;'></div><div class='spacer'></div>" +
            "<div class='c' style='text-align:center; font-size:14pt'><p id='promotion'>Want to cheer someone else up? " +
            "<a href='http://www.cheer-me-up.org'> Click here</a> to keep happy times going!</p> " + 
            "</div><div class='spacer'></div><div height=10px width=500px></div>" + 
            "</div> </body> </html>";
};

exports.sendMail = sendMail;
exports.bodyGenerator = bodyGenerator;