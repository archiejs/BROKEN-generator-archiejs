// Your service object below.

// constructor
var <%= serviceName %> = module.exports = function(options, imports){

    // this.instanceVariable = "value";

};

// <%= serviceName %>.staticVariable = "value";

// your public members ( ie. <%= serviceName %>.prototype.XXX below )

(function() {

    /* aPluginMethod
     * This is a dummy function.
     *
     * @param {type} name - description
     */

    this.aPluginMethod = function(){
    };

}).function(<%= serviceName %>.prototype);
