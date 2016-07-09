'use strict';

var path = require('path'),
    generators = require('yeoman-generator'),
    rimraf = require('rimraf'),
    _ = require('underscore.string');

var boilerRepos = require('./boiler_repos');

module.exports = generators.Base.extend({

    constructor: function () {
        generators.Base.apply(this, arguments);
        this.argument('appname', { type: String, required: true });
        this.appname = this.appname || path.basename(process.cwd());
        this.appname = _.camelize(_.slugify(_.humanize(this.appname)));

        console.log(`You application will be created in \'${this.appname}\' folder`);
   
        this.skipInstall = this.options['skip-install'];
    },

    askForAppType: function() {
        var done = this.async();
        var message = boilerRepos.map((item, index) => `(${index}) ${item.name}` ).join('\n');
        var prompts = [{
            type: 'input',
            name: 'appType',
            message: `Choose a project type: \n${message}`,
            default: 1
        }];
    
        this.prompt(prompts, function(props){
            if (boilerRepos[props.appType]) {
                this.gitFolder = boilerRepos[props.appType].repo;
                done();
            } else {
                done(new Error('Invalid input'));
            }
        }.bind(this));
    },
    
    install: function() {
        this.spawnCommandSync('git', ['clone', '--depth=1', this.gitFolder, this.appname]);
    },

    end: function() {
        rimraf.sync(path.join(this.appname, '.git'), {});
        
        if( !this.skipInstall){
           this.npmInstall();
        }else{
           console.log('-> You should run `npm install` now.');
        }
    }
});
