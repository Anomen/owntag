(function(){
    'use strict';

    require.config({
    	baseUrl: 'scripts',
        paths: {
            text: '../libs/require.text'
        },
        packages: [
          {
            name: 'App',
            location: '.',
            main: 'app'
          },
          {
            name: 'HomePage',
            location: 'pages/home',
            main: 'home'
          },
          {
            name: 'ButtonHelper',
            location: 'helpers/button',
            main: 'button'
          },
          {
            name: 'ButtonEntryHelper',
            location: 'helpers/buttonEntry',
            main: 'buttonEntry'
          },
          {
            name: 'DateHelper',
            location: 'helpers/date',
            main: 'date'
          },
          {
            name: 'SubviewHelper',
            location: 'helpers/subview',
            main: 'subview'
          }
        ],
        shim: {
        	App: [
        	  'ButtonHelper',
            'ButtonEntryHelper',
            'SubviewHelper',
            'DateHelper'
        	]
        }
    });

})();
