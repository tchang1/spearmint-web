var mongo= require('mongoskin');
var util = require('util');

//var db= mongo.Db,
//	Server = mongo.Server,
//MongoClient = mongo.MongoClient;

//var server = new Server('localhost',27017, {auto_reconnect: true});
//db = new Db('goals',server);
db = mongo.db('mongodb://localhost:27017/testdb', {native_parser:true});

var images = db.collection('images', {strict: true}, function(err,collection) {
		if (err) {
			console.log("collection error");
			console.log(err);
		}
	
});

exports.validateImageRequest= function(req,res,next) {
	req.checkBody('goalid', "Empty or invalid goal id").notEmpty().isAlphaNumeric();
	req.checkBody('savingsAmount', "Empty or invalid goal saved amount").notEmpty().isNumeric();

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
	var updatedSavings= req.body;
	updatedSavings.userid= req.user._id;
	images.find({userid: updatedSavings.userid}, updatedSavings, function(err,result) {
		if (!err) {
			console.log("Savings updated");
			res.send(200,result);
		}
	});
	
};


