module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    
    concat: {
      options: {
        separator: ';',
      },
      dist: {
        src: ['app/assets/js/src/main.js','app/assets/js/src/styles.js'],
        dest: 'app/assets/js/app.js',
      },
    },
    sass: {                              // Task 
      dist: {                            // Target 
        files: {                         // Dictionary of files 
          'app/assets/css/main.css': 'app/assets/css/src/main.scss'     // 'destination': 'source' 
        }
      }
    },
    cssmin: {
      target: {
        files: {
          'app/assets/css/app.min.css':
          [
            'app/assets/css/main.css'
          ]
        }
      }
    },
    watch: {
      css: {
        files: ['app/assets/css/src/*.scss'],
        tasks: ['sass', "cssmin"]
        
      },
      scripts: {
        files: ['app/assets/js/src/*.js'],
        tasks: ['concat']
      }
    },
  });

  // Load the plugin that provides the "uglify" task.
  // grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-concat');
  // grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-watch');
  // grunt.loadNpmTasks('grunt-contrib-jshint');


  // Default task(s).
  grunt.registerTask('default', ['sass','cssmin','concat','watch']);

};