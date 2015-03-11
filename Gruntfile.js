// Generated on 2015-02-04 using generator-angular 0.10.0
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  grunt.option('debug', true);

  var src = 'src';
  var app = src + '/app';
  var bower = grunt.file.readJSON("bower.json");

  var restMock = function (req, resp, next) {
      var endpoints = {
          '/tt1': 'src/mock/test.json'
      };
      var callbackName;
      if (req._parsedUrl.query) {
          var first = req._parsedUrl.query.indexOf('callback=') + 9;
          var last = req._parsedUrl.query.indexOf('&', first);
          last = (last > -1) ? last : req._parsedUrl.query.length;
          callbackName = req._parsedUrl.query.substring(first, last);
      }
      var passed = false;
      for (var key in endpoints) {
          if (endpoints.hasOwnProperty(key) && req.url.indexOf(key) > -1) {
              resp.setHeader('Content-Type', 'application/json');
              var jsonp = grunt.file.read(endpoints[key]);
              if(callbackName) {
                  jsonp = callbackName+'('+jsonp+');';
              }
              resp.end(jsonp);
              passed = true;
          }
      }
      if(!passed) {
          return next();
      }
  };

  // Configurable paths for the application
  var appConfig = {
    app: app,
    dist: 'dist',
    src: src,
    base: './',
    test: 'test'
  };

  // Define the configuration for all the tasks
  grunt.initConfig({

    // Project settings
    yeoman: appConfig,
    pkg: grunt.file.readJSON('package.json'),
    bower: grunt.file.readJSON('bower.json'),

    fileblocks: {
      app: {
          options: {
              cwd: '<%= yeoman.src %>',
              removeFiles: true
          },
          files: [
              {
                  src: '<%= yeoman.src %>/index.html',
                  blocks: {
                      'scripts': {
                        src: ['app/**/*.js', '!app/**/*.spec.js']
                      },
                      'styles': {
                        src: ['**/*.css']
                      }
                  }
              }
          ]
      },

      less: {
        options: {
          cwd: '<%= yeoman.src %>/less',
          removeFiles: true
        },
        files: [
          {
            src: '<%= yeoman.src %>/less/app.less',
            blocks: {
              'imports': {
                src: ['../app/**/*.less'],
                template: '@import "${file}";'
              }
            }
          }
        ]
      },
      templates: {
          options: {
              cwd: '.tmp',
              removeFiles: true
          },
          files: [
              {
                  src:'.tmp/index.html',
                  blocks: {
                      'generated': {
                          src: ['../.tmp/**/*.js']
                      }
                  }
              }
          ]
      }
    },
    less: {
      options: {
        compress: false,
        sourceMap: false
      },
      compile: {
        options: {
          relativeUrls: true
        },
        files: {
          "<%= yeoman.src %>/<%= pkg.name %>-<%= pkg.version %>.css": "<%=yeoman.src%>/less/app.less"
        }
      },
      release: {
        options: {
            relativeUrls: false
        },
        files: {
          ".tmp/<%= pkg.name %>-<%= pkg.version %>.css": "<%= yeoman.src %>/less/app.less"
        }
      }
    },
    // Watches files for changes and runs tasks based on the changed files
    //  'fileblocks:less',
    //  'less:compile',
    //  'fileblocks:app'
    watch: {
      livereload: {
          options: {
            livereload: 35729
          },
          files: [
            '<%= yeoman.src %>/index.html',
            '<%= yeoman.src %>/**/*.tpl.html'
          ]
      },
      bower: {
        files: ['bower.json'],
        tasks: ['wiredep']
      },
      js: {
        files: [
          '<%= yeoman.app %>/**/*.js',
          '!<%= yeoman.app %>/**/*.spec.js',
        ],
        tasks: ['jshint:all', 'fileblocks:app'],
        options: {
          livereload: 35729
        }
      },
      less: {
        files: ['<%= yeoman.app %>/**/*.less'],
        tasks: ['fileblocks:less', 'less:compile']
      },
      gruntfile: {
        files: ['Gruntfile.js']
      }
    },
    // The actual grunt server settings
    connect: {
      options: {
        port: 9000,
        // Change this to '0.0.0.0' to access the server from outside.
        hostname: '0.0.0.0',
        open: false
      },
      dev: {
        options: {
        livereload: 35729,
            middleware: function (connect, options, middlewares) {
                return [
                  connect().use('/bower_components', connect.static('./bower_components')),
                  connect.static(appConfig.src),
                  connect.static(appConfig.app),
                  restMock,
                ];
            }
        }
      },
      dist: {
        options: {
            hostname: '0.0.0.0',
            middleware: function (connect) {
                return [
                    restMock,
                    connect.static('dist')
                ];
            }
        }
      }
    },

    // Make sure code styles are up to par and there are no obvious mistakes
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        verbose: true,
        reporter: require('jshint-stylish')
      },
      all: {
        src: [
          'Gruntfile.js',
          '<%= yeoman.app %>/**/*.js',
          '!<%= yeoman.app %>/**/*.spec.js'
        ]
      },
      test: {
        src: ['<%= yeoman.app %>/**/*.spec.js']
      }
    },

    // Empties folders to start fresh
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= yeoman.dist %>/{,*/}*',
            '!<%= yeoman.dist %>/.git{,*/}*'
          ]
        }]
      },
      server: '.tmp'
    },

    // Add vendor prefixed styles
    // autoprefixer: {
    //   options: {
    //     browsers: ['last 1 version']
    //   },
    //   dist: {
    //     files: [{
    //       expand: true,
    //       cwd: '.tmp/styles/',
    //       src: '{,*/}*.css',
    //       dest: '.tmp/styles/'
    //     }]
    //   }
    // },

    // Automatically inject Bower components into the app
    wiredep: {
        app: {
            cwd: '<%= yeoman.base %>',
            src: ['<%= yeoman.src %>/index.html'],
            devDependencies: false,
            ignorePath:  /\.\.\//,
            exclude: '<%= bower.excludeFiles %>'
        },
        test: {
            src:['<%= yeoman.test %>/karma.conf.js'],
            devDependencies: true,
            fileTypes: {
                js: {
                    block: /(([ \t]*)\/\/\s*bower:*(\S*))(\n|\r|.)*?(\/\/\s*endbower)/gi,
                    detect: {
                        js: /(['"]([^'"]+))/gi
                    },
                    replace: {
                        js: '\'{{filePath}}\','
                    }
                }
            },
            ignorePath:  /\.\.\//
        }
    },

    // Reads HTML for usemin blocks to enable smart builds that automatically
    // concat, minify and revision files. Creates configurations in memory so
    // additional tasks can operate on them
    useminPrepare: {
      html: '.tmp/*.html',
      options: {
        dest: '<%= yeoman.dist %>',
        flow: {
          html: {
            steps: {
              js: ['concat', 'uglifyjs'],
              css: ['cssmin']
            },
            post: {}
          }
        }
      }
    },

    // Performs rewrites based on filerev and the useminPrepare configuration
    usemin: {
      html: ['<%= yeoman.dist %>/index.html', '<%= yeoman.dist %>/js/**/*.js'],
      css: ['<%= yeoman.dist %>/styles/**/*.css'],
      options: {
        assetsDirs: ['<%= yeoman.dist %>', '<%= yeoman.dist %>/fonts']
      }
    },

    // Renames files for browser caching purposes
    filerev: {
      dist: {
        src: [
          '<%= yeoman.dist %>/js/**/*.js',
          '<%= yeoman.dist %>/styles/**/*.css',
          '<%= yeoman.dist %>/assets/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
          '<%= yeoman.dist %>/fonts/*'
        ]
      }
    },

    // The following *-min tasks will produce minified files in the dist folder
    // By default, your `index.html`'s <!-- Usemin block --> will take care of
    // minification. These next options are pre-configured if you do not wish
    // to use the Usemin blocks.
    cssmin: {
        options: {
            keepSpecialComments: '0',
            rebase:false
        }
    },
    uglify: {
      options: {
          mangle: false
      }
    },
    concat: {
       dist: {}
    },

    //imagemin: {
    //  dist: {
    //    files: [{
    //      expand: true,
    //      cwd: '<%= yeoman.app %>/images',
    //      src: '{,*/}*.{png,jpg,jpeg,gif}',
    //      dest: '<%= yeoman.dist %>/images'
    //    }]
    //  }
    //},
    //
    //svgmin: {
    //  dist: {
    //    files: [{
    //      expand: true,
    //      cwd: '<%= yeoman.app %>/images',
    //      src: '{,*/}*.svg',
    //      dest: '<%= yeoman.dist %>/images'
    //    }]
    //  }
    //},

    // htmlmin: {
    //   dist: {
    //     options: {
    //       collapseWhitespace: true,
    //       conservativeCollapse: true,
    //       collapseBooleanAttributes: true,
    //       removeCommentsFromCDATA: true,
    //       removeOptionalTags: true
    //     },
    //     files: [{
    //       expand: true,
    //       cwd: '<%= yeoman.dist %>',
    //       src: ['*.html', 'views/{,*/}*.html'],
    //       dest: '<%= yeoman.dist %>'
    //     }]
    //   }
    // },

    // ng-annotate tries to make the code safe for minification automatically
    // by using the Angular long form for dependency injection.


    // Replace Google CDN references
    cdnify: {
      dist: {
        html: ['<%= yeoman.dist %>/*.html']
      }
    },

    // Copies remaining files to places other tasks can use
    copy: {
      dist: {
        files: [
        {
          expand: true,
          dot: true,
          cwd: '.tmp',
          dest: '<%= yeoman.dist %>',
          src: [
            'index.html'
          ]
        },
        {
          expand: true,
          cwd: '<%= yeoman.src %>/',
          dest: '<%= yeoman.dist %>',
          src: ['assets/**/*.*']
        },
        {
          expand: true,
          cwd: 'bower_components/bootstrap',
          src: 'fonts/*',
          dest: '<%= yeoman.dist %>'
        }]
      }
    },

    // Run some tasks in parallel to speed up the build process
    concurrent: {
      server: [
        'copy:styles'
      ],
      test: [
        'copy:styles'
      ],
      dist: [
        'copy:styles',
        'imagemin',
        'svgmin'
      ]
    },

    // Test settings
    karma: {
      unit: {
        configFile: 'test/karma.conf.js',
        singleRun: true,
        browsers: ['PhantomJS']
      }
    },

    protractor: {
        options: {
            configFile: 'node_modules/grunt-protractor-runner/node_modules/protractor/example/conf.js',
            keepAlive: true,
            noColor: false
        },
        run: {
            options: {
                configFile: 'test/e2e.conf.js'
            }
        }
    },

    html2js: {
        app: {
            options:{
                base: '<%= yeoman.app %>'
            },
            src: ['<%= yeoman.app %>/**/*.tpl.html'],
            dest: '.tmp/templates-app.js'
        }
    },
    //includereplacemore: {
    //  tmp: {
    //      options: {
    //          prefix: '// {{',
    //          suffix: ' }}',
    //          globals: {
    //              dev: true,
    //              html2js: '\'templates-app\''
    //          }
    //      },
    //      files: [
    //          {src: 'index.html', dest: '.tmp/', expand: true, cwd: 'src/'},
    //          {src: 'app.js', dest: '.tmp/', expand: true, cwd: 'src/app/'}
    //      ]
    //  }
    //}
    replace: {
        tmp: {
            options: {
                prefix: '',
                patterns: [
                    {match: '//replace:templates-app', replacement: '\'templates-app\''},
                    {match: '<script src="app/app.js"></script>', replacement: ''}

                ]
            },
            files: [
                {src: 'index.html', dest: '.tmp/', expand: true, cwd: 'src/'},
                {src: 'app.js', dest: '.tmp/', expand: true, cwd: 'src/app/'}
            ]
        }
    }
  });

  grunt.registerTask('index', [
      'wiredep:app',              //change index.html dependency of third party script tag
      'fileblocks:less',          //change app.less import other less
      'less:compile',             //compile app.less to css and copy the assets folder to .tmp
      'fileblocks:app'            //change index.html script tag and stylesheet
  ]);

  grunt.registerTask('serve', [
    'index',
    'connect:dev', 
    'watch'
  ]);

  grunt.registerTask('test', [
    'wiredep:test',
    'html2js',
    'karma'
  ]);

  grunt.registerTask('build', [
        'clean',
        'html2js',                  //generate .tmp/templates-app.js
        'index',
        'replace:tmp',              //copy index.html and app.js to .tmp/ and replace marked tags
        'fileblocks:templates',     //add ./tmp/**/*.js to the index.html script tag
        'useminPrepare',
        'cssmin',                   //combine all css listed in build:css(.tmp) to styles/scripts.css
        'concat',                   //combine all js listedin in build:js(.) to js/scripts.js
        'uglify',
        'copy:dist',                //copy the resources to dist/
        'filerev',                  //rename files in js/ and styles/ folder with md5 hash for cache busting
        'usemin'                    //replace tags in dist/index.html with scripts and vendor css and js
  ]);

  grunt.registerTask('distserve', ['connect:dist:keepalive']);

  grunt.registerTask('e2etest', ['connect:dist', 'protractor:run']);

  grunt.registerTask('default', [
    'jshint',
    'test',
    'build'
  ]);


};
