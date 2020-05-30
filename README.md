# Server Foundation, built with Node.JS and PostgreSQL

Foundation for a backend server, database, session management & API.

## What this Foundation Contains

- Dockerfiles & Docker Compose for a consistent development environment
- Database is PostgreSQL
- Database pool instantiator, `database/Database.js`
- Router & routes follow a specific design pattern - see below
- Dotenv is used to pull environment variables from the `.env` file
	- Use `.env.sample` for all of the default values, which can be copied into `.env`
	- `.env.sample` is never used in the program
- .gitignore is provided with usual Node.JS ignores + `.env`
- `src/util` includes common utility files
- Mocha is included for testing, including default tests
- Nodemon is included for rapid development iteration

### Ways to start your app

`npm start` - Default, runs normally
`npm run start-dev` - Run using `nodemon`


### Testing

`npm run test` - Runs all the tests within the `test` folder.

A default test is provided, called `foundation.js`.


### How to add new routes

The router pulls all of the routes within the `src/routes` folder and uses the folder(s) + filename exactly, unless the `endpoint` variable is passed back.

Each individual file in `src/routes` is treated as a single API endpoint.

**Example:** If the folder structure & file is `src/routes/ping/ok.js`, then the API call will generate the endpoint at `ping/ok`. If the file returns an `endpoint` variable, it will override the default endpoint from the folder structure.


## Docker

For ease of use, Dockerfiles and a Docker Compose file are provided for portability.

### Setup

#### Build the Docker images
`docker-compose build`

### Start the Docker containers
`docker-compose up -d`

### Stop the Docker containers
`docker-compose down`


## Coding Standards

### Indentation

Each file uses tab-indentation prior to code. Tab size does not matter, this is a user-preference that does not affect anyone else's workflow or code readability.

### Alignment

When aligning lines of values together for readability, use spaces following the first non-tab character. This guarantees that alignment is preserved across users and code review services.

#### Example:

```
// Tabs for indentation, spaces for alignment
function send(res, code, data) {
	let payload = {
		'data'   : data || {},
		'status' : code || 500
	};

	res.send(payload);
	return res.end();
}
```


## Contributors

This server software was designed by our developers at Blockade Games, either directly or indirectly.

- Adam Gibbons
- Adrian Seeley
- Ben Heidorn
- Chris Chapman
- Rob Myers
- Troy Salem
