'use strict'

module.exports = (options) => ({
  server: options.server,
  register: {
    plugins: [
      `@hapi/inert`,
      `@hapi/vision`,
      `@hapi/cookie`,
      `hapi-swagger`,
      {
        plugin: `@hapi/good`,
        options: {
          reporters: {
            console: [
              {
                module: '@hapi/good-squeeze',
                name: 'Squeeze',
                args: [{ log: '*', response: '*' }]
              },
              {
                module: '@hapi/good-console'
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
      {
        plugin: `./src/authentication`,
        options: options.authentication
      },
      `./src/model`,
      `./src/home`
    ]
  }
})
