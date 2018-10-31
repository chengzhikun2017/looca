'use strict'
const merge = require('webpack-merge')
const crm = {
  publicPath:'https://looco-crm-1251098434.file.myqcloud.com/',
  assetsRoot:'../dist_crm',
  assetsSubDirectory: 'static',
  project:'crm',
}
const show = {
  publicPath:'https://looco-1251098434.file.myqcloud.com/',
  assetsRoot:'../dist_show',
  assetsSubDirectory: 'static',
  project:'show',
}
const crm_test = {
  publicPath:'/fx/',
  assetsRoot:'../dist_crm_test',
  assetsSubDirectory: 'static',
  project:'crm_test',
}

const configs = {
  crm,
  show,
  crm_test,
  default:{
    publicPath:'/',
    assetsRoot:'../dist',
    assetsSubDirectory: 'static',
    project:'default',
  }
}

module.exports = merge(configs[process.env.env_config||'default'], {
  NODE_ENV: '"production"'
})
