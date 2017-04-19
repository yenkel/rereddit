app.controller('PostController', function($scope, postFactory) {


    $scope.addPost = function() {
        // console.log($scope.text);
        postFactory.addPost($scope.newPost)
            .then(function(post) {
                $scope.posts.push(post);
            })
            //this is new
            .catch(function(err) {
                alert(err.data.message)
            });
    }

    $scope.upvote = function(post) {
        postFactory.addUpvotesToPost(post);
    }

    $scope.downvote = function(post) {
        postFactory.addDownvoteToPost(post);
    }

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
