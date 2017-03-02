var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var teamSchema = Schema({
	_id: Schema.Types.ObjectId,
	_externalId: String,
	name: String,
	active: Boolean,
	players: [{
		type: Schema.Types.ObjectId,
		ref: 'Players'
	}]
});

module.exports = mongoose.model('Teams', teamSchema);