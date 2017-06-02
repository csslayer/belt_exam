app.controller('PollsController', function(UserFactory, PollFactory){
	console.log('initializing PollsController...');
	
	var self = this;
	self.polls = [];
	self.new_poll_errors = [];
	self.newPoll = {};


	self.index = function(){
		PollFactory.index(function(res){
			self.polls = res.data;
		})
	}


	

})