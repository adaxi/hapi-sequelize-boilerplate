'use strict'

module.exports = (options) => ({
  server: options.server,
  register: {
    plugins: [
      `inert`,
      `vision`,
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
      `./src/database`,
      `./src/model`
    ]
  }
})
