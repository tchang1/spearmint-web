'use strict';

var mongo= require('mongoskin');

/**
 * Populate database with sample application data
 */

//Clear old things, then add things in
var db = mongo.db('mongodb://localhost:27017/testdb', {native_parser:true});

db.dropCollection('savings',function(err,collection){});

db.createCollection('savings', {strict: true}, function(err,collection) {
    if (err) {
      console.log("collection error");
      console.log(err);
    }
    var savings = db.collection('savings', {strict: true}, function(err,collection) {});

    savings.insert({goalid:'test', userid: 'test', savingsAmount:'10'}, function(err,result){});
    db.close();
});
