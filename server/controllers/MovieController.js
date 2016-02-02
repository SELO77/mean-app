// MovieController.js

var restful = require('node-restful');

module.exports = function(app, route) {

	// Setup the controller for REST.
	var rest = restful.model (
		'movie',
		app.models.movie
	).methods(['get', 'post', 'put', 'delete']);

	// Register this endpoint with the application
	rest.register(app, route);

	// Return middleware
	return function(res, req, next) {
		next();
	};
};