'use strict'

const Hoek = require('hoek')
const Sequelize = require('sequelize')

const defaults = {
  uri: null,
  operatorsAliases: false
}

const {
  NODE_ENV = 'development'
} = process.env

exports.plugin = {
  pkg: require('./package.json'),
  register: async function (server, options) {
    const settings = Hoek.applyToDefaults(defaults, options[NODE_ENV] || {})
    settings.logging = (...args) => server.log([ 'database' ], ...args)
    console.log(settings)
    const sequelize = new Sequelize(settings.uri, settings)

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
