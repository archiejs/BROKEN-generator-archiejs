'use strict';

var path = require('path'),
    util = require('util'),
    yeoman = require('yeoman-generator'),
    _ = require('underscore.string'),
    ejs = require('ejs');

var Generator = module.exports = function Generator(args, opts, config){
    yeoman.generators.Base.apply(this, arguments);
    this.argument('mvcName', { type: String, required: true });
    this.mvcName = _.camelize(_.slugify(_.humanize(this.mvcName)));
    this.mvcCaps = _.capitalize(this.mvcName);
    this.filename = this.mvcName + '.js';
    this.todoMsgs = [];

    this.on('end', function(){
        var todoStr = '';
        this.todoMsgs.forEach(function(msg){
            todoStr += '\n\n' + msg;
        });
        this.log("\n\nYou need to do these things by yourself.");
        this.log("========================================");
        this.log(todoStr);

        //var logsFilepath = path.join(this.destinationRoot(), 'logs-todo.txt');
        //this.fs.appendFile(logsFilepath, todoStr);
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
    apiPrefix += this.mvcName + '/';
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
            value: 'update',
            checked: true
        },{
            name: 'DELETE '+apiId,
            value: 'delete',
            checked: true
        }]
    }];

    this.prompt(prompts, function(props){
        this.hasCreate = (props['apis'].indexOf('create') !== -1);
        this.hasFilter = (props['apis'].indexOf('filter') !== -1);
        this.hasFetch = (props['apis'].indexOf('fetch') !== -1);
        this.hasPatch = (props['apis'].indexOf('patch') !== -1);
        this.hasUpdate = (props['apis'].indexOf('update') !== -1);
        this.hasDelete = (props['apis'].indexOf('delete') !== -1);
        done();
    }.bind(this));
};

Generator.prototype.model = function model(){
    var done = this.async();
    if( !this.hasModel){
        return done();
    }
    var data = {
        "schema": this.mvcCaps
    };
    this.template( 'model.js', path.join('models', this.filename), data);
    done();
};

Generator.prototype.controller = function controller(){
    var done = this.async();
    if( !this.hasController){
        return done();
    }
    var data = {
        "model": this.mvcCaps,
        "hasCreate": this.hasCreate,
        "hasFilter": this.hasFilter,
        "hasFetch": this.hasFetch,
        "hasPatch": this.hasPatch,
        "hasUpdate": this.hasUpdate,
        "hasDelete": this.hasDelete
    };
    this.template( 'controller.js', path.join('controllers', this.filename), data);
    done();
};

Generator.prototype.route = function route(){
    var done = this.async();
    if( !this.hasRoutes){
        return done();
    }

    var apiPrefix = '/';
    if (this.apiVersion) {
        apiPrefix += this.apiVersion + '/';
    }
    apiPrefix += this.mvcName + '/';

    var data = {
        "apiRoute": apiPrefix,
        "controller": this.mvcName,
        "hasCreate": this.hasCreate,
        "hasFilter": this.hasFilter,
        "hasFetch": this.hasFetch,
        "hasPatch": this.hasPatch,
        "hasUpdate": this.hasUpdate,
        "hasDelete": this.hasDelete
    };

    var routeTplfile = path.join(this.sourceRoot(), 'route.js');
    var routeTpl = this.fs.read(routeTplfile);
    var todoMsg = ejs.render(routeTpl, data);
    this.todoMsgs.push('-> You need to add this code your routes file.');
    this.todoMsgs.push(todoMsg);
    done();
};

