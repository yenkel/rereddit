app.controller('CommentController', function($scope, $stateParams, postFactory) {

  //todo - this needs to be a function that retrieves a single
  //post and it's comments from the server based on the post ID
  postFactory.getPost($stateParams.id)
    .then(function(results) {
      //todo
    })
    .catch(function(error) {
      //todo
    });

  $scope.addComment = function() {
    //todo
  }

  $scope.upvote = function() {
    //todo
  }

  $scope.downvote = function() {
    //todo
  }

  $scope.deleteComment = function() {
    //extension todo - only for admins
  }

});
