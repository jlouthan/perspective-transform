module.exports = function(grunt) {

	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),

		jshint: {
			all: ['Gruntfile.js', 'src/**/*.js'],
			options: {
				jshintrc: true
			}
		},

		uglify: {
			dist: {
				files: {
					'dist/perspective-transform.min.js': 'dist/perspective-transform.js'
				}
			},
			options: {
				banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("dd-mm-yyyy") %> */\n',
				mangle: true,
				preserveComments: 'some'
			}
		}

	});

	require('load-grunt-tasks')(grunt);
	grunt.registerTask('default', ['jshint', 'uglify']);
};