// Requirements
const log = require('loglevel');
const dotenv = require('dotenv');

// Set the default logging behavior
let DEFAULT_LOG_LEVEL;
if (process.env.LOG_LEVEL) {
	DEFAULT_LOG_LEVEL = process.env.LOG_LEVEL;
} else if (process.env.NODE_ENV === 'production') {
	DEFAULT_LOG_LEVEL = 'info';
} else {
	DEFAULT_LOG_LEVEL = 'trace';
}
log.setDefaultLevel(DEFAULT_LOG_LEVEL);

// Pull down the environment configuration
dotenv.config();

// Set the defaults
let SERVER_PORT = process.env.SERVER_PORT || 5000;
let DB_LIMIT    = process.env.DB_LIMIT    || 400;
let DB_HOST     = process.env.DB_HOST;
let DB_PORT     = process.env.DB_PORT;
let DB_NAME     = process.env.DB_NAME;
let DB_USER     = process.env.DB_USER;
let DB_PASS     = process.env.DB_PASS;

module.exports = {
	SERVER_PORT,
	DB_LIMIT,
	DB_HOST,
	DB_PORT,
	DB_NAME,
	DB_USER,
	DB_PASS
};
