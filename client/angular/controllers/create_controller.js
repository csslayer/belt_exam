app.controller('CreateController', function(UserFactory, PollFactory, $location){
	console.log('initializing CreateController...');
	
	var self = this;
	self.polls = [];
	self.new_poll_errors = [];
	self.newPoll = {};


	self.index = function(){
		// console.log('invoking CC.index()');
		PollFactory.index(function(res){
			self.polls = res.data;
			console.log(self.polls);
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
				console.log(res);
				self.newPoll = {};
				if(res.data.errors){
					for(key in res.data.errors){
						var error = res.data.errors[key];
						self.new_poll_errors.push(error.message);
					}
				} else {
					$location.url('/dashboard');
				}
			})
		})
	}

	self.destroy = function(poll_id){
		console.log(poll_id)
		PollFactory.destroy(poll_id, self.index);
	}



})