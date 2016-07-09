# archiejs-cli

Command line interface for archiejs.


## Installing Archie-cli

```
git clone https://github.com/archiejs/generator-archiejs
npm link
```

TODO LATER:
```
npm install -g yo
npm install -g generator-archiejs
```


## Project level commands


### Initialize a project

```
yo archiejs project-name
```

* The command creates a new archie project. 
* It comes with an a User database and an implementation of passport local strategy for login (initialization in /config directory, apis in /routes directory and implementation in /controllers ).


### Add modules

```
yo archiejs:mvc mvc-name
```

* This command creates following files /models/mvc-name and /controllers/mvc-name. 
* You need to add the api routes (instructs via logs) manually to the routes file.
* These commands allow the user to create a module in easy step-by-step manner.


### Add services

```
yo archiejs:module module-name
```

* This command creates a archiejs module in /module/module-name directory.
* You can add testcases in /module/module-name/test directory.
* You will need to add module to ./deptree.js


### Run project code

```
node app [service-name|default|
```

### Run testcases

```
npm test
```

## Interesting commands for future / To-do


### Examine project


List all plugins and generate a visual dependency tree (by default lists all of them). This information is available by iterating package.json's.

```
yo archiejs:services
```

### Manage plugins from archie cloud


```
*TODO*
yo archieijs:plugin [install|remove|search|upgrade|downgrade]  plugin-name
```


### Monitor the status of archie cloud installation

```
*TODO*
archiejs status
```

### Add support for docker

*TODO*
