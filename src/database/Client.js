// Required libraries
const log = require('loglevel');

const MS_THRESHOLD = 1500;

class Client {
	constructor(client, release, creator) {
		this.client = client;

		if (creator) {
			this.creator = creator;
			this.releaseAlert = setTimeout( () => {
				log.debug(`\x1b[33m${this.creator} hasn't released their client after 5 seconds!\x1b[0m`)
			}, 5000);

			log.debug(`${this.creator} requested a client`);
		}

		this.release = () => {
			if (creator) {
				log.debug(`${this.creator} released the client.`)
				clearTimeout(this.releaseAlert);
			}
			release();
		}
	}

	getCaller(query) {
		let params = "";
		if (typeof query === 'object' && query.hasOwnProperty('values')) {
			params = JSON.stringify(query.values);
		}

		let e = new Error();
		if (e && e.stack) {
			let frames = e.stack.split("\n");
			if (frames && frames.length > 3) {
				let frame = frames[3];
				let lineNumber = frame.split(":")[1];
				let functionName = frame.split(" ")[5];
				return functionName + ":" + lineNumber + (params ? " <- " + params : "");
			}
		}

		return "";
	}

	async query(query, callback = null) {
		/**
		 * We need to measure execution time to isolate slow queries.
		 * If a callback is provided, then the query callback will be called by pg.Client.query
		 * If a callback is not provided, then a promise is returned by pg.Client.query
		 * So we have two paths for measuring execution:
		***/
		const execStartTime = process.hrtime();
		const caller = this.getCaller(query);

		let queryCallback = null;
		if (callback && typeof callback === 'function') {
			queryCallback = (err, results) => {
				if (err) {
					this.release();
					log.error('Error with query', err.stack);
					process.exit(1);
				}

				// Execution time by callback
				const execDiffTime = process.hrtime(execStartTime);
				let seconds = execDiffTime[0];
				let milliseconds = execDiffTime[1] / 1000000;
				if ((seconds * 1000 + milliseconds) > MS_THRESHOLD) {
					log.warn('Execution time (async): %ds %dms %s', seconds, milliseconds, caller);
				} else {
					log.debug('Execution time (async): %ds %dms %s', seconds, milliseconds, caller);
				}

				callback(results);
			};
		}

		// Path 1 - Execution time via the callback
		if (queryCallback !== null) {
			return this.client.query(query, queryCallback);
		}

		// Path 2 - Handling the promise
		return new Promise(async resolve => {
			let results = await this.client.query(query);

			// Execution time by promise
			const execDiffTime = process.hrtime(execStartTime);
			let seconds = execDiffTime[0];
			let milliseconds = execDiffTime[1] / 1000000;
			if ((seconds * 1000 + milliseconds) > MS_THRESHOLD) {
				log.warn('Execution time (promise): %ds %dms %s', seconds, milliseconds, caller);
			} else {
				log.debug('Execution time (promise): %ds %dms %s', seconds, milliseconds, caller);
			}

			// Pass back the results
			resolve(results);
		});
	}

	async release() {
		this.release();
	}
}

module.exports = Client;
