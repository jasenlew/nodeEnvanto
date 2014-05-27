var github = require ("./github");

github.getRepos("jasenlew", function (repos) {
	console.log("Jasen Lew's repos...", repos);
});

