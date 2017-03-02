var mongoose = require('mongoose'),
	Teams = mongoose.model('Teams'),
	Players = mongoose.model('Players');

mongoose.Promise = global.Promise; //Native promises from js

module.exports.findAll = function(req, res) {
	Teams.find({})
		.exec()
		.then(function(teams) {
			res.json(teams);
		})
		.catch(function(err) {
			res.send(new Error(err));
		});
};

module.exports.findByTeamId = function(req, res) {
	Teams.findOne({
			_externalId: req.params.idTeam
		})
		.populate('players')
		.exec()
		.then(function(team) {
			res.json(team.players);
		})
		.catch(function(err) {
			res.send(new Error(err));
		});
};

module.exports.findByPosition = function(req, res) {
	Teams.find({
			active: true
		})
		.populate('players', null, {
			'position': {
				$in: new Array(req.params.position)
			}
		})
		.exec()
		.then(function(teams) {
			var filled = new Array(),
				players = new Array();

			for (var i = 0; i < teams.length; i++) {
				if (teams[i].players.length > 0) filled.push(teams[i]);
			}

			for (var i = 0; i < filled.length; i++) {
				for (var j = 0; j < filled[i].players.length; j++) {
					var aux = {
						_id: filled[i].players[j]._id,
						_externalId: filled[i].players[j]._externalId,
						name: filled[i].players[j].name,
						position: filled[i].players[j].position,
						team: {
							_id: filled[i]._id,
							_externalId: filled[i]._externalId,
							name: filled[i].name,
							country: filled[i].country,
							active: filled[i].active,
						}
					};

					players.push(aux);
				}
			}

			res.json(players);
		})
		.catch(function(err) {
			res.send(new Error(err))
		});
};