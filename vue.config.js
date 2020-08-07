const extraResourcess =
  [
    '@deadcanaries/granax', 'merge', 'mkdirp', 'rimraf', 'glob',
    'entities', 'domutils', 'domelementtype', 'dom-serializer',
    'ncp', '7zip', 'path-is-absolute', 'once', 'wrappy', 'minimatch', 'brace-expansion',
    'concat-map', 'balanced-match', 'inherits', 'inflight', 'fs.realpath', 'progress',
    'mv', 'mkdirp', 'minimist', 'merge', 'latest-torbrowser-version', 'semver',
    'follow-redirects', 'cheerio', 'parse5', 'types/node', 'lodash', 'htmlparser2',
    'readable-stream', 'util-deprecate', 'string_decoder', 'safe-buffer', 'domhandler',
    'css-select', 'nth-check', 'boolbase', 'css-what', 'async', 'electron-log']
function addnode () {
  for (var i = 0; i < extraResourcess.length; i++) {
    extraResourcess[i] = './node_modules/' + extraResourcess[i]
  }
}
addnode()
extraResourcess.push('./public/manageTor.js')
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
      externals: ['@deadcanaries/granax'],
      builderOptions: {
        extraResources: extraResourcess, // ['./node_modules/', './public/manageTor.js'],
        buildDependenciesFromSource: false,
        nodeGypRebuild: false,
        npmRebuild: false,
        mac: {
          hardenedRuntime: true,
          entitlements: './buildInfo/entitlements.mac.inherit.plist',
          entitlementsInherit: './buildInfo/entitlements.mac.inherit.plist',
          gatekeeperAssess: false,
          artifactName: '${productName}.${ext}' /* eslint-disable-line */,
          target: ['dmg', 'zip']
        },
        win: {
          target: 'nsis',
          artifactName: '${productName}-Setup.${ext}' /* eslint-disable-line */
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
      nodeIntegration: true
      // chainWebpackRendererProcess: config => {
      //   if (process.env.NODE_ENV === 'development') {
      //     config.plugins.delete('prefetch')
      //   }
      // }
    }
  }
}
