'use strict'

const Hoek = require('@hapi/hoek')
const Sequelize = require('sequelize')

const defaults = {
  database: null,
  username: null,
  password: null
}

exports.plugin = {
  pkg: require('./package.json'),
  register: async function (server, options) {
    const settings = Hoek.applyToDefaults(defaults, options || {})
    settings.logging = (...args) => server.log([ 'database' ], ...args)
    const { username, password, database, ...configuration } = settings
    const sequelize = new Sequelize(database, username, password, configuration)

    if (process.env.NODE_ENV === 'development') {
      server.ext('onPreStart', async () => {
        try {
          return sequelize.sync()
        } catch (reason) {
          throw reason || new Error('Unable to initialize the database')
        }
      })
    }

    server.expose('sequelize', sequelize)
  }
}
