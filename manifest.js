'use strict'

module.exports = (options) => ({
  server: options.server,
  register: {
    plugins: [
      '@hapi/inert',
      '@hapi/vision',
      '@hapi/cookie',
      'hapi-swagger',
      'blipp',
      {
        plugin: 'laabr',
        options: Object.assign({ colored: process.env.NODE_ENV === 'development' }, options.logs)
      },
      {
        plugin: './src/database',
        options: options.database
      },
      {
        plugin: './src/authentication',
        options: options.authentication
      },
      './src/model',
      './src/home'
    ]
  }
})
