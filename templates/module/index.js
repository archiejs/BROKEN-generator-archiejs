'use strict';

let <%= serviceNameCamel %> = require('./<%= serviceName %>');

let <%= pluginCamelCase %> = module.exports = function( options, imports, register ){

    let <%= serviceName %>Inst = new <%= serviceNameCamel %>(options, imports);

    register ( null, // error
        {
            "<%= serviceName %>": <%= serviceName %>Inst
        }
    );
};

