'use strict';

var path = require('path'),
    util = require('util'),
    yeoman = require('yeoman-generator');

var log = require('./log');

var Generator = module.exports = function Generator(args, opts, config){
    yeoman.generators.Base.apply(this, arguments);
    this.argument('appname', { type: String, required: false });
    this.appname = this.appname || path.basename(process.cwd());
    this.appname = this._.camelize(this._.slugify(this._.humanize(this.appname)));

    this.on('end', function(){
    });

    this.pkg = require('../package.json');
    this.sourceRoot(path.join(__dirname, '../templates/'));
};

util.inherits(Generator, yeoman.generators.Base);

Generator.prototype.askForAuth = function askForAuth() {
    var done = this.async();
    var prompts = [{
        type: 'confirm',
        name: 'addAuth',
        message: 'Would you like to use default Authentication module (passport + local strategy)?',
        default: true
    }];

    this.prompt(prompts, function(props){
        this.addAuth = props.addAuth;
        done();
    }.bind(this));
};

Generator.prototype.boilerplate = function boilerplate() {
    var done = this.async();
    var srcfolder = path.join(this.sourceRoot(), 'boiler');
    this.copy( srcfolder , '.' );
    done();
};

Generator.prototype.archiejsCore = function archiejsCore() {
    var done = this.async();
    var srcfolder = path.join(this.sourceRoot(), 'archiejs');
    var destfolder = path.join('configs', 'archiejs');
    this.copy(srcfolder, destfolder);
    done();
};

Generator.prototype.userAuth = function userAuth() {
    var done = this.async();
    var srcfolder = path.join(this.sourceRoot(), 'auth');

    // copy user auth model
    this.copy(path.join(srcfolder, 'model.js'), path.join('models', 'user.js'));

    // copy user auth contoller
    this.copy(path.join(srcfolder, 'controller.js'), path.join('controller', 'user.js'));

    // Add to YoArchie-Todo.txt
    // 1. Prompt user what to add to routes
    // 2. Prompt user what to add to init section

    var todo = this.read(path.join(srcfolder, 'logs-todo.txt'));
    this.write('logs-todo.txt', todo);
    this.log(todo);

    done();
};

Generator.prototype.setupEnv = function packageFile() {
    var done = this.async();
    var srcfolder = path.join(this.sourceRoot(), 'env');

    // copy .gitignore, todo.txt
    this.copy(path.join(srcfolder, 'gitignore'), '.gitignore');
    this.copy(path.join(srcfolder, 'logs-todo.txt'), 'logs-todo.txt');
    done();
};

Generator.prototype.npmInstall = function npmInstall() {
    var done = this.async();
};


