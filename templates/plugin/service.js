// Your service object below.

// constructor
var <%= serviceNameCamel %> = module.exports = function(options, imports){

    // instantiate instance variables
    // this.instanceVariable = "value";

};

// static variables
// <%= serviceNameCamel %>.staticVariable = "value";

// your public members ( ie. <%= seviceNameCamel %>.prototype.XXX below )

(function() {

    /* aPluginMethod
     * This is a dummy function.
     *
     * @param {type} name - description
     */

    this.aPluginMethod = function(){
    };

}).function(<%= serviceNameCamel %>.prototype);
