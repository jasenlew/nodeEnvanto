//Loading required server modules
var http = require('http');
var fs = require('fs');

//Logging into terminal below message
console.log('Starting...');

//Going to look into config file SYNCHRONOUSLY to load host and port info.
var config = JSON.parse(fs.readFileSync("config.json"));
var host = config.host;
var port = config.port;

//Create server
var server = http.createServer(function (request, response) {
	//Logging into terminal message and url being requested 
	console.log('Received request ' + request.url);

	//Locating and reading file
	fs.readFile("./public" + request.url, function (error, data) {
		if (error) {
			//Writing to client browser the error message because could not find file
			response.writeHead(404, {'Content-type': 'text/plain'});
			response.end("Sorry the page was not found :-(");
		} else {
			//Writing to client browser the contents of file
			response.writeHead(200, {'Content-type': 'text/html'});
			response.end(data);
		}
	});
});

server.listen(port, host, function () {
	console.log('Listening (host) ' + host + ':' + port + ' (port)');
});

fs.watchFile("config.json", function () {
	server.close();

	config = JSON.parse(fs.readFileSync("config.json"));
	
	host = config.host;
	port = config.port;

	server.listen(port, host, function () {
		console.log('Listening (host) ' + host + ':' + port + ' (port)');
	});

});