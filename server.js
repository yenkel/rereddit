//package and module requirements
var express = require('express')
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('./models/passport');
var postsRoutes = require('./routes/postsRoutes');
var authRoutes = require('./routes/authRoutes');

var app = express();
mongoose.connect('mongodb://localhost/posts');

app.use(passport.initialize());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/auth', authRoutes);
app.use('/posts', postsRoutes);
app.use(express.static('public'));
app.use(express.static('node_modules'));

app.all('*', function(req, res) {
  res.sendFile(__dirname + "/public/index.html")
});


//start the server
app.listen('8000', function() {
  console.log("yo yo yo, on 8000 bro");
});
