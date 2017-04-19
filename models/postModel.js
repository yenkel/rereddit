var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var comment = require('./commentModel');


var postSchema = new Schema({
    text: String,
    author: String,
    upvotes: Number,
    comments: [comment.schema]
});

var post = mongoose.model("post", postSchema);

module.exports = post;
