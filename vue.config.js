module.exports = {
  pluginOptions: {
    electronBuilder: {
      externals: ['bcoin', '@deadcanaries/granax', 'bcrypto'],
      nodeIntegration: true,
      chainWebpackRendererProcess: config => {
        if (process.env.NODE_ENV === 'development') {
          config.plugins.delete('prefetch')
        }
      }
    }
  }
}
