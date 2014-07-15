var mongo= require('mongoskin');
var db = require('..//config/db');
var BSON = mongo.BSONPure;
var und = require('underscore');
var fs = require('fs');
var moment = require('moment');


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

var stats={};

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
			stats.numUsers=userlist.length;
			stats.numSavings=savinglist.length;
			stats.numGoals=goallist.length;

			und.each(userlist,function(userElement,index,list) {
				userElement.createMoment = moment((new BSON.ObjectID(userElement._id)).getTimestamp());
				userElement.createDate = userElement.createMoment.format("dddd, MMMM Do YYYY, h:mm:ss a")
				var userGoal=und.find(goallist, function(g) {
					return ""+g.userid==""+userElement._id;
				});

				//console.log("Next User");
				//console.log(userElement.username+" "+userElement.createDate + " "+ userElement.notifications);
				
				if (userGoal) {
					delete userGoal.userid;
					delete userGoal._id;
					delete userGoal.categoryid;
					//console.log("Goal: " + userGoal.name + " Amount: "+userGoal.amountSaved+" Target: "+userGoal.targetAmount);
					userElement.goal=userGoal;

				}


				var userSavings = und.filter(savinglist, function(s) {
					return ""+s.userid==""+userElement._id;
				});
				if (userSavings.length>=1) {
					und.each(userSavings,function(savingsElement, sindex, slist) {
						savingsElement.savingMoment=moment((new BSON.ObjectID(savingsElement._id)).getTimestamp());
						savingsElement.savingDate = savingsElement.savingMoment.format("dddd, MMMM Do YYYY, h:mm:ss a")

						//console.log(savingsElement.savingDate +" Amount saved: " + savingsElement.savingsAmount);
						delete savingsElement._id;
						delete savingsElement.userid;
						delete savingsElement.goalid;
					});
				}
				else {
					//console.log("No Savings");
				}
				userElement.savings=userSavings;
				delete userElement.pw;
				delete userElement._id;


			});
			
			var grouped= und.countBy(userlist, function(u) {
				return u.savings.length>0 ? 'hasSaved' : 'hasNotSaved';
			});

			var inactives=[];
			var activeUsers=[];
			var actives= und.countBy(userlist, function(u) {
				if (!u.savings.length>0) {
					inactives.push(u.username);
					return 'inactive';
				}

				var latestSaving=und.max(u.savings, function(s) {
					//console.log(s);
					return s.savingMoment.unix();
				});
				//console.log(latestSaving);
				if (latestSaving.savingMoment.isSame(u.createMoment, 'day')) {
					inactives.push(u.username);
					return 'inactive';

				}
				else { 
					activeUsers.push(u);
					return 'active';
				}

			});
			stats.numInactives= actives.inactive;
			stats.numActives=actives.active;

			stats.numUserHasSaved=grouped.hasSaved;
			stats.numUserHasNotSaved = grouped.hasNotSaved;

			userjson=JSON.stringify(userlist,null,4);
			statsjson=JSON.stringify(stats,null,4);
			activeUsersjson=JSON.stringify(activeUsers,null,4);


			console.log(inactives);

			var inactivestxt="";
			und.each(inactives, function(element,list,index) {
				inactivestxt+=element+"\n";
			});

			//console.log(userjson);
			//console.log(stats);

			
			fs.writeFile('usageLog.json', userjson, function(err) {
					if (err) {
						return console.log(err);
					}
					console.log("Written to usageLog.json");
				});
			fs.writeFile('stats.json', statsjson, function(err) {
					if (err) {
						return console.log(err);
					}
					console.log("Written to stats.json");
				});
			fs.writeFile('inactives.txt', inactivestxt, function(err) {
					if (err) {
						return console.log(err);
					}
					console.log("Written to inactives.txt");
				});
			fs.writeFile('actives.json', activeUsersjson, function(err) {
					if (err) {
						return console.log(err);
					}
					console.log("Written to actives.json");
				});
			

		db.close();	
		});

	});
});



