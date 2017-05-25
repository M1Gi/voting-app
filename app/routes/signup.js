'use strict';

var express = require('express');
var router = express.Router();
var User = require('../models/users.model');

//Sign up form
router.get('/', function (req, res) {
    if (req.session && req.session.user) {
        res.status(401).send('You are already logged in');
    } else {
        res.render('signup', { authenticated: false, error: false });
    }
});

//Save new users to database if username is unique.
router.post('/', function (req, res) {

    User.findOne({ username: req.body.username }, function (err, user) {
        if (err) throw err;
        if (!user) {
            var newMember = new User({
                username: req.body.username,
                password: req.body.password
            }).save(function (err, user) {
                if (err) throw err;
                req.session.user = user; //Set cookies 
                res.redirect('/');
            });
        } else {
            res.render('signup', {
                error: true,
                errorMessage: 'This username already exists',
                authenticated: false
            });
        }
    });

});


module.exports = router;