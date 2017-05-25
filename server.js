'use strict';

require('dotenv').config({
  silent: true
});
var express = require('express');
var mongoose = require('mongoose');
mongoose.Promise = Promise;
var bodyParser = require('body-parser');
var session = require('client-sessions');
var home = require('./app/routes/home');
var polls = require('./app/routes/polls');
var myPolls = require('./app/routes/mypolls');
var createPoll = require('./app/routes/createpoll');
var signUp = require('./app/routes/signup');
var authCallack = require('./app/routes/callback');
var login = require('./app/routes/login');
var logout = require('./app/routes/logout');
var app = express();

var db = process.env.MONGODB_URI || 'mongodb://localhost/voting';
mongoose.connect(db);

//View engine
app.set('view engine', 'ejs');

//Local Authentication.
app.use(express.static('public'));
app.use(session({
  cookieName: 'session',
  secret: process.env.secret,
  duration: 30 * 60 * 1000,
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Routes
app.use('/', home);
app.use('/polls', polls);
app.use('/createpoll', createPoll);
app.use('/mypolls',myPolls);
app.use('/signup', signUp);
app.use('/callback',authCallack);
app.use('/login', login);
app.use('/logout', logout);

/* Access the PORT property in the object containing the user environment by default OR 
use 8080 as the port if default not available. Store result in 'port' variable. */
var port = process.env.PORT || 8080;
// Listen for connections on the specfied port and run a callback
app.listen(port, function() {
    // Print message describing what port Node.js is listening on
    console.log("Node.js listening on " + port);
});

module.exports = app; 