'use strict';

var path = require('path'),
    util = require('util'),
    yeoman = require('yeoman-generator'),
    _ = require('underscore.string'),
    ejs = require('ejs');

var Generator = module.exports = function Generator(args, opts, config){
    yeoman.generators.Base.apply(this, arguments);
    this.argument('pluginName', { type: String, required: true });
    this.pluginName = _.camelize(_.slugify(_.humanize(this.pluginName)));
    this.pluginCaps = _.capitalize(this.pluginName);
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
    
    this.sourceRoot(path.join(__dirname, '..', 'templates', 'plugin'));
};

util.inherits(Generator, yeoman.generators.Base);

Generator.prototype.askPluginInfo = function askPluginInfo(){
    var done = this.async();
    var prompts = [{
        type: 'input',
        name: 'pluginDesc',
        message: 'Enter plugin description ?',
        required: false
    },{
        type: 'input',
        name: 'servicesNames',
        message: 'Enter provided service points (comma/space separated) ?',
        required: true,
        default: this.pluginName
    },{
        type: 'expand',
        name: 'packageWrapper',
        message: 'Wrap these services in microservices ?',
        choices: [{
            key: 'n',
            name: 'default',
            message: 'called via normal function calls'
        },{
            key: 'k',
            name: 'kue',
            message: 'called via redis-kue'
        }]
    }];
    this.prompt(prompts, function(props){
        this.description = props['pluginDesc'];
        this.packageWrapper = props['packageWrapper'];
        this.serviceFiles = {};
        this.wrapperFiles = {};

        this.provides = {};
        var services = props['servicesNames'].split(/[ ,]+/);
        services.forEach(function(service){
            var serviceName = _.capitalize(service);
            var filename = service;
            this.provides[serviceName] = filename;
            this.serviceFiles[filename] = serviceName; 
        }.bind(this));

        this.consumes = []; // TODO create a list of all plugins and ask user 
    
        this.destinationRoot(path.join(this.destinationRoot(), 'plugins', this.pluginName));
        console.log(this.destinationRoot());
        done();
    }.bind(this));
};

Generator.prototype.packageJson = function packageJson(){
    var done = this.async();

    if(this.packageWrapper === 'kue'){
        var newProvides = {};
        for(var serviceName in this.provides){
            var serviceFile = this.provides[serviceName];
            var wrapperFile = this.provides[serviceName].replace( /\.js$/, 'Wrapper.js' );
            newProvides[serviceName] = {
                implementation: serviceFile,
                wrapper: wrapperFile
            };
            this.wrapperFiles[wrapperFile] = serviceName;
        }
        this.dummyProvides = this.provides;
        this.hasDummy = true;
        this.provides = newProvides;
    }

    this.template('package.json');
    var msg = "-> Add any other plugins consumed by `" + this.pluginName 
            + "` to the file /plugins/" + this.pluginName 
            + "/package.json .";
    this.todoMsgs.push(msg);
    done();
};

Generator.prototype.renderServiceFiles = function renderServiceFiles(){
    var done = this.async();
    for(var filename in this.serviceFiles){
        var data = {
            serviceName: this.serviceFiles[filename]
        };
        this.template('service.js', filename, data);
    }
    done();
};

Generator.prototype.renderWrapperFiles = function renderWrapperFiles(){
    var done = this.async();
    for(var filename in this.wrapperFiles){
        var data = {
            wrapperName : this.wrapperFiles[filename]
        };
        this.template('wrapper.js', filename, data);
    }
    done();
};

Generator.prototype.renderTestFiles = function renderTestFiles(){
    var done = this.async();
    for(var filename in this.serviceFiles){
        var data = {
            serviceName: this.serviceFiles[filename],
            serviceFileName: filename
        };
        this.template('service.js', path.join('test', filename), data);
    }
    done();
};
