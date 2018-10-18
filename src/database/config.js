'use strict'

const Ini = require('ini')
const Fs = require('fs')
const Path = require('path')

const { NODE_CONFIG_DIR } = process.env
const configurationFile = NODE_CONFIG_DIR
  ? Path.join(NODE_CONFIG_DIR, 'config.ini')
  : Path.join('..', '..', 'config.ini')

const config = Ini.parse(Fs.readFileSync(configurationFile, 'utf-8'))

module.exports = {
  development: config.database,
  testing: config.database,
  production: config.database
}
