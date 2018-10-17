'use strict'

const fs = require('fs')
const Path = require('path')

exports.plugin = {
  pkg: require('./package.json'),
  register: async (server, options) => {
    const { sequelize } = server.plugins.database

    const models = {}
    const modelDirectory = Path.join(__dirname, 'models')

    fs
      .readdirSync(modelDirectory)
      .filter(file => {
        return (file.indexOf('.') !== 0) && (file.slice(-3) === '.js')
      })
      .forEach(file => {
        const model = sequelize.import(Path.join(modelDirectory, file))
        models[model.name] = model
        server.expose(model.name, model)
      })

    Object.keys(models).forEach(modelName => {
      if (models[modelName].associate) {
        models[modelName].associate(models)
      }
    })
  }
}
