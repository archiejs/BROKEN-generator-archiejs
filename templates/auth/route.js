'use strict';
var passport = require('passport');

exports = module.exports = function(app) {

    var userController = require('./../controllers/user.js');
    app.post('/<%= apiVersion %>/login', passport.authenticate('local'), userController.login);
    app.post('/<%= apiVersion %>/logout', userController.logout);
    app.post('/<%= apiVersion %>/register', userController.register);
    app.all('/<%= apiVersion %>/*', userController.checkAuth);

    // add your authenticated routes here
};
