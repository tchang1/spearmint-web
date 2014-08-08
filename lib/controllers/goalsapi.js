var mongo= require('mongoskin');
var util = require('util');
var und = require('underscore');
var BSON = mongo.BSONPure;


//var db= mongo.Db,
//	Server = mongo.Server,
//MongoClient = mongo.MongoClient;

//var server = new Server('localhost',27017, {auto_reconnect: true});
//db = new Db('goals',server);
var db = require('../config/db');

var categoryMap = {}; //travel: "1", trip: "1", vacation: "1"};

var goals = db.collection('goals', {strict: true}, function(err,collection) {
		if (err) {
			console.log(err);
		}
	
});

var getCategory = function(goalName) {
	if (goalName) {
		var words= goalName.split(' ');
		var wordCategories=und.map(words, function(word) {
			return categoryMap[word];
		});
		var categoryid=und.reduce(wordCategories, function(memo,cat){
			if(cat)
			return cat;
			else return memo; 
		}, '0');
		return categoryid;
	}
};

exports.validateGoal= function(req,res,next) {
	req.checkBody('name', "Empty or invalid goal name").notEmpty().len(0,32);
	req.checkBody('amountSaved', "Empty or invalid goal saved amount").isNumeric();
	req.checkBody('targetAmount', "Empty or invalid goal target amount").isNumeric();
	req.checkBody('isDefined', "Is goal defined?").isNumeric();

	var errors =req.validationErrors();
	if (errors) {
		console.log(errors);
    res.send({error: "Bad Request", details:errors}, 400);
    return;
	}
	next();
};

exports.createGoal = function(req,res) {
	var newGoal= req.body;
	newGoal.userid= req.user._id;
	console.log(req.user);
	console.log(newGoal);
	newGoal.categoryid = getCategory(newGoal.name);
	goals.insert(newGoal, function(err,result) {
	if (err) {
		console.log(err);
		throw err;
	}
    if (result) {
		console.log('Added!');
		console.log(result);
		res.send(result[0]);
    }

	});
};

exports.updateGoalByUser = function(req,res) {
	var updatedGoal= req.body;
	updatedGoal._id= new BSON.ObjectID(updatedGoal._id);
	updatedGoal.userid= req.user._id;
	goals.update({userid: updatedGoal.userid}, updatedGoal, function(err,result) {
		if (!err) {
			console.log("Goal updated");
			res.send({status: "OK"},200);
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
