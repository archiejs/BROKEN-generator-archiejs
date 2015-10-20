'use strict';

var path = require('path'),
    util = require('util'),
    yeoman = require('yeoman-generator'),
    _ = require('underscore.string');

var Generator = module.exports = function Generator(args, opts, config){
    yeoman.generators.Base.apply(this, arguments);
    this.argument('noun', { type: String, required: false });
    this.noun = this.noun;

    this.on('end', function(){
        // log manual steps for the user
    });
    
    this.sourceRoot(path.join(__dirname, '..', 'templates', 'mvc'));
};

util.inherits(Generator, yeoman.generators.Base);

Generator.prototype.askForNoun = function askForNoun() {
    var done = this.async();
    var prompts = [{
        type: 'string',
        name: 'noun',
        message: 'What is the common name for your MVC (model, controller, api's) ?',
        default: the.noun
    },{
        type: 'confirm',
        name: 'addModel',
        message: 'Create a model ?',
        default: true
    },{
        type: 'confirm',
        name: 'addController',
        message: 'Create a controller ?',
        default: true
    },{
        type: 'confirm',
        name: 'addRoute',
        message: 'Create route-apis (you will have to cut-copy them manually) ?',
        default: true
    }];

    this.prompt(prompts, function(props){
        this.noun = _.camelize(_.slugify(_.humanize(this.noun)));
        this.addModel = props.addModel;
        this.addController = props.addController;
        this.addRoute = props.addRoute;
        done();
    }.bind(this));
};

Generator.prototype.askForAPITypes = function askForAPITypes() {
    var done = this.async();
    done();
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

