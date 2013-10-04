define(function(require, exports, module){
    // Define different region for the layout
    App.addRegions({
        contentRegion: 'body'
    });

Marionette.View.prototype.templateHelpers = function(){
    var self = this;
    return {
        helper: function(name, options, content){
            // Create the module name
            var module = name[0].toUpperCase()
                       + name.substr(1, name.length)
                       + 'Helper';

            // If the class exists and is loaded, then we construct
            // the option to pass to the class.
            if (typeof(App.helpers[module]) !== "undefined"){
                var args       = options;
                args.__content = content || '';
                args.__view    = self;

                // Create a new instance
                var h = new App.helpers[module](args);

                // When the current view is destroyed, we destroy
                // the instance of this tag as well.
                self.listenTo(self, 'close', function(){
                    h.destroy();
                });

                // We render the tag and return the HTML
                return h.render();
            }
            else {
                console.error("The tag " + module + " does not exist or is not loaded.");
                return '';
            }
        }
    }
};

    var Router = Backbone.Marionette.AppRouter.extend({
        routes: {
            ''       : 'home',
            'article': 'article'
        },
        home: function(){
            var HomePage = require('HomePage');
            App.contentRegion.show(new HomePage());
        },
        article: function(){
            App.contentRegion.reset();
        }
    });

    new Router();

    App.on('initialize:after', function(){
        if (Backbone.history) 
            Backbone.history.start();
    });
    
    // Start the application
    require(requirejs.s.contexts._.config.shim.App.deps, function(){
        App.start();
    });
});