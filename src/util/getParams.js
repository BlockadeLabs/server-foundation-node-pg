function getParams(req) {
	if (req.body && typeof req.body === 'object' && Object.keys(req.body).length) {
		return req.body;
	} else if (req.query && typeof req.query === 'object' && Object.keys(req.query).length) {
		return req.query;
	} else if (req.params && typeof req.params === 'object' && Object.keys(req.params).length) {
		return req.params;
	}

	return {};
}

module.exports = getParams;
