# Server Foundation, built with Node.JS and PostgreSQL

Foundation for a backend server, database, session management & API.

## Docker

For ease of use, Dockerfiles and a Docker Compose file are provided for portability.

### Before you start: Docker Configuration

Make sure that your Docker engine is configured to use at least 2 CPU cores and 4 GB of memory. Running multiple node instances, postgres, and loom uses up a considerable amount of memory.

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
