app.factory('postFactory', function($http,$rootScope) {

  var postFactory = {};

  postFactory.getPosts = function() {
    return $http.get('/posts')
      .then(function(response) {
        return response.data
      }, function(err) {
        console.error(err)
      });
  };

  postFactory.addPost = function(newPost) {
    console.log(newPost);
  return $http.post('/posts',{author:$rootScope.currentUser, text: newPost, upvotes: 0})
    .then(function(response) {
      return response.data
    });
};

postFactory.removePost = function(post) {
  return $http.delete('/posts/' + post._id)
    .then(function(response) {
      return response.data;
    });
};

postFactory.addComment = function(id, newComment) {
    return $http.post('/posts/' + id + '/comments', newComment)
      .then(function(response) {
        return response.data
      }, function(err) {
        console.error(err)
      });
  };

  postFactory.deleteComment = function(postId, commentId) {
    return $http.delete('/posts/' + postId + '/comments/' + commentId)
      .then(function(response) {
        return response.data
      });
  };

  postFactory.addUpvotesToPost = function (post) {
   console.log(post);
     post.upvotes++;
     console.log(post.upvotes);
    //  var total = 0;
    //  for (var i =0; i < post.upvotes.length ; i++) {
    //    total += post.upvotes[i];
    //  }
    // //  post.averageUpvotes = total / post.upvotes.length;

   }

  //  postSchema.sortByUpvote = function () {
  //    allPosts.sort(function(a, b) {
  //    return a.averageUpvotes - b.averageUpvotes;
  //    });
  //  }

  postFactory.addDownvotesToPost = function (post) {
   console.log(post);
     post.downvotes++;
     console.log(post.downvotes);
}

  return postFactory;
});
