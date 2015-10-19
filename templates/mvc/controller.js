'use strict';

/**
 * POST request
 * describle what does it do?
 *
 * @param {type} name - description
 */

exports.create = function(req, res){
    var db = req.app.services.db;
    var <% model %> = db.<%= model %>;
    res.sendStatus(200);
};

/**
 * GET with filter=?
 *
 * @param {string} filter=[all|..]
 */

exports.filter = function(req, res){
    var db = req.app.services.db;
    var <% model %> = db.<%= model %>;
    var filter = req.query.filter;
    res.sendStatus(200);
};

/**
 * GET with id 
 *
 * @param {string} id - id of object
 */

exports.get = function(req, res){
    var db = req.app.services.db;
    var <% model %> = db.<%= model %>;
    var id = req.params.id;
    res.sendStatus(200);
};

/**
 * PATCH request
 *
 * @param {string} id - id of object
 */

exports.update = function(req, res){
    var db = req.app.services.db;
    var <% model %> = db.<%= model %>;
    var id = req.params.id;
    res.sendStatus(200);
};

/**
 * Delete request
 *
 * @param {string} id - id of object
 */

exports.delete = function(req, res){
    var db = req.app.services.db;
    var <% model %> = db.<%= model %>;
    var id = req.params.id;
    res.sendStatus(200);
};

