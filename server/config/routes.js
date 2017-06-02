var Users = require('../controllers/users');
var Polls = require('../controllers/polls');

module.exports = function(app){
	app.get('/users', Users.index);
	app.post('/users', Users.create);
	app.post('/sessions', Users.login);
	app.get('/polls', Polls.index);
	app.post('/polls', Polls.create);
	app.get('/polls/:id', Polls.show);
	app.delete('/users/:id', Users.destroy);
	app.delete('/polls/:id', Polls.destroy);
	app.get('/users/:id', Users.show);
	app.put('/polls/:id/votes', Polls.updateVotes);
}