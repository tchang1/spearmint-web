var mongo= require('mongoskin');

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

exports.createGoal = function(req,res) {
	var id = req.id;
	var newGoal= req.body;
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
	goals.update({userid: req.userId}, req.body, function(err,result) {
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
	goals.findOne({userid: req.userid},function(err, result) {
	res.send(result);
	});
};
