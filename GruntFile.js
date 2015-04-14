module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

      concat: {
        dit:{
          src: [
              'public/app/app.module.js',
              'public/app/app.routes.js',
              'public/app/components/login/loginView.js',
              'public/app/components/home/homeView.js',
              'public/app/components/campaign/campaignView.js',
              'public/app/services/campaign/campaignService.js',
              'public/app/services/login/loginService.js',
              'public/app/templates/menu_controller.js'],

          dest: 'public/app/meltdsp.js'
        }
      }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');

  // Default task(s).
  grunt.registerTask('default', ['concat']);

};
