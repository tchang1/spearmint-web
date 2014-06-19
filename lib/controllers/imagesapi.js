var mongo= require('mongoskin');
var util = require('util');

//var db= mongo.Db,
//	Server = mongo.Server,
//MongoClient = mongo.MongoClient;

//var server = new Server('localhost',27017, {auto_reconnect: true});
//db = new Db('goals',server);
var db = require('../config/db');

var images = db.collection('images', {strict: true}, function(err,collection) {
		if (err) {
			console.log("collection error");
			console.log(err);
		}
	
});

var savings = db.collection('savings', {strict: true}, function(err,collection) {
		if (err) {
			console.log("collection error");
			console.log(err);
		}
	
});

exports.validateImageRequest= function(req,res,next) {
	req.checkBody('goalid', "Empty or invalid goal id").notEmpty().isAlphaNumeric();

	var errors =req.validationErrors();
	if (errors) {
    res.send('Bad Request' + util.inspect(errors), 400);
    return;
	}
	next();
};

exports.getRandomImage = function(req,res) {
	var goalid= req.body.goalid;
	var userid= req.user._id;
	images.findOne({}, function(err,result) {
	if (err) {
		console.log(err);
		throw err;
	}
    if (result) {

		res.send(result);
    }
	});
};

exports.getNextImage = function(req,res) {
	var categoryid= req.body.categoryid;
	var userid= req.user._id;
	savings.count({userid: userid}, function (err,count) {
		if (!err) {
			images.count({categoryid:categoryid}, function (err, num) {
				var offset=count%num;
				images.find({categoryid: categoryid}, {skip: offset, limit: 2}, function(err,result) {
							res.send(200,result);
				});
			});
			
		}
	});
	
};


