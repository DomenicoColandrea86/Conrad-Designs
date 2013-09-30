/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n',
    // Task configuration.
    concat: {
      options: {
        // define a string to put between each file in the concatenated output
        separator: ';'
      },
      dist: {
        // the files to concatenate
        src: ['js/vendor/jquery*.js', 'js/plugins/*.js', 'js/*.js'],
        // the location of the resulting JS file
        dest: 'dist/js/scripts.js'
      }
    },
    uglify: {
      options: {
        // the banner is inserted at the top of the output
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        files: {
          'dist/js/scripts.min.js': ['<%= concat.dist.dest %>']
        }
      }
    },
    jshint: {
      gruntfile: {
        src: './jshintrc'
      },
      files: {
        src: ['js/main.js', 'gruntfile.js']
      }
    },
    compass: {
      dev: {
        options: {
          config: 'config.rb',
          sassDir: 'scss',
          cssDir: 'css'
        }
      },
      dist: {
        options: {
          config: 'config.rb',
          sassDir: 'scss',
          cssDir: 'dist/css',
          outputStyle: 'compressed'
        }
      }
    },
    watch: {
      options: {
        livereload: true,
      },
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      files: ['scss/*.scss', 'index.html', 'js/*.js'],
      tasks: ['compass:dev']
    },
    useminPrepare : {
      html: ['index.html']
    },
    usemin: {
      html: ['dist/index.html']
    },
    copy: {
      main: {
        files: [
          {src: ['fonts/*'], dest: 'dist/'}, // includes files in path
          {src: ['*.html'], dest: 'dist/'}, // includes files in path and its subdirs
          {src: ['images/**/*'], dest: 'dist/'}, // includes files in path and its subdirs
          {src: ['*.png', '*.ico'], dest: 'dist/'}, // includes files in path and its subdirs
          {src: ['*.json', '*.xml', '.htaccess'], dest: 'dist/'}, // includes files in path and its subdirs
          {src: ['js/vendor/modernizr-2.6.2.min.js'], dest: 'dist/js/vendor/modernizr-2.6.2.min.js'}, // includes files in path and its subdirs
        ]
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-usemin');


  // Default task.
  grunt.registerTask('default', 'watch');

  // build task.
  grunt.registerTask('build', ['jshint:files', 'concat:dist', 'uglify:dist', 'compass:dist', 'copy:main', 'useminPrepare', 'usemin']);

};
