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
  console.log("Tweet: " + obj.text);
});