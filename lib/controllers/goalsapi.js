var mongo= require('mongoskin');
var util = require('util');

//var db= mongo.Db,
//	Server = mongo.Server,
//MongoClient = mongo.MongoClient;

//var server = new Server('localhost',27017, {auto_reconnect: true});
//db = new Db('goals',server);
db = mongo.db('mongodb://localhost:27017/testdb', {native_parser:true});

var goals = db.collection('goals', {strict: true}, function(err,collection) {
		if (err) {
			console.log(err);
		}
	
});

exports.validateGoal= function(req,res,next) {
	req.checkBody('name', "Empty or invalid goal name").notEmpty().isAlphanumeric().len(4,32);
	req.checkBody('amountSaved', "Empty or invalid goal saved amount").isNumeric();
	req.checkBody('targetAmount', "Empty or invalid goal target amount").isNumeric();
	req.checkBody('isDefined', "Is goal defined?").isNumeric();

	var errors =req.validationErrors();
	if (errors) {
    res.send('Bad Request' + util.inspect(errors), 400);
    return;
	}
	next();
};

exports.createGoal = function(req,res) {
	var newGoal= req.body;
	newGoal.userid= req.user._id;
	console.log(req.user);
	console.log(newGoal);
	goals.insert(newGoal, function(err,result) {
	if (err) {
		console.log(err);
		throw err;
	}
    if (result) {
		console.log('Added!');
		console.log(result);
		res.send(result);
    }

	});
};

exports.updateGoalByUser = function(req,res) {
	var updatedGoal= req.body;
	updatedGoal.userid= req.user._id;
	goals.update({userid: updatedGoal.userid}, updatedGoal, function(err,result) {
		if (!err) {
			console.log("Goal updated");
		}
	});
	
};

exports.deleteGoal = function(req,res) {
	goals.remove({},{single:true}, function(err,result) {
		if(!err)
		{
			console.log("removed");
			res.send(result);
		}
		else { console.log("error removing");}
	});
};

exports.deleteGoalByUser = function(req,res) {
	goals.remove({userid: req.userId},{single:true}, function(err,result) {
		if(!err)
		{
			console.log("removed");
			res.send(result);
		}
		else { console.log("error removing");}
	});
};

exports.findAll = function(req,res) {
	goals.find({}).toArray(function(err, items) {
	res.send(items);
	});
};

exports.findOneByUser = function(req,res) {

	goals.findOne({userid: req.user._id},function(err, result) {
	res.send(result);
	});
};
