'use strict';
var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

var userSchema = new mongoose.Schema({
    username: { type: String, unique: true },
    password: String,
    email: { type: String, unique: true },
    fullname: String,
    
    //isActive: { type: Boolean, default: false },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    updatedOn: { type: Date, default: Date.now },
    createdOn: { type: Date, default: Date.now }
});

//Schema.index({ });

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);
