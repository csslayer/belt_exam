app.controller('ShowController', function(UserFactory, PollFactory, $cookies, $location, $routeParams){
	console.log('initializing PollsController...');
	
	var self = this;
	self.polls = [];
	self.new_poll_errors = [];
	self.newPoll = {};
	// self.newComment = {};
	// self.new_comment_errors = {};

	self.show = function(){
		PollFactory.index(function(res){
			self.polls = res.data;
		})
	}

	self.updateVotes = function(poll_id, user_id){
		PollFactory.updateVotes(poll_id, user_id, self.index);
	}


})