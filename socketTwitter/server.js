var fs = require('fs');
var express = require('express');

var config = JSON.parse(fs.readFileSync("config.json"));
var host = config.host;
var port = config.port;

var app = express();

console.log('Starting...');

app.get('/', function (request, response) {
	var content = fs.readFileSync("template.html");

	getTweets(function(tweets) {
		var ul = '';
		tweets.forEach(function(tweet) {
			ul += "<li><strong>" + tweet.user.screen_name + ": </strong>" + tweet.text + "</li>";
		});

		content = content.toString("utf8").replace("{{INITIAL_TWEETS}}", ul);
		response.setHeader("Content-Type", "text/html");
		response.send(content);
	});

});

app.listen(port, host, function () {
	console.log('Listening (host) ' + host + ':' + port + ' (port)');
});

var io = require('socket.io').listen(app);

var mongo = require('mongodb');
var dbHost = '127.0.0.1';
var dbPort = mongo.Connection.DEFAULT_PORT;

var db = new mongo.Db('nodejs-introduction', new mongo.Server(dbHost, dbPort, {}));

var tweetCollection;

db.open(function (error) {
	console.log('We are connected! ' + dbHost + ':' + dbPort);

	db.collection('tweet', function (error, collection) {
		tweetCollection = collection;
	});
});

function getTweets(callback) {
	tweetCollection.find({}, {"limit": 20, "sort": { "_id": -1 }}, function(error, cursor) {
			cursor.toArray(function(error, tweets) {
				callback(tweets);
			});
		});
}



var Stream = require('twitter-stream-oauth');

var stream = new Stream({
    consumer_key: 'bFom5qp0yvVN4iGvIsFFx20gT',
    consumer_secret: 'L7noRTmpVUFfiM75VL9AQGK9karDmXHodFk6WtpTQ3cLKkUDEq',
    access_token_key: '52177273-AYm2EtpQMMgIXwlHnj7ss0lYd4i1HpUO05zJFskng',
    access_token_secret: '3veZZusxcwMstrxcGzHNb8sVlKtPYohiNWi8LEbAzktCw',
    api: 'filter',
    api_params: {'locations': "-180,-90,180,90"}    
});


//create stream
stream.stream();

//listen stream data
var body = '';

stream.on('data', function(obj) {
  io.sockets.emit("tweet", obj);

  tweetCollection.insert(obj, function (error) {
  	if (error) {
  		console.log('Error: ' + error.message);
  	} else {
  		console.log('Inserted into database');
  	}
  });
  // console.log("Tweet: " + obj.text);
});