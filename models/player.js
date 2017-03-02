var mongoose = require('mongoose'),
	Schema = mongoose.Schema

var playerSchema = Schema({
	_id: Schema.Types.ObjectId,
	_externalId: String,
	name: String,
	position: Boolean,
	team: [{
		type: Schema.Types.ObjectId,
		ref: 'Team'
	}]
});

module.exports = mongoose.model('Player', playerSchema);