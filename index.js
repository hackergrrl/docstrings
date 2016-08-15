var esprima = require('esprima')

module.exports = function (f) {
  "Interpret a string literal at the beginning of a function as its documentation."

  if (typeof f !== 'function') {
    throw new TypeError('not a function')
  }

  var res
  var body = esprima.parse(f.toString()).body[0].body
  var expr = getNthExpression(body, 0)

  if (!expr || !isExpressionStringLiteral(expr)) {
    return ''
  }

  // Skip 'use strict' and look at the next expression
  var value = getStringLiteralValue(expr)
  if (value === 'use strict') {
    expr = getNthExpression(body, 1)
    if (!expr || !isExpressionStringLiteral(expr)) {
      return ''
    }
    value = getStringLiteralValue(expr)
  }

  return value
    .replace(/ +/g, ' ')
    .replace(/^\s*/mg, '')
}

function getNthExpression (body, n) {
  "Given the esprima-parsed body of a function, retrieve the Nth expression."

  if (body && body.body && body.body[n] && body.body[n].expression) {
    return body.body[n].expression
  } else {
    return null
  }
}

function isExpressionStringLiteral (expr) {
  "Determines if the given expression is a string literal."

  return expr.type === 'Literal' || expr.type === 'TemplateLiteral'
}

function getStringLiteralValue (expr) {
  "Pulls out the string value of a string literal expression."

  switch (expr.type) {
    case 'Literal':
      return expr.value
    case 'TemplateLiteral':
      return expr.quasis[0].value.raw
    default:
      throw new Error('expr is not a string literal')
  }
}
