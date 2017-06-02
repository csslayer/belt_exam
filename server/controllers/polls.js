var mongoose = require('mongoose');
var Poll = mongoose.model("Poll");
var User = mongoose.model('User');

module.exports = {
	index: function(req, res){
		Poll.find({}).populate({
		  path: 'user',
		  model: 'User'
		}).sort('-createdAt').exec(function(err, polls){
		  if(err){
			return res.json(err);
		  }
		  return res.json(polls);
		})
	},
	create: function(req, res){
		console.log(req.body)
		Poll.create(req.body, function(err, poll){
			if(err){
				return res.json(err);
			}
			//the .save way
			// User.findById(req.body.user, function(err, user){
			// 	if(err){
			// 		return res.json(err)
			// 	}
			// 	user.polls.push(poll._id)
			// 	user.save(function(err, user){
			// 		if(err){
			// 			return res.json(err)
			// 		}
			// 		return res.json(poll);
			// 	})	
			// })

			//the findbyidandupdate way
			User.findByIdAndUpdate(req.body.user, { $push : { polls: poll._id }}, function(err, user){
				if(err){
					return res.json(err);
				}
				return res.json(poll);
			})
		})
	},
	show: function(req, res){
		Poll.findById(req.params.id, function(err, poll){
			if(err){
				return res.json(err);
			}
			return res.json(poll);
		})
	},
	destroy: function(req, res){
		console.log(req.params.id)
		Poll.findByIdAndRemove(req.params.id, function(err, poll){
			if(err){
				return res.json(err)
			}
			return res.json(poll)
		})

		// Poll.findById(req.params.id, function(err, poll){
		// 	if(err){
		// 		return	res.json(err);
		// 	}
		// 	console.log(poll)
		// 	poll.remove(function(err, poll){
		// 		if(err){
		// 			return res.json(err);
		// 		}
		// 		console.log(poll)
		// 		return res.json(poll);
		// 	})
		// })
	},
	updateVotes: function(req, res){
		console.log('poll_id: ', req.params.id)
		console.log(req.body);
		Poll.findById(req.params.id, function(err, poll){
			if(err){
				return res.json(err);
			}
			//dot notation
			// poll.opt1
			// //square bracket notation
			// poll['opt1']

			console.log(poll[req.body.option])
			poll[req.body.option].votes++;
			poll.save(function(err, poll){
				if(err){
					return res.json(err);
				}
				return res.json(poll);
			})
		})
	}
};