'use strict';

var path = require('path'),
    util = require('util'),
    yeoman = require('yeoman-generator'),
    _ = require('underscore.string');

var Generator = module.exports = function Generator(args, opts, config){
    yeoman.generators.Base.apply(this, arguments);
    this.argument('appname', { type: String, required: false });
    this.appname = this.appname || path.basename(process.cwd());
    this.appname = _.camelize(_.slugify(_.humanize(this.appname)));

    this.skipInstall = opts['skip-install'];

    this.todoMsgs = [];
    this.todoMsgs.push('-> Please read https://github.com/archiejs/archiejs-docs/blob/master/Basics.md to know about the basics of the code organisation.');

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

    this.sourceRoot(path.join(__dirname, '..', 'templates'));
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
    this.directory( 'boiler' , '.' );
    done();
};

Generator.prototype.archiejsCore = function archiejsCore() {
    var done = this.async();
    var destfolder = path.join('config', 'archiejs');
    this.directory('archiejs', destfolder);
    done();
};

Generator.prototype.userAuth = function userAuth() {
    var done = this.async();
    if(!this.addAuth){
        this.log('User authentication modules are not installed');
        return done();
    }

    // copy user auth model
    this.copy(path.join('auth', 'model.js'), path.join('models', 'user.js'));

    // copy user auth contoller
    this.copy(path.join('auth', 'controller.js'), path.join('controllers', 'user.js'));

    // copy testcases
    this.copy(path.join('auth', 'test.js'), path.join('test', 'user.js'));

    // Add to YoArchie-Todo.txt
    // 1. Prompt user what to add to routes
    // 2. Prompt user what to add to init section
    
    var todo = this.read(path.join('auth', 'logs-todo.txt'));
    this.todoMsgs.push(todo);

    done();
};

Generator.prototype.setupEnv = function packageFile() {
    var done = this.async();
    var srcfolder = path.join(this.sourceRoot(), 'env');

    // copy .gitignore, todo.txt
    this.copy(path.join(srcfolder, 'gitignore'), '.gitignore');
    //this.copy(path.join(srcfolder, 'logs-todo.txt'), 'logs-todo.txt');
    done();
};

Generator.prototype.introMessage = function introMessage() {
    var done = this.async();
    if( !this.skipInstall){
        this.npmInstall();
    }else{
        this.todoMsgs.push('-> You should run `npm install` now.');
    }
    done();
};
