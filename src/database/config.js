
const Path = require('path')
const Fs = require('fs')
const Ini = require('ini')

const config = Ini.parse(Fs.readFileSync(Path.join('..', '..', 'config.ini'), 'utf-8'))

module.exports = config.database
