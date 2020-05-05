const request = require('request');
const assert = require('assert');

const app = require('../src/server.js');

describe('Foundation', function() {

	before(function(done) {
		app().then(function() {
			done();
		});
	});

	it('Should connect and receive OK ping', function(done) {
		request('http://localhost:5000/api/ping/ok' , function(error, response, body) {
			assert(body && typeof body === 'string');

			body = JSON.parse(body);

			assert(body.hasOwnProperty('data') && body.hasOwnProperty('status'));
			assert(body.status === 200);

			assert(typeof body.data === 'object' && body.data.hasOwnProperty('msg'));
			assert(typeof body.data.msg === 'string');

			done();
		});

	});

});
