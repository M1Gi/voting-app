'use strict';

var express = require('express');
var router = express.Router();
var User = require('../models/users.model');


router.get('/', function (req, res) {
    if (req.session && req.session.user) {
        User.findOne({ username: req.session.user.username }, function (err, user) {
            if (err) throw err;
            res.locals.user = user || req.session.user;
            res.render('index', { authenticated: true });
        });
    } else {
        res.locals.authenticated = false;
        res.render('index');
    }

});



module.exports = router;