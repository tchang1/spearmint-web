var mongo= require('mongoskin');

//var db= mongo.Db,
//	Server = mongo.Server,
//MongoClient = mongo.MongoClient;

//var server = new Server('localhost',27017, {auto_reconnect: true});
//db = new Db('users',server);
module.exports = mongo.db('mongodb://localhost:27017/testdb', {native_parser:true});

