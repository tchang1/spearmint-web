'use strict';

/**
 * Populate database with sample application data
 */

//Clear old things, then add things in
  var db = require('./db');
  var images = require('./images.json');
  console.log(images.images);

  module.exports= function() {
    db.dropCollection('savings',function(err,collection){});
  db.dropCollection('users',function(err,collection){});
  db.dropCollection('goals',function(err,collection){});
  db.dropCollection('images',function(err,collection){});
  
  db.collection('users').insert({username:'test@test.com', pw: 'something', notifications:'Y'}, function(err, result){
      
    db.collection('users').ensureIndex({ "username": 1 },true, function(err,result) {

    });

  });

  db.collection('goals').insert({name:'go to paris', amountSaved: '10', targetAmount:'2000', isDefined:'Y'}, function(err, result){
    db.collection('savings').insert({goalid: result[0]._id, savingsAmount: "100"}, function(err, result){});
  });
  db.collection('images').insert(images.images, function(err, result){});
  db.collection('feedback').insert({feedback: 'hi'}, function(err, result){});

};


