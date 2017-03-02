var mongoose = require('mongoose'),
	Teams = mongoose.model('Teams'),
	Players = mongoose.model('Players');

mongoose.Promise = global.Promise;

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
	console.log(req.params.idTeam);
	Teams.findOne({
			_externalId: req.params.idTeam
		})
		.populate('players')
		.exec()
		.then(function(team) {
			console.log(team);
			res.json(team.players);
		})
		.catch(function(err) {
			res.send(new Error(err));
		});
};

// "third": "A traves de promesas (Nativas de JavaScript) generar la siguiente secuencia en la ruta “/api/teams/players/:position” (“equipos activos” -> “jugadores de los equipos obtenidos” -> “jugadores en la posicion pasada por la ruta con la información del equipo al que pertenece en el atributo team” en formato json)."
module.exports.findByPosition = function(req, res) {
	
};