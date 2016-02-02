// library
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var _ = require('lodash');

// Create th application
var app = express();

// Add Middelware ncessary for REST API
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(methodOverride('X-HTTP-Method-Override'));

// Access-Control-Allows
app.use(function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
	res.header('Aceess-Control-Allow-Headers', 'Content-Type');
	next();
});

// mongoDB configuration
mongoose.connect('mongodb://localhost:27017/meanapp');
mongoose.connection.once('open', function(){

	// Load the models
	// Dependency Injection 
	app.models = require('./models/index');

	// Loade the routes
	var routes = require('./routes');
	_.each(routes, function(controller, route) {
		app.use(route, controller(app, route));
	});

	console.log('Listening on port 3000...');
	app.listen(3000);
});

// Setting route 





