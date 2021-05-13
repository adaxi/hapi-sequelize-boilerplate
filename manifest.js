'use strict'

module.exports = (options) => ({
  server: options.server,
  register: {
    plugins: [
      `@hapi/inert`,
      `@hapi/vision`,
      `@hapi/cookie`,
      `hapi-swagger`,
      'blipp',
      {
        plugin: 'laabr',
        options: {
          formats: {
            onPostStart: '[:time[iso]][:level] :message at: :host[uri]',
            onPostStop: '[:time[iso]][:level] :message at: :host[uri]',
            request: '[:time[iso]][:level] :message [:requestId]',
            response: '[:time[iso]] :method :remoteAddress :url :status :payload (:responseTime ms) [:requestId]',
            log: '[:time[iso]][:level] :message :tags',
            uncaught: '{ error::error, timestamp::time, level::level, environment::environment, stack::error[stack] }',
            'request-error': '{ error::error, timestamp::time, level::level, environment::environment, stack::error[stack] }'
          },
          indent: 0,
          colored: process.env.NODE_ENV === 'development',
          handleUncaught: true
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
