var mongo = require('mongodb');

var host = '127.0.0.1';
var port = mongo.Connection.DEFAULT_PORT;
var db = new mongo.Db('nodejs-introduction', new mongo.Server(host, port,{}));

db.open(function (error) {
	console.log('We are connected! ' + host + ":" + port);

	db.collection('user', function (error, collection) {
		console.log("We have the collection.");

		collection.insert({
			id: '1',
			name: 'Jasen Lew',
			twitter: 'jasenlew',
			email: 'jasen.lew@gmail.com'
		}, function () {
			console.log("Successfully inserted jasenlew");
		});

		collection.insert({
			id: '2',
			name: 'Rong Lew',
			twitter: 'ronglew',
			email: 'lrjasen_2001@yahoo.com'
		}, function () {
			console.log("Successfully inserted ronglew");
		});

	});
});