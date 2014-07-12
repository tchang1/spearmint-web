var mongo= require('mongoskin');
var db = require('..//config/db');
var BSON = mongo.BSONPure;
var und = require('underscore');

/**
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
**/

var savings = db.collection('savings', {strict: true}, function(err,collection) {
	console.log("connected");
    if (err) {
    	console.log("error");
        console.log(err);
    }
    
});
savings.find({}).toArray(function(err, items) {
			und.each(items,function(element,index,list) {
				element.date=(new BSON.ObjectID(element._id)).getTimestamp();
				console.log(element);
			});
					db.close();
		});

