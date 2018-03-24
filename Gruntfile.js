module.exports = function(grunt){
  grunt.initConfig({
    uglify: {
      options: {
        mangle: true,
        compress: true
      },
      build: {
        src: './file.js',
        dest: './file.js'
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.registerTask('default', ['uglify']);
};
