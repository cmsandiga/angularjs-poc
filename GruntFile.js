module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    concat: {
      dist:{
        src: [
          'public/src/js/app.js',
          'public/src/js/routes.js',
          'public/src/js/controller/CampaignController.js',
          'public/src/js/controller/HomeController.js',
          'public/src/js/controller/LoginController.js',
          'public/src/js/controller/MenuController.js',
          'public/src/js/services/CampaignService.js',
          'public/src/js/services/LoginService.js',
        ],
        dest: 'public/dist/js/meltdsp.js',
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');

  // Default task(s).
  grunt.registerTask('default', ['concat']);

};
