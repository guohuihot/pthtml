'use strict';
module.exports = function(grunt) {
    // Load all grunt tasks
    require('load-grunt-tasks')(grunt);
    // Show elapsed time at the end
    require('time-grunt')(grunt);
    // Project configuration.
    grunt.initConfig({
        // Metadata.
        pkg: grunt.file.readJSON('package.json'),
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
            '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
            '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
            '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
            ' Licensed <%= props.license %> */\n',
        // Task configuration.
        clean: {
            files: ['dist']
        },

        connect: {
            options: {
                port: 9000,
                hostname: 'localhost', //默认就是这个值，可配置为本机某个 IP，localhost 或域名
                livereload: 35729 //声明给 watch 监听的端口
            },

            server: {
                options: {
                    open: true, //自动打开网页 http://
                    base: [
                        'src' //主目录
                    ]
                }
            }
        },
        watch: {
            livereload: {
                options: {
                    livereload: '<%=connect.options.livereload%>' //监听前面声明的端口  35729
                },

                files: [ //下面文件的改变就会实时刷新网页
                    'src/*.html',
                    'src/css/{,*/}*.css',
                    'src/js/{,*/}*.js',
                    'src/images/{,*/}*.{png,jpg}'
                ]
            },
            gruntfile: {
                files: '<%= jshint.gruntfile.src %>',
                tasks: ['jshint:gruntfile']
            },
            src: {
                files: ['src/sass/**/*.{scss,sass}'],
                tasks: ['compass:dist', 'newer:csscomb:sort']
            },
        },
        compass: {
            dist: {
                options: {
                    config: 'src/config.rb' //,  // css_dir = 'dev/css'
                        // raw: 'preferred_syntax = :sass\n' // Use `raw` since it's not directly available
                }
            }
        },
        csscomb: {
            sort: {
                expand: true,
                cwd: 'src/css/',
                src: ['*.css', '!*.map'],
                dest: 'src/css/',
                ext: '.css'
            }
        }
    });

    // Default task.
    // grunt.registerTask('default', ['connect', 'clean']);
    /*grunt.registerTask('default', function() {
        grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
        grunt.task.run(['serve']);
    });*/
    grunt.registerTask('default', ['connect', 'watch']);
};