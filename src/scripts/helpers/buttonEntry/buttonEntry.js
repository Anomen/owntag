define('ButtonEntryHelper', function(require, exports, module){
    'use strict';

    App.helpers = App.helpers || {};
    App.helpers[module.id] = function(options){
    	return {
    		render: function(){
    			return _.template('<li><a href="<%= href %>"><%= __content %></a></li>')(options);
    		},
    		destroy: function(){
                // Nothing
    		}
    	};
    };
});