module.exports = function (options) {
  options = options || {}

  const uri = options.uri || 'https://sandbox.auth.yourprovider.com'
  const scopes = options.scopes

  return {
    protocol: 'oauth2',
    useParamsAuth: true,
    auth: uri + '/authorize',
    token: uri + '/token',
    scope: scopes,
    scopeSeparator: '\n',
    headers: {
      'User-Agent': 'HAPI Escaux'
    }
  }
}
