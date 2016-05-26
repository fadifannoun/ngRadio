module.exports = {
  dist: {
    options: {
      sourceMap: true,
      compress: { drop_console: true },
      sourceMapName: '<%= yeoman.dist %>/ngRadio.min.map'
    },
    files: {
      '<%= yeoman.dist %>/ngRadio.min.js': ['<%= yeoman.dist %>/ngRadio.js']
    }
  }
}
