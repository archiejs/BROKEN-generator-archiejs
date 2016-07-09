'use strict';

var chai = require('chai');
var expect = chai.expect;
var should = chai.should();

var dummyOptions = {};
var dummyImports = {};
var <%= serviceName %> = require('./../<%= serviceFileName %>');
var inst<%= serviceName %>;

describe('Plugin <%= pluginName %> Testcases:', function(){
    
    before(function(){
        // create an instance of the plugin and pass it
        // dummy options and imports
        inst<%= serviceName %> = new <%= serviceName %>(dummyOptions, dummyImports);
    });
    
    afterEach(function(){
    });

    it('#tests something', function(done){
        // add testcase for inst<%= serviceName %> here
        done('Todo: please implement your first testcase');
    });

});
