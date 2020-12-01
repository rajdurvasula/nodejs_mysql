const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');

// application entry point
const http = require('http');
// setup express app
const app = express();
// log requests to console
app.use(logger('dev'));
// parse incoming request body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: false
}));

// Models
var models = require("./models");
// Sync DB
models.sequelize.sync()
	.then(function() {
		console.log("Database sync completed.");
	}).catch(function(err) {
		console.log(err, "Encountered error in Database sync call");
	});

// Require routes
require("./routes")(app);
// setup default catch-all route
// In this case, send welcome message
app.get('*', (req, res) => {
	res.status(200).send({
		message: "Welcome to myapp !"
	});
});

const port = parseInt(process.env.PORT, 10) || 8080;
app.set('port', port);
const server = http.createServer(app);
server.listen(port);
module.exports = app;
