'use strict'

module.exports = (options) => ({
  server: options.server,
  register: {
    plugins: [
      `@hapi/inert`,
      `@hapi/vision`,
      `hapi-swagger`,
      {
        plugin: `good`,
        options: {
          reporters: {
            console: [
              {
                module: 'good-squeeze',
                name: 'Squeeze',
                args: [{ log: '*', response: '*' }]
              },
              {
                module: 'good-console'
              },
              'stderr'
            ]
          }
        }
      },
      {
        plugin: `./src/database`,
        options: options.database
      },
      `./src/model`
    ]
  }
})
