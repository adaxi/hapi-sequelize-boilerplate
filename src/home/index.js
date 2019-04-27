'use strict'

exports.plugin = {
  pkg: require('./package.json'),
  register: async (server, options) => {
    server.route({
      method: 'GET',
      path: '/',
      options: {
        auth: 'session'
      },
      handler: (request, h) => {
        return 'hello world'
      }
    })
  }
}
