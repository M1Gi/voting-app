'use strict';

var express = require('express');
var router = express.Router();
var Polls = require('../models/polls.model')

router.get('/', function (req, res) {
    if (req.session && req.session.user) {
        Polls.find({ createdBy: req.session.user.username || req.session.user }, function (err, poll) {
            if (err) throw err;
            if (poll.length === 0) {
                console.log(poll)
                res.redirect('/createpoll')
            } else {
                res.render('myPolls', {
                    authenticated: true,
                    myPolls: poll,
                    nopolls: false
                });
            }
        });
    } else {
        res.status(401).send('You need to be authorized to access this page!')
    }
});

module.exports = router;