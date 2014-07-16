var nodemailer = require('nodemailer');
var mongo= require('mongoskin');
var bcrypt= require('bcrypt');
var util = require('util');
var db = require('../config/db');
var emailMessages = require('../config/emailMessages');
var BSON = mongo.BSONPure;

var mailsSent = 0;
var totalEmails = 0;

var defaultUserGoalName = 'Enter a goal';
var goalNamePlaceholder = '{goalName}';
var goalAmountPlaceholder = '{amountSaved}';
var unsubscribeLink = '{unsubscribeLink}';

var closeMailerIfDone = function(mailer) {
    mailsSent = mailsSent + 1;
    if (mailsSent >= totalEmails) {
        console.log('Closing mailer and db');
        db.close();
        mailer.close();
    }
};



var users = db.collection('users', {strict: true}, function(err,collection) {
    if (err) {
        console.log(err);
    }
});

var goals = db.collection('goals', {strict: true}, function(err,collection) {
    if (err) {
        console.log(err);
    }
});

users.find({}).toArray(function(err, items) {
    if (items) {

        var usersToEmail = [];
        var mailsSent = 0;
        var i;
        for (i = 0; i < items.length; i++) {
            if (items[i].notifications == 'Y' || items[i].notifications == 'y') {
                usersToEmail.push(items[i]);
            }
        }

        totalEmails = usersToEmail.length;

        // create reusable transport method (opens pool of SMTP connections)

        if (totalEmails > 0) {
            var smtpTransport = nodemailer.createTransport('SMTP',{
                service: 'Gmail',
                auth: {
                    user: 'team@trykeep.com',
                    pass: 'RDPteam2014'
                }
            });
        }
        else {
            db.close();
        }

        for (i = 0; i < usersToEmail.length; i++) {
            goals.findOne({userid:usersToEmail[i]._id}, (function(email) {
                return function(err, userGoal) {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        var subject = "Sign up now for our new beta feature";
                        var body = 'Hey there! <br /> <br />' +
                        'Thanks for using Keep! ' +
                        'Our team has been working on a new feature to let you transfer money you\'ve kept from your debit card to a savings account. <br /> <br /> Want to try it out? ' +
                        'Go to your settings in the Keep app then select <a href="m.trykeep.com/optin">Add Debit Information</a> to apply for our Beta. We hope you like it! <br /> ' +
                        '<br />' +
                        'Cheers, <br />' +
                        '-Keep Team <br /> ' +
                        '<br /> ' +
                        '<small>To unsubscribe from emails go to the Keep app then <a href="m.trykeep.com/settings">Settings</a> then Notification Settings.</small>';;

                        

                        //unsubscribeLink = "m.trykeep.com/unsubscribe?email=" + email; 

                        console.log('sending mail to: ' + email);
                        // setup e-mail data with unicode symbols
                        var mailOptions = {
                            from: 'Keep Team <team@trykeep.com>', // sender address
                            to: email, // list of receivers
                            subject: subject, // Subject line
                            text: body, // plaintext body
                            html: body // html body
                        };

                        // send mail with defined transport object
                        smtpTransport.sendMail(mailOptions, function(error, response){
                            if(error){
                                console.log(error);
                            }else{
                                console.log("Message sent: " + response.message);
                            }
                            closeMailerIfDone(smtpTransport);
                        });
                    }
                }
            })(usersToEmail[i].username));
        }
    }
    else {
        console.log(err);
    }


});



