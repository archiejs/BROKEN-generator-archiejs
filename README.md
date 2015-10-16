# archiejs-cli
Command line interface for archiejs.


Please read Basics.md to get acquainted with the project structure and different components of ArchieJs.


## Getting help


Help related to commands.


    archie  --help
    archie  [command]  --help


Help about files in current directory (ex. routes, models, etc).


    cd <project-sub-directory>
    archie . --help


## Project level commands


### Initialize a project


    archie init project-name


The command creates a new archie project. 


The boiler-plate archiejs code comes with an a User database and an implementation of passport local strategy for login (initialization in /config directory, apis in /routes directory and implementation in /controllers ).


### Add modules to the project


    archie  [model|controller|route|plugin|service|test]  [open|add|remove|*nothing*]  file-name[.js]


A short command, such as, `archie filename` or `archie [typeof] filename` can be used to quickly open the relevant file in `vim` from any directory. The choice of editor is hardcoded at the moment. 

The command instructs the user to things s/he might have to do manually to add/remove/etc a model/controller/etc.


### Run project code


    archie  run  [service-name|default|


### Examine project


List all components of a type (by default lists all of them).


    archie  list  [model|controller|route|plugin|service|tests]


### Run testcases


    archie  test  [test/unit-test.js]


## Commands for future / To-do


### Manage plugins from archie cloud


    archie  [install|remove|search|upgrade|downgrade]  plugin-name
    *TODO*


### Monitor the status of archie cloud installation


    archie  status
    *TODO*


### Create a web document describing the flow in the system


    archie  dashboard
    *TODO*


### Add support for docker


    *TODO*
