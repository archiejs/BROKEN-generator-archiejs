'use strict';
var mongoose = require('mongoose');

var <%= schema %> = new mongoose.Schema({
    // createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    updatedOn: { type: Date, default: Date.now },
    createdOn: { type: Date, default: Date.now }
});

//Schema.index({ });

module.exports = mongoose.model('<%= schema %>', <%= schema %>);

