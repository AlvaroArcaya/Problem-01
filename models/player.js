var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	Teams = mongoose.model('Teams');

var playerSchema = Schema({
	_id: Schema.Types.ObjectId,
	_externalId: String,
	name: String,
	position: String,
	team: {
		type: Schema.Types.ObjectId,
		ref: 'Teams'
	}
});

module.exports = mongoose.model('Players', playerSchema);