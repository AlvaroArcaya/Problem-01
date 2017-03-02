var config = require('./config'),
	express = require('express'),
	app = express(),
	bodyParser = require("body-parser"),
	methodOverride = require("method-override"),
	mongoose = require('mongoose');

var TeamMdl = require('./models/team'),
	PlayerMdl = require('./models/player'),
	MiscCtrl = require('./controllers/misc'),
	TeamCtrl = require('./controllers/team');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(methodOverride());

var misc = express.Router();
misc.get('/populate', MiscCtrl.populate);

var teams = express.Router();
teams.get('/teams', TeamCtrl.findAll);
teams.get('/teams/:idTeam/players', TeamCtrl.findByTeamId);
teams.get('/teams/players/:position', TeamCtrl.findByPosition);

app.use('/misc', misc);
app.use('/api', teams);

mongoose.connect('mongodb://' + config.mongo.host + ':' + config.mongo.port + '/' + config.mongo.db, function(err, res) {
	if (err) {
		console.log('ERROR: connecting to Database. ' + err);
	}
	app.listen(3000, function() {
		console.log("Node server running on http://localhost:3000");
	});
});