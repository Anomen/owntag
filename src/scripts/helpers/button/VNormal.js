define(function(require, exports, module){
    'use strict';

    var template = require('text!./normal.tpl');

    return Backbone.Marionette.ItemView.extend({
    	template: _.template(template)
    });
});