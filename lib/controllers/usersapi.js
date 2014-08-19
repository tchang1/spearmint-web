var mongo= require('mongoskin');
var bcrypt= require('bcrypt');
var util = require('util');
var BSON = mongo.BSONPure;

//var db= mongo.Db,
//	Server = mongo.Server,
//MongoClient = mongo.MongoClient;

//var server = new Server('localhost',27017, {auto_reconnect: true});
//db = new Db('users',server);
var db = require('../config/db');
var users = db.collection('users', {strict: true}, function(err,collection) {
		if (err) {
			console.log(err);
		}
});

exports.validateUser= function(req,res,next) {
	req.checkBody('username', "Empty or invalid username").notEmpty().isEmail();
	req.checkBody('password', "Invalid password length").len(4,32);
	req.checkBody('notifications', "Invalid notifications setting").notEmpty().len(1,1);


	var errors =req.validationErrors();
	if (errors) {
    res.send({error: "Bad Request", details:errors}, 400);
    return;
	}

	users.findOne({username: req.body.username},function(err, result) {
		if (result) {
			res.send({error: "Invalid username"},400);
		}
		else {
			console.log("user validated");
			next();
		}
	});

	
};

exports.createUser = function(req,res,next) {
	var username= req.body.username;
	var notifications= req.body.notifications;
	bcrypt.hash(req.body.password, 10, function(err,hash) {
		var newUser = {username: username, pw: hash, notifications: notifications };
		users.insert(newUser, function(err,result) {
			if (err) {
				console.log(err);
				throw err;
			}
		    if (result) {
				console.log('Added!');
				console.log(result);
				next();
		    }

		});

	});
};

exports.updateUserById = function(req,res) {
	users.update({userid: req.userId}, req.body, function(err,result) {
		if (!err) {
			console.log("User updated");
		}
	});
	
};

exports.updateNotifications = function(req,res) {
	var requserid=new BSON.ObjectID(req.user._id);
	var notificationSetting= req.body.notifications;
	users.update({_id: requserid},{$set: {notifications: notificationSetting}}, function(err,result) {
		if(!err)
		{
			res.send({status: "OK"},200);
		}
		else { console.log("error updating Notification");}
	});
};

exports.getNotifications = function (req,res) {
	var requserid=new BSON.ObjectID(req.user._id);
	users.findOne({_id: req.user._id}, {notifications:1}, function(err,result) {
		if(!err) {
		res.send(result);
	}
	else {console.log("error getting notifications");}
	});
};

exports.getUser = function (req,res) {
	var requserid=new BSON.ObjectID(req.user._id);
	users.findOne({_id: req.user._id}, {username:1, notifications:1}, function(err,result) {
		if(!err) {
		result.password="";
		res.send(result);
	}
	else {console.log("error getting notifications");}
	});
};

exports.deleteUser = function(req,res) {
	users.remove({},{single:true}, function(err,result) {
		if(!err)
		{
			console.log("removed");
			res.send(result);
		}
		else { console.log("error removing");}
	});
};

exports.deleteUserById = function(req,res) {
	users.remove({userid: req.userId},{single:true}, function(err,result) {
		if(!err)
		{
			console.log("removed");
			res.send(result);
		}
		else { console.log("error removing");}
	});
};

exports.findAll = function(req,res) {
	users.find({}).toArray(function(err, items) {
	res.send(items);
	});
};

exports.findOneByUser = function(req,res) {
	users.findOne({userid: req.userid},function(err, result) {
	res.send(result);
	});
};
