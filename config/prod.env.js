'use strict'
const merge = require('webpack-merge')
const prodShowEnv = require('./prod.show.env.js')
module.exports =  merge(prodShowEnv, {
  NODE_ENV: '"production"'
})
