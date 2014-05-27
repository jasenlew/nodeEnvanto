var fs = require('fs');
var express = require('express');

var config = JSON.parse(fs.readFileSync("config.json"));
var host = config.host;
var port = config.port;

var mongo = require('mongodb');
var dbHost = '127.0.0.1';
var dbPort = mongo.Connection.DEFAULT_PORT;

console.log('Starting...');

var app = express();

app.get('/', function (request, response) {
	response.send("hello!");
});
app.use(express.static(__dirname + '/public'));

app.get('/hello/:text', function (request, response) {
	response.send('Hello ' + request.params.text);
	console.log('Printed the following to client browser: Hello ' + request.params.text);
});

app.get('/user/:id', function (request, response) {
	getUser(request.params.id, function(user){
		if(!user) {
			response.send('Sorry!  We cannot find the user :-(', 404);
		} else {
			response.send(user.name + ' has this e-mail: ' + user.email);
		}
	});
	
});

app.listen(port, host, function () {
	console.log('Listening (host) ' + host + ':' + port + ' (port)');
});


var getUser = function(id, callback) {

	var db = new mongo.Db('nodejs-introduction', new mongo.Server(dbHost, dbPort,{}));

	db.open(function (error) {
		console.log('We are connected! ' + dbHost + ":" + dbPort);

		db.collection('user', function (error, collection) {
			console.log("We have the collection.");

			collection.find({'id': id.toString()}, function(error, cursor) {
				cursor.toArray(function (error, users) {
					if (users.length === 0) {
						callback(false);
					} else {
						callback(users[0]);
					}
				});
			});
		});
	});

};