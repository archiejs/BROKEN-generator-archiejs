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
* It comes with an a User database and an implementation of passport local strategy for login (initialization in /config directory, apis in /config/routes directory and implementation in /controllers ).


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
*TODO*
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
