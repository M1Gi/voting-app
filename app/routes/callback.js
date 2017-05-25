'use strict';

var express = require('express');
var router = express.Router();
var request = require('request');


router.get('/', function (req, res) {

    sendAuth(req.query.code, req.query.state);


    function sendToGit(token) {
        
        request.get('https://api.github.com/user?access_token=' + token, {
            headers: {
                'User-Agent': 'request'
            }
        }, function (err, res, body) {
            if (err) throw err;
            var data = JSON.parse(body);
            req.session.user = data.login
            console.log(req.session.user)
            res.redirect('/')

        });
    }


    function sendAuth(code, state) {

        var authData = {
            client_id: process.env.client_id,
            client_secret: process.env.client_secret,
            code: code,
            redirect_uri: 'https://voting-app-a5p00k3y.c9users.io/auth/github/callback',
            state: state
        }

        req.post({
            url: 'https://github.com/login/oauth/access_token',
            form: authData
        },
            function (err, res, body) {
                if (err) throw err;
                token = body.substring(body.indexOf('=') + 1, body.indexOf('&'));
                sendToGit(token);
            });
    }

});

module.exports = router;