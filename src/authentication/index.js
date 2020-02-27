'use strict'

const Bell = require('@hapi/bell')
const Joi = require('@hapi/joi')
const Jwt = require('jsonwebtoken')

exports.plugin = {
  pkg: require('./package.json'),
  dependencies: [
    '@hapi/bell',
    '@hapi/cookie'
  ],
  register: async (server, options) => {
    const config = Joi.attempt(options, Joi.object().required().keys({
      oauth: Joi.object({
        uri: Joi.string().optional(),
        scopes: Joi.array().default([]),
        clientId: Joi.string(),
        secret: Joi.string(),
        cookie: Joi.object({
          password: Joi.string().min(32)
        })
      }),
      cookie: Joi.object().required().keys({
        name: Joi.string().optional().default('sid'),
        password: Joi.string().min(32)
      })
    }))

    await server.register(Bell, { once: true })

    server.auth.strategy('session', 'cookie', {
      cookie: {
        name: config.cookie.name,
        password: config.cookie.password,
        isSecure: false
      },
      redirectTo: '/login',
      validateFunc: async (request, session) => {
        const now = (new Date()).getTime() / 1000
        return { valid: session.payload.iat < now && now < session.payload.exp }
      }
    })

    const provider = require('./providers/yourprovider')(config.oauth)

    server.auth.strategy('oauth', 'bell', {
      provider,
      password: config.oauth.cookie.password,
      clientId: config.oauth.clientId,
      clientSecret: config.oauth.secret,
      forceHttps: true,
      isSecure: false
    })

    server.route({
      method: 'GET',
      path: '/login',
      options: {
        auth: 'oauth',
        handler: (request, h) => {
          const { token } = request.auth.credentials
          const payload = Jwt.decode(token)

          const profile = {
            token,
            payload
          }

          request.cookieAuth.clear()
          request.cookieAuth.set(profile)

          return h.redirect('/')
        }
      }
    })
  }
}
