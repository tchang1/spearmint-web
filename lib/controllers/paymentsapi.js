var nodemailer = require('nodemailer');

exports.optin = function(req,res) {
    var email = req.user.username;
    var message = 'User: ' + email + ' requests to be opted in for payments. :)';

    console.log(message);

// create reusable transport method (opens pool of SMTP connections)
    var smtpTransport = nodemailer.createTransport('SMTP',{
        service: 'Gmail',
        auth: {
            user: 'reminder@trykeep.com',
            pass: 'RDPTeam2014'
        }
    });


// setup e-mail data with unicode symbols
    var mailOptions = {
        from: 'Daily Reminder <reminder@trykeep.com>', // sender address
//        to: 'CEGSpearmint@intuit.com', // list of receivers
        to: 'CEGSpearmint@intuit.com',
        subject: 'User wants payments', // Subject line
        text: message, // plaintext body
        html: message // html body
    };

// send mail with defined transport object
    smtpTransport.sendMail(mailOptions, function(error, response){
        if(error){
            console.log(error);
        }else{
            console.log("Message sent: " + response.message);
        }
        smtpTransport.close();
    });

    res.send(200);
};