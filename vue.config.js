module.exports = {
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.html$/i,
          loader: 'html-loader'
        },
        {
          test: /\.(png|gif)$/i,
          use: [
            {
              loader: 'file-loader'
            }
          ]
        }
      ]
    }
  },
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        buildDependenciesFromSource: false,
        nodeGypRebuild: false,
        npmRebuild: false
      },
      externals: ['bcrypto', 'bcoin', 'bdb', 'bsip', 'bstring', 'mrmr'],
      nodeIntegration: true,
      chainWebpackRendererProcess: config => {
        if (process.env.NODE_ENV === 'development') {
          config.plugins.delete('prefetch')
        }
      }
    }
  }
}
