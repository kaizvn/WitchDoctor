'use strict';
var fs = require('fs');
var path = require('path');
var proxySnippet = require('grunt-connect-proxy/lib/utils').proxyRequest;

// usemin custom step
var useminAutoprefixer = {
    name: 'autoprefixer',
    createConfig: require('grunt-usemin/lib/config/cssmin').createConfig // Reuse cssmins createConfig
};

module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt);
    require('time-grunt')(grunt);

    grunt.initConfig({
        yeoman: {
            // configurable paths
            app: require('./bower.json').appPath || 'app',
            dist: 'src/dist'
        },
        watch: {
            bower: {
                files: ['bower.json'],
                tasks: ['wiredep']
            },
            ngconstant: {
                files: ['Gruntfile.js'],
                tasks: ['ngconstant:dev']
            },
            sass: {
                files: ['src/assets/styles/**/*.{scss,sass}'],
                tasks: ['sass', 'autoprefixer']
            },
            livereload: {
                options: {
                    livereload: 35729
                },
                files: [
                    'src/**/*.html',
                    'src/**/*.json',
                    '{.tmp/,}src/assets/**/*.{scss,sass,css}',
                    '{.tmp/,}src/{!bower_components}/**/*.js',
                    'src/assets/images/**/*.{png,jpg,jpeg,gif,webp,svg}'
                ]
            }
        },
        autoprefixer: {
            options: {
                browsers: ['last 1 version']
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: '.tmp/assets/styles/',
                    src: '{,*/}*.css',
                    dest: '.tmp/assets/styles/'
                }]
            }
        },
        wiredep: {
            app: {
                src: ['src/index.html'],
                exclude: [/angular-i18n/, /font-awesome/]
            },
            sass: {
                src: ['<%= yeoman.app %>/styles/{,*/}*.{scss,sass}'],
                ignorePath: /(\.\.\/){1,2}bower_components\//
            },
            test: {
                src: 'src/test/javascript/karma.conf.js',
                exclude: [/angular-i18n/, /angular-scenario/, /jquery-1.9.1/],
                ignorePath: /\.\.\/\.\.\//, // remove ../../ from paths of injected javascripts
                devDependencies: true,
                fileTypes: {
                    js: {
                        block: /(([\s\t]*)\/\/\s*bower:*(\S*))(\n|\r|.)*?(\/\/\s*endbower)/gi,
                        detect: {
                            js: /'(.*\.js)'/gi
                        },
                        replace: {
                            js: '\'{{filePath}}\','
                        }
                    }
                }
            }
        },
        sass: {
            dist: {
                options: {
                    style: 'expanded'
                },
                files: {
                    '.tmp/assets/styles/main.css': 'src/assets/styles/main.scss',
                }
            },
            debug: {
                options: {
                    style: 'expanded'
                },
                files: {
                    'src/assets/styles/main.css': 'src/assets/styles/main.scss',
                }
            }

        },

        connect: {
            test: {
                options: {
                    port: 9001,
                    base: [
                        '.tmp',
                        'test',
                        'src'
                    ]
                }
            }
        },

        // Launch a local server. Use --livereload to refresh page automaticaly.
        express: {
            build: {
                options: {
                    open: true,
                    port: 9000,
                    hostname: '*',
                    server: path.resolve('./express.config.js'),
                    bases: ['src', 'src/idoc', 'src/i18n'],
                    livereload: !grunt.option('livereload')
                }
            }
        },

        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        '.sass-cache',
                        '<%= yeoman.dist %>/*',
                        '!<%= yeoman.dist %>/.git*'
                    ]
                }]
            },
            server: '.tmp'
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            all: [
                'Gruntfile.js',
                'src/assets/js/app.js',
                'src/assets/js/**/*.js',
                'src/views/**/*.js'
            ]
        },
        concat: {
            // not used since Uglify task does concat,
            // but still available if needed
            //    dist: {}
        },
        rev: {
            dist: {
                files: {
                    src: [
                        '<%= yeoman.dist %>/assets/js/**/*.js',
                        '<%= yeoman.dist %>/assets/styles/**/*.css',
                        '<%= yeoman.dist %>/assets/images/**/*.{png,jpg,jpeg,gif,webp,svg}'
                    ]
                }
            }
        },
        useminPrepare: {
            html: 'src/**/*.html',
            options: {
                dest: '<%= yeoman.dist %>',
                flow: {
                    html: {
                        steps: {
                            js: ['concat', 'uglifyjs'],
                            css: ['cssmin', useminAutoprefixer] // Let cssmin concat files so it corrects relative paths to fonts and images
                        },
                        post: {}
                    }
                }
            }
        },
        usemin: {
            html: ['<%= yeoman.dist %>/**/*.html'],
            css: ['<%= yeoman.dist %>/assets/styles/**/*.css'],
            js: ['<%= yeoman.dist %>/assets/js/**/*.js'],
            options: {
                assetsDirs: [
                    '<%= yeoman.dist %>',
                    '<%= yeoman.dist %>/assets/styles',
                    '<%= yeoman.dist %>/assets/images',
                    '<%= yeoman.dist %>/assets/fonts'
                ],
                patterns: {
                    js: [
                        [/(assets\/images\/.*?\.(?:gif|jpeg|jpg|png|webp|svg))/gm, 'Update the JS to reference our revved images']
                    ],
                    css: [
                        [/(assets\/images\/.*?\.(?:gif|jpeg|jpg|png|webp|svg|woff|ttf))/gm, 'Update the JS to reference our revved images']
                        // to test
                        //[/(assets\/fonts\/.*?\.(?:woff|ttf))/gm, 'Update the JS to reference our revved images']
                    ],
                    html: [
                        [/(assets\/images\/.*?\.(?:gif|jpeg|jpg|png|webp|svg))/gm, 'Update the HTML to reference our revved images']
                    ]
                },
                blockReplacements: {
                    css: function (block) {
                        var media = block.media ? ' media="' + block.media + '"' : '';
                        return '<link rel="stylesheet" href="' + block.dest + '"' + media + ' />';
                    }
                },
                dirs: ['<%= yeoman.dist %>']
            }
        },
        removeLoggingCalls: {
            dist: {
                src: ".tmp/concat/assets/js/*.js", // Each file will be overwritten with the output!
                options: {
                    // an array of method names to remove
                    methods: ['log', 'info', 'assert'],

                    // replacement strategy
                    strategy: function () {
                        return ''; // to remove
                    }
                }
            }
        },
        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: 'src/assets/images',
                    src: '**/*.{jpg,jpeg}', // we don't optimize PNG files as it doesn't work on Linux. If you are not on Linux, feel free to use '**/*.{png,jpg,jpeg}'
                    dest: '<%= yeoman.dist %>/assets/images'
                }]
            }
        },
        svgmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: 'src/assets/images',
                    src: '**/*.svg',
                    dest: '<%= yeoman.dist %>/assets/images'
                }]
            }
        },
        cssmin: {
            // By default, your `index.html` <!-- Usemin Block --> will take care of
            // minification. This option is pre-configured if you do not wish to use
            // Usemin blocks.
            // dist: {
            //     files: {
            //         '<%= yeoman.dist %>/styles/main.css': [
            //             '.tmp/styles/**/*.css',
            //             'styles/**/*.css'
            //         ]
            //     }
            // }
            options: {
                root: 'src' // Replace relative paths for static resources with absolute path
            }
        },
        ngtemplates: {
            dist: {
                cwd: 'src',
                src: ['common/**/*.html', 'idoc/**/*.html'],
                dest: '.tmp/templates/templates.js',
                options: {
                    module: 'iDocApp',
                    usemin: 'assets/js/app.js',
                    htmlmin: {
                        removeCommentsFromCDATA: true,
                        // https://github.com/yeoman/grunt-usemin/issues/44
                        collapseWhitespace: true,
                        collapseBooleanAttributes: true,
                        conservativeCollapse: true,
                        removeAttributeQuotes: true,
                        removeRedundantAttributes: true,
                        useShortDoctype: true,
                        removeEmptyAttributes: true
                    }
                }
            }
        },
        htmlmin: {
            dist: {
                options: {
                    removeCommentsFromCDATA: true,
                    // https://github.com/yeoman/grunt-usemin/issues/44
                    collapseWhitespace: true,
                    collapseBooleanAttributes: true,
                    conservativeCollapse: true,
                    removeRedundantAttributes: true,
                    useShortDoctype: true,
                    removeEmptyAttributes: true,
                    keepClosingSlash: true,
                    removeAttributeQuotes: false,
                    removeOptionalTags: false
                },
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.dist %>',
                    src: ['*.html'],
                    dest: '<%= yeoman.dist %>'
                }]
            }
        },
        // Put files not handled in other tasks here
        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: 'src',
                    dest: '<%= yeoman.dist %>',
                    src: [
                        '*.html',
                        'common/**/*.html',
                        'idoc/**/*.html',
                        'i18n/**/*',
                        'assets/images/**/*.{jpg,png,gif,webp}',
                        'assets/skin/**/*.{jpg,png,gif,webp}',
                        'assets/fonts/**/*'
                    ]
                }, {
                    expand: true,
                    cwd: '.tmp/assets/images',
                    dest: '<%= yeoman.dist %>/assets/images',
                    src: [
                        'generated/*'
                    ]
                }, {
                    expand: true,
                    cwd: 'bower_components',
                    dest: '<%= yeoman.dist %>/bower_components',
                    src: [
                        'angular-i18n/angular-locale_vi-vn.js',
                        'angular-i18n/angular-locale_vi.js',
                        'angular-i18n/angular-locale_en-us.js',
                        'angular-i18n/angular-locale_en.js'
                    ]
                }, {
                        expand: true,
                        cwd: '.tmp/assets/styles',
                        dest: '<%= yeoman.dist %>/assets/styles',
                        src: [
                            'print.css', 'renault.css', 'dacia.css'
                        ]
                    }
                ]
            }
        },
        concurrent: {
            sass: [
                'sass:dist'
            ],
            dist: [
                'sass:dist',
                //'imagemin', // Temporary disable image-min ( doesn't work on ci-slave-ren )
                'svgmin'
            ]
        },
        karma: {
            unit: {
                configFile: 'src/test/javascript/karma.conf.js',
                singleRun: true
            }
        },
        cdnify: {
            dist: {
                html: ['<%= yeoman.dist %>/*.html']
            }
        },
        ngAnnotate: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '.tmp/concat/assets/js',
                    src: '*.js',
                    dest: '.tmp/concat/assets/js'
                }]
            }
        },
        ngconstant: {
            options: {
                name: 'iDocApp',
                deps: false,
                wrap: '"use strict";\n// DO NOT EDIT THIS FILE, EDIT THE GRUNT TASK NGCONSTANT SETTINGS INSTEAD WHICH GENERATES THIS FILE\n{%= __ngModule %}'
            },
            dev: {
                options: {
                    dest: 'src/assets/js/app.constants.js'
                },
                constants: {
                    ENV: 'dev',
                    VERSION: 1.0
                }
            },
            prod: {
                options: {
                    dest: '.tmp/assets/js/app.constants.js'
                },
                constants: {
                    ENV: 'prod',
                    VERSION: 1.0
                }
            }
        },
        apimocker: {
            options: {
                configFile: 'apimocker.config.json'
            }
        }
    });

    grunt.registerTask('serve', 'run server', function (target, role) {
        // exporting target value to allow external node modules to use it
        global.serveTarget = target;

        if (role === undefined) {
            global.serveRole = "admin";
        } else {
            global.serveRole = role;
        }

        grunt.task.run([
            'clean:server',
            'wiredep',
            'ngconstant:dev',
            'concurrent:sass',
            'configureProxies',
            'express',
            'apimocker',
            'watch'
        ])
    });

    grunt.registerTask('test', [
        'clean:server',
        'wiredep:test',
        'ngconstant:dev',
        'concurrent:sass',
        'connect:test',
        'apimocker',
        'karma'
    ]);

    grunt.registerTask('build', [
        'clean:dist',
        'wiredep:app',
        'wiredep:sass',
        'ngconstant:prod',
        'useminPrepare',
        'ngtemplates',
        'concurrent:dist',
        'concat',
        'copy:dist',
        'ngAnnotate',
        'removeLoggingCalls',
        'cssmin',
        'autoprefixer',
        'uglify',
        'rev',
        'usemin',
        'htmlmin'
    ]);

    grunt.registerTask('default', [
        'test',
        'build'
    ]);
};
