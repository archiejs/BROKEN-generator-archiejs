'use strict';

var <%= serviceNameCamel %> = require('./<%= serviceName %>');

var <%= pluginCamelCase %> = module.exports = function( options, imports, register ){

    var <%= serviceName %>Inst = new <%= serviceNameCamel %>(options, imports);

    register ( null, // error
        {
            "<%= serviceName %>": <%= serviceName %>Inst
        }
    );
};

