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
        npmRebuild: false,
        mac: {
          hardenedRuntime: true,
          entitlements: './buildInfo/entitlements.mac.inherit.plist',
          entitlementsInherit: './buildInfo/entitlements.mac.inherit.plist',
          gatekeeperAssess: false,
          target: ['dmg', 'zip']
        },
        win: {
          target: 'nsis'
        },
        // afterSign: 'buildInfo/notarize.js',
        dmg: {
          sign: false
        },
        nsis: {
        },
        publish: [
          {
            provider: 'generic',
            url: 'https://github.com/DecentralizeJustice/GWDesk/releases/latest/download/',
            channel: 'latest'
          }
        ]
      },
      nodeIntegration: true,
      chainWebpackRendererProcess: config => {
        if (process.env.NODE_ENV === 'development') {
          config.plugins.delete('prefetch')
        }
      }
    }
  }
}
