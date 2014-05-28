var Stream = require('twitter-stream-oauth');

var stream = new Stream({
    consumer_key: 'bFom5qp0yvVN4iGvIsFFx20gT',
    consumer_secret: 'L7noRTmpVUFfiM75VL9AQGK9karDmXHodFk6WtpTQ3cLKkUDEq',
    access_token_key: '52177273-AYm2EtpQMMgIXwlHnj7ss0lYd4i1HpUO05zJFskng',
    access_token_secret: '3veZZusxcwMstrxcGzHNb8sVlKtPYohiNWi8LEbAzktCw',
    api: 'filter',
    api_params: {'locations': "-180,-90,180,90"}    
});

var mongo = require('mongodb');
var host = '127.0.0.1';
var port = mongo.Connection.DEFAULT_PORT;

var db = new mongo.Db('nodejs-introduction', new mongo.Server(host, port, {}));
var tweetCollection;

db.open(function (error) {
	console.log('We are connected! ' + host + ':' + port);

	db.collection('tweet', function (error, collection) {
		tweetCollection = collection;
	});
});

//create stream
stream.stream();

//listen stream data
var body = '';

stream.on('data', function(obj) {
  tweetCollection.insert(obj, function (error) {
  	if (error) {
  		console.log('Error: ' + error.message);
  	} else {
  		console.log('Inserted into database');
  	}
  });
  // console.log("Tweet: " + obj.text);
});