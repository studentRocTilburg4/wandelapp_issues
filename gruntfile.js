module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        // Task configuration.
        jshint: {
            src: ['src/*.js'],
            options: {
                esnext:true,
                browser:true,
                curly: true,
                eqeqeq: true,
                immed: true,
                latedef: true,
                newcap: false,
                noarg: true,
                sub: true,
                undef: true,
                unused: false,
                boss: true,
                eqnull: true,
                globals: {
                    jQuery: true,
                    $: true,
                    _: true,
                    console: true,
                    exports: true,
                    post: true,
                    test: true,
                    ok:true,
                    equal: true,
                    stampit: true
                }
            }
        },
        copy: {
            main: {
                files: [
                    // Copy jquery and ractive
                    {expand: true, cwd: './node_modules/jquery/dist/', src: 'jquery.js', dest: './js/jquery/'},
                    {expand: true, cwd: './node_modules/ractive/', src: 'ractive.js', dest: './js/ractive/'}
                ],
            },
        },
        browserify: {
            dist: {
                options: {
                    transform: [
                        ["babelify"] //Converts ES6 to ES5 (with require statements), which is then converted to one file with browserify!!
                    ]
                },
                files: {
                    "./js/app_es5.js": ["src/app.js"]
                }
            }
        },
        exec: {
            log: 'echo "Ga naar localhost:2222 om de unit test uit te voeren"',
            runtest: 'browserify -t babelify unit_tests/*.js | browser-run -p 2222',
        },
        watch: {
            js: {
                files: ['*.js', 'src/*.js'],
                tasks: ['jshint', 'browserify']
            }
        }
    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-exec');

    // Default task.
    grunt.registerTask('default', ['jshint', 'copy', 'browserify']);
    grunt.registerTask('test', ['exec']);

};
