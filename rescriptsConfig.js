const { editWebpackPlugin, replaceWebpackPlugin } = require('@rescripts/utilities')
const WorkboxWebpackPlugin = require('workbox-webpack-plugin')
const path = require('path')

module.exports = [
  [
    'use-babel-config',
    {
      presets: ['react-app'],
      plugins: [
        [
          'styled-components',
          {
            displayName: true,
          },
        ],
      ],
    },
  ],
  config => {
    return {
      ...config,
      resolve: {
        ...config.resolve,
        alias: {
          ...config.resolve.alias,
          serviceWorker: path.resolve(__dirname, 'src/serviceWorker/'),
          pages: path.resolve(__dirname, 'src/pages/'),
          components: path.resolve(__dirname, 'src/components/'),
          containers: path.resolve(__dirname, 'src/containers/'),
          config: path.resolve(__dirname, 'src/config/'),
          constants: path.resolve(__dirname, 'src/constants/'),
          helpers: path.resolve(__dirname, 'src/helpers/'),
          images: path.resolve(__dirname, 'src/images/'),
          mocks: path.resolve(__dirname, 'src/mocks/'),
          modules: path.resolve(__dirname, 'src/modules/'),
          styles: path.resolve(__dirname, 'src/styles/'),
          routes: path.resolve(__dirname, 'src/routes/'),
          store: path.resolve(__dirname, 'src/store/'),
          hocs: path.resolve(__dirname, 'src/hocs/'),
        },
      },
    }
  },
  config => {
    const newConfig =
      config.mode === 'production'
        ? editWebpackPlugin(
            p => {
              p['process.env.NODE_ENV'] = JSON.stringify('production')
              return p
            },
            'DefinePlugin',
            config
          )
        : config

    return newConfig
  },
  config => {
    const newConfig =
      config.mode === 'production'
        ? replaceWebpackPlugin(
            new WorkboxWebpackPlugin.InjectManifest({
              swSrc: './src/serviceWorker/workboxConfig.js',
              swDest: 'service-worker.js',
            }),
            'GenerateSW',
            config
          )
        : config

    return newConfig
  },
]
