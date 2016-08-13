var esprima = require('esprima')

module.exports = function (f) {
  if (typeof f !== 'function') {
    throw new TypeError('not a function')
  }

  var res
  var expr = esprima.parse(f.toString()).body[0].body.body[0].expression
  switch (expr.type) {
    case 'Literal':
      res = expr.value
      break
    case 'TemplateLiteral':
      res = expr.quasis[0].value.raw
      break
    default:
      return ''
  }

  return res
    .replace(/ +/g, ' ')
    .replace(/^\s*/mg, '')
}
