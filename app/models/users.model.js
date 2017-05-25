'use strict';

var mongoose = require('mongoose');
mongoose.Promise = Promise;
var Schema = mongoose.Schema;

var userSchema = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true }
});



var User = mongoose.model('user', userSchema);

User.find({ "username": { $regex: ".*son.*" } }, function(err, users) {
    if (err) throw err;
    console.log(users);
})

module.exports = User;