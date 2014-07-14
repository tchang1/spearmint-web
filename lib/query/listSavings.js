var mongo= require('mongoskin');
var db = require('..//config/db');
var BSON = mongo.BSONPure;
var und = require('underscore');


var users = db.collection('users', {strict: true}, function(err,collection) {
    if (err) {
        console.log(err);
    }
});




var goals = db.collection('goals', {strict: true}, function(err,collection) {
    if (err) {
        console.log(err);
    }
});

var savings = db.collection('savings', {strict: true}, function(err,collection) {
	console.log("connected");
    if (err) {
    	console.log("error");
        console.log(err);
    }
    
});

users.find({}).toArray(function(err, userlist) {
	if (err) {
		console.log(err);
		return;
	}

	goals.find({}).toArray(function(err, goallist) {
			if (err) {
			console.log(err);
			return;
			}



		savings.find({}).toArray(function(err, savinglist) {
			if (err) {
			console.log(err);
			return;
			}

			und.each(userlist,function(userElement,index,list) {
				userElement.createDate = (new BSON.ObjectID(userElement._id)).getTimestamp();
				var userGoal=und.find(goallist, function(g) {
					return ""+g.userid==""+userElement._id;
				});

				console.log("Next User");
				console.log(userElement.username+" "+userElement.createDate + " "+ userElement.notifications);
				
				if (userGoal) {
					console.log("Goal: " + userGoal.name + " Amount: "+userGoal.amountSaved+" Target: "+userGoal.targetAmount);
				}

				var userSavings = und.filter(savinglist, function(s) {
					return ""+s.userid==""+userElement._id;
				});
				if (userSavings.length>1) {
					und.each(userSavings,function(savingsElement, sindex, slist) {
						savingsElement.savingDate=(new BSON.ObjectID(savingsElement._id)).getTimestamp();
						console.log(savingsElement.savingDate +" " + savingsElement.savingsAmount);
					});
				}
				else {
					console.log("No Savings");
				}

			});

		db.close();	
		});

	});
});



