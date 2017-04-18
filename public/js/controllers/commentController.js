app.controller('CommentController', function($scope, $stateParams, postFactory) {

  $scope.addComment = function() {
    postFactory.addComment($stateParams.id, $scope.newReview)
    .then(function(post) {
      $scope.post = post;
    })
  }

  $scope.upvote = function() {
    if(scope.vote.downValue === 1) {
          scope.vote.downValue = 0;
          scope.vote.downvotes--;
        }

        if(scope.vote.upValue === 1) {
          scope.vote.upvotes++;
        } else {
          scope.vote.upvotes--;
        }
      };

  $scope.downvote = function() {
    if(scope.vote.upValue === 1) {
           scope.vote.upValue = 0;
           scope.vote.upvotes--;
         }

         if(scope.vote.downValue === 1) {
           scope.vote.downvotes++;
         } else {
           scope.vote.downvotes--;
         }
       };

  $scope.deleteComment = function() {
    postFactory.deleteComment($stateParams.id, this.review._id)
      .then(function(post) {
        $scope.post = post;
  })
}







});
