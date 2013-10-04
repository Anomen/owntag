define('ButtonHelper', function(require, exports, module){
    'use strict';

    var VNormal   = require('./VNormal')
      , VDropdown = require('./VDropdown');

    App.helpers = App.helpers || {};
    App.helpers[module.id] = function(options){
    	var view;

    	if (/^\s*$/.test(options.__content))
	    	view = new VNormal({model: new Backbone.Model(options)});
	    else
	    	view = new VDropdown({model: new Backbone.Model(options)});

    	return {
    		render: function(){
    			return view.render().$el.html();
    		},
    		destroy: function(){
    			view.close();
    		}
    	};
    };
});