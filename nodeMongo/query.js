var mongo = require('mongodb');

var host = '127.0.0.1';
var port = mongo.Connection.DEFAULT_PORT;
var db = new mongo.Db('nodejs-introduction', new mongo.Server(host, port,{}));

db.open(function (error) {
	console.log('We are connected! ' + host + ":" + port);

	db.collection('user', function (error, collection) {
		console.log("We have the collection.");

		collection.find({'id': '1'}, function(error, cursor) {
			cursor.toArray(function (error, users) {
				if (users.length === 0) {
					console.log("No user found.");
				} else {
					console.log("Found a user", users[0]);
				}
			});
		});
	});
});