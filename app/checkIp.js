'use strict';

var Poll = require('./models/polls.model');

function checkIp(pollId, ipAddress) {
    return new Promise(function (resolve, reject) {
        
        Poll.findById(pollId, function (err, poll) {
            if (err) throw err;
            var ipIsNew = poll.votedIp.every(function(ip) { return ip !== ipAddress });
            if (ipIsNew) {
                return resolve(true);
            } else {
                return resolve(false);
            }
        });
    });

}

module.exports = checkIp;