module.exports = {
    main:{
      expand: true,
      src: 'templates/*',
      dest: 'dist/'
    },
    temp:{
      expand: true,
      src: 'templates/*',
      dest: 'examples/dist'
    },
  dist: {
    expand: true,
    cwd: 'dist/',
    src: '**',
    dest: 'examples/dist',
    filter: 'isFile'
  },
  bower: {
    expand: true,
    cwd: 'bower_components',
    src: '**',
    dest: 'examples/bower_components'
  }
}
