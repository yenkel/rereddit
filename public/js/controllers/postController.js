app.controller('PostController', function($scope, postFactory) {


    $scope.addPost = function() {
      // console.log($scope.text);
      postFactory.addPost($scope.text)
        .then(function(post) {
          $scope.posts.push(post);
        })
        //this is new
        .catch(function(err) {
          alert(err.data.message)
        });
    }

    $scope.upvote = function (post) {
      // alert("button working");
      // console.log(post);
    		postFactory.addUpvotesToPost(post);
    	}

      $scope.downvote = function (post) {
        // alert("button working");
        // console.log(post);
          postFactory.addDownvoteToPost(post);
        }

  //
  // $scope.upVote = function() {
  //       if(scope.vote.downValue === 1) {
  //         scope.vote.downValue = 0;
  //         scope.vote.downvotes--;
  //       }
  //
  //       if(scope.vote.upValue === 1) {
  //         scope.vote.upvotes++;
  //       } else {
  //         scope.vote.upvotes--;
  //       }
  //     };
  //
  //     $scope.downVote = function() {
  //           if(scope.vote.upValue === 1) {
  //             scope.vote.upValue = 0;
  //             scope.vote.upvotes--;
  //           }
  //
  //           if(scope.vote.downValue === 1) {
  //             scope.vote.downvotes++;
  //           } else {
  //             scope.vote.downvotes--;
  //           }
  //         };
  //
          $scope.removePost = function() {
          var self = this;
          postFactory.removePost(this.post)
            .then(function(response) {
              $scope.posts.splice(self.$index, 1);
            })
            //this is new
            .catch(function(err) {
              alert(err.data.message)
            });
        }
        postFactory.getPosts().then(function(posts) {
  $scope.posts = posts;
     });

});
