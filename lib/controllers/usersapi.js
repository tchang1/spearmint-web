var mongo= require('mongoskin');
var bcrypt= require('bcrypt');
var util = require('util');

//var db= mongo.Db,
//	Server = mongo.Server,
//MongoClient = mongo.MongoClient;

//var server = new Server('localhost',27017, {auto_reconnect: true});
//db = new Db('users',server);
var db = mongo.db('mongodb://localhost:27017/testdb', {native_parser:true});
var users = db.collection('users', {strict: true}, function(err,collection) {
		if (err) {
			console.log(err);
		}
});

exports.validateUser= function(req,res,next) {
	req.checkBody('username', "Empty or invalid username").notEmpty().isEmail();
	req.checkBody('password', "Invalid password length").len(4,32);

	var errors =req.validationErrors();
	if (errors) {
    res.send('Bad Request' + util.inspect(errors), 400);
    return;
	}
	next();
};

exports.createUser = function(req,res) {
	var username= req.body.username;
	bcrypt.hash(req.body.password, 10, function(err,hash) {
		var newUser = {username: username, pw: hash};
		users.insert(newUser, function(err,result) {
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

	});
};

exports.updateUserById = function(req,res) {
	users.update({userid: req.userId}, req.body, function(err,result) {
		if (!err) {
			console.log("Goal updated");
		}
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
