define(function(require){
    'use strict';

    var template = require('text!./home.tpl');

    // Load subviews
    require('testSubview');

    return Backbone.Marionette.ItemView.extend({
        template: _.template(template)
    });
});