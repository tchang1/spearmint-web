var mongo= require('mongoskin');
var util = require('util');
var BSON = mongo.BSONPure;


//var db= mongo.Db,
//	Server = mongo.Server,
//MongoClient = mongo.MongoClient;

//var server = new Server('localhost',27017, {auto_reconnect: true});
//db = new Db('goals',server);
var db = require('../config/db');

var savings = db.collection('savings', {strict: true}, function(err,collection) {
		if (err) {
			console.log("collection error");
			console.log(err);
		}
	
});

exports.validateSavings= function(req,res,next) {
	req.checkBody('goalid', "Empty or invalid goal id").notEmpty().isAlphanumeric();
	req.checkBody('savingsAmount', "Empty or invalid goal saved amount").notEmpty().isNumeric();

	var errors =req.validationErrors();
	if (errors) {
    res.send({error: "Bad Request", details:errors}, 400);
    return;
	}
	next();
};

exports.createSavings = function(req,res) {
	var newSavings= req.body;
	newSavings.userid= req.user._id;
	newSavings.goalid= new BSON.ObjectID(newSavings.goalid);
	newSavings.softDeleted= 'F';
	console.log(newSavings);
	savings.insert(newSavings, function(err,result) {
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

exports.updateSavingsByUser = function(req,res) {
	if (!req.body._id) {
		res.send(400);
	}
	var requserid=new BSON.ObjectID(req.user._id);
	var savingsid= new BSON.ObjectID(req.body._id);
	var updatedSavings=req.body;
	updatedSavings.userid=req.user._id;
	updatedSavings.goalid=new BSON.ObjectID(updatedSavings.goalid);
	updatedSavings._id= new BSON.ObjectID(updatedSavings._id);

	savings.update({userid: requserid, _id: savingsid}, updatedSavings, function(err,result) {
		if (!err) {
			console.log("Savings updated");
			res.send({status: "OK"},200);
		}
	});
	
};

exports.softDeleteSavings = function(req,res) {
	if (!req.body._id) {
		res.send(400);
	}
	var requserid=new BSON.ObjectID(req.user._id);
	var savingsid= new BSON.ObjectID(req.body._id);

	savings.update({userid: requserid, _id: savingsid},{$set: {softDeleted: 'T'}}, function(err,result) {
		if(!err)
		{
			console.log("removed");
			res.send({status: "OK"},200);
		}
		else { console.log("error removing");}
	});
};

exports.deleteSavingsByUser = function(req,res) {
	savings.remove({userid: req.userId},{single:true}, function(err,result) {
		if(!err)
		{
			console.log("removed");
			res.send(result);
		}
		else { console.log("error removing");}
	});
};

exports.findAllByUser = function (req,res) {

	savings.find({userid: req.user._id, softDeleted: 'F'}, {_id:1, goalid:1, savingsAmount:1, reason:1}).toArray(function(err,result) {
		res.send(result);
	});
};

exports.findAll = function(req,res) {
	savings.find({}).toArray(function(err, items) {
	res.send(items);
	});
};

exports.findOneByUser = function(req,res) {

	savings.findOne({userid: req.user._id},function(err, result) {
	res.send(result);
	});
};
