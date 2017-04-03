var app = angular.module('rereddit', ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider, $locationProvider) {

  $locationProvider.html5Mode(true);

  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: '/templates/home.html',
      controller: 'PostController'
    })
    //state for a single post
    .state('post', {
      url: '/posts/:id',
      templateUrl: '/templates/posts.html',
      controller: 'CommentController'
    })
    .state('login', {
      url: '/login',
      templateUrl: '/templates/login.html',
      controller: 'AuthController'
    });

  $urlRouterProvider.otherwise('home');

});
