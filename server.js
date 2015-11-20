var express = require('express');
var app = express();
var PORT = 3000;

var middleware = {
	requireAuthentication: function( req, res, next ) {
		console.log('private route!')
		next();
	},
	logger: function( req, res, next ) {
		var timestamp = new Date().toString();
		var log = 'Request: ' timestamp +' '+ req.method +' '+ req.url;
		console.log(log);
		next();
	}
}

// Application level Middleware needs to be above the route
app.use(middleware.logger);

app.get('/about', middleware.requireAuthentication, function(req, res) {
	res.send('About!');
})

app.use(express.static(__dirname + '/public'));

console.log('listening on ' + PORT);
app.listen(PORT);