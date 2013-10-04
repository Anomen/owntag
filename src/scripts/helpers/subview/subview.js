define('SubviewHelper', function(require, exports, module){
    'use strict';

    App.helpers = App.helpers || {};
    App.helpers[module.id] = function(options){
        var instance = null;
    	return {
    		render: function(){
                var subview = require(options.__content);
                instance = new subview();
                instance.render();

    			return instance.$el.html();
    		},
    		destroy: function(){
                instance.close();
    		}
    	};
    };
});