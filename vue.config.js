module.exports = {
  pluginOptions: {
    electronBuilder: {
      externals: ['bcoin', '@deadcanaries/granax'],
      nodeIntegration: true
    }
  }
}
