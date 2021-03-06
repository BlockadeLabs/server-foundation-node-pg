// Required libraries
const log = require('loglevel');
const pg  = require('pg');

// Pull the config
const config = require('../config/config.js');

// Custom Client handler
const Client = require('./Client.js');

// Local Debug Switch
const debugClientReleases = false;

class Database {
	constructor() {
		this.pool = new pg.Pool({
			host:                    config.DB_HOST,
			database:                config.DB_NAME,
			user:                    config.DB_USER,
			password:                config.DB_PASS,
			port:                    config.DB_PORT,
			max:                     config.DB_LIMIT,
			idleTimeoutMillis:       config.DB_IDLE_TIMEOUT_MS,
			connectionTimeoutMillis: config.DB_CONN_TIMEOUT_MS
		});

		this.pool.on('error', (err, client) => {
			log.error('Unexpected error on idle pgpool client');
			log.error(new Error().stack);

			// Kill the application? If PM2 will restart it.
			//process.exit(-1);
		});
	}

	getPool() {
		return this.pool;
	}

	async connect(callback) {
		let creator = false; // Pass as false to avoid debug logging for unreleased clients.
		if (debugClientReleases) {
			// Note the creator stack
			let e = new Error();
			if (e && e.stack) {
				let frames = e.stack.split("\n");
				try {
					let possibleCreator = frames[frames.length-2].split(" ")
					creator = possibleCreator[possibleCreator.length-1];
				} catch (ex) {
					log.warn("Unable to set creator, database client creator is unknown");
					creator = "Unknown";
				}
			}
		}

		let connectCallback = null;
		if (callback && typeof callback === 'function') {
			connectCallback = (err, client, release) => {
				if (err) {
					log.error('Error acquiring client', err.stack);
					process.exit(1);
				}

				callback(new Client(client, release, creator), release);
			};

			return this.getPool().connect(connectCallback)
		} else {
			let client = await this.getPool().connect();

			if (!client) {
				log.error('Error acquiring client');
				process.exit(1);
			}

			return new Client(client, client.release, creator);
		}
	}
}

// Singleton Database class
if (!global.databaseInstance) {
	global.databaseInstance = new Database();
}

module.exports = global.databaseInstance;
