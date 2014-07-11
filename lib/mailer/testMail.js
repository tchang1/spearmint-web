var nodemailer = require('nodemailer');

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
    to: 'mfwziegler@gmail.com', // list of receivers
    subject: 'Daily reminder', // Subject line
    text: 'A daily reminder to remind you that you are awesome', // plaintext body
    html: 'A daily reminder to remind you that you are awesome' // html body
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





