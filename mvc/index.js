'use strict';

var path = require('path'),
    util = require('util'),
    yeoman = require('yeoman-generator'),
    _ = require('underscore.string');

var Generator = module.exports = function Generator(args, opts, config){
    yeoman.generators.Base.apply(this, arguments);
    this.argument('apiName', { type: String, required: true });
    this.apiCamel = _.camelize(_.slugify(_.humanize(this.apiName)));

    this.on('end', function(){
        // log manual steps for the user
    });
    
    this.sourceRoot(path.join(__dirname, '..', 'templates', 'mvc'));
};

util.inherits(Generator, yeoman.generators.Base);

Generator.prototype.askForModules = function askForModules() {
    var done = this.async();
    var prompts = [{
        type: 'checkbox',
        name: 'modules',
        message: 'Which modules would you like to include ?',
        choices: [{
            name: 'Model',
            value: 'model',
            checked: true
        },{
            name: 'Controller',
            value: 'controller',
            checked: true
        },{
            name: 'Route-APIs',
            value: 'routes',
            checked: true
        }]
    }];
    this.prompt(prompts, function(props){
        this.hasModel = (props['modules'].indexOf('model') !== -1);
        this.hasController = (props['modules'].indexOf('controller') !== -1);
        this.hasRoutes = (props['modules'].indexOf('routes') !== -1);
        done();
    }.bind(this));
};

Generator.prototype.askAPIVersion = function askForAPIVersion(){
    var done = this.async();

    if( !this.hasRoutes ) {
        return done();
    }

    var prompts = [{
        type: 'string',
        name: 'apiVersion',
        message: 'What is the API version (prefixes to API url, ex /v1/login) ?',
        default: 'v1',
        store: true
    }];
    this.prompt(prompts, function(props){
        this.apiVersion = props['apiVersion'];
        done();
    }.bind(this));
};

Generator.prototype.askForAPITypes = function askForAPITypes() {
    var done = this.async();
    
    if( !this.hasRoutes ) {
        return done();
    }
    
    var apiPrefix = '/';
    if (this.apiVersion) {
        apiPrefix += this.apiVersion + '/';
    }
    apiPrefix += this.apiName + '/';
    var apiAll = apiPrefix;
    var apiId = apiPrefix + ':id/';

    var prompts = [{
        type: 'checkbox',
        name: 'apis',
        message: 'Which commonly used API endpoints would you like to create ?',
        choices: [{
            name: 'POST '+apiAll,
            value: 'create',
            checked: true
        },{
            name: 'GET '+apiAll+'?filter=VALUE',
            value: 'filter',
            checked: true
        },{
            name: 'GET '+apiId,
            value: 'fetch',
            checked: true
        },{
            name: 'PATCH '+apiId,
            value: 'patch',
            checked: true
        },{
            name: 'PUT '+apiId,
            value: 'put',
            checked: true
        },{
            name: 'DELETE '+apiId,
            value: 'delete',
            checked: true
        }]
    }];

    this.prompt(prompts, function(props){
        this.apiCreate = (props['apis'].indexOf('create') !== -1);
        this.apiFilter = (props['apis'].indexOf('filter') !== -1);
        this.apiFetch = (props['apis'].indexOf('fetch') !== -1);
        this.apiPatch = (props['apis'].indexOf('patch') !== -1);
        this.apiPut = (props['apis'].indexOf('put') !== -1);
        this.apiDelete = (props['apis'].indexOf('delete') !== -2);
        done();
    }.bind(this));
};

Generator.prototype.model = function model(){
    var done = this.async();
    done();
};

Generator.prototype.controller = function controller(){
    var done = this.async();
    done();
};

Generator.prototype.route = function route(){
    var done = this.async();
    done();
};

