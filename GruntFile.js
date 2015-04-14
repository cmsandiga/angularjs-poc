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
    },

    karma:{
      unit:{
        options:{
          frameworks:['jasmine'],
          singleRun: true,
          browsers:['PhantomJS'],
          files:[
            'public/assets/js/angularjs/1.3.11/angular.js',
            'public/assets/js/angularjs/1.3.11/angular-route.js',
            'public/assets/js/angularjs/1.3.11/angular-cookies.js',
            'node_modules/angular-mocks/angular-mocks.js',
            'public/src/js/**/*.js',
            'public/test/js/**/*.js',
          ]
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-contrib-concat');

  grunt.registerTask('test',['karma']);
  grunt.registerTask('default', ['concat']);
  

};
