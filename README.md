# archiejs-cli
Command line interface for archiejs.


Please read Basics.md to get acquainted with the project structure and different components of ArchieJs.


## Installing Archie-cli


    npm install -g yo
    npm install -g generator-archiejs

or

    git clone <this-repo>
    npm link


And update the template/boiler-plate code in the generator.


    yo archiejs:update


## Project level commands


### Initialize a project


    yo archiejs project-name


* The command creates a new archie project. 
* It comes with an a User database and an implementation of passport local strategy for login (initialization in /config directory, apis in /routes directory and implementation in /controllers ).


### Add modules


    yo archiejs:mvc mvc-name


* This command creates following files /models/mvc-name and /controllers/mvc-name. 
* You need to add the api routes (instructs via logs) manually to the routes file.
* These commands allow the user to create a module in easy step-by-step manner.


### Add services


    yo archiejs:plugin plugin-name


* This command creates a plugin in /plugins/plugin-name directory.
* You can add testcases in /plugin/plugin-name/test directory.
* You will need to add plugins to config (in /config/plugins) directory for using them.


### Run project code


    node app [service-name|default|


### Run testcases


    npm test


## Interesting commands for future / To-do


### Examine project


List all plugins and generate a visual dependency tree (by default lists all of them). This information is available by iterating package.json's.


    yo archiejs:services


### Manage plugins from archie cloud


    yo archieijs:plugin [install|remove|search|upgrade|downgrade]  plugin-name
    *TODO


### Monitor the status of archie cloud installation


    archiejs status
    *TODO*


### Add support for docker


    *TODO*
