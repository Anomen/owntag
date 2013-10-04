define('DateHelper', function(require, exports, module){
    'use strict';

    App.helpers = App.helpers || {};
    App.helpers[module.id] = function(options){
    	return {
    		render: function(){
                var d = moment(options.__content ? parseInt(options.__content) : undefined);

                if (options.format)
                    d = d.format(options.format);

    			return d;
    		},
    		destroy: function(){
                // Nothing
    		}
    	};
    };
});