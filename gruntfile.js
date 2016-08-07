module.exports = function(grunt) {

  grunt.initConfig({
    vows: {
      all : {
        src: ["test/*.js"]
      }
    }
  });
  grunt.loadNpmTasks('grunt-vows');

  grunt.registerTask('default', ['jshint']);

};
