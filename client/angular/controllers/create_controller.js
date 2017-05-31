app.controller('CreateController', function(UserFactory, PollFactory){
	console.log('initializing PollsController...');
	
	var self = this;
	self.polls = [];
	self.new_poll_errors = [];
	self.newPoll = {};
	// self.newComment = {};
	// self.new_comment_errors = {};

	self.index = function(){
		PollFactory.index(function(res){
			self.polls = res.data;
		})
	}

	self.updateVotes = function(poll_id, user_id){
		PollFactory.updateVotes(poll_id, user_id, self.index);
	}

	self.create = function(newPoll){
		self.new_poll_errors = [];
		UserFactory.session(function(user){
			newPoll.user = user._id;
			PollFactory.create(newPoll, function(res){
				self.newPoll = {};
				if(res.data.errors){
					for(key in res.data.errors){
						var error = res.data.errors[key];
						self.new_poll_errors.push(error.poll)
					}
				} else {
					self.index();
				}
			})
		})
	}


})