function send(res, code, data) {
	let payload = {
		'data'   : data || {},
		'status' : code || 500 // Default to error
	};

	res.send(payload);
	return res.end();
}

function sendDirect(res, data) {
	res.send(data);
	return res.end();
}

module.exports = {
	// Functions
	send,
	sendDirect,

	// Codes
	OK              : 200,
	FAILURE         : 400,
	UNAUTHORIZED    : 401,
	FORBIDDEN       : 403,
	NOT_FOUND       : 404,
	ERROR           : 500,
	NOT_IMPLEMENTED : 501,
	UNAVAILABLE     : 503,
	TIMEOUT         : 504
};
