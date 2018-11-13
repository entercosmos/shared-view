module.exports = {
  type: 'react-component',
  npm: {
    esModules: true,
    umd: {
      global: 'SharedView',
      externals: {
        react: 'React'
      }
    }
  }
}
