var mongo= require('mongoskin');
var db = require('..//config/db');
var BSON = mongo.BSONPure;
var und = require('underscore');


var users = db.collection('users', {strict: true}, function(err,collection) {
    if (err) {
        console.log(err);
    }
});



/**
var goals = db.collection('goals', {strict: true}, function(err,collection) {
    if (err) {
        console.log(err);
    }
});
**/

var savings = db.collection('savings', {strict: true}, function(err,collection) {
	console.log("connected");
    if (err) {
    	console.log("error");
        console.log(err);
    }
    
});

users.find({}).toArray(function(err, items) {
		var userlist=items;	
		console.log(userlist);


		savings.find({}).toArray(function(err, items) {
			und.each(items,function(element,index,list) {
				element.date=(new BSON.ObjectID(element._id)).getTimestamp();
				var user=und.find(userlist,function(u) {
					return ""+u._id==""+element.userid;
				});
				if (user) {
				element.username=user.username;
				element.userdate=(new BSON.ObjectID(user._id)).getTimestamp();
				}
				console.log(element);
			});
					db.close();
		});

	});



