var app = angular.module('app', ['ngRoute', 'ngCookies']);

app.config(function($routeProvider){
	$routeProvider
	.when('/', {
		templateUrl: 'partials/index.html',
		controller: 'UsersController as UC'
	})
	.when('/dashboard', {
		templateUrl: 'partials/dashboard.html',
		controller: 'UsersController as UC'
	})
	.when('/create',{
		templateUrl: 'partials/create.html',
		controller: 'CreateController as CC'
	})
	.when('/poll/:id',{
		templateUrl: 'partials/show.html',
		controller: 'ShowController as SC'
	})
	.otherwise({ redirectTo: '/' });
})