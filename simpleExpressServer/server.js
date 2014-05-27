var fs = require('fs');
var config = JSON.parse(fs.readFileSync("config.json"));
var host = config.host;
var port = config.port;
var express = require('express');

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
	var user = users[request.params.id];
	if (user) {
		response.send(user.name + ' is ' + user.age + ' years old.');
	} else {
		response.send('Sorry!  We cannot find the user :-(', 404);
	}
});

app.listen(port, host, function () {
	console.log('Listening (host) ' + host + ':' + port + ' (port)');
});

var users = {
	'1': {
		'name': 'Jaden Lew',
		'age': 9
	},
	'2': {
		'name': 'Javen Lew',
		'age': 7
	}
};