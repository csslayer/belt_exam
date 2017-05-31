var Users = require('../controllers/users');
var Polls = require('../controllers/polls');
// var Comments = require('../controllers/comments');

module.exports = function(app){
	app.get('/users', Users.index);
	app.post('/users', Users.create);
	app.post('/sessions', Users.login);
	app.get('/polls', Polls.index);
	app.post('/polls', Polls.create);
	// app.get('/comments', Comments.index);
	// app.post('/comments', Comments.create);

	// app.get('/comments/:id', Comments.show);
	app.get('/polls/:id', Polls.show);
	app.delete('/users/:id', Users.destroy);
	app.delete('/polls/:id', Polls.destroy);
	// app.delete('/polls/:id', Comments.destroy);
	app.get('/users/:id', Users.show);
	app.put('/polls/:id/likes', Polls.updateVotes);
}