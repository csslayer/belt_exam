var mongoose = require('mongoose');

// var Comment = mongoose.model('Comment');

var PollSchema = new mongoose.Schema({
	user: {
	  type: mongoose.Schema.Types.ObjectId,
	  ref: 'User'
	},
	poll: {
	  type: String,
	  required: true, minlength: 8,
	},
	opt1: {
		option: {type: String, required: true, minlength: 3},
		votes: {type: Number, default: 0}
	},
	opt2: {
		option: {type: String, required: true, minlength: 3},
		votes: {type: Number, default: 0}
	},	
	opt3: {
		option: {type: String, required: true, minlength: 3},
		votes: {type: Number, default: 0}
	},
	opt4: {
		option: {type: String, required: true, minlength: 3},
		votes: {type: Number, default: 0}
	}
}, { timestamps: true })

PollSchema.pre('remove', function(callback){
	Comment.remove({poll: this._id}, callback)
})

mongoose.model('Poll', PollSchema);