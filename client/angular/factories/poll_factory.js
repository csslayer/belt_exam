app.factory('PollFactory', function($http){
	var factory = {};
	var polls = [];

	factory.create = function(newPoll, callback){
		$http.post('/polls', newPoll).then(callback);
	}
	factory.index = function(callback){
		$http.get('/polls').then(callback);
	}
	factory.destroy = function(id, callback){
		console.log(id)
		$http.delete('/polls/' + id).then(callback);
	}
	factory.updateVotes = function(option_tag, poll_id, callback){
		$http.put('/polls/' + poll_id + '/votes', { option: option_tag }).then(callback);
	}
	factory.show = function(poll_id, callback){
		$http.get('/polls/' + poll_id).then(callback);
	}
	return factory;
})