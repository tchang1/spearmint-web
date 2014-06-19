var mongo= require('mongoskin');
var util = require('util');
var BSON = mongo.BSONPure;

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

var goals = db.collection('goals', {strict: true}, function(err,collection) {
		if (err) {
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
	console.log("getting next image");
	console.log("params");
	console.log(req.query.goalid);
	console.log(req.query.categoryid);

	var goalid= new BSON.ObjectID(req.query.goalid);
	var categoryid= ""+req.query.categoryid;
	var userid= req.user._id;
	console.log(goalid);
	console.log(categoryid);
	console.log(userid);
	savings.count({userid: userid, goalid: goalid}, function (err,count) {
		console.log("savings count is" + count);
		if (!err) {
			images.count({categoryid:categoryid}, function (err, num) {
				console.log("image count is" +num);
				var next1=count%num;
				var next2=(count+1)%num;
				images.find({categoryid: categoryid},{"uri": 1}).toArray(function(err,result) {
					if(err)
					{
						console.log(err);
						res.send(err,500);
					}
							res.send([result[next1],result[next2]],200);
				});
			});
			
		}
	});
	
};


