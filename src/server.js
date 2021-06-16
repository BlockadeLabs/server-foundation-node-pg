// Core Modules
const express    = require('express');
const server     = express();
const bodyParser = require('body-parser');
const log        = require('loglevel');

// Set up configuration
const config = require('./config/config.js');

// Application-specific Code
const router = require('./router.js');
const response = require('./util/response.js');

// Entry point
async function app() {

	// Server Settings
	server.use(function(req, res, next) {
		res.header("Access-Control-Allow-Origin", "*");
		res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
		next();
	});
	server.use(bodyParser.json());
	server.use(bodyParser.urlencoded({ extended: false }));

	// Handle unexpected errors parsing the input query
	server.use(function(err, req, res, next) {
		if (err && err.stack) {
			console.error("Error parsing the input query:", err.stack);
			return response.send(
				res,
				response.FAILURE,
				{ 'error' : "Error parsing input data" }
			);
		}
	});

	// Setup Routes
	router(server);

	// Debug: Report all routes
	if (log.getLevel() <= 1) {
		log.debug(`Available Routes:`);
		server._router.stack.forEach(function(r){
			if (r.route && r.route.path) {
				log.debug(`\t${r.route.path} - ${Object.keys(r.route.methods)}`);
			}
		});
	}

	// Accept connections
	server.listen(
		config.SERVER_PORT,
		() => log.info(`Server listening on port ${config.SERVER_PORT}`)
	);

}

module.exports = app;
