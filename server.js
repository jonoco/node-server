var express = require('express');
var app = express();
var PORT = process.env.PORT || 3000;

var middleware = require('./middleware');

// Application level Middleware needs to be above the routes
app.use(middleware.logger);

// Route level middleware is provided in the route
app.get('/about', middleware.requireAuthentication, function(req, res) {
	res.send('About!');
})

app.use(express.static(__dirname + '/public'));

console.log('listening on ' + PORT);
app.listen(PORT);