module.exports = {
  env: {
    mocha: true
  },
  rules: {
    // fix console issues on deployment
    'no-console': process.env.NODE_ENV === 'production' ? 'off' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'template-curly-spacing': 'off',
    indent: ['error', 2, {
      ignoredNodes: ['TemplateLiteral']
    }]
  }
}
