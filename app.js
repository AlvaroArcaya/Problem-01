var config = require('./config'),
	express = require('express'),
	app = express(),
	bodyParser = require("body-parser"),
	methodOverride = require("method-override"),
	parser = require('xml2js').parseString,
	mongoose = require('mongoose'),
	request = require('request'),
	PlayerCtrl = require('./controllers/players'),
	TeamCtrl = require('./controllers/teams');

app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(bodyParser.json());
app.use(methodOverride());

var router = express.Router();

router.get('populate', function(req, res) {
	request(config.seed, function(err, res, body) {
		parser(body, function(err, res) {
			var teams = res.sport.team;

			for (var i = 0; i < teams.length; i++) {
				var team = {
					_externalId: teams[i].id,
					active: teams[i].active
				}
			}
		});
	});
});

var players = express.Router();
var teams = express.Router();

app.use('/api', players);
app.use('/api', teams);

mongoose.connect('mongodb://' + config.mongo.host + ':' + config.mongo.port + '/' + config.mongo.db, function(err, res) {
	if (err) {
		console.log('ERROR: connecting to Database. ' + err);
	}
	app.listen(3000, function() {
		console.log("Node server running on http://localhost:3000");
	});
});