'use strict';

<% if(hasCreate) { %>

/**
 * POST request
 * describe what does it do?
 *
 * @param {type} name - description
 */

exports.create = function(req, res){
    var db = req.app.services.db;
    var <%= model %> = db.<%= model %>;
    res.sendStatus(200);
};

<% } 
   if (hasFilter) { %>

/**
 * GET with filter=?
 *
 * @param {string} filter=[all|..]
 */

exports.filter = function(req, res){
    var db = req.app.services.db;
    var <%= model %> = db.<%= model %>;
    var filter = req.query.filter;
    res.sendStatus(200);
};

<% } 
   if (hasFetch) { %>

/**
 * GET with id 
 *
 * @param {string} id - id of object
 */

exports.fetch = function(req, res){
    var db = req.app.services.db;
    var <%= model %> = db.<%= model %>;
    var id = req.params.id;
    res.sendStatus(200);
};

<% } 
   if (hasPatch) { %>

/**
 * PATCH request
 *
 * @param {string} id - id of object
 */

exports.update = function(req, res){
    var db = req.app.services.db;
    var <%= model %> = db.<%= model %>;
    var id = req.params.id;
    res.sendStatus(200);
};

<% } 
   if (hasUpdate) { %>

/**
 * PUT request
 *
 * @param {string} id - id of object
 */

exports.update = function(req, res){
    var db = req.app.services.db;
    var <%= model %> = db.<%= model %>;
    var id = req.params.id;
    res.sendStatus(200);
};

<% } 
   if (hasDelete) { %>

/**
 * Delete request
 *
 * @param {string} id - id of object
 */

exports.delete = function(req, res){
    var db = req.app.services.db;
    var <%= model %> = db.<%= model %>;
    var id = req.params.id;
    res.sendStatus(200);
};

<% } %>
