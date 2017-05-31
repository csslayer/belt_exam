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
	opt1: [{
		opt1: {type: String, require: true, minlength: 3},
		votes: {type: Number, default: 0}
		}],
	opt2: [{
		opt2: {type: String, require: true, minlength: 3},
		votes: {type: Number, default: 0}
		}],	
	opt3: [{
		opt3: {type: String, require: true, minlength: 3},
		votes: {type: Number, default: 0}
		}],
	opt4: [{
		opt4: {type: String, require: true, minlength: 3},
		votes: {type: Number, default: 0}
		}],
	votes: {
	  count: {
		type: Number,
		default: 0
	  },
	  users: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	  }]
	}
}, { timestamps: true })

PollSchema.pre('remove', function(callback){
	Comment.remove({poll: this._id}, callback)
})

mongoose.model('Poll', PollSchema);