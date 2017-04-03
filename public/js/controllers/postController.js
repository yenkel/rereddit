app.controller('PostController', function($scope, postFactory) {

  postFactory.getPosts()
    .then(function(results) {
      //todo
    })
    .catch(function(error) {
      //todo
    });

  $scope.addPost = function() {
    //todo
  }

  $scope.upvote = function() {
    //todo
  }

  $scope.downvote = function() {
    //todo
  }

  $scope.deletePost = function() {
    //extension todo - only for admins
  }


});
