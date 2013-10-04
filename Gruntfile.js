/*global module:false*/
module.exports = function(grunt) {
  _ = require('lodash');
  require('./src/libs/backbone.marionette.helpers');

  // Project configuration.
  grunt.initConfig({
    connect: {
      server: {
        options: {
          hostname: '*',
          base: './src',
          keepalive: true
        }
      }
    },
    copy: {
      dist: {
        files: [
          {expand: true, cwd: './src', src: ['css/*']    , dest: 'dist/'},
          {expand: true, cwd: './src', src: ['libs/*']   , dest: 'dist/'},
          {expand: true, cwd: './src', src: ['index.html'], dest: 'dist/'}
        ]
      }
    },
    clean: {
      dist: ['dist']
    },
    usemin: {
      html: [
        './dist/index.html'
      ]
    },
    requirejs: {
      app: {
        options: {
          baseUrl       : 'src/scripts',
          mainConfigFile: 'src/scripts/config.js',
          name          : 'App',
          out           : 'dist/build.js',
          optimize      : 'none', // so that we can read it
          exclude       : ['text'],
          findNestedDependencies: true,
          onBuildWrite: function (moduleName, path, contents) {
              if (moduleName.search(/^text.+\.tpl$/) > -1) {
                var tplStr = contents.substring(contents.indexOf("return '")+8, contents.lastIndexOf("'"));
                return "define('" + moduleName.replace("text!", '') + "',[],function () { return "
                  + eval('_.template(\'' + tplStr + '\').source.toString()')
                  + " });";
              }

              var contents = contents.replace(/text!/g, "");
              return contents;
          }
        }
      }
    },
    concat: {
      dist: {
        src: [
          'src/scripts/config.js',
          'dist/build.js'
        ],
        dest: 'dist/build.js'
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-usemin');

  // Default task.
  grunt.registerTask('default', ['clean', 'requirejs', 'concat', 'copy', 'usemin']);

};
