function hello () {
	return "world";
}

function helloWorld () {
	return hello() + ' again';
}

function myPrivateFunction(num) {
	return num + 1;
}

function increment (num) {
	return myPrivateFunction(num);
}

module.exports.hello = hello;
module.exports.helloWorld = helloWorld;
module.exports.increment = increment;