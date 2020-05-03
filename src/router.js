const log  = require('loglevel');
const path = require('path');
const fs   = require('fs');

function router(server) {
	let routes = fs.readdirSync(path.join(__dirname, '/routes/'));

	for (let index in routes) {
		const route = routes[index];

		// Only include .js files
		if (route.indexOf('.js') !== route.length - 3) {
			log.error("Invalid route file within routes folder:", route);
			continue;
		}

		// Request the file
		const endpoint = route.replace('.js', '');
		const methods = require(path.join(__dirname, '/routes/' + route));

		if (methods.hasOwnProperty('get')) {
			server.get('/api/' + endpoint, methods.get);
		}

		if (methods.hasOwnProperty('post')) {
			server.post('/api/' + endpoint, methods.post);
		}
	}
}

module.exports = router;
