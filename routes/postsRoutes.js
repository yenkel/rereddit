var express = require('express');
var router = express.Router();
var Post = require("../models/postModel");
var Comment = require("../models/commentModel");
var expressJWT = require('express-jwt');
var ensureAuthenticated = expressJWT({ secret: 'thisIsTopSecret' });

//as we are using modular route handlers we use router.param an not app.param
router.param('postid', function(req, res, next, id) {
    Post.findById(id, function(err, post) {
        if (err) {
            return next(err);
        } else if (!post) {
            return next(new Error('Post does not exist'));
        } else {
            req.post = post; //put the post on the request object for the next function in line to use
            return next();
        }
    });
});


router.get('/', function(req, res, next) {
    Post.find(function(error, posts) {
        if (error) {
            console.error(error)
            return next(error);
        } else {
            res.send(posts);
        }
    });
});

router.get('/:id', function(req, res, next) {
    Post.findById(req.params.id, function(error, post) {
        if (error) {
            console.error(error)
            return next(error);
        } else {
            res.send(post);
        }
    });
});

router.get('/:id/comments', ensureAuthenticated, function(req, res, next) {
    Post.findById(req.params.id, function(error, post) {
        if (error) {
            console.error(error)
            return next(error);
        } else {
            res.send(post);
        }
    });
});

router.put('/:id', ensureAuthenticated, function(req, res, next) {
    Post.findByIdAndUpdate(req.params.id, { $inc: { upvotes: req.body.vote } }, function(error, post) {
        if (error) {
            console.error(error)
            return next(error);
        } else {
            res.send(post);
        }
    });
});

router.delete('/:id', ensureAuthenticated, function(req, res, next) {
    Post.findByIdAndRemove(req.params.id, function(err, foundPost) {
        if (err) {
            console.error(err)
            return next(err);
        } else {
            res.send("Post Deleted");
        }
    });
});

router.post('/:id/comments', ensureAuthenticated, function(req, res, next) {
    Post.findById(req.params.id, function(err, foundPost) {
        if (err) {
            console.error(err);
            return next(err);
        } else if (!foundPost) {
            return res.send("Error! No post found with that ID");
        } else {
            foundPost.comments.push(req.body)
            foundPost.save(function(err, updatedPost) {
                if (err) {
                    return next(err);
                } else {
                    res.send(updatedPost);
                }
            });
        }
    });
});

router.put('/:postid2/comments/:commentid', ensureAuthenticated, function(req, res, next) {
    console.log("server yay")
    Post.findById(req.params.postid2, function(err, foundPost) {
        console.log(foundPost);
        for (var i = 0; i < foundPost.comments.length; i++) {
            if (foundPost.comments[i]._id === req.params.commentid) {
                if (req.body.vote) {
                    foundPost.comments.upvotes++;
                } else {
                    foundPost.comments.upvotes--;
                }
            }
        }
        foundPost.save();
        return res.send(foundPost);
    })
});

router.delete('/:postid/comments/:commentid', ensureAuthenticated, function(req, res, next) {
    Post.findById(req.params.postid, function(err, foundPost) {
        if (err) {
            return next(err);
        } else if (!foundPost) {
            return res.send("Error! No post found with that ID");
        } else {
            var commentToDelete = foundPost.comments.id(req.params.commentid)
            if (commentToDelete) {
                commentToDelete.remove()
                foundPost.save(function(err, updatedPost) {
                    if (err) {
                        return next(err);
                    } else {
                        res.send(updatedPost);
                    }
                });
            } else {
                return res.send("Error! No comment found with that ID");
            }
        }
    });
});


router.post('/', ensureAuthenticated, function(req, res, next) {
    console.log(req.body);
    // var newPost = new Post(req.body);

    Post.create(req.body, function(err, post) {
        if (err) {
            console.error(err)
            return next(err);
        } else {
            res.json(post);
        }
    });
});



module.exports = router;
