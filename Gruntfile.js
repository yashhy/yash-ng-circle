module.exports = function(grunt) {
    'use strict';

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        dist: {
          dest: 'dist',
          src: 'src/yash-circle.js'
        },
        uglify: {
          dist: {
            src: ['<%= dist.src %>'],
            dest: '<%= dist.dest %>/<%= pkg.name %>.min.js'
            },
            options: {
                compress: true,
                mangle: true
            }
        },
        jshint: {
            options: {
                jshintrc: true
            },
            files: ['Gruntfile.js', 'src/yash-circle.js']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');

    grunt.registerTask('default', ['build']);

    grunt.registerTask('build', ['jshint', 'uglify']);
};
