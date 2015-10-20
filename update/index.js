'use strict';

var path = require('path'),
    util = require('util'),
    yeoman = require('yeoman-generator');

var templatedir = path.resolve(__dirname, '..', 'templates');

var Generator = module.exports = function Generator(args, opts, config){
    yeoman.generators.Base.apply(this, arguments);
    var cb = this.async();
};

util.inherits(Generator, yeoman.generators.Base);

Generator.prototype.fetchArchiejs = function fetchArchiejs(){
    var cb = this.async();
    this.remote('archiejs', 'archiejs', 'master', function(err, remote){
        var destPath = path.resolve(templatedir, 'archiejs');
        remote.bulkDirectory('.', destPath);
        cb();
    });
};

Generator.prototype.fetchBoilerplate = function fetchBoilerplate(){
    var cb = this.async();
    this.remote('archiejs', 'archiejs-boilerplate', 'master', function(err, remote){
        var destPath = path.resolve(templatedir, 'boiler');
        remote.bulkDirectory('.', destPath);
        cb();
    });
};

