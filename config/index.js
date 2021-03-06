'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')
const pro_env = require('./prod.env.js')
// console.log('pro_env',pro_env)
const lifeCycle = process.env.npm_lifecycle_event
const assetsRoot = pro_env.assetsRoot
var index_crm_path = assetsRoot+'/index_crm.html'
var index_loo_show_path = assetsRoot + '/index_loo_show.html'
if(/crm/.test(pro_env.project)){
  index_crm_path = assetsRoot+'/index.html'
} else if('show'===pro_env.project){
  index_loo_show_path = assetsRoot + '/index.html'
} 
const devApi = /test/.test(lifeCycle)?
  'http://118.31.42.82:10086/api':'http://crm.looco8.com/api/'
console.log('dev api url',devApi)
module.exports = {  
  dev: {
    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
        '/api':{
            // target:'http://106.14.119.213:9009/api',
            // target:'https://hgj.wd577.cn/api',
            target:devApi,
            // target:'https://crm.looco8.com/api/',
            changeOrigin: true,
            pathRewrite: {
              '^/api': ''
            }
        }
    },
    // Various Dev Server settings
    host: 'localhost', // can be overwritten by process.env.HOST
    port: 1313, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-


    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'cheap-module-eval-source-map',

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    cssSourceMap: true
  },

  build: {
    // Template for index.html
    index: path.resolve(__dirname, index_crm_path),
    index_loo_show: path.resolve(__dirname, index_loo_show_path),
    // Paths
    assetsRoot: path.resolve(__dirname, assetsRoot),
    assetsSubDirectory:pro_env.assetsSubDirectory,
    assetsPublicPath: pro_env.publicPath,
    /**
     * Source Maps
     */

    productionSourceMap: false,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  }
}
