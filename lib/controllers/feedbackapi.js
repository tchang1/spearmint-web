var mongo= require('mongoskin');
var util = require('util');
var BSON = mongo.BSONPure;



//var db= mongo.Db,
//	Server = mongo.Server,
//MongoClient = mongo.MongoClient;

//var server = new Server('localhost',27017, {auto_reconnect: true});
//db = new Db('goals',server);
var db = require('../config/db');

var feedback = db.collection('feedback', {strict: true}, function(err,collection) {
		if (err) {
			console.log("collection error");
			console.log(err);
		}
	
});

exports.validateFeedback= function(req,res,next) {
	req.checkBody('feedback', "Empty feedback").notEmpty();

	var errors =req.validationErrors();
	if (errors) {
    res.send('Bad Request' + util.inspect(errors), 400);
    return;
	}
	next();
};

exports.createFeedback = function(req,res) {
	var newFeedback= req.body.feedback;
	var id= new BSON.ObjectID(req.user._id);
	feedback.insert({feedback: newFeedback, userid: id}, function(err,result) {
	if (err) {
		console.log(err);
		throw err;
	}
    if (result) {
		console.log('Added Feedback');
		res.send(result);
    }
	});
};
