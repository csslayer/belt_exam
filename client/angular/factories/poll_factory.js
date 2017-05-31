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
		$http.delete('/polls/' + id).then(callback);
	}
	factory.updateVotes = function(poll_id, user_id, callback){
		$http.put('/polls/' + poll_id + '/votes', { user: user_id }).then(callback);
	}
	return factory;
})