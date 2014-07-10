'use strict';

var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var bcrypt=require('bcrypt');
var db = require("./db");

var users = db.collection('users', {strict: true}, function(err,collection) {
        if (err) {
            console.log(err);
        }
});

passport.use(new LocalStrategy(function(username,password,done) {
    console.log("Authenticating with local strategy");
    var users = db.collection('users', {strict: true}, function(err,collection) {
            if (err) {
                console.log(err);
            }
    });
        console.log("Finding user");
        console.log(username);
    users.findOne({username: username}, function (err, user) {
        if (err) {
            console.log(err);
            return done(err);
        }
        if (!user) {
            console.log("Email not found");
            return done(null, false, { message: "Email not found"});
        }
        bcrypt.compare(password, user.pw, function(err,res) {
            if (err) {
                console.log(err);
                return done(err);
            }
            if (res) {
                console.log("Password matched");
                return done(null, user);
            }
            else {
                return done(null, false, {
                  message: 'This password is not correct.'
                });
            }
        });
    });

}));

passport.serializeUser(function(user, done) {
    console.log("serializing");
    done(null, user._id);
});
passport.deserializeUser(function(userid, done) {
    console.log("deserializing");
    users.findById(userid, function(err, user) {
        console.log("user found");
        done(err, user);

    });
});

module.exports=passport;