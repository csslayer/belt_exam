app.controller('ShowController', function(UserFactory, PollFactory, $cookies, $location, $routeParams){
	console.log('initializing ShowController...');
	
	var self = this;
	self.poll = {};
	self.new_poll_errors = [];
	self.newPoll = {};
	// self.newComment = {};
	// self.new_comment_errors = {};

	self.show = function(){
		console.log('here');
		console.log($routeParams);
		PollFactory.show($routeParams.id,function(res){
			self.poll = res.data;
			console.log(self.poll);
		})
	}

	self.updateVotes = function(option, poll_id){
		PollFactory.updateVotes(option, poll_id, self.show)
	}


})