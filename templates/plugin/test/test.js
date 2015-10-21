'use strict';

var chai = require('chai');
var expect = chai.expect;
var should = chai.should();

var dummyOptions = {};
var dummyImports = {};
var <%= serviceName %> = require('./../<%= serviceFileName %>');
var <%= serviceName %>Inst;

describe('Plugin <%= plugin %> Testcases:', function(){
    
    before(function(){
        // create an instance of the plugin and pass it
        // dummy options and imports
        <%= serviceName %>Inst = new <%= serviceName %>(dummyOptions, dummyImports);
    });
    
    afterEach(function(){
    });

    it('#tests something', function(done){
        // add testcase <%= serviceName %>Inst here
        done('Todo: please implement your first testcase');
    });

});
