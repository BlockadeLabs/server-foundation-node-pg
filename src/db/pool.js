const config = require('../config/config.js');
const pg = require('pg');

const pool = new pg.Pool({
	host:     config.DB_HOST,
	user:     config.DB_USER,
	password: config.DB_PASS,
	port:     config.DB_PORT,
	database: config.DB_NAME,
	max:      config.DB_LIMIT
});

module.exports = pool;
