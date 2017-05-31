var mongoose = require('mongoose');
var Poll = mongoose.model("Poll");
var User = mongoose.model('User');

module.exports = {
	index: function(req, res){
		Poll.find({}).populate({
		  path: 'user',
		  model: 'User'
		}).populate({
			path: 'comments',
			model: 'Comment',
			options: { sort: { createdAt: 1}},
			populate: {
			  path: 'user',
			  model: 'User'
			}
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
			User.findById(req.body.user, function(err, user){
				if(err){
					return res.json(err)
				}
				user.polls.push(poll._id)
				user.save(function(err, user){
					if(err){
						return res.json(err)
					}
					return res.json(poll);
				})	
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
		Poll.findById(req.params.id, function(err, poll){
			if(err){
				return	res.json(err);
			}
			poll.remove(function(err, poll){
				if(err){
					return res.json(err);
				}
				return res.json(poll);
			})
		})
	},
	updateVotes: function(req, res){
	  Poll.findByIdAndUpdate(req.params.id, { $inc: { "votes.count": 1 }, $push: { "votes.users": req.body.user}}, { new: true }, function(err, poll){
		if(err){
		  return res.json(err);
		}
		  return res.json(poll);
	  })
	}
};