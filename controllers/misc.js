var config = require('../config'),
	parser = require('xml2js').parseString,
	request = require('request'),
	async = require('async'),
	mongoose = require('mongoose');

var Teams = mongoose.model('Teams'),
	Players = mongoose.model('Players');

module.exports.populate = function(req, res) {
	request(config.seed, function(err, result, body) {
		parser(body, function(err, json) {
			var json = json.sport.team,
				teams = new Array(),
				players = new Array();

			for (var i = 0; i < json.length; i++) {
				var team = {
					_externalId: json[i].$.id,
					name: json[i].$.name,
					country: json[i].$.country,
					active: json[i].$.active == 'true',
					players: new Array()
				};
				if ('player' in json[i]) {
					for (var j = 0; j < json[i].player.length; j++) {
						team.players.push(json[i].player[j].$.id);
						players.push({
							_externalId: json[i].player[j].$.id,
							name: json[i].player[j].name[0],
							position: json[i].player[j].position[0],
							team: json[i].$.id
						});
					}
				}
				teams.push(team);
			}

			Teams.collection.insert(teams, function(err, docsT) {
				if (err) res.send(500, new Error(err));
				var mapTeams = new Object();
				var mapPlayers = new Object();

				for (var i = 0; i < docsT.ops.length; i++) mapTeams[docsT.ops[i]._externalId] = docsT.ops[i];
				for (var i = 0; i < players.length; i++) players[i].team = mapTeams[players[i].team]._id;

				Players.collection.insert(players, function(err, docsP) {
					if (err) res.send(500, new Error(err));

					for (var i = 0; i < docsP.ops.length; i++) {
						if (!(docsP.ops[i].team in mapPlayers)) mapPlayers[docsP.ops[i].team] = new Array();
						mapPlayers[docsP.ops[i].team].push(docsP.ops[i]._id);
					}

					async.series([function(done) {
						Teams.find(function(err, teams) {
							async.each(teams, function(team, callback) {
								var aux = [],
									players = mapPlayers[team._id.toString()] || [];

								for (var i = 0; i < players.length; i++) aux.push(mongoose.Types.ObjectId(players[i]));

								team.players = aux;
								team.save(callback);
							}, done);
						});
					}], function(err) {
						res.status(200).send('OK');
					});
				});
			});
		});
	});
};