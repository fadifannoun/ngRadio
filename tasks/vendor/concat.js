module.exports = {
  options: {
    separator: '',
  },
  dist: {
    src: [
      '<%= yeoman.app %>/app.js',
      '<%= yeoman.app %>/directives/*.js',
      '<%= yeoman.app %>/services/*.js',
      '<%= yeoman.app %>/controllers/*.js'
    ],
    dest: '<%= yeoman.dist %>/ngRadio.js',
  },
};
