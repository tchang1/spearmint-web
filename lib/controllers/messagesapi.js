var mongo= require('mongoskin');
var util = require('util');
var und=require('underscore');
var BSON = mongo.BSONPure;

//var db= mongo.Db,
//	Server = mongo.Server,
//MongoClient = mongo.MongoClient;

//var server = new Server('localhost',27017, {auto_reconnect: true});
//db = new Db('goals',server);
var db = require('../config/db');

var messages = db.collection('messages', {strict: true}, function(err,collection) {
		if (err) {
			console.log("collection error");
			console.log(err);
		}
	
});

function randomIntInc (low, high) {
    return Math.floor(Math.random() * (high - low + 1) + low);
}

exports.getRandomSuggestions = function(req,res) {
	console.log("getting random suggestion");
	var limit= req.query.limit;
	if (!limit || isNaN(limit)) {
		limit=5;
	}
	messages.find({type: "suggestion"},{"message":1}).toArray(function(err,result) {
	if (err) {
		console.log(err);
		throw err;
	}
    if (result) {
    	console.log(result);
    	var sample=und.chain(result).pluck('message').sample(limit).value();

    	console.log(sample);
		res.send(sample);
    }
	});
};

exports.getRandomCongratulations = function(req,res) {
	console.log("getting random congratulations");
	var limit= req.query.limit;
	if (!limit || isNaN(limit)) {
		limit=5;
	}
	messages.find({type: "congratulation"},{"message":1}).toArray(function(err,result) {
	if (err) {
		console.log(err);
		throw err;
	}
    if (result) {
    	console.log(result);
    	var sample=und.chain(result).pluck('message').sample(limit).value();

    	console.log(sample);
		res.send(sample);
    }
	});
};





