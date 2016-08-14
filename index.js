var esprima = require('esprima')

module.exports = function (f) {
  "Interpret a string literal at the beginning of a function as its documentation."
  
  if (typeof f !== 'function') {
    throw new TypeError('not a function')
  }

  var res
  var expr = esprima.parse(f.toString()).body[0].body
  if (expr && expr.body && expr.body[0] && expr.body[0].expression) {
    expr = expr.body[0].expression
  } else {
    return ''
  }

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
